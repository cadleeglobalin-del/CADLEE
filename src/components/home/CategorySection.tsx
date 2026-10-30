"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryItem } from "@/types";

interface CategorySectionProps {
  categories: CategoryItem[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const [activeGender, setActiveGender] = useState<"men" | "women" | "kids">("men");

  const filteredCategories = categories.filter((c) => c.gender === activeGender);

  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#B99A70]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B99A70]">
                CURATED SELECTIONS
              </span>
            </div>
            <h2 className="text-fluid-h1 font-serif-brand font-medium text-[#111111]">
              Shop By Category
            </h2>
            <p className="text-xs sm:text-sm text-[#38332E]/80 mt-1 max-w-xl">
              Explore meticulously engineered footwear crafted for every setting — from executive boardrooms to leisurely weekend strolls.
            </p>
          </div>

          {/* Gender Tabs */}
          <div className="inline-flex p-1 bg-[#FFFFFF] border border-[#EAE8E3] rounded-full self-start md:self-auto shadow-sm">
            {(["men", "women", "kids"] as const).map((gender) => (
              <button
                key={gender}
                onClick={() => setActiveGender(gender)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all ${
                  activeGender === gender
                    ? "bg-[#111111] text-[#FFFFFF] shadow-sm"
                    : "text-[#38332E] hover:text-[#B99A70]"
                }`}
              >
                {gender === "men" ? "MEN" : gender === "women" ? "WOMEN" : "KIDS"}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {filteredCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`#products-${cat.slug}`}
              className="group relative flex flex-col bg-[#FFFFFF] rounded-lg overflow-hidden border border-[#EAE8E3] hover:border-[#B99A70] hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container with zoom */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#F4F3F0]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover indicator */}
                <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/90 text-[#111111] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B99A70]" />
                </span>
              </div>

              {/* Card Meta */}
              <div className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[#111111] uppercase tracking-wider group-hover:text-[#B99A70] transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-[#38332E]/60 mt-1 uppercase tracking-widest">
                    {cat.itemCount} Designs
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#F4F3F0] hidden sm:block">
                  <span className="text-[10px] font-semibold text-[#B99A70] uppercase tracking-wider">
                    EXPLORE →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
