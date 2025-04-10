import { createClient } from '@supabase/supabase-js';

// Supabase URL and anon key
const supabaseUrl = 'https://fruwpuqnygpgsrbjvfes.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZydXdwdXFueWdwZ3NyYmp2ZmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDU4OTgsImV4cCI6MjA1OTc4MTg5OH0.a23arIr4-dCoBD0ttZAiEoEENF0NiLMxc9meiz0vLyM";

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
