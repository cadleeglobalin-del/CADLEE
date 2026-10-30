"use client";

import React from "react";
import { X, ShieldCheck, FileText, Truck, RefreshCw } from "lucide-react";
import { useData } from "@/context/DataContext";
import { PolicyDoc } from "@/types";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyType: "shipping" | "returns" | "privacy" | "terms";
}

export default function PolicyModal({
  isOpen,
  onClose,
  policyType,
}: PolicyModalProps) {
  const { settings } = useData();

  if (!isOpen) return null;

  let policy: PolicyDoc;
  let Icon = FileText;

  switch (policyType) {
    case "shipping":
      policy = settings.shippingPolicy;
      Icon = Truck;
      break;
    case "returns":
      policy = settings.returnsPolicy;
      Icon = RefreshCw;
      break;
    case "privacy":
      policy = settings.privacyPolicy;
      Icon = ShieldCheck;
      break;
    case "terms":
    default:
      policy = settings.termsPolicy;
      Icon = FileText;
      break;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EAE8E3] overflow-hidden z-10 flex flex-col max-h-[85vh] animate-fadeIn">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#111111] text-[#B99A70] flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-brand text-lg sm:text-xl font-medium text-[#111111]">
                {policy.title}
              </h3>
              <p className="text-xs text-[#38332E]/60">
                Last updated: {policy.lastUpdated} • CADLEE® Official Footwear Policy
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

        {/* Policy Sections */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {policy.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#111111]">
                {sec.heading}
              </h4>
              <p className="text-xs sm:text-sm text-[#38332E]/80 leading-relaxed font-light">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-between">
          <span className="text-[11px] text-[#38332E]/60">
            For specific queries, contact our WhatsApp desk.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="py-1.5 px-4 rounded-md bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
