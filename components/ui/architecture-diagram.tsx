'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  Globe,
  Smartphone,
  Cpu,
  Layers,
  Database,
  Radio,
  Lock,
  Zap,
  Bot,
  CreditCard,
  PhoneCall,
  CheckCircle2,
  Activity,
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  name: string;
  category: 'Clients' | 'Gateway' | 'Integrations' | 'Persistence';
  tech: string;
  protocol: string;
  latency: string;
  status: 'Live' | 'Operational' | 'High Performance';
  description: string;
}

const architectureNodes: ArchitectureNode[] = [
  {
    id: 'web-client',
    name: 'Next.js 16 Web Client',
    category: 'Clients',
    tech: 'React 19 • App Router • Tailwind v4',
    protocol: 'HTTPS / WSS Duplex',
    latency: 'Sub-40ms TTFB',
    status: 'Operational',
    description: 'Server Components with minimal client boundaries, zero hydration errors, and edge-cached rendering.',
  },
  {
    id: 'mobile-client',
    name: 'React Native Mobile',
    category: 'Clients',
    tech: 'React Native • TypeScript • Redux / Zustand',
    protocol: 'WSS / Native Telemetry',
    latency: '60 FPS Native UI',
    status: 'Operational',
    description: 'Cross-platform iOS and Android codebase with offline queueing and background geolocation tracking.',
  },
  {
    id: 'api-gateway',
    name: 'Socket.io & REST Gateway',
    category: 'Gateway',
    tech: 'Node.js • Express • JWT Auth • Socket.io Cluster',
    protocol: 'Duplex Event Streams',
    latency: '< 80ms Sync',
    status: 'Live',
    description: 'Authenticated connection pool verifying JWTs on initial handshake with room-level broadcast isolation.',
  },
  {
    id: 'ai-integrations',
    name: 'Twilio Voice & OpenAI Pipeline',
    category: 'Integrations',
    tech: 'OpenAI LLMs • Whisper STT • ElevenLabs TTS • Twilio SDK',
    protocol: 'Streaming WebSockets',
    latency: '< 650ms Voice Turnaround',
    status: 'Operational',
    description: 'Bi-directional audio streaming pipeline bridging phone networks directly to LLM speech inference.',
  },
  {
    id: 'stripe-services',
    name: 'Stripe Payment & Webhook Engine',
    category: 'Integrations',
    tech: 'Stripe API • Signature Verification • Event Queue',
    protocol: 'Cryptographic Webhooks',
    latency: '100% Idempotent',
    status: 'Operational',
    description: 'Subscription lifecycle management, idempotent webhook reconciliation, and automated invoice delivery.',
  },
  {
    id: 'database-layer',
    name: 'MongoDB & PostgreSQL Stores',
    category: 'Persistence',
    tech: 'MongoDB Atlas • PostgreSQL • Redis Cache',
    protocol: 'Indexed Connection Pool',
    latency: '< 25ms Query P95',
    status: 'High Performance',
    description: 'Partitioned collections, indexed conversation queries, and sub-millisecond Redis session caching.',
  },
];

export function ArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = React.useState<ArchitectureNode>(architectureNodes[2]);
  const prefersReduced = useReducedMotion();

  return (
    <div className="rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/50 p-6 lg:p-8 backdrop-blur-md">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/70 dark:border-neutral-800/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              System Architecture &amp; Data Pipeline
            </span>
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
            Production Distributed Architecture
          </h3>
        </div>

        {/* Live telemetry pill */}
        <div className="flex items-center gap-3 text-xs font-mono bg-white dark:bg-neutral-950 px-3.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 shrink-0">
          <Activity className="w-4 h-4 text-sky-500 animate-pulse" />
          <span className="text-neutral-600 dark:text-neutral-400">
            Selected Node: <strong className="text-sky-600 dark:text-sky-400">{selectedNode.name}</strong>
          </span>
        </div>
      </div>

      {/* Visual Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {architectureNodes.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={cn(
                'text-left p-4 rounded-xl border transition-all duration-200 select-none relative overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                isSelected
                  ? 'border-sky-500 bg-white dark:bg-neutral-900 shadow-md ring-1 ring-sky-500/20'
                  : 'border-neutral-200 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-950/40 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900/60'
              )}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                  {node.category}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-mono px-2 py-0.5 rounded-full font-medium',
                    isSelected
                      ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  )}
                >
                  {node.latency}
                </span>
              </div>

              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {node.name}
              </div>

              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                {node.tech}
              </div>

              {/* Active selection dot */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-sky-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive Panel */}
      <div className="p-4 sm:p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-950/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              {selectedNode.category} Specification
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-xs font-mono text-neutral-500">{selectedNode.protocol}</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
            {selectedNode.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="text-[10px] uppercase text-neutral-400">Protocol</div>
            <div className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedNode.protocol}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-neutral-400">Benchmark</div>
            <div className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedNode.latency}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
