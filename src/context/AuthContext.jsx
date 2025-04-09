import { createContext, useState, useEffect, useContext } from 'react';
import { getDeviceId, getUserIP } from '../utils/deviceUtils';
import {
  getUserByCredentials,
  getAvailableUsers,
  isEmailUsed,
  isEmailUsedOnDevice,
  markEmailAsUsed,
  markEmailUsedOnDevice,
  removeUserFromAvailable,
  saveUserQuizData
} from '../services/dbService';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableUsers, setAvailableUsers] = useState([]);

  // Initialize available users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getAvailableUsers();
        setAvailableUsers(users);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    loadUsers();
  }, []);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Find user with matching email and password from database
      const user = await getUserByCredentials(email, password);

      if (user) {
        // Check if this is an admin account
        const isAdmin = user.isAdmin;
        const deviceId = getDeviceId();

        // For regular (non-admin) accounts, apply restrictions
        if (!isAdmin) {
          // Check if this account has been used on this device before
          const alreadyUsedOnDevice = await isEmailUsedOnDevice(email, deviceId);

          // If this is the first time this account is being used on this device
          if (!alreadyUsedOnDevice) {
            // This is a new login on this device

            // Record that this email has been used on this device
            await markEmailUsedOnDevice(email, deviceId);

            // Check if this is the first login for this email on any device
            const emailUsed = await isEmailUsed(email);

            if (!emailUsed) {
              // Mark email as used globally
              await markEmailAsUsed(email);

              // Remove this user from available users
              await removeUserFromAvailable(email);

              // Refresh available users list
              const updatedUsers = await getAvailableUsers();
              setAvailableUsers(updatedUsers);
            }
          }
          // If the account has been used on this device before, allow login
          // This allows the same account to be used multiple times on the same device

          // Save user's quiz data with device information
          const userData = {
            user_id: user.id,
            name: user.name,
            email: user.email,
            device_id: deviceId,
            login_time: new Date().toISOString(),
            ip_address: await getUserIP()
          };

          await saveUserQuizData(user.id, userData);
        } else {
          // For admin accounts, just update the current user without restrictions
          console.log('Admin login successful');
        }

        // Set current user (for both admin and regular users)
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));

        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    availableUsers,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
