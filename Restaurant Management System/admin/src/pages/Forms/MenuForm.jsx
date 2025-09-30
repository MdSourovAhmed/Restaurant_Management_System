import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const MenuForm = ({ fetchMenuItems, editingItem, setEditingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    ingredients: [],
  });
  const [inventoryItems, setInventoryItems] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description,
        price: editingItem.price,
        category: editingItem.category,
        ingredients: editingItem.ingredients,
      });
    }
    fetchInventory();
  }, [editingItem]);

  const fetchInventory = async () => {
    try {
      const response = await api.get('/inventory');
      setInventoryItems(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const url = editingItem
        ? `/menu/${editingItem._id}`
        : '/menu';
      const method = editingItem ? 'patch' : 'post';
      const response = await api[method](url, formData);
      setSuccess(editingItem ? 'Item updated!' : 'Item created!');
      setFormData({ name: '', description: '', price: '', category: '', ingredients: [] });
      setEditingItem(null);
      fetchMenuItems();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleIngredientChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, ingredients: value });
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
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full border rounded p-2"
          required
        >
          <option value="">Select Category</option>
          <option value="Main Course">Main Course</option>
          <option value="Salad">Salad</option>
          <option value="Dessert">Dessert</option>
          <option value="Appetizer">Appetizer</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Ingredients</label>
        <select
          multiple
          value={formData.ingredients}
          onChange={handleIngredientChange}
          className="mt-1 block w-full border rounded p-2"
        >
          {inventoryItems.map(item => (
            <option key={item._id} value={item._id}>{item.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {editingItem ? 'Update Item' : 'Add Item'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default MenuForm;