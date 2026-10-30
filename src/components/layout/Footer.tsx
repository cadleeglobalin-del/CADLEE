"use client";

import React from "react";
import Link from "next/link";
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Lock
} from "lucide-react";
import CadleeLogo from "@/components/brand/CadleeLogo";
import { useData } from "@/context/DataContext";

interface FooterProps {
  onOpenFaq?: () => void;
  onOpenContact?: () => void;
  onOpenPolicy?: (type: "shipping" | "returns" | "privacy" | "terms") => void;
}

export default function Footer({
  onOpenFaq,
  onOpenContact,
  onOpenPolicy,
}: FooterProps) {
  const { settings } = useData();
  const currentYear = 2026;

  return (
    <footer className="bg-[#111111] text-[#F7F5F0] border-t border-[#25211E] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#25211E]">
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-5">
            <CadleeLogo
              variant="horizontal"
              theme="light"
              width={180}
              height={48}
              className="mb-2"
            />
            <p className="text-xs sm:text-sm text-[#D9D0C3]/80 leading-relaxed font-light max-w-sm">
              CADLEE® is an Indian premium footwear label designed for modern elegance, all-day ergonomic comfort, and enduring sophistication across every walk of life.
            </p>

            {/* Direct WhatsApp Concierge Card */}
            <div className="p-4 rounded-xl bg-[#25211E] border border-[#38332E] max-w-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B99A70]">
                  WhatsApp Footwear Concierge
                </span>
              </div>
              <p className="text-[11px] text-[#D9D0C3]">
                Need sizing assistance, availability checks, or product recommendations?
              </p>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("Hello CADLEE®, I have an enquiry about your footwear collection.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] hover:text-[#111111] transition-colors border border-[#38332E]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat: {settings.whatsappDisplayNumber}</span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CADLEE Instagram"
                  className="w-9 h-9 rounded-full bg-[#25211E] border border-[#38332E] flex items-center justify-center text-[#D9D0C3] hover:text-[#B99A70] hover:border-[#B99A70] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CADLEE Facebook"
                  className="w-9 h-9 rounded-full bg-[#25211E] border border-[#38332E] flex items-center justify-center text-[#D9D0C3] hover:text-[#B99A70] hover:border-[#B99A70] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Men Footwear */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B99A70]">
              MEN FOOTWEAR
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9D0C3]/80 font-light">
              <li><Link href="#categories" className="hover:text-white transition-colors">Casual Shoes</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Formal Shoes</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Sports Shoes</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Sandals & Slides</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Slippers</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Sneakers</Link></li>
            </ul>
          </div>

          {/* Column 3: Women & Kids */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B99A70]">
              WOMEN & KIDS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9D0C3]/80 font-light">
              <li><Link href="#categories" className="hover:text-white transition-colors">Heels & Pumps</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Flats & Ballerinas</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Women Sneakers</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Boys Footwear</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Girls Footwear</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">School Footwear</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Discover */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B99A70]">
              DISCOVER
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9D0C3]/80 font-light">
              <li><Link href="#trending" className="hover:text-white transition-colors">Trending Now</Link></li>
              <li><Link href="#new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="#bestsellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="#collections" className="hover:text-white transition-colors">Featured Collections</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Complete Catalogue</Link></li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-[#B99A70] hover:text-white transition-colors font-semibold"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Customer Care & Policy Modals */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#B99A70]">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D9D0C3]/80 font-light">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenContact && onOpenContact()}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenFaq && onOpenFaq()}
                  className="hover:text-white transition-colors text-left"
                >
                  FAQ & Sizing Help
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy && onOpenPolicy("shipping")}
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping & Dispatch
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy && onOpenPolicy("returns")}
                  className="hover:text-white transition-colors text-left"
                >
                  Returns & Exchange
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy && onOpenPolicy("privacy")}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy && onOpenPolicy("terms")}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Security Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D9D0C3]/60 gap-4">
          <div className="flex items-center gap-2">
            <CadleeLogo variant="emblem" theme="light" width={18} height={28} showLink={false} />
            <p>
              © {currentYear} CADLEE® Footwear. All rights reserved. Registered Trademark.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Dedicated Footwear Catalogue</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-white transition-colors text-[#B99A70] font-mono">
              Store Manager
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
