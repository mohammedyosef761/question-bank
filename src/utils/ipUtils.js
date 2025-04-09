/**
 * Utility functions for IP address tracking
 */
import db from '../services/db';

/**
 * Get the user's IP address using a public API
 * @returns {Promise<string>} The user's IP address
 */
export const getUserIP = async () => {
  try {
    // Use a public API to get the user's IP address
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP address:', error);
    // Fallback to a device fingerprint if IP can't be determined
    return generateDeviceFingerprint();
  }
};

/**
 * Generate a device fingerprint as a fallback when IP can't be determined
 * @returns {string} A unique device fingerprint
 */
export const generateDeviceFingerprint = () => {
  const userAgent = navigator.userAgent;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const colorDepth = window.screen.colorDepth;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;

  // Combine these values and hash them
  const rawId = `${userAgent}-${screenWidth}x${screenHeight}-${colorDepth}-${timezone}-${language}`;
  return hashString(rawId);
};

/**
 * Simple string hashing function
 * @param {string} str - String to hash
 * @returns {string} - Hashed string
 */
const hashString = (str) => {
  let hash = 0;
  if (str.length === 0) return hash.toString(16);

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(16);
};

/**
 * Check if an email has already been used from a specific IP address
 * @param {string} email - The email to check
 * @param {string} ipAddress - The IP address to check
 * @returns {Promise<boolean>} - True if the email has been used from this IP
 */
export const isEmailUsedFromIP = async (email, ipAddress) => {
  try {
    const count = await db.ipAddresses
      .where({ email, ipAddress })
      .count();

    return count > 0;
  } catch (error) {
    console.error('Error checking IP usage:', error);
    return false;
  }
};

/**
 * Record that an email has been used from a specific IP address
 * @param {string} email - The email that was used
 * @param {string} ipAddress - The IP address it was used from
 */
export const recordEmailIPUsage = async (email, ipAddress) => {
  try {
    await db.ipAddresses.add({
      email,
      ipAddress,
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error recording IP usage:', error);
    return false;
  }
};
