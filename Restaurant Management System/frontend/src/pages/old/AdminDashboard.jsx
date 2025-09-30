import { useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/events" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 text-center">
          Manage Events
        </Link>
        <Link to="/admin/users" className="bg-green-500 text-white p-4 rounded hover:bg-green-600 text-center">
          Manage Users
        </Link>
        <Link to="/admin/registrations" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600 text-center">
          Manage Registrations
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;