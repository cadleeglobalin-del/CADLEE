"use client";

import React from "react";
import Image from "next/image";

/**
 * BackgroundMovingBrand
 *
 * Continuous horizontal marquee moving from right to left in the website background.
 * - Stays fixed in height as the user scrolls (does not go up or down).
 * - Moves steadily from right to left across the screen.
 * - Width of each logo + name unit is exactly 1/2 the screen width (50vw).
 * - Luxury watermark in background (pointer-events-none, mix-blend-multiply).
 */
export default function BackgroundMovingBrand() {
  // 4 items per set (each 50vw + 10vw gap = 60vw * 4 = 240vw width per set)
  // Two identical sets translate -50% for a seamless infinite loop.
  const items = [0, 1, 2, 3];

  return (
    <>
      {/* Inline styles guaranteed to load and animate across all browsers without CSS purge */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes cadleeRightToLeftMove {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }

            .cadlee-moving-track {
              display: flex !important;
              width: max-content !important;
              will-change: transform !important;
              animation: cadleeRightToLeftMove 26s linear infinite !important;
            }
          `,
        }}
      />

      <aside
        aria-hidden="true"
        className="pointer-events-none select-none fixed top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden z-[0] opacity-[0.16]"
      >
        <div className="cadlee-moving-track">
          {/* Set 1 */}
          <div className="flex items-center gap-[10vw] pr-[10vw] shrink-0">
            {items.map((i) => (
              <div
                key={`s1-${i}`}
                className="w-[50vw] min-w-[50vw] max-w-[50vw] shrink-0 flex items-center justify-center"
              >
                <div className="relative w-full aspect-[430/116]">
                  <Image
                    src="/images/cadlee-logo-horizontal-dark.png"
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Set 2 (Identical duplicate for seamless continuous infinite motion) */}
          <div className="flex items-center gap-[10vw] pr-[10vw] shrink-0">
            {items.map((i) => (
              <div
                key={`s2-${i}`}
                className="w-[50vw] min-w-[50vw] max-w-[50vw] shrink-0 flex items-center justify-center"
              >
                <div className="relative w-full aspect-[430/116]">
                  <Image
                    src="/images/cadlee-logo-horizontal-dark.png"
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
