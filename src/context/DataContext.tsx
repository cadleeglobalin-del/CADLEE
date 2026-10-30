"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Product,
  CategoryItem,
  HeroBanner,
  Review,
  WebsiteSettings,
  EnquiryClickLog,
} from "@/types";
import {
  mockProducts as defaultProducts,
  categoryItems as defaultCategories,
  heroBanners as defaultBanners,
  mockReviews as defaultReviews,
  websiteSettings as defaultSettings,
} from "@/data/mockData";

interface DataContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductByArticle: (articleNumber: string) => Product | undefined;

  // Categories
  categories: CategoryItem[];
  addCategory: (category: Omit<CategoryItem, "id">) => void;
  updateCategory: (id: string, category: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;

  // Hero Banners
  heroBanners: HeroBanner[];
  updateHeroBanner: (id: string, banner: Partial<HeroBanner>) => void;
  addHeroBanner: (banner: Omit<HeroBanner, "id">) => void;
  deleteHeroBanner: (id: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, "id">) => void;
  updateReview: (id: string, review: Partial<Review>) => void;
  deleteReview: (id: string) => void;

  // Settings & Content
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;

  // Enquiry Click Tracking
  enquiryClicks: EnquiryClickLog[];
  logEnquiryClick: (log: Omit<EnquiryClickLog, "id" | "timestamp">) => void;
  clearEnquiryClicks: () => void;

  // Reset
  resetToDefaults: () => void;
  isLoaded: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: "cadlee_store_products",
  CATEGORIES: "cadlee_store_categories",
  BANNERS: "cadlee_store_banners",
  REVIEWS: "cadlee_store_reviews",
  SETTINGS: "cadlee_store_settings",
  ENQUIRIES: "cadlee_store_enquiries",
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<CategoryItem[]>(defaultCategories);
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>(defaultBanners);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [enquiryClicks, setEnquiryClicks] = useState<EnquiryClickLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage or defaults
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (storedCategories) setCategories(JSON.parse(storedCategories));

      const storedBanners = localStorage.getItem(STORAGE_KEYS.BANNERS);
      if (storedBanners) setHeroBanners(JSON.parse(storedBanners));

      const storedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      if (storedReviews) setReviews(JSON.parse(storedReviews));

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) setSettings(JSON.parse(storedSettings));

      const storedEnquiries = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (storedEnquiries) setEnquiryClicks(JSON.parse(storedEnquiries));
    } catch {
      // LocalStorage access fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes
  const saveState = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Storage fallback
    }
  };

  // Products Handlers
  const addProduct = (prodData: Omit<Product, "id" | "createdAt">): Product => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveState(STORAGE_KEYS.PRODUCTS, updated);
    return newProduct;
  };

  const updateProduct = (id: string, changes: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...changes } : p));
    setProducts(updated);
    saveState(STORAGE_KEYS.PRODUCTS, updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveState(STORAGE_KEYS.PRODUCTS, updated);
  };

  const getProductByArticle = (articleNumber: string) => {
    const clean = (s: string) => s.toLowerCase().replace(/[\s\-_]/g, "");
    const target = clean(articleNumber);
    return products.find((p) => clean(p.articleNumber) === target);
  };

  // Categories Handlers
  const addCategory = (catData: Omit<CategoryItem, "id">) => {
    const newCat: CategoryItem = {
      ...catData,
      id: `cat-${Date.now()}`,
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    saveState(STORAGE_KEYS.CATEGORIES, updated);
  };

  const updateCategory = (id: string, changes: Partial<CategoryItem>) => {
    const updated = categories.map((c) => (c.id === id ? { ...c, ...changes } : c));
    setCategories(updated);
    saveState(STORAGE_KEYS.CATEGORIES, updated);
  };

  const deleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    saveState(STORAGE_KEYS.CATEGORIES, updated);
  };

  // Hero Banners Handlers
  const updateHeroBanner = (id: string, changes: Partial<HeroBanner>) => {
    const updated = heroBanners.map((b) => (b.id === id ? { ...b, ...changes } : b));
    setHeroBanners(updated);
    saveState(STORAGE_KEYS.BANNERS, updated);
  };

  const addHeroBanner = (bannerData: Omit<HeroBanner, "id">) => {
    const newBanner: HeroBanner = {
      ...bannerData,
      id: `banner-${Date.now()}`,
    };
    const updated = [...heroBanners, newBanner];
    setHeroBanners(updated);
    saveState(STORAGE_KEYS.BANNERS, updated);
  };

  const deleteHeroBanner = (id: string) => {
    const updated = heroBanners.filter((b) => b.id !== id);
    setHeroBanners(updated);
    saveState(STORAGE_KEYS.BANNERS, updated);
  };

  // Reviews Handlers
  const addReview = (revData: Omit<Review, "id">) => {
    const newRev: Review = {
      ...revData,
      id: `rev-${Date.now()}`,
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    saveState(STORAGE_KEYS.REVIEWS, updated);
  };

  const updateReview = (id: string, changes: Partial<Review>) => {
    const updated = reviews.map((r) => (r.id === id ? { ...r, ...changes } : r));
    setReviews(updated);
    saveState(STORAGE_KEYS.REVIEWS, updated);
  };

  const deleteReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    saveState(STORAGE_KEYS.REVIEWS, updated);
  };

  // Settings Handlers
  const updateSettings = (changes: Partial<WebsiteSettings>) => {
    const updated = { ...settings, ...changes };
    setSettings(updated);
    saveState(STORAGE_KEYS.SETTINGS, updated);
  };

  // Enquiry Click Logging
  const logEnquiryClick = (logData: Omit<EnquiryClickLog, "id" | "timestamp">) => {
    const newLog: EnquiryClickLog = {
      ...logData,
      id: `enq-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    const updated = [newLog, ...enquiryClicks].slice(0, 200); // keep last 200
    setEnquiryClicks(updated);
    saveState(STORAGE_KEYS.ENQUIRIES, updated);
  };

  const clearEnquiryClicks = () => {
    setEnquiryClicks([]);
    saveState(STORAGE_KEYS.ENQUIRIES, []);
  };

  // Factory Reset
  const resetToDefaults = () => {
    setProducts(defaultProducts);
    setCategories(defaultCategories);
    setHeroBanners(defaultBanners);
    setReviews(defaultReviews);
    setSettings(defaultSettings);
    setEnquiryClicks([]);

    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.BANNERS);
    localStorage.removeItem(STORAGE_KEYS.REVIEWS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
  };

  return (
    <DataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductByArticle,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        heroBanners,
        updateHeroBanner,
        addHeroBanner,
        deleteHeroBanner,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        settings,
        updateSettings,
        enquiryClicks,
        logEnquiryClick,
        clearEnquiryClicks,
        resetToDefaults,
        isLoaded,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
