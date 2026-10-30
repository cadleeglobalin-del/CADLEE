import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CADLEE® | Premium Footwear | Elegance in Every Step",
  description: "Discover CADLEE® premium footwear. Handcrafted comfort, contemporary style, and timeless elegance for Men, Women, and Kids. Enquire directly on WhatsApp.",
  keywords: "CADLEE, CadLee footwear, premium shoes, formal shoes, sneakers, sandals, slippers, luxury footwear",
  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "CADLEE® | Premium Footwear",
    description: "Designed for everyday elegance. Discover the latest collections from CADLEE®.",
    siteName: "CADLEE®",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#111111] font-sans selection:bg-[#B99A70] selection:text-white">
        {children}
      </body>
    </html>
  );
}
