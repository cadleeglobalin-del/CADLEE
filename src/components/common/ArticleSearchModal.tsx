"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Search, X, MessageCircle, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { Product } from "@/types";

interface ArticleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ArticleSearchModal({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}: ArticleSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input on modal open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchTerm("");
    }
  }, [isOpen]);

  // Clean string helper for case-insensitive and hyphen-insensitive matching
  const normalize = (str: string) => str.toLowerCase().replace(/[\s\-_]/g, "");

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const normQuery = normalize(searchTerm);

    return products.filter((p) => {
      const matchArt = normalize(p.articleNumber).includes(normQuery);
      const matchName = normalize(p.name).includes(normQuery);
      const matchSub = normalize(p.subcategory).includes(normQuery);
      const matchCat = normalize(p.category).includes(normQuery);
      return matchArt || matchName || matchSub || matchCat;
    });
  }, [searchTerm, products]);

  if (!isOpen) return null;

  const sampleSearches = ["CD-1025", "CD-1082", "CD-2041", "CD-5088", "Oxford", "Sneaker", "Heel"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#EAE8E3] overflow-hidden z-10 flex flex-col max-h-[85vh] animate-fadeIn">
        {/* Search Input Box */}
        <div className="p-4 sm:p-5 border-b border-[#EAE8E3] bg-[#FAF9F6]">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B99A70] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Article Number & Catalogue Search
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#38332E] hover:bg-[#EAE8E3] transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#B99A70] absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Article Number (e.g. CD1025, CD-1082) or product name..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-[#D9D0C3] focus:border-[#B99A70] focus:ring-2 focus:ring-[#B99A70]/20 text-sm sm:text-base text-[#111111] placeholder:text-[#38332E]/40 outline-none transition-all shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 p-1 rounded-full text-[#38332E]/60 hover:text-[#111111]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            <span className="text-[11px] text-[#38332E]/60 mr-1">Try searching:</span>
            {sampleSearches.map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => setSearchTerm(sample)}
                className="px-2 py-0.5 rounded bg-white border border-[#EAE8E3] text-[11px] font-mono text-[#38332E] hover:border-[#B99A70] hover:text-[#B99A70] transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1">
          {searchTerm.trim() === "" ? (
            <div className="text-center py-10 px-4 text-[#38332E]/60">
              <Search className="w-10 h-10 text-[#D9D0C3] mx-auto mb-3" />
              <p className="text-sm font-medium text-[#111111]">Search by Article Number or Style</p>
              <p className="text-xs text-[#38332E]/70 mt-1 max-w-sm mx-auto">
                Every CADLEE® pair has a distinct article number printed on the box and catalogue. Type it above for instantaneous lookup.
              </p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#38332E]/70 px-1 mb-1">
                <span>Found <strong>{filteredProducts.length}</strong> matching style{filteredProducts.length > 1 ? "s" : ""}</span>
                <span className="text-[11px]">Click a pair to check sizes & enquire</span>
              </div>

              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="group flex items-center gap-3 sm:gap-4 p-3 rounded-xl border border-[#EAE8E3] hover:border-[#B99A70] hover:bg-[#FAF9F6] transition-all cursor-pointer shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-[#F7F5F0] shrink-0 border border-[#EAE8E3]">
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-[#111111] text-white text-[10px] font-mono font-semibold">
                        ART: {product.articleNumber}
                      </span>
                      <span className="text-[11px] text-[#38332E]/60 uppercase tracking-wider">
                        {product.category} • {product.subcategory}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-semibold text-[#111111] group-hover:text-[#B99A70] transition-colors truncate">
                      {product.name}
                    </h4>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs sm:text-sm font-bold text-[#111111]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-[#38332E]/50 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Icon */}
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-semibold group-hover:bg-[#B99A70] group-hover:text-[#111111] transition-colors">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline">Enquire</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4 text-[#38332E]">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <p className="text-sm font-semibold text-[#111111]">
                No footwear found for &ldquo;{searchTerm}&rdquo;
              </p>
              <p className="text-xs text-[#38332E]/70 mt-1 max-w-sm mx-auto">
                Check the spelling or try searching by category such as &ldquo;Sneaker&rdquo;, &ldquo;Oxford&rdquo;, or &ldquo;Sandals&rdquo;.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-xs font-semibold text-[#B99A70] underline hover:text-[#111111]"
                >
                  Clear search and view suggestions
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#FAF9F6] border-t border-[#EAE8E3] text-center text-[11px] text-[#38332E]/60">
          Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D9D0C3] font-mono text-[10px]">ESC</kbd> to close search at any time.
        </div>
      </div>
    </div>
  );
}

