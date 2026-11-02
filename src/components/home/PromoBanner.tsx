import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PromoBannerProps {
  tagline?: string;
  heading: string;
  subheading: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageSrc: string;
  reverse?: boolean;
}

export default function PromoBanner({
  tagline = "THE ART OF REFINED STRIDES",
  heading = "A PERFECT FIT FOR EVERY OCCASION.",
  subheading = "From morning boardroom presentations to evening soirees, discover shoes handcrafted with cushioned poise and enduring elegance.",
  ctaText = "EXPLORE MEN",
  ctaLink = "#categories",
  secondaryCtaText = "EXPLORE WOMEN",
  secondaryCtaLink = "#categories",
  imageSrc = "/images/banners/promo-occasion.jpg",
  reverse = false,
}: PromoBannerProps) {
  return (
    <section className="relative z-10 w-full bg-[#111111] overflow-hidden my-4 sm:my-8">
      <div className="relative min-h-[380px] sm:min-h-[460px] md:min-h-[520px] w-full flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={imageSrc}
            alt={heading}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle Dark Vignette & Gradient for text legibility */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 ${
              reverse
                ? "sm:bg-gradient-to-l sm:from-black/90 sm:via-black/60 sm:to-transparent"
                : "sm:bg-gradient-to-r sm:from-black/90 sm:via-black/60 sm:to-transparent"
            }`}
          />
        </div>

        {/* Content Box */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16">
          <div className={`max-w-xl text-white ${reverse ? "sm:ml-auto text-left" : "text-left"}`}>
            {tagline && (
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-[#B99A70]" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#B99A70] uppercase">
                  {tagline}
                </span>
              </div>
            )}

            <h2 className="text-fluid-h1 font-serif-brand font-medium text-white mb-3 sm:mb-4 drop-shadow-sm leading-tight">
              {heading}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#D9D0C3] mb-6 sm:mb-8 font-light max-w-md leading-relaxed">
              {subheading}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-[#FFFFFF] text-[#111111] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#B99A70] hover:text-white transition-all shadow-md group"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {secondaryCtaText && (
                <Link
                  href={secondaryCtaLink || "#"}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-black/40 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold tracking-wider uppercase border border-white/30 hover:border-[#B99A70] hover:text-[#B99A70] transition-all"
                >
                  <span>{secondaryCtaText}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

