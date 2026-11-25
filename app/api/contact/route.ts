import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  privacyConsent?: boolean;
  website?: string; // Honeypot spam trap
}

interface RateLimitRecord {
  count: number;
  expiresAt: number;
}

// In-memory rate limiting store (IP -> { count, expiresAt })
const rateLimitMap = new Map<string, RateLimitRecord>();

// Clean up stale rate-limit records every 10 minutes to avoid memory growth
const CLEANUP_INTERVAL = 10 * 60 * 1000;
let lastCleanup = Date.now();

function purgeExpiredRateLimits() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [ip, record] of rateLimitMap.entries()) {
    if (record.expiresAt < now) {
      rateLimitMap.delete(ip);
    }
  }
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  purgeExpiredRateLimits();

  const windowMinutes = parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '15', 10);
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10);
  const windowMs = windowMinutes * 60 * 1000;
  const now = Date.now();

  const record = rateLimitMap.get(ip);

  if (!record || record.expiresAt < now) {
    rateLimitMap.set(ip, {
      count: 1,
      expiresAt: now + windowMs,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (record.count >= maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((record.expiresAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  record.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function validateEmail(email: string): boolean {
  // RFC 5322 compatible regex for email validation
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

function sanitizeText(input?: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Strip basic HTML tags
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    // 1. Identify Client IP for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = (forwarded ? forwarded.split(',')[0] : realIp || '127.0.0.1').trim();

    // 2. Check Rate Limit
    const { allowed, retryAfterSeconds } = checkRateLimit(clientIp);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many inquiries from this IP address. Please wait ${retryAfterSeconds} seconds before trying again, or email directly at rahulkumarkudra2004@gmail.com.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSeconds),
          },
        }
      );
    }

    // 3. Parse JSON Body
    let body: ContactPayload;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    // 4. Honeypot check (hidden "website" field)
    // If a bot fills this in, silently succeed without sending notification or logging
    if (body.website && body.website.trim().length > 0) {
      console.warn(`[SPAM BLOCKED] Honeypot field filled by bot IP: ${clientIp}`);
      return NextResponse.json({
        success: true,
        message: 'Inquiry received successfully.',
      });
    }

    // 5. Strict Server-Side Field Validation
    const errors: Record<string, string> = {};

    const name = sanitizeText(body.name);
    const email = sanitizeText(body.email).toLowerCase();
    const company = sanitizeText(body.company);
    const country = sanitizeText(body.country);
    const service = sanitizeText(body.service);
    const budget = sanitizeText(body.budget);
    const timeline = sanitizeText(body.timeline);
    const message = sanitizeText(body.message);
    const privacyConsent = Boolean(body.privacyConsent);

    if (!name || name.length < 2) {
      errors.name = 'Please provide your full name (minimum 2 characters).';
    } else if (name.length > 100) {
      errors.name = 'Name must be 100 characters or fewer.';
    }

    if (!email) {
      errors.email = 'Please provide an email address.';
    } else if (!validateEmail(email)) {
      errors.email = 'Please provide a valid email address.';
    } else if (email.length > 120) {
      errors.email = 'Email address must be 120 characters or fewer.';
    }

    if (company && company.length > 120) {
      errors.company = 'Company name must be 120 characters or fewer.';
    }

    if (country && country.length > 100) {
      errors.country = 'Country name must be 100 characters or fewer.';
    }

    if (!service) {
      errors.service = 'Please select the required service.';
    }

    if (!budget) {
      errors.budget = 'Please select an estimated budget range.';
    }

    if (!timeline) {
      errors.timeline = 'Please select your expected project timeline.';
    }

    if (!message || message.length < 20) {
      errors.message = 'Please provide project details and requirements (minimum 20 characters).';
    } else if (message.length > 5000) {
      errors.message = 'Project message is too long (maximum 5,000 characters).';
    }

    if (!privacyConsent) {
      errors.privacyConsent = 'You must agree to the privacy policy to submit an inquiry.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please correct the highlighted errors.',
          errors,
        },
        { status: 400 }
      );
    }

    // 6. Dispatch Notification Email
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL || 'rahulkumarkudra2004@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
    const submissionTime = new Date().toISOString();

    const emailSubject = `[Portfolio Lead] ${service} - ${name}${company ? ` (${company})` : ''}`;

    const adminHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #171717; background-color: #fafafa; border-radius: 12px; border: 1px solid #e5e5e5;">
        <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 16px; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">
          🚀 New Client Project Inquiry
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 140px;">Client Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email Address:</td>
            <td style="padding: 8px 0; color: #0284c7; font-weight: 600;">
              <a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a>
            </td>
          </tr>
          ${
            company
              ? `<tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Company:</td>
            <td style="padding: 8px 0; color: #0f172a;">${company}</td>
          </tr>`
              : ''
          }
          ${
            country
              ? `<tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Location / Country:</td>
            <td style="padding: 8px 0; color: #0f172a;">${country}</td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Requested Service:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Budget Range:</td>
            <td style="padding: 8px 0; color: #047857; font-weight: 700;">${budget}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Target Timeline:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${timeline}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Submitted At:</td>
            <td style="padding: 8px 0; color: #64748b; font-size: 12px;">${submissionTime} (IP: ${clientIp})</td>
          </tr>
        </table>

        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h3 style="font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 0; margin-bottom: 8px;">
            Project Description & Requirements:
          </h3>
          <p style="font-size: 14px; line-height: 1.6; color: #1e293b; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
          Inquiry sent via <a href="https://rahulkumar.dev" style="color: #0284c7; text-decoration: none;">rahulkumar.dev</a> Lead Generation System.
        </div>
      </div>
    `;

    const clientConfirmationHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #171717; background-color: #ffffff; border-radius: 12px; border: 1px solid #e5e5e5;">
        <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 12px;">
          Thank You, ${name}
        </h2>
        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
          I have received your project inquiry regarding <strong>${service}</strong>.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
          I personally review every technical proposal, requirement specification, and timeline constraint. You can expect a thoughtful response from me within <strong>24 business hours</strong>.
        </p>

        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h4 style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 8px;">
            Inquiry Summary:
          </h4>
          <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; line-height: 1.7;">
            <li><strong>Service:</strong> ${service}</li>
            <li><strong>Estimated Scope:</strong> ${budget}</li>
            <li><strong>Target Timeline:</strong> ${timeline}</li>
          </ul>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
          If you need to discuss urgent specifications sooner, feel free to book a direct 15-minute video call on my calendar:
        </p>
        <div style="margin: 20px 0;">
          <a href="https://cal.com/rahulkumar/discovery-call" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">
            Schedule Discovery Call
          </a>
        </div>

        <p style="font-size: 13px; color: #64748b; margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
          Best regards,<br />
          <strong>Rahul Kumar</strong><br />
          Independent Software Developer<br />
          <a href="https://rahulkumar.dev" style="color: #0284c7; text-decoration: none;">rahulkumar.dev</a> | <a href="mailto:rahulkumarkudra2004@gmail.com" style="color: #0284c7; text-decoration: none;">rahulkumarkudra2004@gmail.com</a>
        </p>
      </div>
    `;

    if (resendApiKey) {
      // Send notification to Rahul
      const adminResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Rahul Kumar Portfolio <${fromEmail}>`,
          to: [notificationEmail],
          reply_to: email,
          subject: emailSubject,
          html: adminHtml,
        }),
      });

      if (!adminResponse.ok) {
        const errorData = await adminResponse.text();
        console.error('[EMAIL DISPATCH ERROR]', errorData);
      }

      // Send confirmation to client
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: `Rahul Kumar <${fromEmail}>`,
            to: [email],
            subject: 'Project Inquiry Received - Rahul Kumar',
            html: clientConfirmationHtml,
          }),
        });
      } catch (confError) {
        console.warn('[CLIENT CONFIRMATION EMAIL WARNING]', confError);
      }
    } else {
      // Local/Dev Mode: Log cleanly to console
      console.log('----------------------------------------------------');
      console.log('🔔 [NEW CLIENT INQUIRY RECEIVED - LOCAL / DEV MODE]');
      console.log(`Timestamp: ${submissionTime} | IP: ${clientIp}`);
      console.log(`Name:      ${name}`);
      console.log(`Email:     ${email}`);
      console.log(`Company:   ${company || 'N/A'}`);
      console.log(`Country:   ${country || 'N/A'}`);
      console.log(`Service:   ${service}`);
      console.log(`Budget:    ${budget}`);
      console.log(`Timeline:  ${timeline}`);
      console.log(`Message:   ${message}`);
      console.log('----------------------------------------------------');
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Your project inquiry has been received. I will review your requirements and respond within 24 hours.',
        data: {
          name,
          email,
          service,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[CONTACT API INTERNAL ERROR]', error);
    return NextResponse.json(
      {
        success: false,
        error:
          'An unexpected server error occurred while processing your inquiry. Please email directly at rahulkumarkudra2004@gmail.com.',
      },
      { status: 500 }
    );
  }
}
