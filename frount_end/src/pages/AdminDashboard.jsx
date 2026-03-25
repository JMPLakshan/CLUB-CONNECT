import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      if (parsedUser.role !== 'admin') {
        navigate('/home');
      } else {
        setUser(parsedUser);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4 text-white bg-blue-800 shadow-md">
        <div className="container flex items-center justify-between mx-auto">
          <h1 className="text-2xl font-bold">CLUB CONNECT - Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-semibold text-blue-800 transition duration-200 bg-white rounded-md hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="container p-8 mx-auto mt-8 bg-white rounded-lg shadow-sm">
        <h2 className="mb-4 text-3xl font-semibold text-gray-800">Welcome, {user.name}!</h2>
        <p className="text-lg text-gray-600">You are logged in as an <span className="font-bold text-blue-600">ADMIN</span>. Here you can manage system settings, users, and oversee the entire application.</p>
        
        <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-3">
          <div className="p-6 text-center bg-blue-50 rounded-xl">
            <h3 className="mb-2 text-xl font-bold text-blue-800">Manage Users</h3>
            <p className="text-sm text-gray-600">View, edit or remove user accounts across the system.</p>
          </div>
          <div className="p-6 text-center bg-blue-50 rounded-xl">
            <h3 className="mb-2 text-xl font-bold text-blue-800">System Logs</h3>
            <p className="text-sm text-gray-600">Review recent activities and monitor system health.</p>
          </div>
          <div className="p-6 text-center bg-blue-50 rounded-xl">
            <h3 className="mb-2 text-xl font-bold text-blue-800">Settings</h3>
            <p className="text-sm text-gray-600">Configure core platform options and preferences.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
