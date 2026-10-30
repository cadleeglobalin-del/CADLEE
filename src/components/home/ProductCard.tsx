"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Eye, Check } from "lucide-react";
import { Product } from "@/types";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  onQuickEnquire: (product: Product, selectedColor?: string, selectedSize?: string) => void;
}

export default function ProductCard({ product, onQuickEnquire }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const isFavorited = isInWishlist(product.id);

  // Default display image
  const displayImage = hoveredImage || product.mainImage;

  return (
    <div className="group relative bg-[#FFFFFF] rounded-lg border border-[#EAE8E3] hover:border-[#B99A70] hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badges Container */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.isTrending && (
          <span className="bg-[#111111] text-[#FFFFFF] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm shadow-sm">
            TRENDING
          </span>
        )}
        {product.isNewArrival && !product.isTrending && (
          <span className="bg-[#B99A70] text-[#FFFFFF] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm shadow-sm">
            NEW
          </span>
        )}
        {product.discountPercent && (
          <span className="bg-[#EAE8E3] text-[#38332E] text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Heart Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        aria-label={isFavorited ? "Remove from Wishlist" : "Save to Wishlist"}
        className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
          isFavorited
            ? "bg-rose-50 text-rose-500 scale-110"
            : "bg-white/80 text-[#38332E] hover:text-rose-500 hover:bg-white"
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
      </button>

      {/* Image Gallery Wrapper */}
      <div
        className="relative aspect-square w-full bg-[#FAF9F6] overflow-hidden cursor-pointer"
        onMouseEnter={() => {
          if (product.images.length > 1) {
            setHoveredImage(product.images[1]);
          }
        }}
        onMouseLeave={() => setHoveredImage(null)}
        onClick={() => onQuickEnquire(product, currentColor?.name)}
      >
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View Overlay on Desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickEnquire(product, currentColor?.name);
            }}
            className="w-full py-2 px-3 bg-[#111111]/90 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 hover:bg-[#B99A70] hover:text-[#111111] transition-colors shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View & Enquire</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Article Number (Mandatory Feature Display) */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#F7F5F0] border border-[#EAE8E3] text-[10px] font-mono font-semibold text-[#111111] tracking-wider">
              ART: {product.articleNumber}
            </span>
            <span className="text-[10px] text-[#38332E]/60 uppercase tracking-widest truncate">
              {product.subcategory}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickEnquire(product, currentColor?.name)}
            className="text-xs sm:text-sm font-semibold text-[#111111] hover:text-[#B99A70] transition-colors line-clamp-1 cursor-pointer leading-tight mb-2"
          >
            {product.name}
          </h3>

          {/* Price Tag */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-sm sm:text-base font-bold text-[#111111]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#38332E]/50 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Available Colours Preview Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[10px] text-[#38332E]/70 mr-1 uppercase">Colours:</span>
              <div className="flex items-center gap-1">
                {product.colors.map((color, cIdx) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColorIndex(cIdx)}
                    title={color.name}
                    className={`w-3.5 h-3.5 rounded-full border transition-all ${
                      selectedColorIndex === cIdx
                        ? "ring-2 ring-[#B99A70] ring-offset-1 scale-110 border-white"
                        : "border-[#D9D0C3] hover:scale-110"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Available Sizes Preview Pills */}
          {currentColor && currentColor.sizes && (
            <div className="flex items-center gap-1 mb-4 flex-wrap">
              <span className="text-[10px] text-[#38332E]/70 mr-1 uppercase">Sizes:</span>
              {currentColor.sizes.slice(0, 5).map((s) => (
                <span
                  key={s.size}
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    s.inStock
                      ? "bg-[#F7F5F0] text-[#111111] border border-[#EAE8E3]"
                      : "bg-[#F4F3F0] text-[#38332E]/40 line-through border border-dashed border-[#EAE8E3]"
                  }`}
                  title={s.inStock ? `Size ${s.size} Available` : `Size ${s.size} Out of Stock`}
                >
                  {s.size}
                </span>
              ))}
              {currentColor.sizes.length > 5 && (
                <span className="text-[9px] text-[#38332E]/60 font-mono">
                  +{currentColor.sizes.length - 5}
                </span>
              )}
            </div>
          )}
        </div>

        {/* WhatsApp Enquire Button */}
        <button
          type="button"
          onClick={() => onQuickEnquire(product, currentColor?.name)}
          className="w-full py-2.5 px-3 rounded-md bg-[#111111] text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#B99A70] hover:text-[#111111] transition-all shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Enquire on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

