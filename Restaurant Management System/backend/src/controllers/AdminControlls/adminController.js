// const Event = require('../models/Event');
// const User = require('../models/User');
// const Registration = require('../models/Registration');

// // Events Management
// const createEvent = async (req, res) => {
//   try {
//     const event = new Event(req.body);
//     await event.save();
//     res.status(201).json(event);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!event) return res.status(404).json({ message: 'Event not found' });
//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.findByIdAndDelete(req.params.id);
//     if (!event) return res.status(404).json({ message: 'Event not found' });
//     // Optionally: Delete associated registrations
//     await Registration.deleteMany({ event: req.params.id });
//     res.json({ message: 'Event deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Users Management
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}, '-password'); // Exclude passwords
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     // Optionally: Delete associated registrations
//     await Registration.deleteMany({ user: req.params.id });
//     res.json({ message: 'User deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Registrations Management
// const getAllRegistrations = async (req, res) => {
//   try {
//     const registrations = await Registration.find({})
//       .populate('user', 'name email')
//       .populate('event', 'title date');
//     res.json(registrations);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   getAllUsers,
//   deleteUser,
//   getAllRegistrations
// };

const Event = require("../models/Event");
const User = require("../models/User");
const Registration = require("../models/Registration");

// Events Management
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    await Registration.deleteMany({ event: req.params.id });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Users Management
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await Registration.deleteMany({ user: req.params.id });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Registrations Management
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user", "name email")
      .populate("event", "title date");
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const getRegistrationsByEvent = async (req, res) => {
//   console.log(req.user);
//   try {
//     const events = await Event.find({}).lean();
//     const registrations = await Registration.find({})
//       .populate("user", "name email")
//       .populate("event", "title date location")
//       .lean();

//     // remove those with no event
//     const validRegistrations = registrations.filter((reg) => reg.event);
//     // const groupedByEvent = { events: events, registrations: registrations };
//     // res.json(groupedByEvent);
//     // // const groupedByEvent = events.map((event) => ({
//     // //   event,
//     // //   registrations: registrations.filter(
//     // //     (reg) => reg.event._id.toString() === event._id.toString()
//     // //   ),
//     // // }));
//     const groupedByEvent = events.map((event) => ({
//       ...event,
//       registrations: validRegistrations.filter(
//         (reg) => reg.event._id.toString() === event._id.toString()
//       ),
//     }));
//     res.json(groupedByEvent);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


const getRegistrationsByEvent = async (req, res) => {
  try {
    const events = await Event.find({}).lean();
    const registrations = await Registration.find({})
      .populate("user", "name email")
      .populate("event", "title date location")
      .lean();

    // ✅ Filter out registrations without user or event
    const validRegistrations = registrations.filter(
      (reg) => reg.user && reg.event
    );

    const groupedByEvent = events.map((event) => ({
      event,
      registrations: validRegistrations.filter(
        (reg) => reg.event._id.toString() === event._id.toString()
      ),
    }));

    res.json(groupedByEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const rejectRegistration = async (req, res) => {
  try {
    const registrationId = req.params.id;
    const registration = await Registration.findById(registrationId);
    if (!registration)
      return res.status(404).json({ message: "Registration not found" });

    registration.status = "cancelled";
    await registration.save();

    // Update event (remove user)
    const event = await Event.findById(registration.event);
    event.registeredUsers = event.registeredUsers.filter(
      (id) => id.toString() !== registration.user.toString()
    );
    await event.save();

    res.json({ message: "Registration rejected successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllUsers,
  deleteUser,
  getAllRegistrations,
  getRegistrationsByEvent,
  rejectRegistration,
};
