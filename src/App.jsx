import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import Login from './pages/Login'
import Questions from './pages/Questions'
import AdminDashboard from './pages/AdminDashboard'
import { initializeDatabase } from './services/dbInitializer'
import './App.css'

function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize the database when the app starts
  useEffect(() => {
    const init = async () => {
      try {
        console.log('Initializing database...');
        await initializeDatabase();
        console.log('Database initialization complete');
        setDbInitialized(true);
      } catch (error) {
        console.error('Error initializing database:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Show loading state while database is initializing
  if (loading) {
    return <div className="loading-container">Loading application...</div>;
  }

  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/questions"
              element={
                <ProtectedRoute>
                  <Questions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
