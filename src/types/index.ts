export interface SizeStock {
  size: string; // e.g. "6", "7", "8", "9", "10", "11"
  inStock: boolean;
}

export interface ProductColor {
  name: string; // e.g. "Jet Black", "Cognac Brown", "Ivory White"
  hex: string;
  sizes: SizeStock[];
}

export interface Product {
  id: string;
  name: string;
  articleNumber: string; // SKU e.g. "CD-1025"
  category: "men" | "women" | "kids";
  subcategory: string; // "Casual Shoes" | "Formal Shoes" | "Sports Shoes" | "Sandals" | "Slippers" | "Sneakers" | "Heels" | "Flats"
  collection: string; // "Premium Collection" | "Everyday Collection" | "Casual Collection" | "Sports Collection"
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  mainImage: string;
  colors: ProductColor[];
  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  published: boolean;
  createdAt: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  gender: "men" | "women" | "kids";
  slug: string;
  image: string;
  itemCount: number;
  featuredSubcategories: string[];
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  tagline?: string;
  ctaText: string;
  ctaLink: string;
  desktopImage: string;
  mobileImage: string;
  alignment: "left" | "center" | "right";
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  productPurchased: string;
  articleNumber?: string;
  verified: boolean;
  date: string;
}

export interface WebsiteSettings {
  brandName: string;
  whatsappNumber: string; // e.g. "919876543210"
  whatsappDisplayNumber: string; // e.g. "+91 98765 43210"
  defaultEnquiryMessage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  announcementMessages: string[];
}
