"use client";

import React, { useState } from "react";
import { X, Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { useData } from "@/context/DataContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { settings } = useData();
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello CADLEE®,

Enquiry from Contact Us:
Name: ${formData.name}
Phone: ${formData.phone}
Message: ${formData.message}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#EAE8E3] overflow-hidden z-10 flex flex-col max-h-[90vh] animate-fadeIn">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B99A70]">
              GET IN TOUCH
            </span>
            <h3 className="font-serif-brand text-lg sm:text-xl font-medium text-[#111111]">
              Contact CADLEE® Concierge
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#38332E] hover:bg-[#EAE8E3] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#B99A70] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#38332E]/60">Phone & WhatsApp</p>
                <p className="text-xs font-semibold text-[#111111]">{settings.whatsappDisplayNumber}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#B99A70] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#38332E]/60">Email Support</p>
                <p className="text-xs font-semibold text-[#111111]">{settings.contactEmail}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#B99A70] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#38332E]/60">Headquarters</p>
                <p className="text-xs text-[#111111]">{settings.address}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3] flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#B99A70] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#38332E]/60">Hours of Operation</p>
                <p className="text-xs text-[#111111]">{settings.businessHours}</p>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="pt-2 border-t border-[#F4F3F0]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
              Send a Direct Footwear Enquiry
            </h4>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="text-sm font-semibold text-emerald-900">Enquiry Initiated!</h5>
                <p className="text-xs text-emerald-800">
                  Your WhatsApp message has been prepared. Our CADLEE sizing advisor will assist you immediately.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#111111] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] focus:border-[#B99A70] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#111111] mb-1">WhatsApp Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] focus:border-[#B99A70] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Enquiry Details</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the footwear style, article number, or question you have..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] focus:border-[#B99A70] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#111111] hover:bg-[#B99A70] text-white hover:text-[#111111] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Send via WhatsApp Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
