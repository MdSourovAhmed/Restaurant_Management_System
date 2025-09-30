// import React, { useState, useEffect } from 'react';
// import TableCard from '../components/TableCard';

// const Tables = () => {
//   const [tables, setTables] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/tables')
//     // fetch('http://localhost:5000/api/tables/availability')
//       .then(res => res.json())
//       .then(data => setTables(data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="container bg-gray-100 mx-auto relative p-6 mt-6 md:h-auto h-auto lg:h-auto rounded-lg">
//       <h2 className="text-2xl text-teal-400 font-semibold mb-4">Available Tables</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {tables.map(table => (
//           <TableCard table={table} key={table._id}/>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tables;








import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import TableCard from '../components/TableCard';

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAvailableTables = async () => {
      try {
        setLoading(true);
        // const response = await axios.get('http://localhost:5000/api/tables/availability');
        const response = await api.get("/tables/availability");
        setTables(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load available tables');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableTables();
  }, []);

  return (
    <div className="container max-w-7xl mx-auto mt-6 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-teal-400 mb-6">Available Tables</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 bg-red-100 rounded-lg">
          {error}
        </div>
      ) : tables.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <TableCard table={table} key={table._id} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 p-4 bg-gray-200 rounded-lg">
          No Available Tables Found
        </div>
      )}
    </div>
  );
};

export default Tables;