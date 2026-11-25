# Rahul Kumar — Independent Software Developer Portfolio

A premium, high-converting digital presence and B2B client acquisition platform engineered for **Rahul Kumar**, an independent Software Developer based in Noida, India (UTC+5:30), specializing in full-stack web applications, cross-platform mobile apps (React Native), custom desktop software, AI agent integration, and business automation.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, this application positions Rahul as a reliable engineering partner for international startups, CTOs, founders, and digital agencies looking for contract or freelance development.

---

## Table of Contents

1. [Key Features & Architecture](#key-features--architecture)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started & Local Development](#getting-started--local-development)
5. [Environment Variables](#environment-variables)
6. [Email Provider Setup (Resend)](#email-provider-setup-resend)
7. [Content Management & Editing](#content-management--editing)
   - [Personal Bio & Social Links](#personal-bio--social-links)
   - [Adding or Editing Projects](#adding-or-editing-projects)
   - [Adding or Editing Services](#adding-or-editing-services)
   - [Publishing Blog & Insights](#publishing-blog--insights)
8. [Internationalization (i18n)](#internationalization-i18n)
9. [Technical SEO & Structured Data](#technical-seo--structured-data)
10. [Production Deployment](#production-deployment)
    - [Deploy to Vercel (Recommended)](#deploy-to-vercel-recommended)
    - [Deploy via Docker / AWS](#deploy-via-docker--aws)
11. [Custom Domain & SSL Setup](#custom-domain--ssl-setup)
12. [Search Console & Webmaster Verification](#search-console--webmaster-verification)
13. [License & Credits](#license--credits)

---

## Key Features & Architecture

- **High-Converting Studio Aesthetic:** Modern minimalist dark/light interface with refined neutral palettes, subtle ambient borders, and smooth transitions.
- **Multilingual Internationalization (4 Locales):** Complete localization in English (`en`), French (`fr`), Dutch (`nl`), and Russian (`ru`) with prefix-based routing (`/[locale]/...`) and path-preserving language switching.
- **100% Statically Generated (130 Routes):** High-speed serverless performance with all public pages pre-rendered at build time.
- **Verified Client Case Studies:**
  - **NilesCart** (Client: Aluma): E-commerce ecosystem with Next.js web storefront and React Native Expo iOS/Android mobile apps.
  - **edaCleaner** (Client: Aluma): Desktop data cleansing and hygiene software powered by Electron, React, and local offline execution.
  - Additional verified production projects from Spirehubs and W3 Dev (Dwive, Pwev, Convoo, AI Voice SaaS).
- **Secure Client Inquiry System:**
  - Dedicated Contact page with pre-selectable services via URL query (`?service=...`).
  - Server-side email notifications via Resend API and optional auto-reply confirmations.
  - In-memory sliding-window IP rate limiting (5 inquiries / 15 minutes).
  - Silent honeypot spam protection.
  - Zero-bailout SSR rendering for form elements with client-side field validation.
- **Comprehensive SEO & Structured Data:**
  - Full schema.org JSON-LD suite: `Person`, `WebSite`, `ProfessionalService`, `ProfilePage`, `Service`, `SoftwareApplication`, `TechArticle`, and `BreadcrumbList`.
  - Dynamic XML sitemap (`/sitemap.xml`) with 124 URLs and reciprocal `hreflang` annotations.
  - Strict crawling policy in `/robots.txt` blocking bot indexation of APIs and private queries.
  - Deterministic system font stack ensuring **CLS = 0.000** and instant LCP (< 300ms).
- **Verified Downloadable Resume:** Single-page, public-safe PDF resume generated at `/downloads/Rahul_Kumar_Resume_Public.pdf`.

---

## Tech Stack

| Layer | Technology | Version / Specification |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.4.6` (Turbopack) |
| **Runtime / Library** | React & React DOM | `19.3.0` |
| **Language** | TypeScript | `^5` (Strict Mode) |
| **Styling** | Tailwind CSS | `v4.0.0` (Native CSS theme tokens) |
| **Internationalization** | `next-intl` | `^4.8.3` |
| **Animation** | Motion (`motion`) | `^12.4.7` |
| **Icons** | `lucide-react` | `^1.16.0` + custom brand SVGs |
| **Theming** | `next-themes` | `^0.4.6` (Dark, Light, System) |
| **Email API** | Resend API / HTTP REST | Node.js `fetch` integration |

---

## Project Structure

```text
rahul_portfolio/
├── app/
│   ├── [locale]/                 # Localized page routes
│   │   ├── layout.tsx            # Root locale layout with Header & Footer
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx        # About & Experience page
│   │   ├── blog/                 # Blog directory & [slug] article viewer
│   │   ├── contact/page.tsx      # Contact page & inquiry form
│   │   ├── privacy-policy/       # Privacy & data handling policy
│   │   ├── projects/             # Projects directory & [slug] case study
│   │   └── services/             # Services directory & [slug] service detail
│   ├── api/
│   │   └── contact/route.ts      # Rate-limited inquiry submission API
│   ├── globals.css               # Tailwind CSS v4 design tokens & typography
│   ├── not-found.tsx             # Root 404 handler
│   ├── robots.ts                 # Search crawler instructions
│   └── sitemap.ts                # Multilingual sitemap generator with hreflang
├── components/                   # Modular React components
│   ├── breadcrumbs.tsx           # Accessible breadcrumbs with JSON-LD
│   ├── contact-form.tsx          # Direct SSR contact form with client validation
│   ├── header.tsx                # Sticky responsive header with navigation & locale dropdown
│   ├── footer.tsx                # Footer with timezone clock and international links
│   ├── theme-toggle.tsx          # Hydration-safe dark/light toggle
│   ├── inquiry-cta.tsx           # Reusable call-to-action blocks
│   ├── hero-workflow-visual.tsx  # Interactive capability preview
│   └── mockups/                  # Desktop and Mobile device mockups
├── data/                         # Centralized typed content collections
│   ├── blog.ts                   # Blog articles and deep-dive engineering guides
│   ├── navigation.ts             # Navigation hierarchy and menu items
│   ├── projects.ts               # Detailed client project case studies
│   ├── services.ts               # 8 specialized software development services
│   └── site-config.ts            # Personal profile, verified credentials, and metrics
├── i18n/                         # Internationalization routing & request helpers
│   ├── routing.ts                # Locale definitions (en, fr, nl, ru) & navigation wrappers
│   └── request.ts                # Server message loader
├── messages/                     # Translation dictionaries
│   ├── en.json                   # English (Default)
│   ├── fr.json                   # French
│   ├── nl.json                   # Dutch
│   └── ru.json                   # Russian
├── public/                       # Static public assets
│   ├── downloads/                # Rahul_Kumar_Resume_Public.pdf
│   ├── images/                   # Project screenshots & brand assets
│   ├── favicon.ico               # Site favicon
│   └── og-image.png              # 1200x630 OpenGraph social preview image
├── lib/                          # Utility functions & SEO structured data builders
│   ├── seo.ts                    # Dynamic metadata & JSON-LD generators
│   └── utils.ts                  # Classname merging and formatters
├── middleware.ts                 # next-intl routing middleware
├── next.config.ts                # Next.js configuration with next-intl plugin
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── .env.example                  # Environment variable template
```

---

## Getting Started & Local Development

### Prerequisites

- **Node.js:** `v20.x` or later (tested on Node v20/v26)
- **Package Manager:** `npm` (v10+), `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codescirahul/rahul_portfolio.git
   cd rahul_portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *(Edit `.env.local` with your preferred settings — development mode works out-of-the-box without keys).*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser. The site automatically directs to `/en` (or your preferred browser locale).

### Verification & Testing Commands

- **Typecheck:**
  ```bash
  npx tsc --noEmit
  ```
- **Lint:**
  ```bash
  npx eslint . --quiet
  ```
- **Production Build:**
  ```bash
  npm run build
  ```
- **Run Production Server Locally:**
  ```bash
  npm start
  ```

---

## Environment Variables

Create a `.env.local` file in the project root:

```ini
# Base Application URL (Required for canonical URLs & sitemaps)
NEXT_PUBLIC_SITE_URL=https://rahulkumar.dev

# Resend API Key for Transactional Emails (Optional in development)
# Get a key from https://resend.com
RESEND_API_KEY=re_1234567890abcdef12345678

# Destination Email for Inquiries
CONTACT_RECIPIENT_EMAIL=rahulkumarkudra2004@gmail.com

# Verified Sending Email Address (Must match your verified domain in Resend)
CONTACT_FROM_EMAIL=inquiries@rahulkumar.dev

# Rate Limiting Configuration (Defaults to 5 requests per 15 minutes)
RATE_LIMIT_MAX_REQUESTS=5
RATE_LIMIT_WINDOW_MS=900000
```

> **Note:** If `RESEND_API_KEY` is not set, inquiry submissions will succeed in the UI and log the inquiry payload directly to the server terminal, allowing you to test the entire client flow without an email account.

---

## Email Provider Setup (Resend)

To receive real client inquiries in your inbox:

1. Sign up for a free account at [Resend](https://resend.com).
2. Go to **Domains** and add `rahulkumar.dev`.
3. Add the provided `MX`, `TXT`, and `DKIM` DNS records at your domain registrar (e.g., Namecheap, Cloudflare, GoDaddy).
4. Go to **API Keys**, click **Create API Key**, and copy the token.
5. In your production environment (e.g., Vercel Dashboard), set:
   - `RESEND_API_KEY`: `re_your_api_key_here`
   - `CONTACT_FROM_EMAIL`: `Rahul Kumar <inquiries@rahulkumar.dev>`
   - `CONTACT_RECIPIENT_EMAIL`: `rahulkumarkudra2004@gmail.com`

When submitted, the API sends:
1. An HTML email with the client's name, email, company, budget, timeline, and project description to you.
2. An automated client confirmation acknowledging receipt and pledging a reply within 24 hours.

---

## Content Management & Editing

All content is structured in strongly typed TypeScript files inside the `data/` directory.

### Personal Bio & Social Links
Edit `data/site-config.ts` to update:
- Name, headline, short bio, and location.
- Social links (GitHub, LinkedIn, WhatsApp, Cal.com scheduling link).
- Verified achievements and key performance metrics.
- Professional experience timeline (Spirehubs, W3 Dev) and education.

### Adding or Editing Projects
Edit `data/projects.ts` to add or update case studies:
```typescript
{
  id: 'new-client-project',
  slug: 'new-client-project',
  title: 'High-Scale FinTech Dashboard',
  tagline: 'Multi-currency settlement dashboard with real-time analytics',
  client: 'Client Name (or Confidential)',
  category: 'Web', // 'Web' | 'Mobile' | 'Desktop' | 'E-commerce' | 'AI'
  status: 'Production',
  period: '2026',
  role: 'Lead Full-Stack Developer',
  featured: true,
  metrics: [
    { label: 'Latency', value: '< 80ms' },
    { label: 'Throughput', value: '10k tx/sec' }
  ],
  summary: 'Project executive summary...',
  problem: 'Business and technical bottleneck...',
  solution: 'Architectural solution delivered...',
  techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
  // ... mockups, screenshots, outcomes
}
```
*Screenshots should be added to `public/images/projects/<project-slug>/`.*

### Adding or Editing Services
Edit `data/services.ts` to adjust:
- The 8 service offerings (Web, Mobile, Desktop, AI Agents, n8n Automation, E-commerce, Backend/API, Cloud/Maintenance).
- Problems solved, expected deliverables, technical stack, process steps, and FAQs.

### Publishing Blog & Insights
Edit `data/blog.ts` to add articles:
- Set `status: 'published'` for live articles, or `'draft'` for upcoming previews.
- Articles include title, slug, excerpt, reading time, published date, author, tags, table of contents, and rich markdown sections with code examples.
- When published, the article is automatically indexed in `/sitemap.xml` and renders schema.org `TechArticle` structured data.

---

## Internationalization (i18n)

The application uses `next-intl` with standard JSON dictionaries in `messages/`:
- `messages/en.json` (English - Base)
- `messages/fr.json` (French)
- `messages/nl.json` (Dutch)
- `messages/ru.json` (Russian)

### Adding a New Translation Key
1. Add the key and its English text to `messages/en.json`:
   ```json
   "contact": {
     "newFeatureLabel": "Instant Response"
   }
   ```
2. Add the corresponding localized translation to `messages/fr.json`, `messages/nl.json`, and `messages/ru.json`.
3. Use it in any component:
   ```typescript
   import { useTranslations } from 'next-intl';
   const t = useTranslations('contact');
   return <span>{t('newFeatureLabel')}</span>;
   ```

---

## Technical SEO & Structured Data

The website is engineered for organic B2B discoverability:

- **JSON-LD Structured Data:** Generated dynamically in `lib/seo.ts`:
  - `Person` & `WebSite` schemas on all pages.
  - `ProfessionalService` schema for software contracting.
  - `SoftwareApplication` schema for case studies.
  - `TechArticle` schema for technical insights.
  - `BreadcrumbList` schema for accessible breadcrumbs.
- **Multilingual Hreflang:** Reciprocal alternate link annotations for all 4 languages:
  - `<link rel="alternate" hreflang="en" href="https://rahulkumar.dev/en/..." />`
  - `<link rel="alternate" hreflang="fr" href="https://rahulkumar.dev/fr/..." />`
  - `<link rel="alternate" hreflang="nl" href="https://rahulkumar.dev/nl/..." />`
  - `<link rel="alternate" hreflang="ru" href="https://rahulkumar.dev/ru/..." />`
  - `<link rel="alternate" hreflang="x-default" href="https://rahulkumar.dev/en/..." />`
- **Sitemap:** Dynamic at `https://rahulkumar.dev/sitemap.xml` covering all 124 public routes.
- **Robots.txt:** Configured at `/robots.txt` with proper disallows for private APIs, search query parameters, and build directories.

---

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push your repository to GitHub / GitLab:
   ```bash
   git add .
   git commit -m "Production release"
   git push origin main
   ```
2. Go to [Vercel](https://vercel.com/new) and import the repository.
3. Framework Preset: **Next.js**.
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: `https://rahulkumar.dev`
   - `RESEND_API_KEY`: `re_your_resend_key`
   - `CONTACT_RECIPIENT_EMAIL`: `rahulkumarkudra2004@gmail.com`
   - `CONTACT_FROM_EMAIL`: `inquiries@rahulkumar.dev`
5. Click **Deploy**. Vercel will build and distribute all 130 static pages globally across Edge nodes.

### Deploy via Docker / AWS

A standard containerized production run:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

---

## Custom Domain & SSL Setup

To configure `rahulkumar.dev`:

1. In your **Vercel Project Settings > Domains**, enter `rahulkumar.dev` and `www.rahulkumar.dev`.
2. Configure DNS records at your domain registrar:
   - **Type A:** `@` pointing to `76.76.21.21` (Vercel IP).
   - **Type CNAME:** `www` pointing to `cname.vercel-dns.com`.
3. Vercel automatically provisions and renews a free Let's Encrypt SSL certificate.

---

## Search Console & Webmaster Verification

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add Property: `https://rahulkumar.dev`.
3. Verify ownership via DNS TXT record or HTML tag.
4. Navigate to **Sitemaps** and submit: `https://rahulkumar.dev/sitemap.xml`.
5. Repeat for [Bing Webmaster Tools](https://www.bing.com/webmasters) by importing your verified Google Search Console property.

---

## License & Credits

- Designed and developed by **Rahul Kumar**.
- Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), [Lucide Icons](https://lucide.dev), and [Motion](https://motion.dev).
- All case studies, project metrics, and professional experience are authentic and verified.
