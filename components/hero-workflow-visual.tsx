'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Globe,
  Smartphone,
  Cpu,
  Monitor,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Radio,
  ShieldCheck,
  ArrowRight,
  Database,
  BarChart3,
  Bot,
  Zap,
} from 'lucide-react';

interface WorkflowTab {
  id: string;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

const tabs: WorkflowTab[] = [
  {
    id: 'ecommerce',
    name: 'Web & Mobile Storefront',
    badge: 'NilesCart Platform',
    icon: ShoppingBag,
    title: 'Multi-Platform E-Commerce Ecosystem',
    subtitle: 'Unified Next.js web storefront & native React Native mobile app with synchronized cart and secure checkout.',
  },
  {
    id: 'desktop',
    name: 'Desktop Data Software',
    badge: 'edaCleaner Software',
    icon: Monitor,
    title: 'Offline-First Electron Application',
    subtitle: 'Cross-platform desktop application for automated dataset analysis, missing value detection, and local cleansing.',
  },
  {
    id: 'ai-voice',
    name: 'AI Agent & Automation',
    badge: 'W3 Dev Production Pipeline',
    icon: Bot,
    title: 'Twilio + OpenAI Real-Time Pipeline',
    subtitle: 'Bi-directional voice conversation engine integrating speech-to-text, LLM decision logic, and speech synthesis.',
  },
  {
    id: 'realtime',
    name: 'Real-Time Systems',
    badge: 'Convoo Engine',
    icon: Radio,
    title: 'High-Throughput WebSocket Duplexing',
    subtitle: 'Sub-80ms message synchronization across web and mobile clients with JWT-authenticated connection pools.',
  },
];

export function HeroWorkflowVisual() {
  const [activeTab, setActiveTab] = React.useState<string>('ecommerce');

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="w-full rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-900/60 backdrop-blur-xl shadow-2xl p-4 sm:p-6 lg:p-8 overflow-hidden relative">
      {/* Subtle ambient spotlight */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-sky-500/10 dark:bg-sky-500/15 blur-3xl rounded-full"
        aria-hidden="true"
      />

      {/* Workflow Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-neutral-200/80 dark:border-neutral-800/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                isSelected
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-neutral-800'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workflow Viewport */}
      <div className="pt-6">
        {/* Tab 1: NilesCart Web & Mobile Storefront */}
        {activeTab === 'ecommerce' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Desktop Window Preview */}
            <div className="lg:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950 overflow-hidden shadow-lg">
              {/* Window Bar */}
              <div className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-neutral-500 truncate">
                    nilescart.store/checkout
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  200 OK • Live Sync
                </span>
              </div>

              {/* Window Content: NilesCart Interface */}
              <div className="p-5 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80">
                  <div>
                    <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                      NilesCart Storefront
                    </span>
                    <p className="text-[11px] text-neutral-500">Next.js 16 • Cart Synchronized</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    2 Items in Cart
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">Item 01</div>
                    <div className="font-bold text-neutral-900 dark:text-white">Premium Wireless ANC Headset</div>
                    <div className="font-mono text-sky-600 dark:text-sky-400 font-bold">$189.00</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">Item 02</div>
                    <div className="font-bold text-neutral-900 dark:text-white">Minimalist Desk Charging Mat</div>
                    <div className="font-mono text-sky-600 dark:text-sky-400 font-bold">$49.00</div>
                  </div>
                </div>

                {/* Checkout Bar */}
                <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 flex items-center justify-between">
                  <span className="text-neutral-700 dark:text-neutral-300 font-semibold">
                    Subtotal: <strong className="text-neutral-900 dark:text-white font-mono">$238.00</strong>
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-sky-600 text-white font-semibold text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Checkout
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Mobile Companion & Architecture Value */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                <span>Unified Web + Mobile Architecture</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                NilesCart Multi-Platform Platform
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                A single central REST API serving both the Next.js web customer portal and the native React Native mobile app. When customers add items on desktop, their mobile app updates instantly.
              </p>

              <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Deep-linked mobile payment verification callback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>60 FPS catalog scrolling with Shopify FlashList</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Sub-100ms screen transitions via TanStack Query</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: edaCleaner Desktop Software */}
        {activeTab === 'desktop' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Desktop Window Preview */}
            <div className="lg:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950 overflow-hidden shadow-lg">
              <div className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-neutral-500">
                    edaCleaner — Desktop Application (Electron)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                  100% Local Sandbox
                </span>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                  <div>
                    <span className="font-extrabold text-sm text-neutral-900 dark:text-white">
                      customer_churn_q3.csv (42,500 Rows)
                    </span>
                    <p className="text-[11px] text-neutral-500">Local Memory Processing • Zero Cloud Transmission</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Ready for ML Export
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="text-[10px] text-neutral-400 uppercase font-mono">Missing Values</div>
                    <div className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400 mt-1">100% Imputed</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="text-[10px] text-neutral-400 uppercase font-mono">Outliers Detected</div>
                    <div className="font-extrabold text-sm text-amber-500 mt-1">34 Filtered</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="text-[10px] text-neutral-400 uppercase font-mono">Processing Speed</div>
                    <div className="font-extrabold text-sm text-sky-600 dark:text-sky-400 mt-1">&lt; 1.2s</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 font-mono text-[11px] text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
                  <span>IPC Bridge Status: Secure Preload Sandboxed</span>
                  <span className="text-emerald-500 font-bold">Active</span>
                </div>
              </div>
            </div>

            {/* Right: Explanatory Content */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span>Enterprise Privacy &amp; Offline Speed</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                edaCleaner Desktop Application
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For organizations that handle proprietary data subject to GDPR or confidentiality policies. The entire analysis and cleansing pipeline runs locally on your workstation with zero external server exposure.
              </p>

              <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Cross-platform desktop installers for Mac, Windows, Linux</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Strict Electron security with sandboxed IPC architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Automated anomaly detection &amp; clean data export</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: AI Voice & Twilio Pipeline */}
        {activeTab === 'ai-voice' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950 p-5 space-y-4 text-xs shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <div className="font-extrabold text-sm text-neutral-900 dark:text-white">
                    Twilio Voice + OpenAI Real-Time Audio Agent
                  </div>
                  <p className="text-[11px] text-neutral-500">Live Phone Call Streaming • W3 Dev</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-mono">
                  Latency: 620ms Turnaround
                </span>
              </div>

              {/* Step Flow */}
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[10px]">1</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">Inbound Caller Stream</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">Twilio Media Stream</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[10px]">2</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">Whisper Speech-to-Text &amp; LLM Logic</span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">OpenAI API</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px]">3</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">Synthesized Audio Outbound Stream</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-500">Sub-Second Response</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                <span>Production AI Engineering</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Intelligent Voice &amp; Workflow Automation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Move beyond simple chatbots. Connect your business phone numbers and customer queues directly to intelligent LLM voice agents that understand caller intent, book appointments, and answer questions 24/7.
              </p>

              <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Real telephone audio streaming via Twilio SDK</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Automated lead qualification and CRM logging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Resilient fallback policies for noisy environments</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Convoo Real-Time Systems */}
        {activeTab === 'realtime' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950 p-5 space-y-4 text-xs shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <div className="font-extrabold text-sm text-neutral-900 dark:text-white">
                    Convoo Duplex WebSocket Cluster
                  </div>
                  <p className="text-[11px] text-neutral-500">Cross-Platform Web &amp; Mobile State Sync</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-mono">
                  Sync: &lt; 80ms P95
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 uppercase font-mono">WebSocket Handshake</div>
                  <div className="font-bold text-neutral-900 dark:text-white">JWT Authenticated</div>
                  <p className="text-[10px] text-neutral-500">Prevents unauthorized room eavesdropping</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-1">
                  <div className="text-[10px] text-neutral-400 uppercase font-mono">Database Query P95</div>
                  <div className="font-bold text-neutral-900 dark:text-white">Sub-50ms Indexed</div>
                  <p className="text-[10px] text-neutral-500">Cursor-based pagination across MongoDB</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-[11px] text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                <span>Room-based broadcast isolation for private and team channels</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">Active</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                <span>Real-Time Reliability</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Duplex Messaging &amp; Live Tracking
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Whether you are building live customer chat, interactive dashboards, collaborative whiteboards, or GPS telemetry maps, I engineer rock-solid WebSocket infrastructure that never drops state.
              </p>

              <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Instant multi-device state synchronization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Reliable offline message queueing and reconnection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero costly per-message SaaS vendor lock-in</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
