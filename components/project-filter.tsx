'use client';

import * as React from 'react';
import { Link } from '@/i18n/routing';
import { ProjectItem } from '@/data/projects';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Layers, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectFilterProps {
  projects: ProjectItem[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  const categories = ['All', 'Web', 'Mobile', 'Desktop', 'E-commerce', 'AI'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(
          (p) =>
            p.category === selectedCategory ||
            p.subCategories?.includes(selectedCategory)
        );

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10" role="tablist">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === 'All'
              ? projects.length
              : projects.filter(
                  (p) =>
                    p.category === cat || p.subCategories?.includes(cat)
                ).length;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                isSelected
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-neutral-800'
              )}
            >
              <span>{cat}</span>
              <span
                className={cn(
                  'text-[10px] font-mono px-1.5 py-0.2 rounded-md',
                  isSelected
                    ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900'
                    : 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-500'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between rounded-3xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/50 p-7 hover:shadow-xl hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all duration-300 group"
          >
            <div className="space-y-4">
              {/* Category & Client Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {project.category}
                </span>
                {project.client && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium">
                    Client: {project.client}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-medium line-clamp-1">
                  {project.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed line-clamp-3 font-normal">
                {project.summary}
              </p>

              {/* Metrics preview */}
              <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800/60 text-center">
                {project.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
                      {m.value}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 text-neutral-400">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-400">
                {project.period}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors"
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
