import db from './db';

// Save quiz progress for a user
export const saveQuizProgress = async (userId, data) => {
  try {
    // Check if quiz progress exists
    const existingProgress = await db.table('quizProgress')
      .where('userId')
      .equals(userId)
      .first();
    
    if (existingProgress) {
      // Update existing progress
      await db.table('quizProgress').update(existingProgress.id, data);
    } else {
      // Create new progress
      await db.table('quizProgress').add({
        userId,
        ...data
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error saving quiz progress:', error);
    return false;
  }
};

// Get quiz progress for a user
export const getQuizProgress = async (userId) => {
  try {
    const progress = await db.table('quizProgress')
      .where('userId')
      .equals(userId)
      .first();
    
    return progress || null;
  } catch (error) {
    console.error('Error getting quiz progress:', error);
    return null;
  }
};
