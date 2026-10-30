"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";

interface WishlistContextType {
  wishlistIds: string[];
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({
  children,
  allProducts = [],
}: {
  children: React.ReactNode;
  allProducts?: Product[];
}) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem("cadlee_wishlist");
      if (stored) {
        setWishlistIds(JSON.parse(stored));
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const toggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      const next = exists ? prev.filter((id) => id !== product.id) : [...prev, product.id];
      try {
        localStorage.setItem("cadlee_wishlist", JSON.stringify(next));
      } catch {
        // LocalStorage fallback
      }
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const wishlistItems = isMounted
    ? allProducts.filter((p) => wishlistIds.includes(p.id))
    : [];

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistIds.length,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
