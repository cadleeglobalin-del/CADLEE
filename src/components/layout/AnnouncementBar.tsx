"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";

interface AnnouncementBarProps {
  messages?: string[];
  autoRotateInterval?: number;
}

export default function AnnouncementBar({
  messages = [
    "Discover the New CADLEE® Spring/Summer Collection",
    "Handcrafted Elegance • Direct WhatsApp Sizing & Enquiries",
    "Fast All-India Dispatch • Complimentary Delivery on Enquiries above ₹1,999",
    "Elevate Every Step – Explore Walk-Ready Luxury Footwear",
  ],
  autoRotateInterval = 4500,
}: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isVisible || isPaused || messages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [isVisible, isPaused, messages.length, autoRotateInterval]);

  if (!isVisible || messages.length === 0) return null;

  const nextMessage = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#111111] text-[#F7F5F0] border-b border-[#25211E] py-2 px-3 text-xs tracking-wider transition-all duration-300 relative z-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Previous arrow */}
        <button
          onClick={prevMessage}
          aria-label="Previous announcement"
          className="text-[#D9D0C3] hover:text-[#B99A70] p-1 transition-colors hidden sm:flex items-center justify-center"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Message content */}
        <div className="flex-1 flex items-center justify-center text-center overflow-hidden min-h-[20px]">
          <div
            key={currentIndex}
            className="flex items-center justify-center gap-2 animate-fadeIn transition-opacity duration-500 font-medium"
          >
            <Sparkles className="w-3 h-3 text-[#B99A70] shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-md md:max-w-2xl text-[11px] sm:text-xs text-[#F7F5F0]">
              {messages[currentIndex]}
            </span>
            <span className="hidden md:inline-block text-[#B99A70] text-[10px] uppercase font-bold tracking-widest pl-2">
              • CADLEE®
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Next arrow */}
          <button
            onClick={nextMessage}
            aria-label="Next announcement"
            className="text-[#D9D0C3] hover:text-[#B99A70] p-1 transition-colors hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Dismiss button */}
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close announcement"
            className="text-[#D9D0C3] hover:text-white p-1 transition-colors ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
