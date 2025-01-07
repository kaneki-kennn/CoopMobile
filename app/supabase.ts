import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';

const supabaseUrl = 'https://wktdygngpenuvshfxnam.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrdGR5Z25ncGVudXZzaGZ4bmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0NzgwOTIsImV4cCI6MjA0NTA1NDA5Mn0.d7sxmS9PRJpz4k1UUEvpg0CIsXkD8UfnaB8dDndCgao';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrdGR5Z25ncGVudXZzaGZ4bmFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTQ3ODA5MiwiZXhwIjoyMDQ1MDU0MDkyfQ.PrjUcS9drcHi-w2xTfzSu2QbyUjTgbaMXSxATjMzD5Y';

// Client for app-level usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Client for admin operations
const adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// export async function migrateUsers() {
//   try {
//     console.log("Starting migration...");

//     const { data: users, error: fetchError } = await supabase
//       .from('Users')
//       .select('*');

//     if (fetchError) {
//       console.error('Error fetching users:', fetchError);
//       return;
//     }

//     console.log("Users fetched:", users);

//     for (const user of users) {
//       console.log(`Processing user: ${user.email}`);

//       // Use the admin API to list users and check structure
//       const { data: allUsers, error: userCheckError } = await adminSupabase.auth.admin.listUsers();

//       if (userCheckError) {
//         console.error(`Error fetching users from Auth API:`, userCheckError);
//         continue;
//       }

//       if (!allUsers || !Array.isArray(allUsers.users)) {
//         console.error("Unexpected format of allUsers:", allUsers);
//         continue;
//       }

//       const existingUser = allUsers.users.find((authUser) => authUser.email === user.email);

//       if (existingUser) {
//         console.log(`User already exists: ${user.email}`);
//         continue;
//       }

//       const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
//         email: user.email,
//         email_confirm: true,
//         password: user.password, // Ensure the hashed password is suitable for your use case
//       });

//       if (authError) {
//         console.error(`Error creating user ${user.email}:`, authError);
//         continue;
//       }

//       console.log(`User created in Supabase Auth: ${user.email}`);

//       const { error: updateError } = await supabase
//         .from('Users')
//         .update({ supabase_auth_id: authData.user.id })
//         .eq('user_id', user.user_id);

//       if (updateError) {
//         console.error(`Error updating user ${user.email} with Supabase Auth ID:`, updateError);
//       } else {
//         console.log(`User migrated: ${user.email}, Supabase Auth ID: ${authData.user.id}`);
//       }
//     }
//   } catch (error) {
//     console.error("Migration failed with an unexpected error:", error);
//   }
// }

// migrateUsers();
