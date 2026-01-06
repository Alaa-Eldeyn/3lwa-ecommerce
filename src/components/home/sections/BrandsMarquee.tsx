"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const logos = [
  "/images/brands/Group.svg",
  "/images/brands/Vector.svg",
  "/images/brands/Vector-1.svg",
  "/images/brands/Vector-2.svg",
  "/images/brands/Vector-3.svg",
];

const BrandsMarquee = ({ speed = 20 }: { speed?: number }) => {
  const t = useTranslations("home.brands");
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const calculateRepeats = () => {
    return Array(20)
      .fill(null)
      .flatMap(() => logos);
  };

  return (
    <section dir="ltr" className="bg-gray-800 dark:bg-gray-950 p-4 lg:py-5">
      <div className="container mx-auto relative overflow-hidden">
        {/* Shadow gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-gray-800 dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-gray-800 dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div ref={wrapRef} className="relative w-full" aria-hidden={false}>
          <div
            className="marquee flex gap-12"
            style={
              {
                animationDuration: `${speed}s`,
              } as React.CSSProperties
            }>
            {calculateRepeats().map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="shrink-0 w-32 h-16 flex items-center justify-center"
                role="img"
                aria-label={`brand-${i % logos.length}`}>
                <Image
                  src={src}
                  alt={`brand ${i % logos.length}`}
                  width={160}
                  height={80}
                  className="object-contain w-32 h-16 filter grayscale opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          display: flex;
          align-items: center;
          animation-name: marqueeAnim;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        /* .marquee:hover {
          animation-play-state: paused;
        } */

        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
          }
        }

        @keyframes marqueeAnim {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default BrandsMarquee;
