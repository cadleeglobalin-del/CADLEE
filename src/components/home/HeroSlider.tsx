"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { HeroBanner } from "@/types";

interface HeroSliderProps {
  banners: HeroBanner[];
  autoplayInterval?: number;
}

export default function HeroSlider({
  banners,
  autoplayInterval = 5500,
}: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = banners.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [isPaused, totalSlides, autoplayInterval, nextSlide]);

  if (!banners || banners.length === 0) return null;

  return (
    <section
      aria-label="Featured Footwear Collections"
      className="relative z-10 w-full overflow-hidden bg-[#111111]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-[480px] sm:h-[560px] md:h-[640px] lg:h-[720px]">
        {banners.map((banner, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Desktop Image */}
              <div className="hidden sm:block absolute inset-0 w-full h-full">
                <Image
                  src={banner.desktopImage}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Mobile Image (Optimized portrait ratio) */}
              <div className="block sm:hidden absolute inset-0 w-full h-full">
                <Image
                  src={banner.mobileImage}
                  alt={banner.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Luxury Gradient Overlay for flawless text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/80 sm:via-black/45 sm:to-transparent" />

              {/* Slide Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div
                  className={`max-w-xl text-white py-12 ${
                    banner.alignment === "center"
                      ? "mx-auto text-center"
                      : banner.alignment === "right"
                      ? "ml-auto text-right"
                      : "text-left"
                  }`}
                >
                  {banner.tagline && (
                    <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                      <span className="w-6 h-px bg-[#B99A70]" />
                      <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#B99A70] uppercase">
                        {banner.tagline}
                      </span>
                    </div>
                  )}

                  <h1 className="text-fluid-hero font-serif-brand font-medium tracking-tight text-white mb-3 sm:mb-5 drop-shadow-sm">
                    {banner.title}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base text-[#D9D0C3] mb-6 sm:mb-8 font-light max-w-lg leading-relaxed">
                    {banner.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={banner.ctaLink}
                      className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#FFFFFF] text-[#111111] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#B99A70] hover:text-white transition-all shadow-md group"
                    >
                      <span>{banner.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="#categories"
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-black/40 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold tracking-wider uppercase border border-white/30 hover:border-[#B99A70] hover:text-[#B99A70] transition-all"
                    >
                      BROWSE CATEGORIES
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-[#B99A70] hover:text-[#111111] transition-all border border-white/10"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-[#B99A70] hover:text-[#111111] transition-all border border-white/10"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Slide Indicators / Progress Bars */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "w-8 sm:w-10 h-1.5 bg-[#B99A70]"
                : "w-2 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

