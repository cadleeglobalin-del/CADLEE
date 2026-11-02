"use client";

import React, { useState, useEffect } from "react";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** Optional extra CSS class on the wrapper */
  className?: string;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  className = "",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep preview in sync if the parent value changes externally
  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File must be under 10 MB.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (data?.url) {
        setPreview(data.url);
        onChange(data.url);
      } else {
        setError(data?.error || "Upload failed.");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setPreview("");
    onChange("");
    setError(null);
  };

  return (
    <div className={className}>
      <label className="block text-[11px] font-semibold text-[#111111] mb-1">
        {label}
      </label>

      {/* Preview */}
      {preview && (
        <div className="relative inline-block mb-2">
          <img
            src={preview}
            alt="preview"
            className="h-28 max-w-full object-cover rounded-lg border border-[#EAE8E3]"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-sm hover:bg-rose-600 transition-colors"
            title="Remove image"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* URL text input (still usable for pasting URLs) */}
      <input
        type="text"
        value={preview}
        onChange={(e) => {
          setPreview(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Paste image URL or upload below…"
        className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs font-mono text-[#111111] bg-white outline-none mb-1.5"
      />

      {/* File upload button */}
      <label
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
          uploading
            ? "bg-[#EAE8E3] text-[#38332E]/50 cursor-wait"
            : "bg-[#111111] text-white hover:bg-[#B99A70] hover:text-[#111111]"
        }`}
      >
        {uploading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Uploading…</span>
          </>
        ) : (
          <>
            <Upload className="w-3.5 h-3.5" />
            <span>Upload from Device</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {error && (
        <p className="text-[11px] text-rose-500 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
