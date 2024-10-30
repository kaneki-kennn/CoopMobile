import { supabase } from './supabase'; // Adjust the path as needed

async function migrateUsers() {
    const { data: users, error: fetchError } = await supabase
        .from('Users') // Your existing user table
        .select('*');

    if (fetchError) {
        console.error('Error fetching users:', fetchError);
        return;
    }

    for (const user of users) {
        // Check if the user already exists in Supabase Auth
        const { data: existingUser, error: userCheckError } = await supabase.auth.admin.getUserByEmail(user.email);
        
        if (userCheckError) {
            console.error(`Error checking user ${user.email}:`, userCheckError);
            continue; // Skip to the next user
        }

        if (existingUser) {
            console.log(`User already exists: ${user.email}`);
            // Optionally, you can update existing user information or skip
            continue; // Skip creating this user
        }

        // Create a new Supabase Auth user if they do not exist
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: user.email,
            password: user.password, // Ensure you handle password securely
            email_confirm: true, // Optional, depending on your needs
        });

        if (authError) {
            console.error(`Error creating user ${user.email}:`, authError);
            continue; // Skip this user on error
        }

        console.log(`User created: ${user.email}`);

        // Store the mapping of existing user_id to Supabase Auth ID
        const { error: updateError } = await supabase
            .from('Users') // Your existing user table
            .update({ supabase_auth_id: authData.user.id }) // Assuming you've added this column
            .eq('user_id', user.user_id); // Use your existing user ID

        if (updateError) {
            console.error(`Error updating user ${user.email} with Supabase Auth ID:`, updateError);
        }
    }
}

// Run the migration
migrateUsers();
