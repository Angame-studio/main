import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

export type Post = {
  id: string;
  author_name: string;
  title: string;
  body: string;
  image_url: string | null;
  created_at: string;
};

export type Comment = {
  id: string;
  post_id: string;
  author_name: string;
  body: string;
  created_at: string;
};

export type PostLike = {
  id: string;
  post_id: string;
  author_name: string;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  author_name: string;
  body: string;
  created_at: string;
};
