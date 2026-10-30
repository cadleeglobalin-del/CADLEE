"use client";

import React from "react";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface TrendingSectionProps {
  products: Product[];
  onQuickEnquire: (product: Product, selectedColor?: string, selectedSize?: string) => void;
}

export default function TrendingSection({
  products,
  onQuickEnquire,
}: TrendingSectionProps) {
  const trendingProducts = products.filter((p) => p.isTrending);

  return (
    <section id="trending" className="py-14 sm:py-20 bg-[#FFFFFF] border-b border-[#EAE8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#B99A70]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B99A70] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#B99A70]" />
                POPULAR DEMAND
              </span>
            </div>
            <h2 className="text-fluid-h1 font-serif-brand font-medium text-[#111111]">
              Trending Right Now
            </h2>
            <p className="text-xs sm:text-sm text-[#38332E]/80 mt-1 max-w-xl">
              The footwear getting the highest enquiries and repeat styling requests from our discerning clientele.
            </p>
          </div>

          <Link
            href="#catalogue"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B99A70] hover:text-[#111111] transition-all self-start md:self-auto shadow-sm"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid: 4 columns desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {trendingProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickEnquire={onQuickEnquire}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

