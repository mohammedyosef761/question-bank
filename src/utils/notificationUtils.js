/**
 * Utility functions for sending notifications
 */

/**
 * Send a WhatsApp message using the WhatsApp web API
 * @param {string} phoneNumber - Phone number with country code (no + or spaces)
 * @param {string} message - Message to send
 */
export const sendWhatsAppMessage = (phoneNumber, message) => {
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create the WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Open the URL in a new tab
  const newWindow = window.open(whatsappUrl, '_blank');
  
  // Close the window after a short delay if it was successfully opened
  if (newWindow) {
    setTimeout(() => {
      newWindow.close();
    }, 1000);
  }
  
  return true;
};

/**
 * Send a login notification via WhatsApp
 * @param {Object} user - User object with login details
 */
export const sendLoginNotification = (user) => {
  const phoneNumber = '00963938135761'; // The WhatsApp number to notify
  const message = `New Login Alert:\nUser: ${user.name}\nEmail: ${user.email}\nTime: ${new Date().toLocaleString()}\nDevice ID: ${getDeviceId()}`;
  
  return sendWhatsAppMessage(phoneNumber, message);
};

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
 * Check if the current IP has already been used for login
 * This is a simplified version that uses the device ID as a proxy for IP
 * In a real application, you would use a server-side API to get the actual IP
 */
export const checkDeviceAlreadyUsed = (email) => {
  const deviceId = getDeviceId();
  const deviceEmails = JSON.parse(localStorage.getItem(`device_${deviceId}`) || '[]');
  
  return deviceEmails.includes(email);
};

/**
 * Record that an email has been used on this device
 */
export const recordEmailUsedOnDevice = (email) => {
  const deviceId = getDeviceId();
  const deviceEmails = JSON.parse(localStorage.getItem(`device_${deviceId}`) || '[]');
  
  if (!deviceEmails.includes(email)) {
    deviceEmails.push(email);
    localStorage.setItem(`device_${deviceId}`, JSON.stringify(deviceEmails));
  }
};
