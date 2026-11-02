import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredCollections } from "@/data/mockData";

export default function FeaturedCollectionsSection() {
  return (
    <section id="collections" className="py-14 sm:py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 relative z-10">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="w-5 h-px bg-[#B99A70]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B99A70]">
              DESIGN PHILOSOPHIES
            </span>
            <span className="w-5 h-px bg-[#B99A70]" />
          </div>
          <h2 className="text-fluid-h1 font-serif-brand font-medium text-[#111111] mb-2">
            Featured Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#38332E]/80">
            Tailored footwear series engineered for specific lifestyles, formal aesthetics, and continuous comfort.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featuredCollections.map((col, index) => (
            <div
              key={col.id}
              className={`group relative z-10 overflow-hidden rounded-xl bg-[#111111] min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8 border border-[#EAE8E3] hover:border-[#B99A70] transition-all duration-500 shadow-md ${
                index === 0 ? "md:col-span-2 md:min-h-[420px]" : ""
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes={index === 0 ? "100vw" : "50vw"}
                  className="object-cover object-center opacity-75 group-hover:scale-105 group-hover:opacity-65 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              </div>

              {/* Text content */}
              <div className="relative z-10 max-w-xl text-white">
                <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#B99A70] uppercase mb-1.5">
                  {col.tag}
                </span>

                <h3 className="text-fluid-h2 font-serif-brand font-medium text-white mb-2 leading-tight">
                  {col.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#D9D0C3] mb-4 sm:mb-6 font-light line-clamp-2 max-w-md leading-relaxed">
                  {col.description}
                </p>

                <Link
                  href={col.link}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-white uppercase group-hover:text-[#B99A70] transition-colors"
                >
                  <span className="border-b border-white/50 group-hover:border-[#B99A70] pb-0.5">
                    EXPLORE COLLECTION
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

