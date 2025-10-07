-- Initial schema
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  identity_id text unique,
  email text unique not null,
  name text,
  role text default 'user',
  created_at timestamptz default now()
);

create table if not exists orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references users(id),
  created_at timestamptz default now()
);

create table if not exists memberships (
  user_id uuid references users(id),
  org_id uuid references orgs(id),
  role text default 'member',
  primary key (user_id, org_id)
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id),
  stripe_customer_id text,
  tier text,
  status text,
  period_end timestamptz
);

create table if not exists consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  version text not null,
  accepted_at timestamptz default now(),
  ip text
);

create table if not exists usage (
  org_id uuid references orgs(id),
  month text,
  analyses_used int default 0,
  primary key (org_id, month)
);


