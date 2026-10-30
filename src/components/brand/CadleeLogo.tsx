"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CadleeLogoProps {
  variant?: "horizontal" | "stacked" | "emblem" | "original";
  theme?: "dark" | "light"; // 'dark' = dark text on light bg; 'light' = light text on dark bg
  className?: string;
  width?: number;
  height?: number;
  showLink?: boolean;
}

export default function CadleeLogo({
  variant = "horizontal",
  theme = "dark",
  className = "",
  width,
  height,
  showLink = true,
}: CadleeLogoProps) {
  let src = "";
  let defaultWidth = 160;
  let defaultHeight = 44;

  if (variant === "horizontal") {
    src = theme === "dark" 
      ? "/images/cadlee-logo-horizontal-dark.png" 
      : "/images/cadlee-logo-horizontal-light.png";
    defaultWidth = 175;
    defaultHeight = 46;
  } else if (variant === "stacked") {
    src = theme === "dark" 
      ? "/images/cadlee-logo-dark-trimmed.png" 
      : "/images/cadlee-logo-light-trimmed.png";
    defaultWidth = 110;
    defaultHeight = 128;
  } else if (variant === "emblem") {
    src = theme === "dark" 
      ? "/images/cadlee-emblem-dark.png" 
      : "/images/cadlee-emblem-light.png";
    defaultWidth = 40;
    defaultHeight = 64;
  } else {
    // Original uploaded raw image
    src = "/images/cadlee-logo.jpg";
    defaultWidth = 140;
    defaultHeight = 198;
  }

  const finalWidth = width || defaultWidth;
  const finalHeight = height || defaultHeight;

  const content = (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <Image
        src={src}
        alt="CADLEE® Footwear"
        width={finalWidth}
        height={finalHeight}
        priority
        className="w-auto h-auto object-contain transition-opacity duration-300 hover:opacity-90"
        style={{ maxHeight: `${finalHeight}px` }}
      />
    </div>
  );

  if (!showLink) return content;

  return (
    <Link href="/" aria-label="CADLEE® Home" className="inline-flex items-center focus:outline-none">
      {content}
    </Link>
  );
}

