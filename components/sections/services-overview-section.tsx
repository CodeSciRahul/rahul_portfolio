import * as React from 'react';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import {
  Globe,
  Smartphone,
  Bot,
  Monitor,
  Radio,
  CreditCard,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

export function ServicesOverviewSection() {
  const businessServices = [
    {
      id: 'web-apps',
      icon: Globe,
      badge: 'Core Service',
      title: 'Full-Stack Web Applications',
      problem: 'Slow, clunky web apps turn potential customers away and struggle to rank on Google.',
      solution:
        'I build fast, SEO-optimized web applications with Next.js App Router, React 19, and Node.js. Server-side rendering ensures near-instant page loads, while clean component architecture makes future feature additions painless.',
      deliverables: [
        'Fast page loading with Next.js Server Components',
        'Secure user authentication and role-based permissions',
        'Scalable REST APIs with database validation',
      ],
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB / SQL'],
    },
    {
      id: 'mobile-apps',
      icon: Smartphone,
      badge: 'High Impact',
      title: 'Cross-Platform Mobile Apps',
      problem: 'Building separate iOS and Android native apps doubles your development and maintenance budget.',
      solution:
        'I develop production-ready mobile apps using React Native. One clean, maintainable codebase powers both the Apple App Store and Google Play releases with 60 FPS native performance, smooth gestures, and offline support.',
      deliverables: [
        'Single codebase for both iOS and Android stores',
        'Fluid animations, offline storage, and responsive UI',
        'Hardware access: GPS geolocation, camera, push alerts',
      ],
      tech: ['React Native', 'Expo', 'TypeScript', 'Redux / Zustand', 'Shopify FlashList'],
    },
    {
      id: 'ai-automation',
      icon: Bot,
      badge: 'Automation',
      title: 'AI Agents & Voice Automation',
      problem: 'Customer support teams are overwhelmed by repetitive inquiries, and manual lead qualification drains time.',
      solution:
        'I build custom AI workflows that connect your business phone numbers and communication channels directly to OpenAI LLMs and Twilio voice streams. Your business can handle voice calls and inquiries automatically, 24/7.',
      deliverables: [
        'Automated 24/7 telephone voice agents using Twilio',
        'Intelligent document and text processing via OpenAI',
        'Seamless handoff to human support with full call transcripts',
      ],
      tech: ['OpenAI API', 'Twilio Voice SDK', 'Whisper STT', 'Speech-to-Text', 'Node.js'],
    },
    {
      id: 'desktop-software',
      icon: Monitor,
      badge: 'Security-First',
      title: 'Custom Desktop Software',
      problem: 'Enterprises handling sensitive customer datasets cannot upload confidential files to third-party cloud tools.',
      solution:
        'I build secure, offline-capable desktop applications with Electron and React. Your team can clean, validate, and analyze heavy datasets locally on their workstations with zero cloud leakage, preserving total compliance.',
      deliverables: [
        'Installers for macOS, Windows, and Linux workstations',
        '100% offline data processing with zero cloud transmission',
        'Intuitive desktop interfaces with system file access',
      ],
      tech: ['Electron', 'Electron Vite', 'React', 'TypeScript', 'Zustand', 'Tailwind CSS'],
    },
    {
      id: 'realtime-systems',
      icon: Radio,
      badge: 'Live Data',
      title: 'Real-Time & Duplex Systems',
      problem: 'Polling servers for updates creates unnecessary server costs and delivers a laggy user experience.',
      solution:
        'I architect high-throughput real-time systems using Socket.io and WebSockets. Users receive instant notifications, live chat messages, and real-time vehicle telemetry with sub-80ms synchronization.',
      deliverables: [
        'Bidirectional WebSocket pipelines with JWT handshakes',
        'Room-based privacy isolation for secure messaging',
        'Sub-80ms message latency across web and mobile clients',
      ],
      tech: ['Socket.io', 'Node.js', 'Express', 'JWT Authentication', 'MongoDB Indexing'],
    },
    {
      id: 'payment-infrastructure',
      icon: CreditCard,
      badge: 'Monetization',
      title: 'Payment & Billing Infrastructure',
      problem: 'Failed webhook handling and brittle payment flows lead to lost revenue and customer billing disputes.',
      solution:
        'I integrate production-tested Stripe payment workflows. From one-time checkout to recurring monthly subscriptions and customer portals, every transaction is cryptographically verified to prevent double-billing.',
      deliverables: [
        'Stripe Checkout & Billing Customer Portal integration',
        'Cryptographic webhook validation with replay prevention',
        'Automated invoice generation and payment receipts',
      ],
      tech: ['Stripe API', 'Webhook Verifiers', 'Node.js', 'Express', 'MongoDB'],
    },
  ];

  return (
    <Section pattern="grid" border="bottom">
      <SectionHeading
        badge="Engineering Services"
        title="Software Solutions Engineered for Business Growth"
        subtitle="I focus on solving practical business bottlenecks: launching new products on time, cutting development costs, automating repetitive tasks, and protecting revenue."
        align="left"
        action={
          <Button
            href="/services"
            variant="outline"
            size="sm"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Detailed Service Specifications
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="flex flex-col justify-between p-7 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 hover:shadow-xl hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {service.title}
                </h3>

                {/* The Business Problem */}
                <div className="mt-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800/60">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold mb-0.5">
                    The Problem
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {service.problem}
                  </p>
                </div>

                {/* The Solution */}
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                  {service.solution}
                </p>

                {/* Key Deliverables */}
                <div className="mt-5 space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tech Pills & CTA */}
              <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex flex-wrap gap-1 mb-4">
                  {service.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Request Consultation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <Button href="/contact" variant="ghost" size="xs">
                    Discuss Scope
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
