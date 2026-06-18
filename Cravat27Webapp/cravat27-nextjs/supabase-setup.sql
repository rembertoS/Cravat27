-- ============================================================
-- Cravat27 Barbershop — Supabase setup
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- 1. SERVICES TABLE
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price text not null,
  duration text not null,
  image_url text,
  visible boolean default true,
  display_order integer,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- 2. BUSINESS INFO TABLE (single row)
create table if not exists business_info (
  id uuid primary key default gen_random_uuid(),
  hours_weekday text,
  hours_sunday text,
  phone text,
  email text,
  address text,
  instagram_handle text,
  booking_url text
);

-- 3. GALLERY TABLE (future use)
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  display_order integer,
  visible boolean default true,
  created_at timestamp default now()
);

-- ============================================================
-- SEED DATA
-- ============================================================

insert into services (name, price, duration, display_order, image_url, visible) values
  ('Regular Hair Cut', '$35', '40 min', 1, '/services/service-1.jpg', true),
  ('Skin Fade', '$40', '40 min', 2, '/services/service-2.jpg', true),
  ('Skin Fade + Beard + Hot Towel', '$65', '50 min', 3, '/services/service-3.jpg', true),
  ('Hair Cut + Shampoo + Hot Towel', '$50', '55 min', 4, '/services/service-4.jpg', true),
  ('Hair Cut + Mini Facial + Hot Towel', '$65', '55 min', 5, '/services/service-5.jpg', true),
  ('Hair Cut + Beard Trim + Hot Towel', '$65', '50 min', 6, '/services/service-6.jpg', true),
  ('Beard Trim + Hot Towel', '$35', '30 min', 7, '/services/service-7.jpg', true),
  ('Beard Shave', '$25', '30 min', 8, '/services/service-8.jpg', true),
  ('Cravat VIP — Cut + Beard + Towel + Massage + Facial', '$80', '1 hr', 9, '/services/service-9.jpg', true),
  ('Kids Hair Cut', '$30', '30 min', 10, '/services/service-10.jpg', true),
  ('Ear Waxing', '$15', '15 min', 11, '/services/service-11.jpg', true),
  ('Curl Permanent', '$120', '1 hr 45 min', 12, '/services/service-12.jpg', true),
  ('Cravat Mask', '$15', '15 min', 13, '/services/service-13.jpg', true),
  ('Cravat Keratin', 'Price Varies', '20 min', 14, '/services/service-14.jpg', true),
  ('Cravat Highlights', '$120', '1 hr 30 min', 15, '/services/service-15.jpg', true),
  ('Bleach and Toner', '$120.99', '1 hr 45 min', 16, '/services/service-16.jpg', true),
  ('Beard Coloring', '$30', '20 min', 17, '/services/service-17.jpg', true),
  ('Eyebrow Detailing', '$10', '5 min', 18, '/services/service-18.jpg', true);

insert into business_info (hours_weekday, hours_sunday, phone, email, address, instagram_handle, booking_url) values
  ('9:00 AM – 8:00 PM', '10:00 AM – 4:00 PM', '754-272-8990', 'Cravat27@gmail.com',
   '5021 S State Rd 7, Unit 207, Davie, FL 33314', '@Cravat27barbershop',
   'https://app.squareup.com/appointments/book/gk821yrxav5w2o/LTNC2YNVJCRB4/start');

-- ============================================================
-- ROW LEVEL SECURITY
-- Public site reads data; only logged-in admin writes.
-- ============================================================

alter table services enable row level security;
alter table business_info enable row level security;
alter table gallery enable row level security;

-- Public read access
create policy "public read services" on services for select using (true);
create policy "public read business_info" on business_info for select using (true);
create policy "public read gallery" on gallery for select using (true);

-- Authenticated write access (admin)
create policy "auth write services" on services for all to authenticated using (true) with check (true);
create policy "auth write business_info" on business_info for all to authenticated using (true) with check (true);
create policy "auth write gallery" on gallery for all to authenticated using (true) with check (true);

-- ============================================================
-- STORAGE BUCKET (for uploaded photos)
-- Also create a PUBLIC bucket named "images" in Dashboard → Storage,
-- or run the following:
-- ============================================================
insert into storage.buckets (id, name, public) values ('images', 'images', true)
  on conflict (id) do nothing;

create policy "public read images" on storage.objects for select using (bucket_id = 'images');
create policy "auth upload images" on storage.objects for insert to authenticated with check (bucket_id = 'images');
create policy "auth update images" on storage.objects for update to authenticated using (bucket_id = 'images');
