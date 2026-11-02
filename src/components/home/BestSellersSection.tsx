"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Award, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface BestSellersSectionProps {
  products: Product[];
  onQuickEnquire: (product: Product, selectedColor?: string, selectedSize?: string) => void;
}

export default function BestSellersSection({
  products,
  onQuickEnquire,
}: BestSellersSectionProps) {
  const [filterGender, setFilterGender] = useState<"all" | "men" | "women">("all");

  const bestSellerProducts = products.filter((p) => {
    if (!p.isBestSeller) return false;
    if (filterGender === "all") return true;
    return p.category === filterGender;
  });

  return (
    <section id="bestsellers" className="py-14 sm:py-20 bg-transparent border-b border-[#EAE8E3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#B99A70]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B99A70]">
                ICONIC SILHOUETTES
              </span>
            </div>
            <h2 className="text-fluid-h1 font-serif-brand font-medium text-[#111111]">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-[#38332E]/80 mt-1 max-w-xl">
              Our most celebrated pairs — prized for unmatched all-day comfort, exquisite materials, and enduring appeal.
            </p>
          </div>

          {/* Quick Filter Pill Tabs */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-[#F7F5F0] border border-[#EAE8E3] rounded-full text-xs">
              {(["all", "men", "women"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterGender(tab)}
                  className={`px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider text-[11px] transition-all ${
                    filterGender === tab
                      ? "bg-[#111111] text-white shadow-sm"
                      : "text-[#38332E] hover:text-[#B99A70]"
                  }`}
                >
                  {tab === "all" ? "All Styles" : tab === "men" ? "Men" : "Women"}
                </button>
              ))}
            </div>

            <Link
              href="#catalogue"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#B99A70] uppercase tracking-wider ml-3 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Products Grid: 4 columns on desktop, 2-3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 relative z-10">
          {bestSellerProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickEnquire={onQuickEnquire}
            />
          ))}
        </div>

        {/* View All Mobile Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="#catalogue"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md border border-[#111111] text-[#111111] text-xs font-semibold uppercase tracking-wider hover:bg-[#111111] hover:text-white transition-colors"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

