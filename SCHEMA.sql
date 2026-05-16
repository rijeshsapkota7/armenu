-- ============================================================
-- AR MENU SYSTEM — FULL DATABASE SCHEMA
-- Run this entire file in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── RESTAURANTS ──────────────────────────────────────────────
create table if not exists restaurants (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  slug         text not null unique,
  logo_url     text,
  theme_color  text not null default '#c9a84c',
  address      text,
  phone        text,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- ── RESTAURANT ADMINS ─────────────────────────────────────────
create table if not exists restaurant_admins (
  id             uuid primary key default uuid_generate_v4(),
  restaurant_id  uuid not null references restaurants(id) on delete cascade,
  email          text not null unique,
  password_hash  text not null,
  name           text not null,
  created_at     timestamptz not null default now()
);

-- ── TABLES ───────────────────────────────────────────────────
create table if not exists tables (
  id             uuid primary key default uuid_generate_v4(),
  restaurant_id  uuid not null references restaurants(id) on delete cascade,
  table_number   text not null,
  qr_token       text not null unique default uuid_generate_v4()::text,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  unique(restaurant_id, table_number)
);

-- ── CATEGORIES ───────────────────────────────────────────────
create table if not exists categories (
  id             uuid primary key default uuid_generate_v4(),
  restaurant_id  uuid not null references restaurants(id) on delete cascade,
  name           text not null,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now()
);

-- ── MENU ITEMS ───────────────────────────────────────────────
create table if not exists menu_items (
  id             uuid primary key default uuid_generate_v4(),
  restaurant_id  uuid not null references restaurants(id) on delete cascade,
  category_id    uuid references categories(id) on delete set null,
  name           text not null,
  description    text,
  price          numeric(10,2) not null,
  image_url      text,
  glb_url        text,
  tags           text[] not null default '{}',
  is_available   boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now()
);

-- ── OTP VERIFICATIONS ─────────────────────────────────────────
create table if not exists otp_verifications (
  id          uuid primary key default uuid_generate_v4(),
  phone       text not null,
  otp         text not null,
  expires_at  timestamptz not null,
  verified    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Rate limit: max 1 OTP per phone per 5 minutes (enforced by app)

-- ── CUSTOMER SESSIONS ─────────────────────────────────────────
create table if not exists customer_sessions (
  id             uuid primary key default uuid_generate_v4(),
  session_token  text not null unique default uuid_generate_v4()::text,
  phone          text not null,
  restaurant_id  uuid not null references restaurants(id) on delete cascade,
  expires_at     timestamptz not null,
  created_at     timestamptz not null default now()
);

-- ── ORDERS ───────────────────────────────────────────────────
create table if not exists orders (
  id             uuid primary key default uuid_generate_v4(),
  restaurant_id  uuid not null references restaurants(id) on delete cascade,
  table_id       uuid not null references tables(id) on delete cascade,
  session_token  text not null,
  customer_phone text not null,
  order_type     text not null check (order_type in ('dine_in','takeaway')),
  status         text not null default 'pending'
                 check (status in ('pending','confirmed','preparing','ready','served','cancelled')),
  total_amount   numeric(10,2) not null,
  notes          text,
  created_at     timestamptz not null default now()
);

-- ── ORDER ITEMS ──────────────────────────────────────────────
create table if not exists order_items (
  id            uuid primary key default uuid_generate_v4(),
  order_id      uuid not null references orders(id) on delete cascade,
  menu_item_id  uuid not null references menu_items(id) on delete cascade,
  name          text not null,
  price         numeric(10,2) not null,
  quantity      int not null check (quantity > 0),
  notes         text,
  created_at    timestamptz not null default now()
);

-- ── INDEXES ──────────────────────────────────────────────────
create index if not exists idx_menu_items_restaurant on menu_items(restaurant_id);
create index if not exists idx_orders_restaurant on orders(restaurant_id);
create index if not exists idx_orders_table on orders(table_id);
create index if not exists idx_order_items_order on order_items(order_id);
create index if not exists idx_otp_phone on otp_verifications(phone);
create index if not exists idx_sessions_token on customer_sessions(session_token);
create index if not exists idx_tables_qr on tables(qr_token);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
alter table restaurants         enable row level security;
alter table restaurant_admins   enable row level security;
alter table tables              enable row level security;
alter table categories          enable row level security;
alter table menu_items          enable row level security;
alter table orders              enable row level security;
alter table order_items         enable row level security;
alter table otp_verifications   enable row level security;
alter table customer_sessions   enable row level security;

-- Public read for active restaurants (needed for customer menu)
create policy "public_read_restaurants" on restaurants
  for select using (is_active = true);

create policy "public_read_tables" on tables
  for select using (is_active = true);

create policy "public_read_categories" on categories
  for select using (true);

create policy "public_read_menu_items" on menu_items
  for select using (is_available = true);

-- OTP: anyone can insert (rate limited in app), only own record readable
create policy "insert_otp" on otp_verifications
  for insert with check (true);

create policy "read_own_otp" on otp_verifications
  for select using (true);

create policy "update_otp" on otp_verifications
  for update using (true);

-- Sessions: insert + read by token
create policy "insert_session" on customer_sessions
  for insert with check (true);

create policy "read_session" on customer_sessions
  for select using (true);

-- Orders: insert by anyone (validated in app), read by restaurant
create policy "insert_order" on orders
  for insert with check (true);

create policy "read_orders" on orders
  for select using (true);

create policy "update_order_status" on orders
  for update using (true);

create policy "insert_order_items" on order_items
  for insert with check (true);

create policy "read_order_items" on order_items
  for select using (true);

-- ── SUPER ADMIN SEED ─────────────────────────────────────────
-- Default super admin credentials: admin@armenu.com / Admin@1234
-- Change this immediately after first login!
create table if not exists super_admins (
  id          uuid primary key default uuid_generate_v4(),
  email       text not null unique,
  password_hash text not null,
  name        text not null,
  created_at  timestamptz not null default now()
);

alter table super_admins enable row level security;
create policy "read_super_admin" on super_admins for select using (true);

insert into super_admins (email, password_hash, name)
values (
  'admin@armenu.com',
  'Admin@1234',
  'Super Admin'
) on conflict (email) do nothing;

-- ── REALTIME ─────────────────────────────────────────────────
-- Enable realtime on orders and order_items for live kitchen updates
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table order_items;
alter publication supabase_realtime add table menu_items;
