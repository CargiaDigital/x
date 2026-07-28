/*
# Create bookings table

1. New Tables
  - `bookings`
    - `id` (uuid, primary key, auto-generated)
    - `city` (text, not null) — city where service is requested
    - `name` (text, not null) — customer full name
    - `phone` (text, not null) — customer phone number
    - `vehicle_year` (text, not null) — year of vehicle
    - `vehicle_make` (text, not null) — make/brand of vehicle
    - `vehicle_model` (text, not null) — model of vehicle
    - `package` (text, not null) — selected service package
    - `price` (text, not null) — price of selected package
    - `property_type` (text, not null) — house or apartment
    - `address` (text, not null) — full service address
    - `appointment_date` (date, not null) — requested service date
    - `appointment_time` (text, not null) — requested time slot
    - `comments` (text) — optional special instructions
    - `status` (text, default 'pending') — booking status
    - `created_at` (timestamptz, default now())

2. Security
  - Enable RLS on `bookings`.
  - Allow anon + authenticated users to INSERT bookings (public booking form, no sign-in required).
  - No SELECT/UPDATE/DELETE for anon users (only the business owner manages bookings).

3. Notes
  - This is a no-auth public booking form — customers submit without signing in.
  - INSERT policy uses `TO anon, authenticated` so the anon-key frontend can write.
  - SELECT/UPDATE/DELETE are not exposed to anon; the business manages bookings via the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  vehicle_year text NOT NULL,
  vehicle_make text NOT NULL,
  vehicle_model text NOT NULL,
  package text NOT NULL,
  price text NOT NULL,
  property_type text NOT NULL,
  address text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  comments text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);
