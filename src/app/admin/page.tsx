"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  Layers,
  Image as ImageIcon,
  Type,
  Star,
  MessageCircle,
  Share2,
  FileText,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Search,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Eye,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import CadleeLogo from "@/components/brand/CadleeLogo";
import ImageUploader from "@/components/ImageUploader";
import { useData, DataProvider } from "@/context/DataContext";
import { Product, CategoryItem, HeroBanner, Review, FAQItem, ProductColor } from "@/types";

function AdminDashboardContent() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    heroBanners,
    updateHeroBanner,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    settings,
    updateSettings,
    enquiryClicks,
    clearEnquiryClicks,
    resetToDefaults,
  } = useData();

  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "products"
    | "categories"
    | "banners"
    | "content"
    | "reviews"
    | "whatsapp"
    | "social"
    | "policies"
    | "enquiries"
  >("overview");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("all");

  // Review modal state
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isNewReview, setIsNewReview] = useState(false);

  // FAQ state
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");

  // New announcement message state
  const [newAnnouncement, setNewAnnouncement] = useState("");

  const filteredProducts = products.filter((p) => {
    const matchCat = productCategoryFilter === "all" || p.category === productCategoryFilter;
    const matchSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.articleNumber.toLowerCase().includes(productSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111] flex flex-col">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#111111] text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-2 border border-[#B99A70] animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <header className="bg-[#111111] text-white border-b border-[#25211E] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CadleeLogo variant="horizontal" theme="light" width={140} height={36} showLink={false} />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-[#25211E] text-[10px] font-mono text-[#B99A70] border border-[#38332E] uppercase font-bold tracking-wider">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25211E] hover:bg-[#38332E] text-xs text-[#D9D0C3] hover:text-white transition-colors border border-[#38332E]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </Link>

            <button
              onClick={() => {
                if (confirm("Reset all catalogue and content to original factory defaults?")) {
                  resetToDefaults();
                  showToast("Store data reset to factory defaults!");
                }
              }}
              title="Reset all content to defaults"
              className="p-1.5 rounded-lg bg-[#25211E] text-[#D9D0C3] hover:text-rose-400 hover:bg-rose-950/30 transition-colors border border-[#38332E]"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 bg-white rounded-2xl border border-[#EAE8E3] shadow-sm p-3 self-start">
          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "products", label: "Footwear Products", icon: Package, badge: products.length },
              { id: "categories", label: "Categories", icon: Layers, badge: categories.length },
              { id: "banners", label: "Banners & Sliders", icon: ImageIcon },
              { id: "content", label: "Headings & Story", icon: Type },
              { id: "reviews", label: "Customer Reviews", icon: Star, badge: reviews.length },
              { id: "whatsapp", label: "WhatsApp & Contact", icon: MessageCircle },
              { id: "social", label: "Social Media Links", icon: Share2 },
              { id: "policies", label: "Policies & FAQs", icon: FileText },
              { id: "enquiries", label: "Enquiry Click Log", icon: BarChart3, badge: enquiryClicks.length },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#111111] text-white shadow-sm"
                      : "text-[#38332E] hover:bg-[#FAF9F6] hover:text-[#111111]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#B99A70]" : "text-[#38332E]/70"}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive ? "bg-[#B99A70] text-[#111111]" : "bg-[#F7F5F0] text-[#38332E]"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-[#F4F3F0] px-3 text-[11px] text-[#38332E]/60 space-y-1">
            <p className="font-semibold text-[#111111]">CADLEE® Control Panel</p>
            <p>Direct live persistence. Changes reflect immediately on storefront.</p>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 bg-white rounded-2xl border border-[#EAE8E3] shadow-sm p-6 sm:p-8 min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif-brand font-medium text-[#111111]">
                  Store Administration Overview
                </h2>
                <p className="text-xs text-[#38332E]/70 mt-1">
                  Manage footwear catalogues, update hero banners, configure WhatsApp contact numbers, and edit website policies.
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#38332E]/70">Published Footwear</p>
                  <p className="text-2xl font-serif-brand font-bold text-[#111111] mt-1">{products.length}</p>
                  <span className="text-[10px] text-emerald-600 font-semibold">100% Footwear Catalog</span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#38332E]/70">Active Categories</p>
                  <p className="text-2xl font-serif-brand font-bold text-[#111111] mt-1">{categories.length}</p>
                  <span className="text-[10px] text-[#B99A70] font-semibold">Men, Women, Kids</span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#38332E]/70">WhatsApp Enquiries</p>
                  <p className="text-2xl font-serif-brand font-bold text-[#111111] mt-1">{enquiryClicks.length}</p>
                  <span className="text-[10px] text-emerald-600 font-semibold">Tracked Clicks</span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EAE8E3]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#38332E]/70">Approved Reviews</p>
                  <p className="text-2xl font-serif-brand font-bold text-[#111111] mt-1">{reviews.length}</p>
                  <span className="text-[10px] text-amber-600 font-semibold">5.0 Star Average</span>
                </div>
              </div>

              {/* Quick Shortcuts */}
              <div className="p-5 rounded-2xl bg-[#111111] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-brand text-lg text-white font-medium">
                    Ready to add a new footwear design?
                  </h3>
                  <p className="text-xs text-[#D9D0C3] font-light mt-0.5">
                    Assign a unique article number (e.g. CD-3040), set price, sizes, and colors.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("products");
                    setIsNewProduct(true);
                    setEditingProduct({
                      id: "",
                      name: "New CADLEE Shoe",
                      articleNumber: `CD-${Math.floor(1000 + Math.random() * 9000)}`,
                      category: "men",
                      subcategory: "Sneakers",
                      collection: "Everyday Collection",
                      price: 2499,
                      originalPrice: 2999,
                      discountPercent: 17,
                      description: "Crafted with lightweight flexible soles and premium breathable upper.",
                      specifications: { Upper: "Synthetic Leather", Sole: "Rubber" },
                      images: ["/images/products/cd-1082-sneaker.jpg"],
                      mainImage: "/images/products/cd-1082-sneaker.jpg",
                      colors: [
                        {
                          name: "Jet Black",
                          hex: "#111111",
                          sizes: [
                            { size: "6", inStock: true },
                            { size: "7", inStock: true },
                            { size: "8", inStock: true },
                            { size: "9", inStock: true },
                            { size: "10", inStock: true },
                          ],
                        },
                      ],
                      isBestSeller: true,
                      published: true,
                      createdAt: new Date().toISOString(),
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#B99A70] text-[#111111] text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shrink-0 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Active WhatsApp Config banner */}
              <div className="p-4 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#38332E]/60">Active WhatsApp Receiver</span>
                    <p className="text-xs font-bold text-[#111111]">
                      {settings.whatsappDisplayNumber} ({settings.whatsappNumber})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab("whatsapp")}
                  className="text-xs font-semibold text-[#B99A70] hover:underline"
                >
                  Edit WhatsApp Number →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGER */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-serif-brand font-medium text-[#111111]">
                    Footwear Catalogue ({products.length})
                  </h2>
                  <p className="text-xs text-[#38332E]/70">
                    Add, edit prices, manage size stocks, configure colorways, and assign article numbers.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsNewProduct(true);
                    setEditingProduct({
                      id: "",
                      name: "CADLEE Signature Edition",
                      articleNumber: `CD-${Math.floor(1000 + Math.random() * 9000)}`,
                      category: "men",
                      subcategory: "Casual Shoes",
                      collection: "Premium Collection",
                      price: 2999,
                      originalPrice: 3499,
                      discountPercent: 14,
                      description: "Handcrafted comfort with all-day ergonomic support.",
                      specifications: { "Upper Material": "Vegan Leather", "Sole": "TPR Sole" },
                      images: ["/images/products/cd-1025-oxford.jpg"],
                      mainImage: "/images/products/cd-1025-oxford.jpg",
                      colors: [
                        {
                          name: "Jet Black",
                          hex: "#111111",
                          sizes: [
                            { size: "6", inStock: true },
                            { size: "7", inStock: true },
                            { size: "8", inStock: true },
                            { size: "9", inStock: true },
                            { size: "10", inStock: true },
                          ],
                        },
                      ],
                      isBestSeller: true,
                      published: true,
                      createdAt: new Date().toISOString(),
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] hover:text-[#111111] transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Footwear</span>
                </button>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#B99A70] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by article number (e.g. CD-1025) or name..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D9D0C3] text-xs text-[#111111] focus:border-[#B99A70] outline-none"
                  />
                </div>

                <div className="flex gap-1.5 p-1 bg-[#FAF9F6] border border-[#EAE8E3] rounded-xl self-start">
                  {["all", "men", "women", "kids"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductCategoryFilter(cat)}
                      className={`px-3 py-1 text-xs font-semibold uppercase rounded-lg transition-all ${
                        productCategoryFilter === cat
                          ? "bg-[#111111] text-white"
                          : "text-[#38332E] hover:text-[#111111]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table */}
              <div className="border border-[#EAE8E3] rounded-xl overflow-hidden overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF9F6] text-[#111111] border-b border-[#EAE8E3] font-semibold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Article No.</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Badges</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE8E3]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF9F6]/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#FAF9F6] shrink-0 border border-[#EAE8E3]">
                              <Image src={p.mainImage} alt={p.name} fill sizes="48px" className="object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#111111]">{p.name}</p>
                              <p className="text-[11px] text-[#38332E]/60">{p.subcategory}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono px-2 py-0.5 rounded bg-[#F7F5F0] border border-[#EAE8E3] text-[#111111] font-bold">
                            {p.articleNumber}
                          </span>
                        </td>
                        <td className="py-3 px-4 uppercase text-[11px] font-semibold text-[#38332E]/80">
                          {p.category}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-[#111111]">₹{p.price.toLocaleString("en-IN")}</span>
                          {p.originalPrice && (
                            <span className="text-[10px] text-[#38332E]/50 line-through ml-1.5">
                              ₹{p.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1 flex-wrap">
                            {p.isTrending && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#111111] text-white">
                                TRENDING
                              </span>
                            )}
                            {p.isBestSeller && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#B99A70] text-white">
                                BESTSELLER
                              </span>
                            )}
                            {p.isNewArrival && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-700 text-white">
                                NEW
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setIsNewProduct(false);
                                setEditingProduct(p);
                              }}
                              className="p-1.5 rounded-lg text-[#38332E] hover:text-[#B99A70] hover:bg-[#FAF9F6] transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete ${p.name} (${p.articleNumber})?`)) {
                                  deleteProduct(p.id);
                                  showToast("Product deleted!");
                                }
                              }}
                              className="p-1.5 rounded-lg text-[#38332E] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES MANAGER */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif-brand font-medium text-[#111111]">
                  Footwear Categories & Subcategories
                </h2>
                <p className="text-xs text-[#38332E]/70">
                  Manage photographic category tiles for Men, Women, and Kids.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#EAE8E3]">
                        <Image src={cat.image} alt={cat.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B99A70]">
                          {cat.gender}
                        </span>
                        <h4 className="text-sm font-semibold text-[#111111] truncate">{cat.name}</h4>
                        <p className="text-xs text-[#38332E]/60">{cat.itemCount} Designs</p>
                      </div>
                    </div>

                    <ImageUploader
                      label="Category Image"
                      value={cat.image}
                      onChange={(url) => updateCategory(cat.id, { image: url })}
                    />

                    <div>
                      <label className="block text-[10px] font-semibold uppercase text-[#38332E]/70 mb-1">
                        Subcategories (comma separated)
                      </label>
                      <input
                        type="text"
                        value={cat.featuredSubcategories.join(", ")}
                        onChange={(e) =>
                          updateCategory(cat.id, {
                            featuredSubcategories: e.target.value.split(",").map((s) => s.trim()),
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BANNERS & SLIDERS */}
          {activeTab === "banners" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-serif-brand font-medium text-[#111111]">
                  Homepage Promotional Banners
                </h2>
                <p className="text-xs text-[#38332E]/70">
                  Update hero slider slides (desktop & mobile banners), titles, and mid-page editorial banners.
                </p>
              </div>

              {/* Hero Sliders */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#B99A70]">
                  Hero Slides ({heroBanners.length})
                </h3>

                <div className="space-y-4">
                  {heroBanners.map((banner, idx) => (
                    <div key={banner.id} className="p-5 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                          Slide #{idx + 1}: {banner.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#EAE8E3]">
                          Alignment: {banner.alignment}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#111111] mb-1">Heading</label>
                          <input
                            type="text"
                            value={banner.title}
                            onChange={(e) => updateHeroBanner(banner.id, { title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-[#111111] mb-1">Tagline</label>
                          <input
                            type="text"
                            value={banner.tagline || ""}
                            onChange={(e) => updateHeroBanner(banner.id, { tagline: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#111111] mb-1">Subtitle</label>
                        <textarea
                          rows={2}
                          value={banner.subtitle}
                          onChange={(e) => updateHeroBanner(banner.id, { subtitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ImageUploader
                          label="Desktop Banner Image"
                          value={banner.desktopImage}
                          onChange={(url) => updateHeroBanner(banner.id, { desktopImage: url })}
                        />
                        <ImageUploader
                          label="Mobile Banner Image"
                          value={banner.mobileImage}
                          onChange={(url) => updateHeroBanner(banner.id, { mobileImage: url })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mid-page Editorial Banners */}
              <div className="space-y-4 pt-6 border-t border-[#EAE8E3]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#B99A70]">
                  Mid-Page Editorial Promotional Banners
                </h3>

                {/* Banner 1: Occasion */}
                <div className="p-5 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Banner 1: {settings.promoBanners.occasion.heading}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={settings.promoBanners.occasion.tagline || ""}
                        onChange={(e) =>
                          updateSettings({
                            promoBanners: {
                              ...settings.promoBanners,
                              occasion: { ...settings.promoBanners.occasion, tagline: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">Heading</label>
                      <input
                        type="text"
                        value={settings.promoBanners.occasion.heading}
                        onChange={(e) =>
                          updateSettings({
                            promoBanners: {
                              ...settings.promoBanners,
                              occasion: { ...settings.promoBanners.occasion, heading: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">Subheading</label>
                    <textarea
                      rows={2}
                      value={settings.promoBanners.occasion.subheading}
                      onChange={(e) =>
                        updateSettings({
                          promoBanners: {
                            ...settings.promoBanners,
                            occasion: { ...settings.promoBanners.occasion, subheading: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none resize-none"
                    />
                  </div>

                  <ImageUploader
                    label="Banner 1 Image (Upload or Paste URL)"
                    value={settings.promoBanners.occasion.imageSrc}
                    onChange={(url) =>
                      updateSettings({
                        promoBanners: {
                          ...settings.promoBanners,
                          occasion: { ...settings.promoBanners.occasion, imageSrc: url },
                        },
                      })
                    }
                  />
                </div>

                {/* Banner 2: Lifestyle */}
                <div className="p-5 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Banner 2: {settings.promoBanners.lifestyle.heading}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={settings.promoBanners.lifestyle.tagline || ""}
                        onChange={(e) =>
                          updateSettings({
                            promoBanners: {
                              ...settings.promoBanners,
                              lifestyle: { ...settings.promoBanners.lifestyle, tagline: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">Heading</label>
                      <input
                        type="text"
                        value={settings.promoBanners.lifestyle.heading}
                        onChange={(e) =>
                          updateSettings({
                            promoBanners: {
                              ...settings.promoBanners,
                              lifestyle: { ...settings.promoBanners.lifestyle, heading: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">Subheading</label>
                    <textarea
                      rows={2}
                      value={settings.promoBanners.lifestyle.subheading}
                      onChange={(e) =>
                        updateSettings({
                          promoBanners: {
                            ...settings.promoBanners,
                            lifestyle: { ...settings.promoBanners.lifestyle, subheading: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none resize-none"
                    />
                  </div>

                  <ImageUploader
                    label="Banner 2 Image (Upload or Paste URL)"
                    value={settings.promoBanners.lifestyle.imageSrc}
                    onChange={(url) =>
                      updateSettings({
                        promoBanners: {
                          ...settings.promoBanners,
                          lifestyle: { ...settings.promoBanners.lifestyle, imageSrc: url },
                        },
                      })
                    }
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => showToast("Promotional banners updated successfully!")}
                    className="px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] hover:text-[#111111] transition-colors"
                  >
                    Save Promotional Banners
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HEADINGS & STORY CONTENT */}
          {activeTab === "content" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-serif-brand font-medium text-[#111111]">
                  Headings & Brand Story Content
                </h2>
                <p className="text-xs text-[#38332E]/70">
                  Edit announcement bar messages and the brand narrative text.
                </p>
              </div>

              {/* Announcement Bar Messages */}
              <div className="p-5 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#B99A70]">
                  Announcement Bar Messages
                </h3>

                <div className="space-y-2">
                  {settings.announcementMessages.map((msg, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={msg}
                        onChange={(e) => {
                          const updated = [...settings.announcementMessages];
                          updated[i] = e.target.value;
                          updateSettings({ announcementMessages: updated });
                        }}
                        className="flex-1 px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                      />
                      <button
                        onClick={() => {
                          const updated = settings.announcementMessages.filter((_, idx) => idx !== i);
                          updateSettings({ announcementMessages: updated });
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add message */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Add new announcement bar message..."
                    value={newAnnouncement}
                    onChange={(e) => setNewAnnouncement(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                  />
                  <button
                    onClick={() => {
                      if (!newAnnouncement.trim()) return;
                      updateSettings({
                        announcementMessages: [...settings.announcementMessages, newAnnouncement.trim()],
                      });
                      setNewAnnouncement("");
                      showToast("Announcement added!");
                    }}
                    className="px-4 py-2 bg-[#111111] text-white text-xs font-semibold rounded-lg hover:bg-[#B99A70] transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Brand Story Editor */}
              <div className="p-5 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#B99A70]">
                  Brand Story Section
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#111111] mb-1">Section Tagline</label>
                    <input
                      type="text"
                      value={settings.brandStory.tagline}
                      onChange={(e) =>
                        updateSettings({
                          brandStory: { ...settings.brandStory, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#111111] mb-1">Headline</label>
                    <input
                      type="text"
                      value={settings.brandStory.title}
                      onChange={(e) =>
                        updateSettings({
                          brandStory: { ...settings.brandStory, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Shoemaking / Brand Story Image (Upload or Paste URL)"
                  value={settings.brandStory.image}
                  onChange={(url) =>
                    updateSettings({
                      brandStory: { ...settings.brandStory, image: url },
                    })
                  }
                />

                {/* Overlapping Badge Details */}
                <div className="p-4 rounded-lg bg-white border border-[#EAE8E3] space-y-3">
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                    Image Overlay Badge (Floating Box on Image)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">Badge Title</label>
                      <input
                        type="text"
                        value={settings.brandStory.badgeTitle || "CADLEE® FOOTWEAR"}
                        onChange={(e) =>
                          updateSettings({
                            brandStory: { ...settings.brandStory, badgeTitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">Badge Description</label>
                      <input
                        type="text"
                        value={settings.brandStory.badgeDescription || ""}
                        onChange={(e) =>
                          updateSettings({
                            brandStory: { ...settings.brandStory, badgeDescription: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Story Description Paragraphs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-semibold text-[#111111]">
                      Story Narrative Descriptions / Paragraphs ({settings.brandStory.paragraphs.length})
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        updateSettings({
                          brandStory: {
                            ...settings.brandStory,
                            paragraphs: [
                              ...settings.brandStory.paragraphs,
                              "New narrative paragraph highlighting CADLEE footwear craftsmanship and comfort.",
                            ],
                          },
                        });
                        showToast("New paragraph added!");
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B99A70] hover:text-[#111111]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Paragraph</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {settings.brandStory.paragraphs.map((p, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <textarea
                          rows={3}
                          value={p}
                          onChange={(e) => {
                            const updated = [...settings.brandStory.paragraphs];
                            updated[idx] = e.target.value;
                            updateSettings({
                              brandStory: { ...settings.brandStory, paragraphs: updated },
                            });
                          }}
                          className="flex-1 px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (settings.brandStory.paragraphs.length <= 1) {
                              alert("You must keep at least one paragraph.");
                              return;
                            }
                            const updated = settings.brandStory.paragraphs.filter((_, i) => i !== idx);
                            updateSettings({
                              brandStory: { ...settings.brandStory, paragraphs: updated },
                            });
                            showToast("Paragraph removed");
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg shrink-0 mt-1"
                          title="Delete paragraph"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Pillars */}
                <div className="space-y-3 pt-3 border-t border-[#EAE8E3]">
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                    Core Value Pillars (Bullet Points)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {settings.brandStory.pillars.map((pillar, pIdx) => (
                      <div key={pIdx} className="p-3 rounded-lg bg-white border border-[#EAE8E3] space-y-2">
                        <div>
                          <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">
                            Pillar {pIdx + 1} Title
                          </label>
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) => {
                              const updated = [...settings.brandStory.pillars];
                              updated[pIdx] = { ...pillar, title: e.target.value };
                              updateSettings({
                                brandStory: { ...settings.brandStory, pillars: updated },
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-[#38332E]/70 mb-1">
                            Pillar {pIdx + 1} Description
                          </label>
                          <textarea
                            rows={2}
                            value={pillar.description}
                            onChange={(e) => {
                              const updated = [...settings.brandStory.pillars];
                              updated[pIdx] = { ...pillar, description: e.target.value };
                              updateSettings({
                                brandStory: { ...settings.brandStory, pillars: updated },
                              });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => showToast("Brand story updated successfully!")}
                    className="px-5 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] hover:text-[#111111] transition-colors"
                  >
                    Save Brand Story
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMER REVIEWS */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif-brand font-medium text-[#111111]">
                    Customer Reviews & Feedback ({reviews.length})
                  </h2>
                  <p className="text-xs text-[#38332E]/70">
                    Approve, edit, or add verified customer impressions.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsNewReview(true);
                    setEditingReview({
                      id: "",
                      customerName: "New Client",
                      rating: 5,
                      reviewText: "Exceptional comfort and prompt WhatsApp sizing assistance.",
                      productPurchased: "Royale Oxford Classic",
                      articleNumber: "CD-1025",
                      verified: true,
                      date: "October 2026",
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setIsNewReview(false);
                            setEditingReview(rev);
                          }}
                          className="p-1 text-[#38332E] hover:text-[#B99A70]"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete review from ${rev.customerName}?`)) {
                              deleteReview(rev.id);
                              showToast("Review deleted");
                            }
                          }}
                          className="p-1 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[#38332E] italic">&ldquo;{rev.reviewText}&rdquo;</p>

                    <div className="pt-2 border-t border-[#EAE8E3] text-[11px] text-[#38332E]/70 flex items-center justify-between">
                      <span className="font-semibold text-[#111111]">{rev.customerName}</span>
                      <span className="font-mono text-[#B99A70]">{rev.articleNumber}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: WHATSAPP & CONTACT */}
          {activeTab === "whatsapp" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif-brand font-medium text-[#111111]">
                  WhatsApp & Contact Settings
                </h2>
                <p className="text-xs text-[#38332E]/70">
                  Update the WhatsApp number where customer enquiries are routed, and business contact information.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-4 max-w-xl">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All product enquiry buttons across the website connect directly to this number.</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">
                    WhatsApp Country Code + Number (without + or spaces)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                    placeholder="e.g. 919876543210"
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs font-mono font-bold text-[#111111] bg-white outline-none"
                  />
                  <p className="text-[10px] text-[#38332E]/60 mt-1">Example: For India (+91), enter 91 followed by 10-digit number.</p>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">
                    Display Number (Formatted for Header and Footer)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappDisplayNumber}
                    onChange={(e) => updateSettings({ whatsappDisplayNumber: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Business Support Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Business Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => updateSettings({ address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Business Hours</label>
                  <input
                    type="text"
                    value={settings.businessHours}
                    onChange={(e) => updateSettings({ businessHours: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => showToast("Contact settings updated successfully!")}
                  className="w-full py-2.5 rounded-lg bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] transition-colors"
                >
                  Save Contact Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: SOCIAL MEDIA LINKS */}
          {activeTab === "social" && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-xl font-serif-brand font-medium text-[#111111]">
                  Social Media Links
                </h2>
                <p className="text-xs text-[#38332E]/70">
                  Update links that appear in the footer and social channels.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) => updateSettings({ instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Facebook URL</label>
                  <input
                    type="url"
                    value={settings.facebookUrl}
                    onChange={(e) => updateSettings({ facebookUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">YouTube URL</label>
                  <input
                    type="url"
                    value={settings.youtubeUrl}
                    onChange={(e) => updateSettings({ youtubeUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Twitter / X URL</label>
                  <input
                    type="url"
                    value={settings.twitterUrl}
                    onChange={(e) => updateSettings({ twitterUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white outline-none font-mono"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => showToast("Social media links saved!")}
                  className="w-full py-2.5 rounded-lg bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] transition-colors"
                >
                  Save Social Links
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: POLICIES & FAQS */}
          {activeTab === "policies" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-serif-brand font-medium text-[#111111]">
                  Policy Content & FAQ Editor
                </h2>
                <p className="text-xs text-[#38332E]/70">
                  Update FAQ questions, Shipping & Dispatch, Returns & Exchange, Privacy Policy, and Terms.
                </p>
              </div>

              {/* FAQs Editor */}
              <div className="p-5 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#B99A70]">
                    FAQs ({settings.faqs.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {settings.faqs.map((faq, i) => (
                    <div key={faq.id} className="p-3 bg-white border border-[#EAE8E3] rounded-lg space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...settings.faqs];
                            updated[i].question = e.target.value;
                            updateSettings({ faqs: updated });
                          }}
                          className="flex-1 text-xs font-semibold text-[#111111] outline-none"
                        />
                        <button
                          onClick={() => {
                            const updated = settings.faqs.filter((_, idx) => idx !== i);
                            updateSettings({ faqs: updated });
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...settings.faqs];
                          updated[i].answer = e.target.value;
                          updateSettings({ faqs: updated });
                        }}
                        className="w-full text-xs text-[#38332E] outline-none border border-[#F4F3F0] p-1.5 rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Add new FAQ */}
                <div className="p-3 bg-white border border-[#D9D0C3] rounded-lg space-y-2">
                  <p className="text-[11px] font-bold text-[#111111]">Add New FAQ Question</p>
                  <input
                    type="text"
                    placeholder="Question..."
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#EAE8E3] rounded text-xs outline-none"
                  />
                  <textarea
                    rows={2}
                    placeholder="Answer..."
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    className="w-full px-3 py-1.5 border border-[#EAE8E3] rounded text-xs outline-none resize-none"
                  />
                  <button
                    onClick={() => {
                      if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
                      const newF: FAQItem = {
                        id: `faq-${Date.now()}`,
                        question: newFaqQuestion.trim(),
                        answer: newFaqAnswer.trim(),
                        category: "general",
                      };
                      updateSettings({ faqs: [...settings.faqs, newF] });
                      setNewFaqQuestion("");
                      setNewFaqAnswer("");
                      showToast("FAQ added!");
                    }}
                    className="px-4 py-1.5 bg-[#111111] text-white text-xs font-semibold rounded hover:bg-[#B99A70]"
                  >
                    Add FAQ
                  </button>
                </div>
              </div>

              {/* Policy Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Shipping */}
                <div className="p-4 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    {settings.shippingPolicy.title}
                  </h4>
                  <p className="text-[11px] text-[#38332E]/70">
                    {settings.shippingPolicy.sections.length} clauses configured.
                  </p>
                  <button
                    onClick={() => showToast("Shipping policy is active and editable!")}
                    className="text-xs font-semibold text-[#B99A70] hover:underline"
                  >
                    View / Edit Clauses →
                  </button>
                </div>

                {/* Returns */}
                <div className="p-4 rounded-xl border border-[#EAE8E3] bg-[#FAF9F6] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    {settings.returnsPolicy.title}
                  </h4>
                  <p className="text-[11px] text-[#38332E]/70">
                    {settings.returnsPolicy.sections.length} clauses configured.
                  </p>
                  <button
                    onClick={() => showToast("Returns policy is active and editable!")}
                    className="text-xs font-semibold text-[#B99A70] hover:underline"
                  >
                    View / Edit Clauses →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: ENQUIRY CLICK LOGS */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-serif-brand font-medium text-[#111111]">
                    WhatsApp Enquiry Click Activity Log ({enquiryClicks.length})
                  </h2>
                  <p className="text-xs text-[#38332E]/70">
                    Tracks customer enquiry clicks with chosen Article Number, size, and colour.
                  </p>
                </div>

                {enquiryClicks.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm("Clear enquiry log?")) {
                        clearEnquiryClicks();
                        showToast("Log cleared");
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {enquiryClicks.length === 0 ? (
                <div className="text-center py-16 px-4 text-[#38332E]/60 border border-dashed border-[#EAE8E3] rounded-xl">
                  <BarChart3 className="w-10 h-10 text-[#D9D0C3] mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#111111]">No Enquiry Clicks Yet</p>
                  <p className="text-xs mt-1">
                    When visitors click &ldquo;Enquire on WhatsApp&rdquo; for any shoe, the event will appear here in real time.
                  </p>
                </div>
              ) : (
                <div className="border border-[#EAE8E3] rounded-xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#FAF9F6] text-[#111111] border-b border-[#EAE8E3] font-semibold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Timestamp</th>
                        <th className="py-3 px-4">Footwear Name</th>
                        <th className="py-3 px-4">Article No.</th>
                        <th className="py-3 px-4">Size</th>
                        <th className="py-3 px-4">Colour</th>
                        <th className="py-3 px-4">Source</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE8E3]">
                      {enquiryClicks.map((log) => (
                        <tr key={log.id} className="hover:bg-[#FAF9F6]/50">
                          <td className="py-2.5 px-4 font-mono text-[11px] text-[#38332E]/70">
                            {new Date(log.timestamp).toLocaleString("en-IN")}
                          </td>
                          <td className="py-2.5 px-4 font-semibold text-[#111111]">{log.productName}</td>
                          <td className="py-2.5 px-4 font-mono text-[#B99A70] font-bold">{log.articleNumber}</td>
                          <td className="py-2.5 px-4 font-mono font-bold">{log.selectedSize}</td>
                          <td className="py-2.5 px-4">{log.selectedColor}</td>
                          <td className="py-2.5 px-4 text-[10px] text-[#38332E]/60">{log.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* PRODUCT EDIT / ADD MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />

          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#EAE8E3] overflow-hidden z-10 flex flex-col max-h-[90vh] animate-fadeIn">
            <div className="p-4 sm:p-6 border-b border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-between">
              <h3 className="font-serif-brand text-lg font-medium text-[#111111]">
                {isNewProduct ? "Add New Footwear Design" : `Edit: ${editingProduct.name}`}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="p-1 rounded-full text-[#38332E]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Article Number / SKU</label>
                  <input
                    type="text"
                    value={editingProduct.articleNumber}
                    onChange={(e) => setEditingProduct({ ...editingProduct, articleNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs font-mono font-bold text-[#111111] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs font-bold text-[#111111] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#111111] mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value as "men" | "women" | "kids",
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] outline-none bg-white"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#111111] mb-1">Subcategory</label>
                <input
                  type="text"
                  value={editingProduct.subcategory}
                  onChange={(e) => setEditingProduct({ ...editingProduct, subcategory: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#111111] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] outline-none resize-none"
                />
              </div>

              <ImageUploader
                  label="Main Product Image"
                  value={editingProduct.mainImage}
                  onChange={(url) => setEditingProduct({ ...editingProduct, mainImage: url })}
                />

              {/* Status checkboxes */}
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-1.5 text-xs text-[#111111] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isTrending || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isTrending: e.target.checked })}
                    className="rounded text-[#B99A70]"
                  />
                  <span>Mark as Trending</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs text-[#111111] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestSeller || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                    className="rounded text-[#B99A70]"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-1.5 text-xs text-[#111111] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isNewArrival || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isNewArrival: e.target.checked })}
                    className="rounded text-[#B99A70]"
                  />
                  <span>Mark as New Arrival</span>
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-lg border border-[#D9D0C3] text-xs font-semibold text-[#38332E]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isNewProduct) {
                    addProduct(editingProduct);
                    showToast("New footwear added to catalogue!");
                  } else {
                    updateProduct(editingProduct.id, editingProduct);
                    showToast("Footwear updated!");
                  }
                  setEditingProduct(null);
                }}
                className="px-5 py-2 rounded-lg bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70] hover:text-[#111111] transition-colors"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REVIEW EDIT / ADD MODAL */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditingReview(null)} />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#EAE8E3] overflow-hidden z-10 flex flex-col animate-fadeIn">
            <div className="p-4 border-b border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-between">
              <h3 className="font-serif-brand text-base font-semibold text-[#111111]">
                {isNewReview ? "Add Customer Review" : "Edit Customer Review"}
              </h3>
              <button onClick={() => setEditingReview(null)} className="p-1 rounded-full text-[#38332E]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#111111] mb-1">Customer Name</label>
                <input
                  type="text"
                  value={editingReview.customerName}
                  onChange={(e) => setEditingReview({ ...editingReview, customerName: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#111111] mb-1">Star Rating (1 - 5)</label>
                <select
                  value={editingReview.rating}
                  onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111] bg-white"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#111111] mb-1">Product Purchased</label>
                <input
                  type="text"
                  value={editingReview.productPurchased}
                  onChange={(e) => setEditingReview({ ...editingReview, productPurchased: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#111111] mb-1">Review Text</label>
                <textarea
                  rows={3}
                  value={editingReview.reviewText}
                  onChange={(e) => setEditingReview({ ...editingReview, reviewText: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs text-[#111111]"
                />
              </div>
            </div>

            <div className="p-4 border-t border-[#EAE8E3] bg-[#FAF9F6] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="px-3 py-1.5 rounded-lg border border-[#D9D0C3] text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isNewReview) {
                    addReview(editingReview);
                    showToast("Review created!");
                  } else {
                    updateReview(editingReview.id, editingReview);
                    showToast("Review updated!");
                  }
                  setEditingReview(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-[#111111] text-white text-xs font-semibold hover:bg-[#B99A70]"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <DataProvider>
      <AdminDashboardContent />
    </DataProvider>
  );
}
