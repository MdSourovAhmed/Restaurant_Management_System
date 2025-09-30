import React, { useState, useEffect } from 'react';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/inventory')
      .then(res => res.json())
      .then(data => setInventory(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
      <ul className="list-disc pl-5">
        {inventory.map(item => (
          <li key={item._id} className={`mb-2 ${item.quantity <= item.minThreshold ? 'text-red-500' : ''}`}>
            {item.name}: {item.quantity} {item.unit}
            {item.quantity <= item.minThreshold && ' (Low Stock)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;