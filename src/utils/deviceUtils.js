/**
 * Utility functions for device and IP tracking
 */

/**
 * Generate a unique device ID based on browser and system information
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
 * Get a unique identifier for the current device/IP combination
 */
export const getDeviceIPIdentifier = async () => {
  const deviceId = getDeviceId();
  const ip = await getUserIP();
  return `${deviceId}_${ip}`;
};

/**
 * Check if an email has already been used on this device/IP
 */
export const hasEmailBeenUsedOnThisDevice = (email) => {
  const deviceId = getDeviceId();
  const deviceEmails = JSON.parse(localStorage.getItem(`device_${deviceId}`) || '[]');
  return deviceEmails.includes(email);
};

/**
 * Record that an email has been used on this device/IP
 */
export const recordEmailUsedOnThisDevice = (email) => {
  const deviceId = getDeviceId();
  const deviceEmails = JSON.parse(localStorage.getItem(`device_${deviceId}`) || '[]');
  
  if (!deviceEmails.includes(email)) {
    deviceEmails.push(email);
    localStorage.setItem(`device_${deviceId}`, JSON.stringify(deviceEmails));
  }
};

/**
 * Get all emails that have been used on this device/IP
 */
export const getEmailsUsedOnThisDevice = () => {
  const deviceId = getDeviceId();
  return JSON.parse(localStorage.getItem(`device_${deviceId}`) || '[]');
};

/**
 * Check if this is the first login for this email on any device
 */
export const isFirstLoginForEmail = (email) => {
  const usedEmails = JSON.parse(localStorage.getItem('usedEmails') || '[]');
  return !usedEmails.includes(email);
};

/**
 * Mark an email as used globally (across all devices)
 */
export const markEmailAsUsed = (email) => {
  const usedEmails = JSON.parse(localStorage.getItem('usedEmails') || '[]');
  
  if (!usedEmails.includes(email)) {
    usedEmails.push(email);
    localStorage.setItem('usedEmails', JSON.stringify(usedEmails));
  }
};
