"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CadleeLogo from "@/components/brand/CadleeLogo";
import { useData } from "@/context/DataContext";

export default function BrandStory() {
  const { settings } = useData();
  const story = settings.brandStory;

  return (
    <section className="py-16 sm:py-24 bg-transparent border-b border-[#EAE8E3] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Imagery side: 100% handcrafted shoemaking & leather craft */}
          <div className="lg:col-span-6 relative z-10">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-[#EAE8E3] shadow-lg bg-[#FAF9F6]">
              <Image
                src={story.image || "/images/brand/brand-story.jpg"}
                alt="CADLEE Footwear Craftsmanship and Workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Brand Mark Card */}
            <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:right-6 bg-[#111111] text-white p-4 sm:p-6 rounded-xl shadow-xl max-w-[220px] sm:max-w-[260px] border border-[#25211E]">
              <div className="flex items-center gap-3 mb-2">
                <CadleeLogo variant="emblem" theme="light" width={28} height={42} showLink={false} />
                <span className="text-[11px] font-bold tracking-widest text-[#B99A70] uppercase">
                  {story.badgeTitle || "CADLEE® FOOTWEAR"}
                </span>
              </div>
              <p className="text-[11px] text-[#D9D0C3] leading-snug">
                {story.badgeDescription || "Designed for everyday elegance, constructed for enduring stride comfort."}
              </p>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 pt-6 lg:pt-0 relative z-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#B99A70]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B99A70]">
                {story.tagline}
              </span>
            </div>

            <h2 className="text-fluid-h1 font-serif-brand font-medium text-[#111111] mb-5 leading-tight">
              {story.title}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#38332E]/85 leading-relaxed font-light mb-8">
              {story.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F4F3F0] mb-8">
              {story.pillars.map((pillar, idx) => (
                <div key={idx}>
                  <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1">
                    • {pillar.title}
                  </h4>
                  <p className="text-[11px] text-[#38332E]/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B99A70] hover:text-[#111111] transition-all shadow-md group"
              >
                <span>Explore Full Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
