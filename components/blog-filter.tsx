'use client';

import * as React from 'react';
import { Link } from '@/i18n/routing';
import { BlogPost } from '@/data/blog';
import {
  Calendar,
  Clock,
  ArrowUpRight,
  BookOpen,
  Search,
  Sparkles,
  FileText,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogFilterProps {
  posts: BlogPost[];
}

export function BlogFilter({ posts }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const categories = [
    'All',
    'Architecture',
    'AI & Automation',
    'Engineering Strategy',
    'Mobile Development',
    'Desktop Software',
    'E-commerce Architecture',
    'Developer Hiring',
  ];

  const filteredPosts = posts.filter((post) => {
    // Status check
    if (statusFilter === 'published' && post.status !== 'published') return false;
    if (statusFilter === 'draft' && post.status !== 'draft') return false;

    // Category check
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchTags = post.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchTags) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8">
      {/* Search & Status Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search articles by topic, keyword, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-xs select-none">
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-semibold transition-all',
              statusFilter === 'all'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            )}
          >
            All ({posts.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5',
              statusFilter === 'published'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Published ({posts.filter((p) => p.status === 'published').length})</span>
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5',
              statusFilter === 'draft'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Drafts ({posts.filter((p) => p.status === 'draft').length})</span>
          </button>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2" role="tablist">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count =
            cat === 'All'
              ? posts.length
              : posts.filter((p) => p.category === cat).length;

          if (count === 0 && cat !== 'All') return null;

          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
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

      {/* Filtered Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 p-6 hover:shadow-xl hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all duration-300 group"
            >
              <div>
                {/* Meta Top: Category, Read Time, and Status */}
                <div className="flex items-center justify-between gap-2 text-xs text-neutral-400 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider text-[10px]">
                      {post.category}
                    </span>
                    {post.status === 'draft' ? (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        Draft Blueprint
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        Published
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tag Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:underline"
                >
                  <span>{post.status === 'draft' ? 'Read Draft Blueprint' : 'Read Full Article'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <span className="text-[11px] font-mono text-neutral-400">
                  {post.publishedAt}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/30 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-neutral-400 mx-auto" />
          <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
            No Articles Found
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            No articles match your current search query or filter selection. Try adjusting your search keywords.
          </p>
        </div>
      )}
    </div>
  );
}
