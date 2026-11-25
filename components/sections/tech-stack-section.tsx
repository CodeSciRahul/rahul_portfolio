import * as React from 'react';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  Globe,
  Smartphone,
  Server,
  Monitor,
  Database,
  Bot,
  Cloud,
  CheckCircle2,
} from 'lucide-react';

export function TechStackSection() {
  const categories = [
    {
      title: 'Frontend & Web Development',
      icon: Globe,
      description: 'Engineered for sub-second load times, excellent SEO, and smooth conversion.',
      skills: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'HTML5 / CSS3'],
    },
    {
      title: 'Cross-Platform Mobile Apps',
      icon: Smartphone,
      description: 'Single codebase powering both Apple App Store and Google Play releases.',
      skills: ['React Native', 'Expo', 'Redux Toolkit', 'Zustand', 'Shopify FlashList', 'Mobile Telemetry'],
    },
    {
      title: 'Backend, REST APIs & Real-Time',
      icon: Server,
      description: 'Scalable MVC architectures, microservices, and duplex WebSocket clusters.',
      skills: ['Node.js', 'Express.js', 'Socket.io', 'RESTful APIs', 'JWT Authentication', 'MVC Architecture'],
    },
    {
      title: 'Custom Desktop Software',
      icon: Monitor,
      description: 'Secure, offline-first desktop tools for heavy data workflows and local privacy.',
      skills: ['Electron', 'Electron Vite', 'React', 'Zustand', 'IPC Bridge', 'Electron Builder'],
    },
    {
      title: 'Databases & Session Storage',
      icon: Database,
      description: 'Optimized schemas with indexes for high-throughput transactional queries.',
      skills: ['MongoDB', 'PostgreSQL', 'SQL', 'DynamoDB', 'Redis Caching'],
    },
    {
      title: 'AI Workflows & Integrations',
      icon: Bot,
      description: 'Automated intelligence pipelines connecting real-world business channels.',
      skills: ['OpenAI API (LLMs)', 'Twilio Voice SDK', 'Whisper (STT)', 'Speech Synthesis (TTS)', 'Stripe Payments'],
    },
    {
      title: 'Cloud Infrastructure & Tooling',
      icon: Cloud,
      description: 'Modern deployment and testing workflows ensuring reliable production releases.',
      skills: ['AWS (S3, SES, IAM)', 'Docker', 'Git / GitHub', 'Postman API Testing', 'Vercel'],
    },
  ];

  return (
    <Section pattern="dot" border="bottom">
      <SectionHeading
        badge="Technologies &amp; Expertise"
        title="Battle-Tested Tools Chosen for Maintainability"
        subtitle="I choose proven technologies with vibrant developer ecosystems, high performance, and minimal hosting overhead—never risky or short-lived experimental frameworks."
        align="left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {cat.title}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
