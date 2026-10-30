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
import FaqSizingModal from "@/components/common/FaqSizingModal";
import ContactModal from "@/components/common/ContactModal";
import PolicyModal from "@/components/common/PolicyModal";
import { WishlistProvider } from "@/context/WishlistContext";
import { DataProvider, useData } from "@/context/DataContext";
import { Product } from "@/types";

function StorefrontContent() {
  const {
    products,
    categories,
    heroBanners,
    reviews,
    settings,
  } = useData();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<Product | null>(null);
  const [enquiryInitialColor, setEnquiryInitialColor] = useState<string | undefined>(undefined);

  // Modal states for customer care
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [faqTab, setFaqTab] = useState<"sizing" | "faq">("sizing");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [policyType, setPolicyType] = useState<"shipping" | "returns" | "privacy" | "terms" | null>(null);

  const handleOpenQuickEnquiry = (product: Product, selectedColor?: string) => {
    setEnquiryModalProduct(product);
    setEnquiryInitialColor(selectedColor);
  };

  const handleCloseQuickEnquiry = () => {
    setEnquiryModalProduct(null);
    setEnquiryInitialColor(undefined);
  };

  return (
    <WishlistProvider allProducts={products}>
      <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#111111]">
        {/* 1. Slim Announcement Bar */}
        <AnnouncementBar messages={settings.announcementMessages} />

        {/* 2. Responsive Sticky Header with Mega Menus */}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSizing={() => {
            setFaqTab("sizing");
            setIsFaqOpen(true);
          }}
        />

        {/* Main Page Flow */}
        <main className="flex-1">
          {/* 3. Hero Image Slider with Desktop & Mobile Banners */}
          <HeroSlider banners={heroBanners} />

          {/* 4. Trust Features Bar (Footwear Comfort Guarantees) */}
          <TrustFeatures />

          {/* 5. Shop by Category (Walkaroo-style photographic cards) */}
          <CategorySection categories={categories} />

          {/* 6. Best Sellers Carousel / Grid */}
          <BestSellersSection
            products={products}
            onQuickEnquire={handleOpenQuickEnquiry}
          />

          {/* 7. Mid-page Editorial Banner 1 (Occasion Footwear) */}
          <PromoBanner
            tagline={settings.promoBanners.occasion.tagline}
            heading={settings.promoBanners.occasion.heading}
            subheading={settings.promoBanners.occasion.subheading}
            ctaText={settings.promoBanners.occasion.ctaText}
            ctaLink={settings.promoBanners.occasion.ctaLink}
            secondaryCtaText={settings.promoBanners.occasion.secondaryCtaText}
            secondaryCtaLink={settings.promoBanners.occasion.secondaryCtaLink}
            imageSrc={settings.promoBanners.occasion.imageSrc}
          />

          {/* 8. New Arrivals Grid */}
          <NewArrivalsSection
            products={products}
            onQuickEnquire={handleOpenQuickEnquiry}
          />

          {/* 9. Mid-page Editorial Banner 2 (Casual & Sneakers) */}
          <PromoBanner
            tagline={settings.promoBanners.lifestyle.tagline}
            heading={settings.promoBanners.lifestyle.heading}
            subheading={settings.promoBanners.lifestyle.subheading}
            ctaText={settings.promoBanners.lifestyle.ctaText}
            ctaLink={settings.promoBanners.lifestyle.ctaLink}
            secondaryCtaText={settings.promoBanners.lifestyle.secondaryCtaText}
            secondaryCtaLink={settings.promoBanners.lifestyle.secondaryCtaLink}
            imageSrc={settings.promoBanners.lifestyle.imageSrc}
            reverse={true}
          />

          {/* 10. Trending Collection */}
          <TrendingSection
            products={products}
            onQuickEnquire={handleOpenQuickEnquiry}
          />

          {/* 11. Featured Collections Lookbook */}
          <FeaturedCollectionsSection />

          {/* 12. Brand Introduction Narrative (100% Shoemaking & Footwear Craft) */}
          <BrandStory />

          {/* 13. Customer Reviews (Approved Verified Testimonials) */}
          <CustomerReviews reviews={reviews} />
        </main>

        {/* 14. Luxury Dark Footer with Customer Care & Policy Actions */}
        <Footer
          onOpenFaq={() => {
            setFaqTab("faq");
            setIsFaqOpen(true);
          }}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenPolicy={(type) => setPolicyType(type)}
        />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />

        {/* FEATURE 1: Article Number Search Modal */}
        <ArticleSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={products}
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

        {/* FAQ & Footwear Sizing Help Modal */}
        <FaqSizingModal
          isOpen={isFaqOpen}
          onClose={() => setIsFaqOpen(false)}
          defaultTab={faqTab}
        />

        {/* Contact Us Modal */}
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />

        {/* Policy Modals (Shipping, Returns, Privacy, Terms) */}
        {policyType && (
          <PolicyModal
            isOpen={!!policyType}
            onClose={() => setPolicyType(null)}
            policyType={policyType}
          />
        )}
      </div>
    </WishlistProvider>
  );
}

export default function HomePage() {
  return (
    <DataProvider>
      <StorefrontContent />
    </DataProvider>
  );
}
