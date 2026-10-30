"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, MessageCircle, Heart, Check, AlertCircle, Sparkles, ShieldCheck } from "lucide-react";
import { Product, ProductColor } from "@/types";
import { useWishlist } from "@/context/WishlistContext";
import { websiteSettings } from "@/data/mockData";

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  initialColorName?: string;
}

export default function QuickEnquiryModal({
  isOpen,
  onClose,
  product,
  initialColorName,
}: QuickEnquiryModalProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync color & size on product open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      if (initialColorName) {
        const foundIdx = product.colors.findIndex((c) => c.name.toLowerCase() === initialColorName.toLowerCase());
        if (foundIdx !== -1) {
          setSelectedColorIndex(foundIdx);
        } else {
          setSelectedColorIndex(0);
        }
      } else {
        setSelectedColorIndex(0);
      }
      setSelectedSize("");
      setSizeError(false);
      setActiveImageIndex(0);
    } else {
      document.body.style.overflow = "";
    }
  }, [product, initialColorName]);

  // When color changes, reset size if previously selected size is not in stock in the new color
  const currentColor: ProductColor | undefined = product?.colors[selectedColorIndex] || product?.colors[0];

  useEffect(() => {
    if (selectedSize && currentColor) {
      const sizeObj = currentColor.sizes.find((s) => s.size === selectedSize);
      if (!sizeObj || !sizeObj.inStock) {
        setSelectedSize("");
      }
    }
  }, [selectedColorIndex, currentColor, selectedSize]);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleWhatsAppEnquiry = () => {
    // Validate size selection
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    setIsSubmitting(true);

    const colorName = currentColor ? currentColor.name : "Standard";
    
    // Construct required dynamic message template
    const message = `Hello CADLEE,

I am interested in this product:

Product Name: ${product.name}
Article Number: ${product.articleNumber}
Price: ₹${product.price.toLocaleString("en-IN")}
Size: ${selectedSize}
Colour: ${colorName}

Please share availability and purchasing details.`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${websiteSettings.whatsappNumber}?text=${encoded}`;

    // Record tracking click (prepared for Phase 4 Supabase logging)
    try {
      const existingClicks = JSON.parse(localStorage.getItem("cadlee_enquiry_clicks") || "[]");
      existingClicks.unshift({
        productId: product.id,
        productName: product.name,
        articleNumber: product.articleNumber,
        selectedSize,
        selectedColor: colorName,
        timestamp: new Date().toISOString(),
        source: "Homepage Quick Enquiry Modal",
      });
      localStorage.setItem("cadlee_enquiry_clicks", JSON.stringify(existingClicks.slice(0, 50)));
    } catch {
      // Storage fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, "_blank");
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#EAE8E3] overflow-hidden z-10 flex flex-col md:flex-row max-h-[92vh] animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#111111] shadow-md transition-all"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 bg-[#FAF9F6] p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAE8E3]">
          <div>
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-[#EAE8E3] mb-3 shadow-inner">
              <Image
                src={product.images[activeImageIndex] || product.mainImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center"
              />
              {/* Article Number Badge */}
              <div className="absolute top-2.5 left-2.5 bg-[#111111] text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-sm">
                ART: {product.articleNumber}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === i
                        ? "border-[#B99A70] scale-105"
                        : "border-[#EAE8E3] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill sizes="60px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-[#EAE8E3] hidden md:flex items-center justify-around text-center text-[10px] text-[#38332E]/70">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B99A70]" />
              Authentic CADLEE®
            </span>
            <span>•</span>
            <span>Direct WhatsApp Sizing</span>
            <span>•</span>
            <span>Pan-India Dispatch</span>
          </div>
        </div>

        {/* Right Column: Details & Enquiry Form */}
        <div className="w-full md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            {/* Category & Wishlist */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#B99A70]">
                {product.category} • {product.subcategory}
              </span>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  isFavorited ? "text-rose-500 font-semibold" : "text-[#38332E]/70 hover:text-rose-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
                <span>{isFavorited ? "Saved" : "Save"}</span>
              </button>
            </div>

            {/* Title */}
            <h3 className="font-serif-brand text-lg sm:text-xl font-medium text-[#111111] leading-tight mb-2">
              {product.name}
            </h3>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-xl sm:text-2xl font-bold text-[#111111]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#38332E]/50 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {product.discountPercent && (
                <span className="bg-[#EAE8E3] text-[#38332E] text-xs font-bold px-2 py-0.5 rounded">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-[#38332E]/80 leading-relaxed mb-5 line-clamp-3">
              {product.description}
            </p>

            {/* Colour Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                    Select Colour:
                  </span>
                  <span className="text-xs text-[#B99A70] font-medium">
                    {currentColor?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                        selectedColorIndex === idx
                          ? "border-[#B99A70] bg-[#FAF9F6] text-[#111111] font-semibold ring-1 ring-[#B99A70]"
                          : "border-[#EAE8E3] text-[#38332E] hover:border-[#D9D0C3]"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector (Mandatory Feature 2) */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                  Select Size (UK/India):
                </span>
                <span className="text-[11px] text-[#38332E]/60">
                  {selectedSize ? `Selected: UK ${selectedSize}` : "Select your shoe size"}
                </span>
              </div>

              {currentColor && (
                <div className="grid grid-cols-6 gap-2">
                  {currentColor.sizes.map((s) => {
                    const isAvailable = s.inStock;
                    const isSelected = selectedSize === s.size;

                    return (
                      <button
                        key={s.size}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedSize(s.size);
                          setSizeError(false);
                        }}
                        className={`py-2 px-1 text-center rounded-md font-mono text-xs transition-all ${
                          isSelected
                            ? "bg-[#111111] text-white font-bold ring-2 ring-[#B99A70] ring-offset-1"
                            : isAvailable
                            ? "bg-[#FFFFFF] text-[#111111] border border-[#D9D0C3] hover:border-[#B99A70] hover:bg-[#FAF9F6]"
                            : "bg-[#F4F3F0] text-[#38332E]/30 border border-dashed border-[#EAE8E3] cursor-not-allowed line-through"
                        }`}
                        title={isAvailable ? `Size ${s.size} in stock` : `Size ${s.size} out of stock`}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Error message if size not selected */}
              {sizeError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-2 animate-bounce">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Please choose an available size to enquire on WhatsApp.</span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTA: WhatsApp Enquiry Button */}
          <div className="pt-4 border-t border-[#EAE8E3] space-y-2">
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#111111] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#B99A70] hover:text-[#111111] transition-all shadow-lg group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:text-[#111111] transition-colors" />
              <span>ENQUIRE ON WHATSAPP</span>
            </button>

            <p className="text-[11px] text-center text-[#38332E]/70">
              Direct connection with CADLEE® sizing advisor • No online payment required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
