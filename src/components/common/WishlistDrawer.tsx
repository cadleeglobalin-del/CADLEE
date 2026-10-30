"use client";

import React from "react";
import Image from "next/image";
import { X, Heart, MessageCircle, ArrowRight, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types";

interface WishlistDrawerProps {
  onQuickEnquire: (product: Product) => void;
}

export default function WishlistDrawer({ onQuickEnquire }: WishlistDrawerProps) {
  const { isDrawerOpen, setIsDrawerOpen, wishlistItems, toggleWishlist } = useWishlist();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col justify-between">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h3 className="text-sm font-semibold text-[#111111] uppercase tracking-wider">
              Saved Footwear ({wishlistItems.length})
            </h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 rounded-full text-[#38332E] hover:bg-[#EAE8E3] transition-colors"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 px-4 text-[#38332E]/60">
              <Heart className="w-12 h-12 text-[#D9D0C3] mx-auto mb-3" />
              <p className="text-sm font-semibold text-[#111111]">Your Wishlist is Empty</p>
              <p className="text-xs text-[#38332E]/70 mt-1 max-w-xs mx-auto">
                Explore the CADLEE® catalogue and tap the heart icon on any pair you would like to revisit or enquire about.
              </p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-[#EAE8E3] bg-[#FFFFFF] hover:border-[#B99A70] transition-colors shadow-xs"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#FAF9F6] shrink-0 border border-[#EAE8E3]">
                  <Image src={item.mainImage} alt={item.name} fill sizes="70px" className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono font-semibold text-[#B99A70]">
                    ART: {item.articleNumber}
                  </span>
                  <h4 className="text-xs font-semibold text-[#111111] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs font-bold text-[#111111] mt-0.5">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onQuickEnquire(item);
                    }}
                    className="p-2 rounded-lg bg-[#111111] text-white hover:bg-[#B99A70] transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item)}
                    className="p-2 rounded-lg text-[#38332E]/60 hover:text-rose-500 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {wishlistItems.length > 0 && (
          <div className="p-4 border-t border-[#EAE8E3] bg-[#FAF9F6]">
            <p className="text-[11px] text-center text-[#38332E]/70 mb-3">
              Saved pairs persist in your browser for convenient future reference.
            </p>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-2.5 px-4 rounded-lg bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B99A70] transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

