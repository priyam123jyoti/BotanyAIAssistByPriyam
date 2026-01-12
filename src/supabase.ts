import { createClient } from '@supabase/supabase-js';



// These should be your actual Supabase Project URL and Anon Key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are missing from environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


console.log("VITE_URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("VITE_KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);