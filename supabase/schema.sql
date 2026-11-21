-- Moroccan Gastronomy database schema
-- Run in the Supabase SQL Editor to recreate the database.

-- Reviews left on recipe pages
create table public.reviews (
  id bigint generated always as identity primary key,
  recipe_slug text not null,
  name text not null check (char_length(name) between 1 and 100),
  rating smallint not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) between 10 and 2000),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Locked by default: nobody can read or write without a policy
alter table public.reviews enable row level security;

-- Makes "approved reviews for this recipe" fast
create index reviews_recipe_slug_idx on public.reviews (recipe_slug) where approved;

-- Visitors can only read approved reviews.
-- No insert policy: new reviews go through the Server Action (secret key).
create policy "Anyone can read approved reviews"
on public.reviews
for select
to anon, authenticated
using (approved = true);