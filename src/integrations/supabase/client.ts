// Supabase client
// Learn more: https://supabase.io/docs/guides/with-react
// import { createClient } from '@supabase/supabase-js';
// import type { Database } from './types';

// const SUPABASE_URL = "https://wceszevhxwoffvblbwho.supabase.co";
// const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZXN6ZXZoeHdvZmZ2Ymxid2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDA3MDksImV4cCI6MjA1ODUxNjcwOX0.2S90VTZbTKGT3AbzRJpOfe2abyDv4_GcrkHPb2wdgR4";


// export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

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