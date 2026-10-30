import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Shield, Award } from "lucide-react";
import CadleeLogo from "@/components/brand/CadleeLogo";

export default function BrandStory() {
  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#EAE8E3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Imagery side */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-[#EAE8E3] shadow-lg bg-[#FAF9F6]">
              <Image
                src="/images/brand/brand-story.jpg"
                alt="CADLEE Craftsmanship and Philosophy"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Badge Card */}
            <div className="absolute -bottom-6 -right-3 sm:-bottom-8 sm:right-6 bg-[#111111] text-white p-4 sm:p-6 rounded-xl shadow-xl max-w-[220px] sm:max-w-[260px] border border-[#25211E]">
              <div className="flex items-center gap-3 mb-2">
                <CadleeLogo variant="emblem" theme="light" width={28} height={42} showLink={false} />
                <span className="text-[11px] font-bold tracking-widest text-[#B99A70] uppercase">
                  CADLEE® IDENTITY
                </span>
              </div>
              <p className="text-[11px] text-[#D9D0C3] leading-snug">
                Designed for everyday elegance, constructed for enduring stride comfort.
              </p>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[#B99A70]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B99A70]">
                THE CADLEE® ETHOS
              </span>
            </div>

            <h2 className="text-fluid-h1 font-serif-brand font-medium text-[#111111] mb-5 leading-tight">
              MORE THAN FOOTWEAR. <br className="hidden sm:inline" />
              A STATEMENT OF STYLE.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#38332E]/85 leading-relaxed font-light mb-8">
              <p>
                At CADLEE®, we believe footwear is the foundation of self-expression. A well-crafted pair doesn&apos;t just complete an outfit — it transforms how you carry yourself, infusing confidence into every step.
              </p>
              <p>
                Inspired by the seamless shopping experience of benchmark footwear leaders and elevated with our bespoke design language, every CADLEE silhouette merges ergonomic footbeds, high-traction outsoles, and hand-finished detailing.
              </p>
              <p>
                Through our personal WhatsApp consultation model, our styling and sizing advisors assist you directly before you acquire your pair, ensuring the fit is tailored precisely to your feet.
              </p>
            </div>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#F4F3F0] mb-8">
              <div>
                <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1">
                  • Modern Silhouettes
                </h4>
                <p className="text-[11px] text-[#38332E]/70">
                  Refined lines tailored for Indian proportions and international style.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1">
                  • Direct Assistance
                </h4>
                <p className="text-[11px] text-[#38332E]/70">
                  One-on-one size verification on WhatsApp prior to order dispatch.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#categories"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B99A70] hover:text-[#111111] transition-all shadow-md group"
              >
                <span>Explore Full Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
