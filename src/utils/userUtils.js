/**
 * Utility functions for user management
 */

/**
 * Get all users who have logged in
 * @returns {Array} Array of user objects
 */
export const getLoggedInUsers = () => {
  const usedEmails = JSON.parse(localStorage.getItem('usedEmails') || '[]');
  const loggedInUsers = [];
  
  usedEmails.forEach(email => {
    // Find all user data in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('user_')) {
        try {
          const userData = JSON.parse(localStorage.getItem(key));
          if (userData.email === email) {
            loggedInUsers.push(userData);
            break;
          }
        } catch (e) {
          // Skip invalid JSON
          console.error('Error parsing user data:', e);
        }
      }
    }
  });
  
  return loggedInUsers;
};

/**
 * Reset all user data (for testing purposes)
 */
export const resetAllUserData = () => {
  // Clear all user-related data from localStorage
  localStorage.removeItem('availableUsers');
  localStorage.removeItem('usedEmails');
  localStorage.removeItem('usedReserveCount');
  localStorage.removeItem('currentUser');
  
  // Clear all user-specific data
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('user_') || 
        key.startsWith('answers_') || 
        key.startsWith('currentQuestion_') || 
        key.startsWith('showResults_') || 
        key.startsWith('score_')) {
      localStorage.removeItem(key);
    }
  }
  
  // Force page reload to reinitialize
  window.location.reload();
};
