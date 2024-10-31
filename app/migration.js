// const supabaseUrl = 'https://wktdygngpenuvshfxnam.supabase.co';
// const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrdGR5Z25ncGVudXZzaGZ4bmFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTQ3ODA5MiwiZXhwIjoyMDQ1MDU0MDkyfQ.PrjUcS9drcHi-w2xTfzSu2QbyUjTgbaMXSxATjMzD5Y'
// const { createClient } = require('@supabase/supabase-js');


// const migration = createClient (supabaseUrl, supabaseServiceRoleKey);

// async function migrateUsers() {
//     const { data: users, error: fetchError } = await supabase
//         .from('Users')
//         .select('*');

//     if (fetchError) {
//         console.error('Error fetching users:', fetchError);
//         return;
//     }

//     for (const user of users) {
//         // Check if the user already exists in Supabase Auth
//         const { data: existingUser, error: userCheckError } = await supabase.auth.admin.getUserByEmail(user.email);

//         if (userCheckError) {
//             console.error(`Error checking user ${user.email}:`, userCheckError);
//             continue;
//         }

//         if (existingUser) {
//             console.log(`User already exists: ${user.email}`);
//             continue;
//         }

//         // Create a new Supabase Auth user with a hashed password
//         const { data: authData, error: authError } = await supabase.auth.admin.createUser({
//             email: user.email,
//             email_confirm: true,
//             password: user.hashed_password,
//         });

//         if (authError) {
//             console.error(`Error creating user ${user.email}:`, authError);
//             continue;
//         }

//         console.log(`User created in Supabase Auth: ${user.email}`);

//         // Store the mapping of existing user_id to Supabase Auth ID
//         const { error: updateError } = await supabase
//             .from('Users')
//             .update({ supabase_auth_id: authData.user.id })
//             .eq('user_id', user.user_id);

//         if (updateError) {
//             console.error(`Error updating user ${user.email} with Supabase Auth ID:`, updateError);
//         } else {
//             console.log(`User migrated: ${user.email}, Supabase Auth ID: ${authData.user.id}`);
//         }
//     }
// }

// async function testSupabaseConnection() {
//     const { data, error } = await supabase
//         .from('Users')
//         .select('*')
//         .limit(1);

//     if (error) {
//         console.error("Supabase connection error:", error);
//     } else {
//         console.log("Supabase connection successful:", data);
//     }
// }

// // Call both functions
// migrateUsers();
// testSupabaseConnection();