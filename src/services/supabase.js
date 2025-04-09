import { createClient } from '@supabase/supabase-js';

// Supabase URL and anon key (these would come from your Supabase project)
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
