import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qvuxtgulownzjzmqcqdf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dXh0Z3Vsb3duemp6bXFjcWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTc4NTEsImV4cCI6MjA5NjQzMzg1MX0.-ruoUeTh267KubAQtjr-1RsNy5MY4PJwpi61nfF_gMk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
