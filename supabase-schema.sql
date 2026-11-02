-- ========================================================
-- CADLEE® FOOTWEAR - SUPABASE DATABASE INITIALIZATION SCRIPT
-- Run this in Supabase Dashboard -> SQL Editor -> New Query
-- ========================================================

-- 1. Create Storage Bucket for footwear photos and banners
INSERT INTO storage.buckets (id, name, public)
VALUES ('cadlee-media', 'cadlee-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to cadlee-media bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'cadlee-media');

-- Allow uploads to cadlee-media bucket
CREATE POLICY "Public or Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'cadlee-media');

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  article_number TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- 'men', 'women', 'kids'
  subcategory TEXT NOT NULL,
  collection TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  discount_percent NUMERIC,
  description TEXT,
  specifications JSONB DEFAULT '{}'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  main_image TEXT NOT NULL,
  colors JSONB DEFAULT '[]'::jsonb,
  is_trending BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public products viewable by everyone"
ON public.products FOR SELECT
USING (true);

CREATE POLICY "Products editable by service role or authenticated"
ON public.products FOR ALL
USING (true)
WITH CHECK (true);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  gender TEXT NOT NULL,
  image TEXT NOT NULL,
  item_count INTEGER DEFAULT 0,
  featured_subcategories JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public categories viewable by everyone"
ON public.categories FOR SELECT
USING (true);

CREATE POLICY "Categories editable"
ON public.categories FOR ALL
USING (true)
WITH CHECK (true);

-- 4. Hero Banners Table
CREATE TABLE IF NOT EXISTS public.hero_banners (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  tagline TEXT,
  desktop_image TEXT NOT NULL,
  mobile_image TEXT NOT NULL,
  cta_text TEXT NOT NULL,
  cta_link TEXT NOT NULL,
  alignment TEXT DEFAULT 'left',
  sort_order INTEGER DEFAULT 0
);

ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public hero banners viewable by everyone"
ON public.hero_banners FOR SELECT
USING (true);

CREATE POLICY "Hero banners editable"
ON public.hero_banners FOR ALL
USING (true)
WITH CHECK (true);

-- 5. Website Settings (Single Row for global store config)
CREATE TABLE IF NOT EXISTS public.website_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  whatsapp_number TEXT NOT NULL,
  whatsapp_display_number TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  address TEXT NOT NULL,
  business_hours TEXT NOT NULL,
  announcement_messages JSONB DEFAULT '[]'::jsonb,
  promo_banners JSONB DEFAULT '{}'::jsonb,
  brand_story JSONB DEFAULT '{}'::jsonb,
  instagram_url TEXT,
  facebook_url TEXT,
  youtube_url TEXT,
  twitter_url TEXT,
  faqs JSONB DEFAULT '[]'::jsonb,
  shipping_policy JSONB DEFAULT '{}'::jsonb,
  returns_policy JSONB DEFAULT '{}'::jsonb,
  privacy_policy JSONB DEFAULT '{}'::jsonb,
  terms_policy JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public settings viewable by everyone"
ON public.website_settings FOR SELECT
USING (true);

CREATE POLICY "Settings editable"
ON public.website_settings FOR ALL
USING (true)
WITH CHECK (true);

-- 6. Customer Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  review_text TEXT NOT NULL,
  product_purchased TEXT,
  article_number TEXT,
  verified BOOLEAN DEFAULT true,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reviews viewable by everyone"
ON public.reviews FOR SELECT
USING (true);

CREATE POLICY "Reviews editable"
ON public.reviews FOR ALL
USING (true)
WITH CHECK (true);

-- 7. WhatsApp Enquiry Clicks Log
CREATE TABLE IF NOT EXISTS public.enquiry_clicks (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  article_number TEXT NOT NULL,
  selected_size TEXT NOT NULL,
  selected_color TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'quick_modal'
);

ALTER TABLE public.enquiry_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enquiry clicks insertable"
ON public.enquiry_clicks FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enquiry clicks viewable"
ON public.enquiry_clicks FOR SELECT
USING (true);

