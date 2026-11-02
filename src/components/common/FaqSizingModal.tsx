"use client";

import React, { useState } from "react";
import { X, HelpCircle, ChevronDown, Ruler, MessageCircle, Sparkles } from "lucide-react";
import { useData } from "@/context/DataContext";

interface FaqSizingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "sizing" | "faq";
}

export default function FaqSizingModal({
  isOpen,
  onClose,
  defaultTab = "sizing",
}: FaqSizingModalProps) {
  const { settings } = useData();
  const [activeTab, setActiveTab] = useState<"sizing" | "faq">(defaultTab);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  if (!isOpen) return null;

  const sizingChartMen = [
    { uk: "6", eu: "40", us: "7", cm: "24.5" },
    { uk: "7", eu: "41", us: "8", cm: "25.4" },
    { uk: "8", eu: "42", us: "9", cm: "26.2" },
    { uk: "9", eu: "43", us: "10", cm: "27.1" },
    { uk: "10", eu: "44", us: "11", cm: "27.9" },
    { uk: "11", eu: "45", us: "12", cm: "28.8" },
  ];

  const sizingChartWomen = [
    { uk: "3", eu: "36", us: "5", cm: "22.0" },
    { uk: "4", eu: "37", us: "6", cm: "22.9" },
    { uk: "5", eu: "38", us: "7", cm: "23.7" },
    { uk: "6", eu: "39", us: "8", cm: "24.6" },
    { uk: "7", eu: "40", us: "9", cm: "25.4" },
    { uk: "8", eu: "41", us: "10", cm: "26.2" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#EAE8E3] overflow-hidden z-10 flex flex-col max-h-[90vh] animate-fadeIn">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#111111] text-[#B99A70] flex items-center justify-center">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-brand text-lg sm:text-xl font-medium text-[#111111]">
                Footwear Sizing & FAQ Guide
              </h3>
              <p className="text-xs text-[#38332E]/70">
                Official CADLEE® standard shoe measurements and common questions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#38332E] hover:bg-[#EAE8E3] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EAE8E3] bg-white px-6">
          <button
            type="button"
            onClick={() => setActiveTab("sizing")}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "sizing"
                ? "border-[#B99A70] text-[#111111]"
                : "border-transparent text-[#38332E]/60 hover:text-[#111111]"
            }`}
          >
            Shoe Sizing Chart
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("faq")}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "faq"
                ? "border-[#B99A70] text-[#111111]"
                : "border-transparent text-[#38332E]/60 hover:text-[#111111]"
            }`}
          >
            Frequently Asked Questions
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === "sizing" ? (
            <div className="space-y-6">
              {/* Sizing instruction */}
              <div className="p-4 rounded-xl bg-[#F7F5F0] border border-[#EAE8E3] text-xs text-[#38332E] leading-relaxed flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#B99A70] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#111111]">How to measure your foot accurately:</strong>
                  <p className="mt-1">
                    Place your foot on a sheet of paper with your heel against a flat wall. Mark the tip of your longest toe. Measure the distance in centimeters from the wall to the mark and refer to the charts below. CADLEE uses standard Indian/UK shoe sizing.
                  </p>
                </div>
              </div>

              {/* Men Chart */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  Men&apos;s Footwear Size Chart
                </h4>
                <div className="overflow-x-auto rounded-lg border border-[#EAE8E3]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FAF9F6] text-[#111111] font-semibold border-b border-[#EAE8E3]">
                      <tr>
                        <th className="py-2.5 px-4 font-mono">UK / India</th>
                        <th className="py-2.5 px-4 font-mono">EU</th>
                        <th className="py-2.5 px-4 font-mono">US</th>
                        <th className="py-2.5 px-4 font-mono">Foot Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE8E3]">
                      {sizingChartMen.map((row) => (
                        <tr key={row.uk} className="hover:bg-[#FAF9F6]/50">
                          <td className="py-2 px-4 font-bold text-[#111111]">{row.uk}</td>
                          <td className="py-2 px-4 text-[#38332E]/80">{row.eu}</td>
                          <td className="py-2 px-4 text-[#38332E]/80">{row.us}</td>
                          <td className="py-2 px-4 font-mono text-[#B99A70] font-semibold">{row.cm} cm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Women Chart */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  Women&apos;s Footwear Size Chart
                </h4>
                <div className="overflow-x-auto rounded-lg border border-[#EAE8E3]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FAF9F6] text-[#111111] font-semibold border-b border-[#EAE8E3]">
                      <tr>
                        <th className="py-2.5 px-4 font-mono">UK / India</th>
                        <th className="py-2.5 px-4 font-mono">EU</th>
                        <th className="py-2.5 px-4 font-mono">US</th>
                        <th className="py-2.5 px-4 font-mono">Foot Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE8E3]">
                      {sizingChartWomen.map((row) => (
                        <tr key={row.uk} className="hover:bg-[#FAF9F6]/50">
                          <td className="py-2 px-4 font-bold text-[#111111]">{row.uk}</td>
                          <td className="py-2 px-4 text-[#38332E]/80">{row.eu}</td>
                          <td className="py-2 px-4 text-[#38332E]/80">{row.us}</td>
                          <td className="py-2 px-4 font-mono text-[#B99A70] font-semibold">{row.cm} cm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* FAQs Accordion */
            <div className="space-y-3">
              {settings.faqs.map((faq) => {
                const isOpenFaq = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-[#EAE8E3] rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpenFaq ? null : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-[#FAF9F6] hover:bg-[#F4F3F0] transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-[#111111]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#B99A70] shrink-0 transition-transform ${
                          isOpenFaq ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpenFaq && (
                      <div className="p-4 bg-white text-xs sm:text-sm text-[#38332E] leading-relaxed border-t border-[#EAE8E3]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer with Direct WhatsApp assistance */}
        <div className="p-4 border-t border-[#EAE8E3] bg-[#FAF9F6] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#38332E]/70 text-center sm:text-left">
            Still unsure about your shoe size? Speak directly with our styling team.
          </p>
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
              "Hello CADLEE®, I need assistance finding my correct footwear size."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] hover:text-[#111111] transition-colors shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ask Sizing on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

