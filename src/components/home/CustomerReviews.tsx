"use client";

import React, { useState } from "react";
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Review } from "@/types";

interface CustomerReviewsProps {
  reviews: Review[];
}

export default function CustomerReviews({ reviews }: CustomerReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F7F5F0] border-b border-[#EAE8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="w-5 h-px bg-[#B99A70]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B99A70]">
              VERIFIED EXPERIENCES
            </span>
            <span className="w-5 h-px bg-[#B99A70]" />
          </div>
          <h2 className="text-fluid-h1 font-serif-brand font-medium text-[#111111] mb-2">
            Client Impressions
          </h2>
          <p className="text-xs sm:text-sm text-[#38332E]/80">
            Real feedback from discerning customers who wear CADLEE® footwear every day.
          </p>
        </div>

        {/* Reviews Grid (Desktop 4 cards, Mobile Carousel/Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FFFFFF] rounded-xl p-5 sm:p-6 border border-[#EAE8E3] shadow-sm hover:border-[#B99A70] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? "fill-amber-400 text-amber-400" : "text-[#D9D0C3]"
                      }`}
                    />
                  ))}
                  <span className="text-[10px] font-bold text-[#111111] ml-1">5.0</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#38332E] italic leading-relaxed mb-4">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="pt-3 border-t border-[#F4F3F0]">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-semibold text-[#111111]">
                    {rev.customerName}
                  </h4>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      <CheckCircle className="w-2.5 h-2.5" />
                      Verified
                    </span>
                  )}
                </div>

                {rev.productPurchased && (
                  <p className="text-[10px] text-[#B99A70] font-medium truncate">
                    Purchased: {rev.productPurchased} {rev.articleNumber ? `(${rev.articleNumber})` : ""}
                  </p>
                )}
                <span className="text-[9px] text-[#38332E]/50">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
