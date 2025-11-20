-- Enable Row Level Security
alter default privileges revoke execute on functions from public;

-- Create applications table
create type application_status as enum ('pending', 'processing', 'completed', 'rejected');

create table public.applications (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  full_name text not null,
  dob date not null,
  pob text not null, -- Place of Birth
  gender text not null,
  email text not null,
  whatsapp text not null,
  country text not null,
  id_number text not null,
  passport_photo_path text, -- Path in Supabase Storage
  id_photo_path text, -- Path in Supabase Storage
  status application_status not null default 'pending',
  notes text,
  
  constraint applications_pkey primary key (id)
);

-- Enable RLS
alter table public.applications enable row level security;

-- Policies
-- Allow anyone to insert (public application form)
create policy "Allow public insert"
on public.applications
for insert
to anon
with check (true);

-- Allow admins to view all
-- For now, we assume authenticated users are admins or we will add a specific role check later.
create policy "Allow authenticated read"
on public.applications
for select
to authenticated
using (true);

create policy "Allow authenticated update"
on public.applications
for update
to authenticated
using (true);
