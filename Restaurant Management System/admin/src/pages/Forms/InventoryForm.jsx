import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const InventoryForm = ({ fetchInventory, editingItem, setEditingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    minThreshold: 10,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        quantity: editingItem.quantity,
        unit: editingItem.unit,
        minThreshold: editingItem.minThreshold,
      });
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const path = editingItem
        ? `/inventory/${editingItem._id}`
        : '/inventory';
      const method = editingItem ? 'patch' : 'post';
      const response = await api[method](path, formData);
      setSuccess(editingItem ? 'Item updated!' : 'Item created!');
      setFormData({ name: '', quantity: '', unit: '', minThreshold: 10 });
      setEditingItem(null);
      fetchInventory();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Unit</label>
        <input
          type="text"
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Minimum Threshold</label>
        <input
          type="number"
          value={formData.minThreshold}
          onChange={(e) => setFormData({ ...formData, minThreshold: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {editingItem ? 'Update Item' : 'Add Item'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default InventoryForm;