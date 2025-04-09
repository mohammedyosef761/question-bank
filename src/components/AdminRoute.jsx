import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Check if user is logged in and is an admin
  if (!currentUser || !currentUser.isAdmin) {
    // Redirect to login if not authenticated or not an admin
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
