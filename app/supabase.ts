import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wktdygngpenuvshfxnam.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrdGR5Z25ncGVudXZzaGZ4bmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NzgwOTIsImV4cCI6MjA0NTA1NDA5Mn0.d7sxmS9PRJpz4k1UUEvpg0CIsXkD8UfnaB8dDndCgao';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
