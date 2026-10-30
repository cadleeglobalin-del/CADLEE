"use client";

import React, { useState } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import HeroSlider from "@/components/home/HeroSlider";
import TrustFeatures from "@/components/home/TrustFeatures";
import CategorySection from "@/components/home/CategorySection";
import BestSellersSection from "@/components/home/BestSellersSection";
import PromoBanner from "@/components/home/PromoBanner";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import TrendingSection from "@/components/home/TrendingSection";
import FeaturedCollectionsSection from "@/components/home/FeaturedCollectionsSection";
import BrandStory from "@/components/home/BrandStory";
import CustomerReviews from "@/components/home/CustomerReviews";
import Footer from "@/components/layout/Footer";
import ArticleSearchModal from "@/components/common/ArticleSearchModal";
import QuickEnquiryModal from "@/components/common/QuickEnquiryModal";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import WishlistDrawer from "@/components/common/WishlistDrawer";
import { WishlistProvider } from "@/context/WishlistContext";
import {
  websiteSettings,
  heroBanners,
  categoryItems,
  mockProducts,
  mockReviews,
} from "@/data/mockData";
import { Product } from "@/types";

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<Product | null>(null);
  const [enquiryInitialColor, setEnquiryInitialColor] = useState<string | undefined>(undefined);

  const handleOpenQuickEnquiry = (product: Product, selectedColor?: string) => {
    setEnquiryModalProduct(product);
    setEnquiryInitialColor(selectedColor);
  };

  const handleCloseQuickEnquiry = () => {
    setEnquiryModalProduct(null);
    setEnquiryInitialColor(undefined);
  };

  return (
    <WishlistProvider allProducts={mockProducts}>
      <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#111111]">
        {/* 1. Slim Announcement Bar */}
        <AnnouncementBar messages={websiteSettings.announcementMessages} />

        {/* 2. Responsive Sticky Header with Mega Menus */}
        <Header onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Main Page Flow */}
        <main className="flex-1">
          {/* 3. Hero Image Slider with Desktop & Mobile Banners */}
          <HeroSlider banners={heroBanners} />

          {/* 4. Trust Features Bar */}
          <TrustFeatures />

          {/* 5. Shop by Category (Walkaroo-style photographic cards) */}
          <CategorySection categories={categoryItems} />

          {/* 6. Best Sellers Carousel / Grid */}
          <BestSellersSection
            products={mockProducts}
            onQuickEnquire={handleOpenQuickEnquiry}
          />

          {/* 7. Mid-page Editorial Banner 1 */}
          <PromoBanner
            tagline="EXECUTIVE EXCELLENCE"
            heading="A PERFECT FIT FOR EVERY OCCASION."
            subheading="From high-stakes boardrooms to evening engagements, experience precision craftsmanship with all-day ergonomic poise."
            ctaText="EXPLORE MEN"
            ctaLink="#categories"
            secondaryCtaText="EXPLORE WOMEN"
            secondaryCtaLink="#categories"
            imageSrc="/images/banners/promo-occasion.jpg"
          />

          {/* 8. New Arrivals Grid */}
          <NewArrivalsSection
            products={mockProducts}
            onQuickEnquire={handleOpenQuickEnquiry}
          />

          {/* 9. Mid-page Editorial Banner 2 */}
          <PromoBanner
            tagline="CASUAL ELEGANCE"
            heading="STYLE THAT SPEAKS FOR YOU."
            subheading="Cloud-cushioned soles and contemporary streetwear silhouettes crafted to keep you ahead of the curve."
            ctaText="SHOP SNEAKERS"
            ctaLink="#categories"
            secondaryCtaText="VIEW TRENDING"
            secondaryCtaLink="#trending"
            imageSrc="/images/banners/promo-lifestyle.jpg"
            reverse={true}
          />

          {/* 10. Trending Collection */}
          <TrendingSection
            products={mockProducts}
            onQuickEnquire={handleOpenQuickEnquiry}
          />

          {/* 11. Featured Collections Lookbook */}
          <FeaturedCollectionsSection />

          {/* 12. Brand Introduction Narrative */}
          <BrandStory />

          {/* 13. Customer Reviews (Approved Verified Testimonials) */}
          <CustomerReviews reviews={mockReviews} />
        </main>

        {/* 14. Luxury Dark Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />

        {/* FEATURE 1: Article Number Search Modal */}
        <ArticleSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={mockProducts}
          onSelectProduct={(p) => handleOpenQuickEnquiry(p)}
        />

        {/* FEATURE 2 & 3: Size & Colour Availability + Dynamic WhatsApp Enquiry Generator */}
        <QuickEnquiryModal
          isOpen={!!enquiryModalProduct}
          onClose={handleCloseQuickEnquiry}
          product={enquiryModalProduct}
          initialColorName={enquiryInitialColor}
        />

        {/* Wishlist Drawer */}
        <WishlistDrawer onQuickEnquire={handleOpenQuickEnquiry} />
      </div>
    </WishlistProvider>
  );
}
