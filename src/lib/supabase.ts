import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BookingInsert = {
  city: string;
  name: string;
  phone: string;
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  package: string;
  price: string;
  property_type: string;
  address: string;
  appointment_date: string;
  appointment_time: string;
  comments?: string;
};
