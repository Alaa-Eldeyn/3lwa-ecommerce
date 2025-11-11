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

  const repeated = [...logos, ...logos, ...logos]

  return (
    <section className="bg-gray-800 dark:bg-gray-950 p-4 lg:py-6">
      <div className="container mx-auto overflow-hidden">
        <div
          ref={wrapRef}
          className="relative w-full"
          aria-hidden={false}
        >
          <div
            className="marquee ho-center gap-10"
            style={
              {
                animationDuration: `${speed}s`,
              } as React.CSSProperties
            }
          >
            {repeated.map((src, i) => (
              <div
                key={i}
                className="shrink-0 w-32 h-16 center"
                role="img"
                aria-label={`brand-${i % logos.length}`}
              >
                <Image
                  src={src}
                  alt={`brand ${i}`}
                  width={160}
                  height={80}
                  className="object-contain w-32 h-16 filter grayscale opacity-70 hover:opacity-100 transition"
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

        .marquee > :global(div) {
        }
      `}</style>
    </section>
  )
}

export default BrandsMarquee
