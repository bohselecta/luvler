-- Clinic management schema

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references orgs(id),
  first_name text not null,
  last_name text not null,
  dob date,
  guardian_name text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists cases (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  title text not null,
  status text default 'open',
  opened_at timestamptz default now(),
  closed_at timestamptz
);

create table if not exists client_files (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  file_url text not null,
  file_name text,
  created_at timestamptz default now()
);

create table if not exists client_notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade,
  author_id uuid references users(id),
  body text not null,
  created_at timestamptz default now()
);


