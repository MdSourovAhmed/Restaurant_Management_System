import React, { useState, useEffect } from 'react';

const Tables = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tables/availability')
      .then(res => res.json())
      .then(data => setTables(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Available Tables</h2>
      <ul className="list-disc pl-5">
        {tables.map(table => (
          <li key={table._id} className="mb-2">
            Table {table.number} (Capacity: {table.capacity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tables;