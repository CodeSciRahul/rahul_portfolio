'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DesktopMockup, MobileMockup } from './device-mockup';
import {
  MessageSquare,
  Send,
  Navigation,
  MapPin,
  CheckCheck,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowUpRight,
  Database,
  BarChart3,
  Bot,
  Zap,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

interface ProjectPreviewTab {
  id: string;
  name: string;
  tagline: string;
  category: string;
  slug: string;
  type: 'desktop' | 'mobile';
  metrics: { label: string; value: string }[];
  techStack: string[];
}

const previewTabs: ProjectPreviewTab[] = [
  {
    id: 'convoo',
    name: 'Convoo Real-Time Chat',
    tagline: 'Cross-platform duplex messaging with sub-80ms sync and authenticated handshakes',
    category: 'Real-Time & WebSockets',
    slug: 'convoo-realtime-chat',
    type: 'desktop',
    metrics: [
      { label: 'Latency', value: '< 80ms' },
      { label: 'Handshake', value: 'JWT Secured' },
      { label: 'Sync', value: 'Web & Mobile' },
    ],
    techStack: ['React.js', 'React Native', 'Node.js', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
  },
  {
    id: 'dwive',
    name: 'Dwive Mobility Platform',
    tagline: 'Multi-modal travel and bus booking application with live GPS telemetry tracking',
    category: 'Mobile Application',
    slug: 'dwive-mobility-booking-platform',
    type: 'mobile',
    metrics: [
      { label: 'Tracking', value: 'Live Telemetry' },
      { label: 'Platform', value: 'iOS & Android' },
      { label: 'Booking', value: 'Instant Confirm' },
    ],
    techStack: ['React Native', 'TypeScript', 'Geo-Location', 'REST APIs', 'Postman'],
  },
  {
    id: 'pwev',
    name: 'Pwev Learning & Community',
    tagline: 'Interactive EdTech platform with mentor assessments and freelance project discovery',
    category: 'Full-Stack & Mobile',
    slug: 'pwev-learning-community-platform',
    type: 'desktop',
    metrics: [
      { label: 'Modules', value: 'Interactive' },
      { label: 'Assessments', value: 'Automated' },
      { label: 'Community', value: 'Real-Time' },
    ],
    techStack: ['React Native', 'Next.js', 'Express.js', 'MongoDB', 'REST APIs'],
  },
];

export function ProjectPreviewInteractive() {
  const [activeTab, setActiveTab] = React.useState<string>('convoo');

  const currentProject = previewTabs.find((p) => p.id === activeTab) || previewTabs[0];

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 max-w-xl mx-auto">
        {previewTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                isActive
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Interactive Mockup Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Mockup Display (7 cols) */}
        <div className="lg:col-span-7">
          {currentProject.id === 'convoo' && (
            <DesktopMockup
              title="Convoo — Live Messenger Client"
              url="wss://socket.convoo.app/channels/dev-chat"
              statusBadge="Connected • 38ms"
            >
              {/* Convoo Web Mockup UI */}
              <div className="grid grid-cols-12 h-[380px] bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-white font-sans text-xs">
                {/* Sidebar */}
                <div className="col-span-4 border-r border-neutral-200/80 dark:border-neutral-800/80 p-3 space-y-2 hidden sm:block">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                    Active Channels
                  </div>
                  <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200/80 dark:border-sky-800/80 font-semibold flex items-center justify-between text-sky-700 dark:text-sky-300">
                    <span># general-engineering</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
                    <span># mobile-releases</span>
                    <span className="text-[10px] text-neutral-400">3m</span>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
                    <span># founders-sync</span>
                    <span className="text-[10px] text-neutral-400">1h</span>
                  </div>
                </div>

                {/* Main Chat Area */}
                <div className="col-span-12 sm:col-span-8 flex flex-col justify-between p-4 bg-white dark:bg-neutral-900/30">
                  {/* Messages Stream */}
                  <div className="space-y-3 overflow-y-auto">
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                        AK
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">Alex (CTO)</span>
                          <span className="text-[10px] text-neutral-400">10:42 AM</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-800 dark:text-neutral-200 max-w-sm">
                          Rahul, did the WebSocket handshake verification pass on the mobile client?
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 justify-end">
                      <div className="space-y-0.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] text-neutral-400">10:43 AM</span>
                          <span className="font-bold text-xs text-sky-600 dark:text-sky-400">Rahul (You)</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-sky-600 text-white text-xs max-w-sm text-left">
                          Yes, verified with sub-50ms latency across both React web and React Native iOS builds. Room isolation is active.
                        </div>
                        <div className="flex items-center justify-end gap-1 text-[10px] text-neutral-400 pt-0.5">
                          <span>Delivered</span>
                          <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
                    <div className="flex-1 px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-xs">
                      Type your message...
                    </div>
                    <button className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </DesktopMockup>
          )}

          {currentProject.id === 'dwive' && (
            <div className="flex justify-center">
              <MobileMockup appName="Dwive Mobility">
                {/* Dwive Mobile App UI */}
                <div className="p-4 space-y-4 text-neutral-900 dark:text-white">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Dwive Mobility</div>
                      <div className="text-sm font-extrabold">Active Trip • Bus #402</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Live Telemetry
                    </span>
                  </div>

                  {/* Route & Map Card */}
                  <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>Noida Sector-49</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Delhi Airport (T3)</span>
                    </div>

                    {/* Progress tracking line */}
                    <div className="relative pt-2 pb-1">
                      <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full w-[68%]" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono mt-1.5">
                        <span>Departed 08:30</span>
                        <span className="text-emerald-500 font-bold">ETA: 14 mins</span>
                      </div>
                    </div>
                  </div>

                  {/* Telemetry data grid */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <div className="text-[10px] text-neutral-400 font-mono">Current Speed</div>
                      <div className="font-bold text-sm text-neutral-900 dark:text-white mt-0.5">58 km/h</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                      <div className="text-[10px] text-neutral-400 font-mono">GPS Precision</div>
                      <div className="font-bold text-sm text-emerald-500 mt-0.5">± 2.4 meters</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <div className="w-full py-2.5 rounded-xl bg-sky-600 text-white font-semibold text-xs text-center shadow-md">
                      Contact Driver &amp; Support
                    </div>
                  </div>
                </div>
              </MobileMockup>
            </div>
          )}

          {currentProject.id === 'pwev' && (
            <DesktopMockup
              title="Pwev — Interactive Learning & Assessment"
              url="https://app.pwev.org/dashboard"
              statusBadge="Active Cohort"
            >
              <div className="p-6 bg-white dark:bg-neutral-950 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                      Full-Stack Engineering Assessment Module
                    </h4>
                    <p className="text-xs text-neutral-500">React Native &amp; RESTful API Mastery</p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold">
                    Score: 94 / 100
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
                    <div className="text-[10px] text-neutral-400">Interactive Lessons</div>
                    <div className="text-lg font-extrabold text-neutral-900 dark:text-white mt-0.5">24 / 24</div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
                    <div className="text-[10px] text-neutral-400">Mentor Code Reviews</div>
                    <div className="text-lg font-extrabold text-neutral-900 dark:text-white mt-0.5">12</div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center">
                    <div className="text-[10px] text-neutral-400">Freelance Bids</div>
                    <div className="text-lg font-extrabold text-neutral-900 dark:text-white mt-0.5">Verified</div>
                  </div>
                </div>
              </div>
            </DesktopMockup>
          )}
        </div>

        {/* Project Meta Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 mb-3">
              <span>{currentProject.category}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {currentProject.name}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {currentProject.tagline}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 py-3 px-4 rounded-xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 text-center">
            {currentProject.metrics.map((m, idx) => (
              <div key={idx}>
                <div className="text-sm font-extrabold text-neutral-900 dark:text-neutral-100 font-mono">
                  {m.value}
                </div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Technologies &amp; Architecture
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Link */}
          <div className="pt-2">
            <Link
              href={`/projects/${currentProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>Read Full Architectural Case Study</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
