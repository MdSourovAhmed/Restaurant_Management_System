import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

function RegisteredDataCard({ registration }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useContext(AuthContext);

  const handleCancel = async () => {
    try {
      await api.delete(`/registrations/${registration._id}`);
      setSuccess('Registration cancelled successfully.');
      setTimeout(() => window.location.reload(), 2000); // Refresh to update list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel registration');
    }
  };

  if (!user) return null; // Safety check, should be handled by parent route

  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 justify-between">
      <div>
        <h3 className="text-xl font-semibold truncate">{registration.event.title}</h3>
        <p className="text-gray-600">Date: {new Date(registration.event.date).toLocaleDateString()}</p>
        <p className="text-gray-600 truncate">Location: {registration.event.location}</p>
        <p className="text-gray-600">Status: {registration.status}</p>
        <p className="text-gray-600">
          Cancellation Deadline: {new Date(registration.cancellationDeadline).toLocaleDateString()}
        </p>
        {registration.qrCode && (
          <img src={registration.qrCode} alt="QR Code" className="w-32 h-32 mt-2 left-0" />
        )}
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      {registration.status === 'registered' &&
      new Date() <= new Date(registration.cancellationDeadline) ? (
        <button
          onClick={handleCancel}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel Registration
        </button>
      ) : (
        <p className="text-red-500 mt-4">
          {registration.status === 'cancelled' ? 'Cancelled' : 'Cancellation period has expired'}
        </p>
      )}
    </div>
  );
};

export default RegisteredDataCard;