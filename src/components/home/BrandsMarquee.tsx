"use client"

import Image from "next/image"
import { useRef } from "react"

const logos = [
  "/images/brands/Group.svg",
  "/images/brands/Vector.svg",
  "/images/brands/Vector-1.svg",
  "/images/brands/Vector-2.svg",
  "/images/brands/Vector-3.svg",
]

const BrandsMarquee = ({ speed = 20 }: { speed?: number }) => {
  const wrapRef = useRef<HTMLDivElement | null>(null)

  const calculateRepeats = () => {
    return Array(10).fill(null).flatMap(() => logos)
  }

  return (
    <section className="bg-gray-800 dark:bg-gray-950 p-4 lg:py-6">
      <div className="container mx-auto overflow-hidden">
        <div
          ref={wrapRef}
          className="relative w-full"
          aria-hidden={false}
        >
          <div
            className="marquee flex gap-10"
            style={
              {
                animationDuration: `${speed}s`,
              } as React.CSSProperties
            }
          >
            {calculateRepeats().map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="shrink-0 w-32 h-16 flex items-center justify-center"
                role="img"
                aria-label={`brand-${i % logos.length}`}
              >
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

        .marquee:hover {
          animation-play-state: paused;
        }

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
  )
}

export default BrandsMarquee