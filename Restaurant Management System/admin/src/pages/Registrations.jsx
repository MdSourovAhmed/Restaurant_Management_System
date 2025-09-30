// import { useState, useEffect, useContext } from "react";
// import api from "../utils/api";
// import { AuthContext } from "../context/AuthContext";
// // import {EventCard} from "../components/EventCard";
// import RegisteredList from "../components/RegisteredList";

// function Registrations() {
//   const [registrations, setRegistrations] = useState([]);
//   // const [filteredRegistrations, setFilteredRegistrations] = useState([]);
//   // const [showForm, setShowForm] = useState(false);
//   // const [editVerse, setEditVerse] = useState(null);
//   const { user, loading } = useContext(AuthContext);

//   useEffect(() => {
//     if (user) {
//       // console.log(user);
//       api.get("/registrations/my").then((res) => {
//         setRegistrations(res.data);
//         // console.log(res.data[0].event);
//         // setFilteredRegistrations(res.data);
//       });
//     }
//   }, [user]);

//   if (loading)
//     return (
//       <div className="text-center text-gray-600 dark:text-gray-300">
//         Loading...
//       </div>
//     );
//   if (!user)
//     return (
//       <div className="text-center text-gray-600 dark:text-gray-300">
//         Please log in to view Registrations.
//       </div>
//     );

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4 text-gray-600 dark:text-gray-300">
//         Your Registered Events
//       </h2>
//       {/* <button
//         onClick={() => setShowForm(true)}
//         className="mb-4 bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
//       >
//         Add Verse
//       </button> */}
//       {/* <SearchBar onSearch={handleSearch} /> */}
//       {/* <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditVerse(null); }}>
//         <VerseForm onSubmit={editVerse ? handleEdit : handleAdd} initialData={editVerse} />
//       </Modal> */}
//       {/* <RegisteredList Registrations={filteredRegistrations} onEdit={setEditVerse} onDelete={handleDelete} /> */}
//       <RegisteredList registrationData={registrations} />
//     </div>
//   );
// }

// export default Registrations;

// // import { useState, useEffect, useContext } from 'react';
// // import api from '../utils/api';
// // import VerseForm from '../components/VerseForm';
// // import RegisteredList from '../components/RegisteredList';
// // import { AuthContext } from '../context/AuthContext';

// // function Registrations() {
// //   const [Registrations, setRegistrations] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editVerse, setEditVerse] = useState(null);
// //   const { user, loading } = useContext(AuthContext);

// //   useEffect(() => {
// //     if (user) {
// //       api.get('/Registrations').then((res) => setRegistrations(res.data));
// //     }
// //   }, [user]);

// //   const handleAdd = async (verse) => {
// //     const res = await api.post('/Registrations', verse);
// //     setRegistrations([...Registrations, res.data]);
// //     setShowForm(false);
// //   };

// //   const handleEdit = async (verse) => {
// //     const res = await api.put(`/Registrations/${verse._id}`, verse);
// //     setRegistrations(Registrations.map((v) => (v._id === verse._id ? res.data : v)));
// //     setEditVerse(null);
// //     setShowForm(false);
// //   };

// //   const handleDelete = async (id) => {
// //     await api.delete(`/Registrations/${id}`);
// //     setRegistrations(Registrations.filter((v) => v._id !== id));
// //   };

// //   if (loading) return <div>Loading...</div>;
// //   if (!user) return <div>Please log in to view Registrations.</div>;

// //   return (
// //     <div>
// //       <div className="flex justify-between items-center mb-4">
// //         <h2 className="text-2xl font-bold">My Registrations</h2>
// //         <button
// //           onClick={() => {
// //             setShowForm(!showForm);
// //             setEditVerse(null);
// //           }}
// //           className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
// //         >
// //           {showForm ? 'Cancel' : 'Add Verse'}
// //         </button>
// //       </div>
// //       {showForm && <VerseForm onSubmit={editVerse ? handleEdit : handleAdd} initialData={editVerse} />}
// //       <RegisteredList Registrations={Registrations} onEdit={setEditVerse} onDelete={handleDelete} />
// //     </div>
// //   );
// // }

// // export default Registrations;

// // import { useState, useEffect, useContext } from 'react';
// // import api from '../utils/api';
// // import VerseForm from '../components/VerseForm';
// // import RegisteredList from '../components/RegisteredList';
// // import SearchBar from '../components/SearchBar';
// // import Modal from '../components/Modal';
// // import { AuthContext } from '../context/AuthContext';

// // function Registrations() {
// //   const [Registrations, setRegistrations] = useState([]);
// //   const [filteredRegistrations, setFilteredRegistrations] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [editVerse, setEditVerse] = useState(null);
// //   const { user, loading } = useContext(AuthContext);

// //   useEffect(() => {
// //     if (user) {
// //       api.get('/Registrations').then((res) => {
// //         setRegistrations(res.data);
// //         setFilteredRegistrations(res.data);
// //       });
// //     }
// //   }, [user]);

// //   const handleAdd = async (verse) => {
// //     const res = await api.post('/Registrations', verse);
// //     const updatedRegistrations = [...Registrations, res.data];
// //     setRegistrations(updatedRegistrations);
// //     setFilteredRegistrations(updatedRegistrations);
// //     setShowForm(false);
// //   };

// //   const handleEdit = async (verse) => {
// //     const res = await api.put(`/Registrations/${verse._id}`, verse);
// //     const updatedRegistrations = Registrations.map((v) => (v._id === verse._id ? res.data : v));
// //     setRegistrations(updatedRegistrations);
// //     setFilteredRegistrations(updatedRegistrations);
// //     setEditVerse(null);
// //     setShowForm(false);
// //   };

// //   const handleDelete = async (id) => {
// //     await api.delete(`/Registrations/${id}`);
// //     const updatedRegistrations = Registrations.filter((v) => v._id !== id);
// //     setRegistrations(updatedRegistrations);
// //     setFilteredRegistrations(updatedRegistrations);
// //   };

// //   const handleSearch = (term) => {
// //     const lowerTerm = term.toLowerCase();
// //     setFilteredRegistrations(
// //       Registrations.filter(
// //         (v) =>
// //           v.book.toLowerCase().includes(lowerTerm) ||
// //           v.chapter.toString().includes(lowerTerm) ||
// //           v.text.toLowerCase().includes(lowerTerm)
// //       )
// //     );
// //   };

// //   if (loading) return <div className="text-center">Loading...</div>;
// //   if (!user) return <div className="text-center">Please log in to view Registrations.</div>;

// //   return (
// //     <div>
// //       <div className="flex justify-between items-center mb-4">
// //         <h2 className="text-2xl font-bold">My Registrations</h2>
// //         <button
// //           onClick={() => {
// //             setShowForm(!showForm);
// //             setEditVerse(null);
// //           }}
// //           className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
// //         >
// //           {showForm ? 'Cancel' : 'Add Verse'}
// //         </button>
// //       </div>
// //       <SearchBar onSearch={handleSearch} />
// //       <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
// //         <VerseForm onSubmit={editVerse ? handleEdit : handleAdd} initialData={editVerse} />
// //       </Modal>
// //       <RegisteredList Registrations={filteredRegistrations} onEdit={setEditVerse} onDelete={handleDelete} />
// //     </div>
// //   );
// // }

// // export default Registrations;





import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import RegisteredDataCard from '../components/RegisteredDataCard';

function Registrations(){
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get('/registrations/my');
        setRegistrations(response.data);
      } catch (err) {
        setError('Failed to fetch registrations');
      }
    };
    fetchRegistrations();
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold m-4">My Registrations</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {registrations.length === 0 ? (
        <p className="text-gray-600">No registrations yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {registrations.map((reg) => (
            <RegisteredDataCard key={reg._id} registration={reg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Registrations;