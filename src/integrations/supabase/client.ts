// Supabase client
// Learn more: https://supabase.io/docs/guides/with-react

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Using environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    'Missing environment variables SUPABASE_URL and/or SUPABASE_PUBLISHABLE_KEY'
  );
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
