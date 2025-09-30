import { useState, useEffect } from "react";
import api from "../utils/api";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (err) {
      setError("Failed to fetch events");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/events/${editingId}`, formData);
        setEditingId(null);
      } else {
        await api.post("/admin/events", formData);
      }
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        capacity: "",
      });
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save event");
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.slice(0, 10), // For date input
      location: event.location,
      capacity: event.capacity,
    });
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      try {
        await api.delete(`/admin/events/${id}`);
        fetchEvents();
      } catch (err) {
        setError("Failed to delete event");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 mb-6"
      >
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
            isOpen ? "bolck" : "hidden"
          }`}
        >
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-2 border rounded col-span-2"
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            setIsOpen(!isOpen);
            // setIsOpen(true);
          }}
          className="mt-4 bg-teal-500 pointer text-white px-4 py-2 rounded-lg hover:bg-teal-600"
        >
          {editingId ? "Update Event" : "Create Event"}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(event)}
                className="mr-2 text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;
