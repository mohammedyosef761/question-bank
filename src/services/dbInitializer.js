import supabase from './supabase';
import { adminUsers, initialUsers, reserveUsers } from '../data/initialData';

/**
 * Initialize the database with all required data
 * This function should be called when the application starts
 */
export const initializeDatabase = async () => {
  try {
    console.log('Checking if database needs initialization...');

    // Check if users table has data
    const { data: existingUsers, error: countError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (countError) {
      console.error('Error checking users:', countError);
      return false;
    }

    // If users already exist, skip initialization
    if (existingUsers && existingUsers.length > 0) {
      console.log('Database already has users, skipping initialization');
      return false;
    }

    console.log('Database is empty. Starting initialization process...');

    // Add admin users
    console.log(`Adding ${adminUsers.length} admin users...`);

    // Convert admin users to the correct format for Supabase
    const formattedAdminUsers = adminUsers.map(admin => ({
      id: admin.id,
      email: admin.email,
      password: admin.password,
      name: admin.name,
      is_admin: true
    }));

    // Insert admin users one by one to better track errors
    for (const admin of formattedAdminUsers) {
      const { error } = await supabase
        .from('users')
        .insert([admin]);

      if (error) {
        console.error(`Error adding admin user ${admin.email}:`, error);
      } else {
        console.log(`Added admin user: ${admin.email}`);
      }
    }

    // Add regular users
    console.log(`Adding ${initialUsers.length} regular users...`);

    // Convert regular users to the correct format for Supabase
    const formattedUsers = initialUsers.map(user => ({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      is_admin: false
    }));

    // Insert regular users in batches to avoid hitting rate limits
    const batchSize = 5;
    for (let i = 0; i < formattedUsers.length; i += batchSize) {
      const batch = formattedUsers.slice(i, i + batchSize);
      const { error } = await supabase
        .from('users')
        .insert(batch);

      if (error) {
        console.error(`Error adding users batch ${i/batchSize + 1}:`, error);
      } else {
        console.log(`Added users batch ${i/batchSize + 1} (${batch.length} users)`);
      }
    }

    console.log('User initialization completed');

    // Add reserve users to a separate table if needed
    // This is optional - you can also just keep them in the code
    console.log(`Storing ${reserveUsers.length} reserve users...`);

    try {
      // Convert reserve users to the correct format for Supabase
      const formattedReserveUsers = reserveUsers.map(user => ({
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        is_admin: false
      }));

      // Check if reserve_users table exists
      const { error: checkError } = await supabase
        .from('reserve_users')
        .select('id')
        .limit(1);

      if (checkError && checkError.code === '42P01') {
        // Table doesn't exist, create it
        console.log('Reserve users table does not exist. Keeping reserve users in code only.');
      } else {
        // Table exists, insert reserve users
        const batchSize = 5;
        for (let i = 0; i < formattedReserveUsers.length; i += batchSize) {
          const batch = formattedReserveUsers.slice(i, i + batchSize);
          const { error } = await supabase
            .from('reserve_users')
            .insert(batch);

          if (error) {
            console.error(`Error adding reserve users batch ${i/batchSize + 1}:`, error);
          } else {
            console.log(`Added reserve users batch ${i/batchSize + 1} (${batch.length} users)`);
          }
        }
        console.log('Reserve users stored successfully');
      }
    } catch (error) {
      console.error('Error handling reserve users:', error);
    }

    console.log('Database initialization completed successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

/**
 * Reset the database to its initial state
 * This is useful for testing or when you want to start fresh
 */
export const resetDatabase = async () => {
  try {
    console.log('Resetting database...');

    // Delete all data from tables
    await supabase.from('quiz_progress').delete().not('id', 'is', null);
    await supabase.from('quiz_data').delete().not('id', 'is', null);
    await supabase.from('device_emails').delete().not('id', 'is', null);
    await supabase.from('used_emails').delete().not('email', 'is', null);
    await supabase.from('ip_addresses').delete().not('id', 'is', null);
    await supabase.from('users').delete().not('id', 'is', null);

    // Re-initialize the database
    await initializeDatabase();

    console.log('Database reset completed');
    return true;
  } catch (error) {
    console.error('Error resetting database:', error);
    return false;
  }
};

/**
 * Check if a specific table exists in the database
 */
export const checkTableExists = async (tableName) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);

    // If we get an error about the relation not existing, the table doesn't exist
    if (error && error.code === '42P01') {
      return false;
    }

    // If we got any other error, log it but assume the table exists
    if (error) {
      console.error(`Error checking if table ${tableName} exists:`, error);
    }

    return true;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error);
    return false;
  }
};
