"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  Heart, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  Flame,
  Layers,
  Ruler,
  ShieldAlert,
  Lock
} from "lucide-react";
import CadleeLogo from "@/components/brand/CadleeLogo";
import { useWishlist } from "@/context/WishlistContext";
import { useData } from "@/context/DataContext";

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSizing?: () => void;
}

export default function Header({ onOpenSearch, onOpenSizing }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const { wishlistCount, setIsDrawerOpen: setWishlistDrawerOpen } = useWishlist();
  const { settings } = useData();

  // Scroll listener for sticky header background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  const navItems = [
    {
      name: "Men",
      href: "#categories",
      hasMega: true,
      megaType: "men",
    },
    {
      name: "Women",
      href: "#categories",
      hasMega: true,
      megaType: "women",
    },
    {
      name: "Kids",
      href: "#categories",
      hasMega: true,
      megaType: "kids",
    },
    {
      name: "Trending",
      href: "#trending",
      badge: "HOT",
      icon: Flame,
    },
    {
      name: "New Arrivals",
      href: "#new-arrivals",
      badge: "NEW",
      icon: Sparkles,
    },
    {
      name: "Collections",
      href: "#collections",
      hasMega: true,
      megaType: "collections",
      icon: Layers,
    },
  ];

  const menSubcategories = [
    { name: "Casual Shoes", href: "#categories", image: "/images/categories/men-casual.jpg" },
    { name: "Formal Shoes", href: "#categories", image: "/images/categories/men-formal.jpg" },
    { name: "Sports Shoes", href: "#categories", image: "/images/categories/men-sports.jpg" },
    { name: "Sandals", href: "#categories", image: "/images/categories/men-sandals.jpg" },
    { name: "Slippers & Slides", href: "#categories", image: "/images/categories/men-slippers.jpg" },
    { name: "Sneakers", href: "#categories", image: "/images/categories/men-sneakers.jpg" },
  ];

  const womenSubcategories = [
    { name: "Heels & Pumps", href: "#categories", image: "/images/categories/women-heels.jpg" },
    { name: "Flats & Ballerinas", href: "#categories", image: "/images/categories/women-flats.jpg" },
    { name: "Casual Shoes", href: "#categories", image: "/images/categories/women-casual.jpg" },
    { name: "Sandals", href: "#categories", image: "/images/categories/women-sandals.jpg" },
    { name: "Slippers & Slides", href: "#categories", image: "/images/categories/women-slippers.jpg" },
    { name: "Sneakers", href: "#categories", image: "/images/categories/women-sneakers.jpg" },
  ];

  const kidsSubcategories = [
    { name: "Boys Footwear", href: "#categories", image: "/images/categories/kids-boys.jpg" },
    { name: "Girls Footwear", href: "#categories", image: "/images/categories/kids-girls.jpg" },
    { name: "School Footwear", href: "#categories", image: "/images/categories/kids-school.jpg" },
    { name: "Casual Footwear", href: "#categories", image: "/images/categories/kids-casual.jpg" },
  ];

  const collectionsList = [
    { name: "Premium Collection", desc: "Handcrafted leather & formal grandeur", href: "#collections", image: "/images/banners/promo-occasion.jpg" },
    { name: "Everyday Collection", desc: "Cloud comfort for active daily life", href: "#collections", image: "/images/banners/promo-lifestyle.jpg" },
    { name: "Casual Collection", desc: "Laid-back elegance and sneakers", href: "#collections", image: "/images/categories/men-sneakers.jpg" },
    { name: "Seasonal Collection", desc: "Summer slides and light weaves", href: "#collections", image: "/images/categories/men-sandals.jpg" },
  ];

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      "Hello CADLEE®, I am browsing your footwear catalogue and would like to enquire about sizing and styles."
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? "bg-[#FFFFFF]/95 backdrop-blur-md shadow-sm border-b border-[#EAE8E3]"
            : "bg-[#FFFFFF] border-b border-[#F4F3F0]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
                className="p-2 -ml-2 text-[#111111] hover:text-[#B99A70] transition-colors focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo (Left) */}
            <div className="flex items-center shrink-0">
              <CadleeLogo
                variant="horizontal"
                theme="dark"
                width={165}
                height={42}
                className="py-1"
              />
            </div>

            {/* Desktop Navigation Links (Centre) */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 h-full">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="h-full flex items-center"
                  onMouseEnter={() => item.hasMega && setActiveMegaMenu(item.megaType || null)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={item.href}
                    className="group relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium tracking-wide text-[#111111] hover:text-[#B99A70] transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.hasMega && (
                      <ChevronDown className="w-3.5 h-3.5 text-[#38332E]/60 group-hover:text-[#B99A70] transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    {item.badge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-[#111111] text-[#F7F5F0] px-1.5 py-0.5 rounded-full group-hover:bg-[#B99A70] transition-colors">
                        {item.badge}
                      </span>
                    )}
                    {/* Active indicator bar */}
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B99A70] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {item.hasMega && activeMegaMenu === item.megaType && (
                    <div
                      className="absolute top-full left-0 right-0 w-full bg-[#FFFFFF] border-b border-[#EAE8E3] shadow-xl py-8 px-8 z-50 animate-fadeIn"
                      onMouseEnter={() => setActiveMegaMenu(item.megaType || null)}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <div className="max-w-7xl mx-auto">
                        {item.megaType === "men" && (
                          <div className="grid grid-cols-6 gap-5">
                            {menSubcategories.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setActiveMegaMenu(null)}
                                className="group block text-center"
                              >
                                <div className="aspect-square relative overflow-hidden rounded-md bg-[#F7F5F0] mb-2.5 border border-[#EAE8E3] group-hover:border-[#B99A70] transition-colors">
                                  <Image
                                    src={sub.image}
                                    alt={sub.name}
                                    fill
                                    sizes="200px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                                <h4 className="text-xs font-semibold text-[#111111] group-hover:text-[#B99A70] transition-colors uppercase tracking-wider">
                                  {sub.name}
                                </h4>
                              </Link>
                            ))}
                          </div>
                        )}

                        {item.megaType === "women" && (
                          <div className="grid grid-cols-6 gap-5">
                            {womenSubcategories.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setActiveMegaMenu(null)}
                                className="group block text-center"
                              >
                                <div className="aspect-square relative overflow-hidden rounded-md bg-[#F7F5F0] mb-2.5 border border-[#EAE8E3] group-hover:border-[#B99A70] transition-colors">
                                  <Image
                                    src={sub.image}
                                    alt={sub.name}
                                    fill
                                    sizes="200px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                                <h4 className="text-xs font-semibold text-[#111111] group-hover:text-[#B99A70] transition-colors uppercase tracking-wider">
                                  {sub.name}
                                </h4>
                              </Link>
                            ))}
                          </div>
                        )}

                        {item.megaType === "kids" && (
                          <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {kidsSubcategories.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setActiveMegaMenu(null)}
                                className="group block text-center"
                              >
                                <div className="aspect-square relative overflow-hidden rounded-md bg-[#F7F5F0] mb-2.5 border border-[#EAE8E3] group-hover:border-[#B99A70] transition-colors">
                                  <Image
                                    src={sub.image}
                                    alt={sub.name}
                                    fill
                                    sizes="250px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                </div>
                                <h4 className="text-xs font-semibold text-[#111111] group-hover:text-[#B99A70] transition-colors uppercase tracking-wider">
                                  {sub.name}
                                </h4>
                              </Link>
                            ))}
                          </div>
                        )}

                        {item.megaType === "collections" && (
                          <div className="grid grid-cols-4 gap-6">
                            {collectionsList.map((col) => (
                              <Link
                                key={col.name}
                                href={col.href}
                                onClick={() => setActiveMegaMenu(null)}
                                className="group relative rounded-lg overflow-hidden bg-[#111111] h-48 block"
                              >
                                <Image
                                  src={col.image}
                                  alt={col.name}
                                  fill
                                  sizes="300px"
                                  className="object-cover opacity-65 group-hover:scale-105 group-hover:opacity-50 transition-all duration-500"
                                />
                                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                                  <span className="text-[10px] tracking-widest text-[#B99A70] uppercase font-bold mb-1">
                                    CADLEE®
                                  </span>
                                  <h4 className="font-serif-brand text-base font-medium leading-tight mb-1 text-white">
                                    {col.name}
                                  </h4>
                                  <p className="text-[11px] text-[#D9D0C3] line-clamp-1">
                                    {col.desc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
              {/* Sizing Help Quick Trigger */}
              {onOpenSizing && (
                <button
                  type="button"
                  onClick={onOpenSizing}
                  aria-label="Footwear Size Guide"
                  className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#38332E] hover:text-[#B99A70] hover:bg-[#F7F5F0] transition-colors"
                  title="Footwear Size Chart"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#B99A70]" />
                  <span>Size Guide</span>
                </button>
              )}

              {/* Search Trigger Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search by Article Number or Name"
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#111111] hover:text-[#B99A70] hover:bg-[#F7F5F0] transition-all border border-transparent hover:border-[#EAE8E3]"
                title="Search by Article Number (e.g. CD-1025)"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <span className="hidden md:inline-block text-[11px] text-[#38332E]/70 font-normal">
                  Search by <strong className="font-semibold text-[#111111]">Art. No.</strong>
                </span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => setWishlistDrawerOpen(true)}
                aria-label="View Saved Wishlist"
                className="relative p-2 rounded-full text-[#111111] hover:text-[#B99A70] hover:bg-[#F7F5F0] transition-all"
                title="Your Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#B99A70] text-[#FFFFFF] text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* WhatsApp Enquire / Stylist Pill Button */}
              <button
                type="button"
                onClick={openWhatsAppDirect}
                aria-label="Enquire on WhatsApp"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#111111] text-[#FFFFFF] text-xs font-semibold tracking-wider hover:bg-[#B99A70] hover:text-[#111111] transition-all shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="uppercase text-[11px]">WhatsApp Enquiries</span>
              </button>

              {/* Admin Portal Quick Lock Link */}
              <Link
                href="/admin"
                aria-label="Admin Dashboard"
                className="p-2 rounded-full text-[#38332E]/70 hover:text-[#B99A70] hover:bg-[#F7F5F0] transition-colors"
                title="Admin Dashboard"
              >
                <Lock className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FFFFFF] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-[#EAE8E3] flex items-center justify-between bg-[#F7F5F0]">
                <CadleeLogo
                  variant="horizontal"
                  theme="dark"
                  width={140}
                  height={36}
                  showLink={false}
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-[#111111] hover:bg-[#EAE8E3] transition-colors"
                  aria-label="Close Navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Quick Search Bar */}
              <div className="p-4 border-b border-[#F4F3F0]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-[#F7F5F0] border border-[#EAE8E3] text-xs text-[#38332E]/80 text-left hover:border-[#B99A70] transition-colors"
                >
                  <Search className="w-4 h-4 text-[#B99A70]" />
                  <span>Search Article No. (e.g. CD-1025)...</span>
                </button>
              </div>

              {/* Navigation Items Accordion */}
              <div className="p-3 space-y-1">
                {/* Men Category */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileCategoryOpen(mobileCategoryOpen === "men" ? null : "men")}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#111111] hover:bg-[#F7F5F0] rounded-md transition-colors"
                  >
                    <span>MEN</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileCategoryOpen === "men" ? "rotate-180 text-[#B99A70]" : "text-[#38332E]/60"
                      }`}
                    />
                  </button>
                  {mobileCategoryOpen === "men" && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-[#FAF9F6] rounded-md mb-1">
                      {menSubcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-xs text-[#38332E] hover:text-[#B99A70] font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Women Category */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileCategoryOpen(mobileCategoryOpen === "women" ? null : "women")}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#111111] hover:bg-[#F7F5F0] rounded-md transition-colors"
                  >
                    <span>WOMEN</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileCategoryOpen === "women" ? "rotate-180 text-[#B99A70]" : "text-[#38332E]/60"
                      }`}
                    />
                  </button>
                  {mobileCategoryOpen === "women" && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-[#FAF9F6] rounded-md mb-1">
                      {womenSubcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-xs text-[#38332E] hover:text-[#B99A70] font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Kids Category */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileCategoryOpen(mobileCategoryOpen === "kids" ? null : "kids")}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#111111] hover:bg-[#F7F5F0] rounded-md transition-colors"
                  >
                    <span>KIDS</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileCategoryOpen === "kids" ? "rotate-180 text-[#B99A70]" : "text-[#38332E]/60"
                      }`}
                    />
                  </button>
                  {mobileCategoryOpen === "kids" && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-[#FAF9F6] rounded-md mb-1">
                      {kidsSubcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-xs text-[#38332E] hover:text-[#B99A70] font-medium"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Direct Links */}
                <Link
                  href="#trending"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#111111] hover:bg-[#F7F5F0] rounded-md transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#B99A70]" />
                    TRENDING
                  </span>
                  <span className="text-[9px] font-bold bg-[#111111] text-[#F7F5F0] px-1.5 py-0.5 rounded-full">
                    HOT
                  </span>
                </Link>

                <Link
                  href="#new-arrivals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#111111] hover:bg-[#F7F5F0] rounded-md transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B99A70]" />
                    NEW ARRIVALS
                  </span>
                  <span className="text-[9px] font-bold bg-[#B99A70] text-white px-1.5 py-0.5 rounded-full">
                    NEW
                  </span>
                </Link>

                <Link
                  href="#collections"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-[#111111] hover:bg-[#F7F5F0] rounded-md transition-colors"
                >
                  <Layers className="w-4 h-4 text-[#B99A70]" />
                  COLLECTIONS
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-[#B99A70] hover:bg-[#F7F5F0] rounded-md transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  ADMIN PORTAL
                </Link>
              </div>
            </div>

            {/* Mobile Drawer Bottom Info */}
            <div className="p-4 border-t border-[#EAE8E3] bg-[#FAF9F6] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppDirect();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B99A70] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </button>

              <div className="text-[11px] text-center text-[#38332E]/70 space-y-1">
                <p>Official CADLEE® Customer Care</p>
                <p className="font-semibold text-[#111111]">{settings.whatsappDisplayNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
