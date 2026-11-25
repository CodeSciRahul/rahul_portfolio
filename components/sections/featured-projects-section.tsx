import * as React from 'react';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing';
import {
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Monitor,
  Smartphone,
  Globe,
  Database,
  ExternalLink,
} from 'lucide-react';
import { projects } from '@/data/projects';

export function FeaturedProjectsSection() {
  const nilescart = projects.find((p) => p.id === 'nilescart') || projects[0];
  const edacleaner = projects.find((p) => p.id === 'edacleaner') || projects[1];

  return (
    <Section id="featured-projects" border="bottom" className="scroll-mt-16">
      <SectionHeading
        badge="Featured Case Studies"
        badgePulse
        title="Production Software Shipped for Real-World Demands"
        subtitle="A look under the hood of recent digital products I architected: a high-conversion e-commerce ecosystem and a security-focused enterprise desktop data application."
        align="left"
        action={
          <Button
            href="/projects"
            variant="outline"
            size="sm"
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            Explore All Case Studies
          </Button>
        }
      />

      <div className="space-y-12">
        {/* Project 1: NilesCart (Flagship Web & Mobile E-Commerce) */}
        <div className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 p-6 sm:p-10 shadow-lg backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Project Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 px-3 py-1 rounded-full">
                  Full-Stack Web &amp; Mobile Ecosystem
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                  {nilescart.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {nilescart.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {nilescart.summary}
              </p>

              {/* Business Problem & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800/60 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold">
                    The Business Challenge
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {nilescart.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800/60 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-bold">
                    The Engineering Solution
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {nilescart.solution}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 py-3 px-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200/80 dark:border-neutral-800/80 text-center">
                {nilescart.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white font-mono">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {nilescart.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-4">
                <Button
                  href={`/projects/${nilescart.slug}`}
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                >
                  Read Technical Case Study
                </Button>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400"
                >
                  Build a Similar Storefront →
                </Link>
              </div>
            </div>

            {/* Visual Representation (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 p-4 shadow-inner space-y-3">
                {/* Desktop Window preview */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="font-bold text-xs text-neutral-900 dark:text-white">
                      Next.js Web Storefront
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-semibold">
                      Live Sync
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center justify-between">
                      <span>Sub-100ms Screen Navigation</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">TanStack Query</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Design System Components</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">Radix UI + Tailwind</strong>
                    </div>
                  </div>
                </div>

                {/* Mobile App preview */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="font-bold text-xs text-neutral-900 dark:text-white">
                      React Native Mobile App
                    </span>
                    <span className="text-[10px] font-mono text-sky-500 font-semibold">
                      iOS &amp; Android
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center justify-between">
                      <span>Catalog Virtualization</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">Shopify FlashList</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deep-Link Payment Handshake</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">Server Verified</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project 2: edaCleaner (Flagship Custom Desktop Software) */}
        <div className="rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/40 p-6 sm:p-10 shadow-lg backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Project Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
                  Enterprise Desktop Software
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold">
                  {edacleaner.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {edacleaner.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {edacleaner.summary}
              </p>

              {/* Business Problem & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800/60 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold">
                    The Business Challenge
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {edacleaner.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800/60 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-bold">
                    The Engineering Solution
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {edacleaner.solution}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 py-3 px-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200/80 dark:border-neutral-800/80 text-center">
                {edacleaner.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white font-mono">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {edacleaner.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-4">
                <Button
                  href={`/projects/${edacleaner.slug}`}
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                >
                  Read Technical Case Study
                </Button>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-sky-600 dark:hover:text-sky-400"
                >
                  Discuss Custom Desktop Tools →
                </Link>
              </div>
            </div>

            {/* Visual Representation (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 p-4 shadow-inner space-y-3">
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="font-bold text-xs text-neutral-900 dark:text-white">
                      Strict Sandboxed IPC Bridge
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-semibold">
                      Zero Cloud Leakage
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center justify-between">
                      <span>Architecture Separation</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">Main ↔ Preload ↔ Renderer</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Offline Compliance</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">100% GDPR Safe</strong>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="font-bold text-xs text-neutral-900 dark:text-white">
                      Desktop Cross-Compilation
                    </span>
                    <span className="text-[10px] font-mono text-sky-500 font-semibold">
                      Electron Builder
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center justify-between">
                      <span>Installers Supported</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">macOS (.dmg), Windows (.exe), Linux</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Window State Reactive Store</span>
                      <strong className="text-neutral-800 dark:text-neutral-200">Zustand Client State</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
