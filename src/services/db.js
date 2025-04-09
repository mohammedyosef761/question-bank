import Dexie from 'dexie';
import { adminUsers, initialUsers, reserveUsers } from '../data/initialData';

// Create a Dexie database
const db = new Dexie('quizAppDatabase');

// Define database schema with tables and indexes
db.version(1).stores({
  users: 'id, email, isAdmin', // Users table with indexes
  usedEmails: 'email', // Track used emails
  deviceEmails: 'deviceId, email', // Track emails used per device
  ipAddresses: 'email, ipAddress', // Track IP addresses used for login
  quizData: 'userId, email', // Store user login data
  quizProgress: '++id, userId', // Store quiz progress (answers, current question, etc.) with auto-incrementing id
});

// Initialize the database with default data
export const initializeDatabase = async () => {
  // Check if the database has been initialized
  const userCount = await db.users.count();

  if (userCount === 0) {
    console.log('Initializing database with default data...');

    // Add admin users
    await db.users.bulkAdd(adminUsers);

    // Add regular users
    await db.users.bulkAdd(initialUsers);

    console.log('Database initialized successfully');
    return true;
  }

  return false;
};

// User management functions
export const getAllUsers = async () => {
  return await db.users.toArray();
};

export const getAvailableUsers = async () => {
  // Get all users
  const allUsers = await getAllUsers();

  // Get all used emails
  const usedEmails = await db.usedEmails.toArray();
  const usedEmailsArray = usedEmails.map(item => item.email);

  // Filter out used emails (except for admin users)
  return allUsers.filter(user =>
    user.isAdmin || !usedEmailsArray.includes(user.email)
  );
};

export const getAvailableStudentAccounts = async () => {
  const availableUsers = await getAvailableUsers();
  return availableUsers.filter(user => !user.isAdmin);
};

export const getUserByCredentials = async (email, password) => {
  return await db.users.where({ email }).filter(user => user.password === password).first();
};

export const isEmailUsed = async (email) => {
  const count = await db.usedEmails.where({ email }).count();
  return count > 0;
};

export const markEmailAsUsed = async (email) => {
  await db.usedEmails.add({ email });
};

export const isEmailUsedOnDevice = async (email, deviceId) => {
  const count = await db.deviceEmails
    .where({ deviceId })
    .filter(record => record.email === email)
    .count();

  return count > 0;
};

export const markEmailUsedOnDevice = async (email, deviceId) => {
  await db.deviceEmails.add({ deviceId, email });
};

export const removeUserFromAvailable = async (email) => {
  // Only remove non-admin users
  const user = await db.users.where({ email }).first();

  if (user && !user.isAdmin) {
    await db.users.where({ email }).delete();

    // Add a new user from reserve pool if available
    const usedCount = await db.usedEmails.count();
    const initialCount = initialUsers.length;
    const reserveIndex = usedCount - initialCount;

    if (reserveIndex >= 0 && reserveIndex < reserveUsers.length) {
      const newUser = reserveUsers[reserveIndex];
      await db.users.add(newUser);
    }
  }
};

export const saveUserQuizData = async (userId, userData) => {
  // Update if exists, add if not
  const existing = await db.quizData.get(userId);

  if (existing) {
    await db.quizData.update(userId, userData);
  } else {
    await db.quizData.add({ userId, ...userData });
  }
};

export const getUserQuizData = async (userId) => {
  return await db.quizData.get(userId);
};

export const getUsedAccounts = async () => {
  // Get all used emails
  const usedEmails = await db.usedEmails.toArray();

  // Get quiz data for all used accounts
  const usedAccountsData = [];

  for (const { email } of usedEmails) {
    const quizData = await db.quizData
      .filter(data => data.email === email)
      .first();

    if (quizData) {
      usedAccountsData.push(quizData);
    }
  }

  return usedAccountsData;
};

export const resetDatabase = async () => {
  await db.delete();
  window.location.reload();
};

// Initialize the database when this module is imported
initializeDatabase();

export default db;
