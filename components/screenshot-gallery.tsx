'use client';

import * as React from 'react';
import Image from 'next/image';
import { ProjectScreenshot, ProjectDraftField } from '@/data/projects';
import { X, ZoomIn, ShieldAlert, Image as ImageIcon, Info, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScreenshotGalleryProps {
  screenshots: ProjectScreenshot[];
  draftFields?: ProjectDraftField[];
  projectTitle: string;
}

export function ScreenshotGallery({
  screenshots,
  draftFields,
  projectTitle,
}: ScreenshotGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState<ProjectScreenshot | null>(null);

  // Close modal on Escape key
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    }
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="space-y-6">
      {/* Actual Verified Screenshots & Assets Grid */}
      {screenshots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((shot, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setSelectedImage(shot)}
                className="relative aspect-video w-full bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center p-4 cursor-pointer overflow-hidden border-b border-neutral-100 dark:border-neutral-800/80"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedImage(shot);
                  }
                }}
                aria-label={`View full preview of ${shot.title}`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={shot.imagePath}
                    alt={`${shot.title} — ${shot.caption || 'Verified application interface preview'}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105 p-2"
                  />
                </div>

                {/* Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-neutral-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="p-2 rounded-full bg-white/90 dark:bg-neutral-900/90 text-neutral-900 dark:text-white shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>

                {/* Type Badge */}
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-900/80 text-white dark:bg-white/90 dark:text-neutral-900 shadow-sm backdrop-blur-sm">
                  {shot.type === 'brand-asset' ? 'Brand Asset' : 'Interface Asset'}
                </span>
              </div>

              {/* Caption & Title */}
              <div className="p-4 space-y-1">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                  {shot.title}
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {shot.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/30 text-center space-y-2">
          <ImageIcon className="w-8 h-8 text-neutral-400 mx-auto" />
          <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
            Interactive Architecture &amp; Device Mockups Available
          </h4>
          <p className="text-xs text-neutral-500 max-w-md mx-auto">
            Live technical architecture and device mockups are rendered in the project breakdown below.
          </p>
        </div>
      )}

      {/* Configurable Draft Fields & Confidentiality Transparency */}
      {draftFields && draftFields.length > 0 && (
        <div className="p-5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/40 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
            <Lock className="w-3.5 h-3.5 text-amber-500" />
            <span>Project Disclosure &amp; Asset Status</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {draftFields.map((field, fIdx) => (
              <div
                key={fIdx}
                className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/70 bg-white dark:bg-neutral-950/60 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">
                    {field.label}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/60">
                    {field.status}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {field.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accessible Fullscreen Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-image-title"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <div>
                <h3
                  id="modal-image-title"
                  className="text-sm font-bold text-neutral-900 dark:text-white"
                >
                  {selectedImage.title}
                </h3>
                <p className="text-[11px] text-neutral-500">
                  {projectTitle} • Verified Asset Preview
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Large Image */}
            <div className="relative aspect-video w-full bg-neutral-100 dark:bg-neutral-950 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-neutral-200/60 dark:border-neutral-800/60">
              <Image
                src={selectedImage.imagePath}
                alt={`${selectedImage.title} — ${selectedImage.caption || 'Expanded application interface preview'}`}
                fill
                sizes="(max-width: 1200px) 100vw, 1024px"
                className="object-contain p-4"
                priority
              />
            </div>

            {/* Modal Caption */}
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
