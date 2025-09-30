import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = ({ fetchOrders }) => {
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    tableId: '',
    items: [{ menuItem: '', quantity: 1 }],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tables/availability');
        setTables(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTables();
    fetchMenuItems();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'tableId') {
      setFormData({ ...formData, tableId: value });
    } else {
      const updatedItems = [...formData.items];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      setFormData({ ...formData, items: updatedItems });
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { menuItem: '', quantity: 1 }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/orders', formData);
      setSuccess('Order placed successfully!');
      setFormData({ tableId: '', items: [{ menuItem: '', quantity: 1 }] });
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block text-sm font-medium">Select Table</label>
        <select
          name="tableId"
          value={formData.tableId}
          onChange={handleInputChange}
          className="mt-1 block w-full border rounded p-2"
          required
        >
          <option value="">Select a table</option>
          {tables.map(table => (
            <option key={table._id} value={table._id}>
              Table {table.number} (Capacity: {table.capacity})
            </option>
          ))}
        </select>
      </div>
      {formData.items.map((item, index) => (
        <div key={index} className="flex space-x-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium">Menu Item</label>
            <select
              name="menuItem"
              value={item.menuItem}
              onChange={(e) => handleInputChange(e, index)}
              className="mt-1 block w-full border rounded p-2"
              required
            >
              <option value="">Select an item</option>
              {menuItems.map(menuItem => (
                <option key={menuItem._id} value={menuItem._id}>
                  {menuItem.name} (${menuItem.price})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(e, index)}
              min="1"
              className="mt-1 block w-24 border rounded p-2"
              required
            />
          </div>
          {formData.items.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={addItem}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Item
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default OrderForm;