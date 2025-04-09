import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAvailableStudentAccounts, getUsedAccounts, resetDatabase } from '../services/db';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [usedAccounts, setUsedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not an admin
    if (currentUser && !currentUser.isAdmin) {
      navigate('/questions');
    }

    const loadData = async () => {
      try {
        // Load available accounts
        const studentAccounts = await getAvailableStudentAccounts();
        setAvailableAccounts(studentAccounts);

        // Load used accounts from database
        const usedAccountsList = await getUsedAccounts();
        setUsedAccounts(usedAccountsList);

        setLoading(false);
      } catch (error) {
        console.error('Error loading admin data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const resetAllData = async () => {
    if (window.confirm('Are you sure you want to reset all data? This will clear all login records.')) {
      try {
        await resetDatabase();
        // The page will reload automatically after database reset
      } catch (error) {
        console.error('Error resetting database:', error);
        alert('Failed to reset database. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!currentUser || !currentUser.isAdmin) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-user-info">
          <p>Logged in as: <strong>{currentUser.name}</strong></p>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-section">
          <h2>Available Student Accounts ({availableAccounts.length})</h2>
          <div className="accounts-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {availableAccounts.map(account => (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.name}</td>
                    <td>{account.email}</td>
                    <td>{account.password}</td>
                  </tr>
                ))}
                {availableAccounts.length === 0 && (
                  <tr>
                    <td colSpan="4" className="no-data">No available accounts</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-section">
          <h2>Used Accounts ({usedAccounts.length})</h2>
          <div className="accounts-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Login Time</th>
                  <th>Device ID</th>
                </tr>
              </thead>
              <tbody>
                {usedAccounts.map(account => (
                  <tr key={account.id}>
                    <td>{account.id}</td>
                    <td>{account.name}</td>
                    <td>{account.email}</td>
                    <td>{new Date(account.loginTime).toLocaleString()}</td>
                    <td>{account.deviceId || 'N/A'}</td>
                  </tr>
                ))}
                {usedAccounts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="no-data">No used accounts</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-actions">
          <button onClick={resetAllData} className="reset-button">Reset All Data</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
