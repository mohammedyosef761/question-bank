/**
 * Utility functions for authentication and device tracking
 */

/**
 * Generate a unique device ID based on browser and system information
 * This is a simple implementation and not foolproof
 */
export const getDeviceId = () => {
  // Try to get existing device ID
  let deviceId = localStorage.getItem('deviceId');
  
  if (!deviceId) {
    // Create a simple device fingerprint based on available browser information
    const userAgent = navigator.userAgent;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const colorDepth = window.screen.colorDepth;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    
    // Combine these values and hash them
    const rawId = `${userAgent}-${screenWidth}x${screenHeight}-${colorDepth}-${timezone}-${language}`;
    deviceId = hashString(rawId);
    
    // Store for future use
    localStorage.setItem('deviceId', deviceId);
  }
  
  return deviceId;
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
 * Get the user's IP address using a public API
 * @returns {Promise<string>} The user's IP address or device ID if IP can't be determined
 */
export const getUserIP = async () => {
  try {
    // Use a public API to get the user's IP address
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP address:', error);
    // Fallback to device ID if IP can't be determined
    return getDeviceId();
  }
};

/**
 * Check if an email has already been used from the current IP
 * @param {string} email - The email to check
 * @returns {Promise<boolean>} - True if the email has been used from this IP
 */
export const isEmailUsedFromCurrentIP = async (email) => {
  try {
    const ip = await getUserIP();
    const ipEmails = JSON.parse(localStorage.getItem(`ip_${ip}`) || '[]');
    return ipEmails.includes(email);
  } catch (error) {
    console.error('Error checking IP usage:', error);
    return false;
  }
};

/**
 * Record that an email has been used from the current IP
 * @param {string} email - The email that was used
 */
export const recordEmailIPUsage = async (email) => {
  try {
    const ip = await getUserIP();
    const ipEmails = JSON.parse(localStorage.getItem(`ip_${ip}`) || '[]');
    
    if (!ipEmails.includes(email)) {
      ipEmails.push(email);
      localStorage.setItem(`ip_${ip}`, JSON.stringify(ipEmails));
    }
    return true;
  } catch (error) {
    console.error('Error recording IP usage:', error);
    return false;
  }
};
