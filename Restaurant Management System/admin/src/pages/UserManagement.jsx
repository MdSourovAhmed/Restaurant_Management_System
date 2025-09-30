import { useState, useEffect } from 'react';
import api from '../utils/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{user.name} ({user.email})</h3>
              <p>Role: {user.role}</p>
            </div>
            <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;