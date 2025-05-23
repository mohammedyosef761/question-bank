// Admin accounts (not subject to one-time login restriction)
const adminUsers = [
  { id: 'admin1', email: 'admin1@example.com', password: 'admin123', name: 'Admin One', isAdmin: true },
  { id: 'admin2', email: 'admin2@example.com', password: 'admin456', name: 'Admin Two', isAdmin: true }
];

// Initial user data with 25 email/password combinations
const initialUsers = [
  { id: 1, email: 'student1@example.com', password: 'password1', name: 'Student 1' },
  { id: 2, email: 'student2@example.com', password: 'password2', name: 'Student 2' },
  { id: 3, email: 'student3@example.com', password: 'password3', name: 'Student 3' },
  { id: 4, email: 'student4@example.com', password: 'password4', name: 'Student 4' },
  { id: 5, email: 'student5@example.com', password: 'password5', name: 'Student 5' },
  { id: 6, email: 'student6@example.com', password: 'password6', name: 'Student 6' },
  { id: 7, email: 'student7@example.com', password: 'password7', name: 'Student 7' },
  { id: 8, email: 'student8@example.com', password: 'password8', name: 'Student 8' },
  { id: 9, email: 'student9@example.com', password: 'password9', name: 'Student 9' },
  { id: 10, email: 'student10@example.com', password: 'password10', name: 'Student 10' },
  { id: 11, email: 'student11@example.com', password: 'password11', name: 'Student 11' },
  { id: 12, email: 'student12@example.com', password: 'password12', name: 'Student 12' },
  { id: 13, email: 'student13@example.com', password: 'password13', name: 'Student 13' },
  { id: 14, email: 'student14@example.com', password: 'password14', name: 'Student 14' },
  { id: 15, email: 'student15@example.com', password: 'password15', name: 'Student 15' },
  { id: 16, email: 'student16@example.com', password: 'password16', name: 'Student 16' },
  { id: 17, email: 'student17@example.com', password: 'password17', name: 'Student 17' },
  { id: 18, email: 'student18@example.com', password: 'password18', name: 'Student 18' },
  { id: 19, email: 'student19@example.com', password: 'password19', name: 'Student 19' },
  { id: 20, email: 'student20@example.com', password: 'password20', name: 'Student 20' },
  { id: 21, email: 'student21@example.com', password: 'password21', name: 'Student 21' },
  { id: 22, email: 'student22@example.com', password: 'password22', name: 'Student 22' },
  { id: 23, email: 'student23@example.com', password: 'password23', name: 'Student 23' },
  { id: 24, email: 'student24@example.com', password: 'password24', name: 'Student 24' },
  { id: 25, email: 'student25@example.com', password: 'password25', name: 'Student 25' },
];

// Reserve pool of additional users to add when one is used
const reserveUsers = [
  { id: 26, email: 'student26@example.com', password: 'password26', name: 'Student 26' },
  { id: 27, email: 'student27@example.com', password: 'password27', name: 'Student 27' },
  { id: 28, email: 'student28@example.com', password: 'password28', name: 'Student 28' },
  { id: 29, email: 'student29@example.com', password: 'password29', name: 'Student 29' },
  { id: 30, email: 'student30@example.com', password: 'password30', name: 'Student 30' },
  // Add more as needed
];

// Get users from localStorage or use initial data
const getUsers = () => {
  const storedUsers = localStorage.getItem('availableUsers');
  if (storedUsers) {
    // Always include admin users in the available users list
    const parsedUsers = JSON.parse(storedUsers);
    // Filter out any admin users that might have been accidentally stored
    const filteredUsers = parsedUsers.filter(user => !user.isAdmin);
    // Combine with admin users
    return [...adminUsers, ...filteredUsers];
  }
  // Initialize localStorage with initial users if not already set
  localStorage.setItem('availableUsers', JSON.stringify(initialUsers));
  return [...adminUsers, ...initialUsers];
};

// Get the next user from reserve pool
const getNextReserveUser = () => {
  const usedReserveCount = parseInt(localStorage.getItem('usedReserveCount') || '0');
  if (usedReserveCount < reserveUsers.length) {
    localStorage.setItem('usedReserveCount', (usedReserveCount + 1).toString());
    return reserveUsers[usedReserveCount];
  }
  return null; // No more reserve users available
};

// Remove a user and add a new one from reserve
const removeAndReplaceUser = (email) => {
  const currentUsers = getUsers();
  // Don't remove admin users
  const isAdminEmail = adminUsers.some(admin => admin.email === email);

  if (isAdminEmail) {
    // For admin users, just return the current list unchanged
    return currentUsers;
  }

  // For regular users, remove them from the list
  const updatedUsers = currentUsers.filter(user => user.email !== email && !user.isAdmin);

  // Add a new user from reserve if available
  const newUser = getNextReserveUser();
  if (newUser) {
    updatedUsers.push(newUser);
  }

  // Store only non-admin users in localStorage
  localStorage.setItem('availableUsers', JSON.stringify(updatedUsers.filter(user => !user.isAdmin)));

  // Return all users including admins
  return [...adminUsers, ...updatedUsers.filter(user => !user.isAdmin)];
};

// Check if a user is an admin
const isAdminUser = (email) => {
  return adminUsers.some(admin => admin.email === email);
};

// Get all available student accounts (for admin dashboard)
const getAvailableStudentAccounts = () => {
  const allUsers = getUsers();
  return allUsers.filter(user => !user.isAdmin);
};

export { getUsers, removeAndReplaceUser, isAdminUser, adminUsers, getAvailableStudentAccounts };
export default getUsers();
