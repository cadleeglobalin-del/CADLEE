"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import CadleeLogo from "@/components/brand/CadleeLogo";
import { websiteSettings } from "@/data/mockData";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customNote, setCustomNote] = useState("");

  const handleStartChat = () => {
    let text = "Hello CADLEE®, I am browsing your footwear catalogue and would like assistance with styles and sizing.";
    if (customNote.trim()) {
      text = `Hello CADLEE®, ${customNote.trim()}`;
    }
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${websiteSettings.whatsappNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Pop-up Chat Card */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-[#EAE8E3] overflow-hidden animate-fadeIn z-50">
          {/* Card Header */}
          <div className="bg-[#111111] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CadleeLogo variant="emblem" theme="light" width={22} height={34} showLink={false} />
              <div>
                <h4 className="text-xs font-semibold text-white tracking-wide">
                  CADLEE® Footwear Concierge
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online • Sizing & Enquiries</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1"
              aria-label="Close chat window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 bg-[#FAF9F6] space-y-3">
            <div className="p-3 bg-white rounded-xl shadow-xs border border-[#EAE8E3] text-xs text-[#38332E] leading-relaxed">
              👋 <strong>Welcome to CADLEE®!</strong> How may we assist your stride today? Ask us about available sizes, article numbers, or delivery to your city.
            </div>

            <textarea
              rows={2}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Type your message or article number..."
              className="w-full p-2.5 rounded-lg bg-white border border-[#D9D0C3] text-xs text-[#111111] focus:border-[#B99A70] focus:ring-1 focus:ring-[#B99A70] outline-none resize-none"
            />

            <button
              onClick={handleStartChat}
              className="w-full py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Start WhatsApp Chat</span>
            </button>

            <p className="text-[10px] text-center text-[#38332E]/60">
              Direct official assistance from {websiteSettings.whatsappDisplayNumber}
            </p>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with CADLEE on WhatsApp"
        className="relative group flex items-center gap-2.5 py-3 px-4 rounded-full bg-[#111111] text-white hover:bg-[#25D366] transition-all duration-300 shadow-xl border border-white/20 hover:border-transparent scale-100 hover:scale-105"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors" />
        <span className="text-xs font-semibold tracking-wider hidden sm:inline-block uppercase">
          Enquire on WhatsApp
        </span>
      </button>
    </div>
  );
}
