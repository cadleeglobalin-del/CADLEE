import React from "react";
import { ShieldCheck, Sparkles, MessageCircle, Truck } from "lucide-react";

export default function TrustFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "Ergonomic Cushioning",
      description: "Dual-density memory insoles for fatigue-free all-day wear.",
    },
    {
      icon: ShieldCheck,
      title: "Precision Craftsmanship",
      description: "Hand-finished synthetics & vulcanized non-slip traction soles.",
    },
    {
      icon: MessageCircle,
      title: "Direct WhatsApp Sizing",
      description: "Instant personalized sizing advice & prompt enquiries.",
    },
    {
      icon: Truck,
      title: "Pan-India Fast Dispatch",
      description: "Secure packaging with tracked express delivery nationwide.",
    },
  ];

  return (
    <section aria-label="Brand Guarantees" className="bg-[#FFFFFF] border-b border-[#EAE8E3] py-8 sm:py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center p-2">
                <div className="w-12 h-12 rounded-full bg-[#F7F5F0] border border-[#EAE8E3] flex items-center justify-center text-[#B99A70] mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[#B99A70]" />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-[#111111] uppercase tracking-wider mb-1">
                  {f.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#38332E]/75 max-w-[210px] leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

