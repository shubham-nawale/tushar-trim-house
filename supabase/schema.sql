create table if not exists salons (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Tushar Trim House',
  phone text,
  address text,
  opening_time time not null default '09:00:00',
  closing_time time not null default '20:00:00',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists chairs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price integer not null check (price >= 0),
  duration_minutes integer not null check (duration_minutes > 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  booking_code text not null unique,
  customer_name text not null,
  customer_phone text not null,
  service_id uuid not null references services(id) on delete restrict,
  chair_id uuid not null references chairs(id) on delete restrict,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text not null default 'RESERVED' check (status in ('RESERVED','ARRIVED','IN_SERVICE','COMPLETED','CANCELLED','NO_SHOW')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reservations_time_order check (end_time > start_time)
);

create index if not exists reservations_time_idx on reservations (start_time, end_time);
create index if not exists reservations_chair_idx on reservations (chair_id, start_time);

alter table salons enable row level security;
alter table chairs enable row level security;
alter table services enable row level security;
alter table reservations enable row level security;

create policy "public read salon info" on salons for select using (true);
create policy "public read active chairs" on chairs for select using (active = true);
create policy "public read active services" on services for select using (active = true);
create policy "public read reservation public limited" on reservations for select using (true);

create policy "authenticated full access" on chairs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full access" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated full access" on reservations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated update salon" on salons for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into chairs (name, active)
values ('Chair 01', true), ('Chair 02', true)
on conflict do nothing;

insert into services (name, description, price, duration_minutes, active)
values
  ('Haircut', 'Precision cut tailored to your style.', 150, 30, true),
  ('Beard Trim', 'Sharp detailing and sculpting.', 100, 20, true),
  ('Haircut + Beard', 'Full groom refresh for a polished finish.', 250, 45, true),
  ('Haircut + Styling', 'Cut and styled for a sharper finish.', 300, 60, true)
on conflict do nothing;

insert into salons (name, phone, address, opening_time, closing_time)
values ('Tushar Trim House', '+91 98765 43210', 'Premium grooming studio', '09:00:00', '20:00:00')
on conflict do nothing;
