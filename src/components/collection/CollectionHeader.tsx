"use client";

import { Gift } from "lucide-react";
import { useTranslations } from "next-intl";

export type CollectionHeaderProps = {
  title: string;
  badgeLabel?: string;
  description?: string;
};

export default function CollectionHeader({
  title,
  badgeLabel,
  description,
}: CollectionHeaderProps) {
  return (
    <section
      id="collection-header"
      className="text-white relative overflow-hidden bg-header"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(10, 92, 79, 0.95) 0%, rgba(12, 133, 137, 0.85) 100%)`,
      }}>
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-10 p-4 opacity-10 pointer-events-none" aria-hidden>
        <Gift className="w-20 h-20 text-white transform -rotate-12" />
      </div>

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="min-w-0">
          {badgeLabel && (
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <Gift className="w-3.5 h-3.5 shrink-0" aria-hidden />
              {badgeLabel}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans tracking-tight">{title}</h1>
          {description && (
            <p className="text-white/90 text-lg max-w-2xl leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
