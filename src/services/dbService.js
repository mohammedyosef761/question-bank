import supabase from './supabase';
import { adminUsers, initialUsers, reserveUsers } from '../data/initialData';
import { getDeviceId } from '../utils/deviceUtils';

/**
 * Initialize the database with default data
 */
export const initializeDatabase = async () => {
  try {
    // Check if users table has been initialized
    const { data: existingUsers, error: countError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (countError) throw countError;

    // If no users exist, initialize the database
    if (!existingUsers || existingUsers.length === 0) {
      console.log('Initializing database with default data...');

      // Add admin users
      const { error: adminError } = await supabase
        .from('users')
        .insert(adminUsers);

      if (adminError) throw adminError;

      // Add regular users
      const { error: usersError } = await supabase
        .from('users')
        .insert(initialUsers);

      if (usersError) throw usersError;

      console.log('Database initialized successfully');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
};

/**
 * Get available users (not used yet)
 */
export const getAvailableUsers = async () => {
  try {
    // Get all users
    const allUsers = await getAllUsers();

    // Get all used emails
    const { data: usedEmails, error: usedEmailsError } = await supabase
      .from('used_emails')
      .select('email');

    if (usedEmailsError) throw usedEmailsError;

    const usedEmailsArray = usedEmails ? usedEmails.map(item => item.email) : [];

    // Filter out used emails (except for admin users)
    return allUsers.filter(user =>
      user.isAdmin || !usedEmailsArray.includes(user.email)
    );
  } catch (error) {
    console.error('Error getting available users:', error);
    return [];
  }
};

/**
 * Get available student accounts (for admin dashboard)
 */
export const getAvailableStudentAccounts = async () => {
  try {
    const availableUsers = await getAvailableUsers();
    return availableUsers.filter(user => !user.isAdmin);
  } catch (error) {
    console.error('Error getting available student accounts:', error);
    return [];
  }
};

/**
 * Get user by credentials
 */
export const getUserByCredentials = async (email, password) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user by credentials:', error);
    return null;
  }
};

/**
 * Check if email has been used
 */
export const isEmailUsed = async (email) => {
  try {
    const { data, error } = await supabase
      .from('used_emails')
      .select('email')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is the error code for "no rows returned"
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking if email is used:', error);
    return false;
  }
};

/**
 * Check if email has been used on a specific device
 */
export const isEmailUsedOnDevice = async (email, deviceId) => {
  try {
    const { data, error } = await supabase
      .from('device_emails')
      .select('*')
      .eq('email', email)
      .eq('device_id', deviceId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking if email is used on device:', error);
    return false;
  }
};

/**
 * Mark email as used
 */
export const markEmailAsUsed = async (email) => {
  try {
    const { error } = await supabase
      .from('used_emails')
      .insert([{ email, used_at: new Date().toISOString() }]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking email as used:', error);
    return false;
  }
};

/**
 * Mark email as used on a specific device
 */
export const markEmailUsedOnDevice = async (email, deviceId) => {
  try {
    const { error } = await supabase
      .from('device_emails')
      .insert([{
        email,
        device_id: deviceId,
        used_at: new Date().toISOString()
      }]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error marking email as used on device:', error);
    return false;
  }
};

/**
 * Remove user from available users and add a new one from reserve
 */
export const removeUserFromAvailable = async (email) => {
  try {
    // Get the user to be removed
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError) throw userError;

    // Don't remove admin users
    if (user && user.isAdmin) {
      return true;
    }

    // Delete the user
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('email', email);

    if (deleteError) throw deleteError;

    // Get count of used emails to determine which reserve user to add
    const { count, error: countError } = await supabase
      .from('used_emails')
      .select('*', { count: 'exact' });

    if (countError) throw countError;

    // Calculate which reserve user to add
    const initialCount = initialUsers.length;
    const reserveIndex = count - initialCount;

    // Add a new user from reserve if available
    if (reserveIndex >= 0 && reserveIndex < reserveUsers.length) {
      const newUser = reserveUsers[reserveIndex];
      const { error: insertError } = await supabase
        .from('users')
        .insert([newUser]);

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error('Error removing user from available:', error);
    return false;
  }
};

/**
 * Save user quiz data
 */
export const saveUserQuizData = async (userId, userData) => {
  try {
    // Check if user data already exists
    const { data: existingData, error: checkError } = await supabase
      .from('quiz_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingData) {
      // Update existing data
      const { error: updateError } = await supabase
        .from('quiz_data')
        .update(userData)
        .eq('user_id', userId);

      if (updateError) throw updateError;
    } else {
      // Insert new data
      const { error: insertError } = await supabase
        .from('quiz_data')
        .insert([{ ...userData, user_id: userId }]);

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error('Error saving user quiz data:', error);
    return false;
  }
};

/**
 * Get user quiz data
 */
export const getUserQuizData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('quiz_data')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user quiz data:', error);
    return null;
  }
};

/**
 * Get used accounts
 */
export const getUsedAccounts = async () => {
  try {
    const { data, error } = await supabase
      .from('quiz_data')
      .select('*');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting used accounts:', error);
    return [];
  }
};

/**
 * Save quiz progress
 */
export const saveQuizProgress = async (userId, progressData) => {
  try {
    // Check if progress exists
    const { data: existingProgress, error: checkError } = await supabase
      .from('quiz_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingProgress) {
      // Update existing progress
      const { error: updateError } = await supabase
        .from('quiz_progress')
        .update(progressData)
        .eq('user_id', userId);

      if (updateError) throw updateError;
    } else {
      // Insert new progress
      const { error: insertError } = await supabase
        .from('quiz_progress')
        .insert([{ ...progressData, user_id: userId }]);

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error('Error saving quiz progress:', error);
    return false;
  }
};

/**
 * Get quiz progress
 */
export const getQuizProgress = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('quiz_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return data || null;
  } catch (error) {
    console.error('Error getting quiz progress:', error);
    return null;
  }
};

/**
 * Reset database (for testing)
 */
export const resetDatabase = async () => {
  try {
    // Delete all data from tables
    await supabase.from('quiz_progress').delete().neq('user_id', '0');
    await supabase.from('quiz_data').delete().neq('user_id', '0');
    await supabase.from('device_emails').delete().neq('email', '');
    await supabase.from('used_emails').delete().neq('email', '');
    await supabase.from('users').delete().neq('id', '0');

    // Re-initialize the database
    await initializeDatabase();

    return true;
  } catch (error) {
    console.error('Error resetting database:', error);
    return false;
  }
};

// Initialize the database when this module is imported
initializeDatabase();
