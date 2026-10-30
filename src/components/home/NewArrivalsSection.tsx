"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface NewArrivalsSectionProps {
  products: Product[];
  onQuickEnquire: (product: Product, selectedColor?: string, selectedSize?: string) => void;
}

export default function NewArrivalsSection({
  products,
  onQuickEnquire,
}: NewArrivalsSectionProps) {
  const newProducts = products.filter((p) => p.isNewArrival);

  return (
    <section id="new-arrivals" className="py-14 sm:py-20 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-px bg-[#B99A70]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B99A70]">
                JUST DROPPED
              </span>
            </div>
            <h2 className="text-fluid-h1 font-serif-brand font-medium text-[#111111]">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-[#38332E]/80 mt-1 max-w-xl">
              Fresh additions to the CADLEE atelier. Discover forward-thinking design harmonized with ergonomic comfort.
            </p>
          </div>

          <Link
            href="#catalogue"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#EAE8E3] text-xs font-semibold uppercase tracking-wider text-[#111111] hover:border-[#B99A70] hover:text-[#B99A70] transition-colors self-start md:self-auto shadow-sm"
          >
            <span>Explore All New Styles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid: 4 columns desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {newProducts.slice(0, 4).map((product) => (
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
