const Event = require("../models/Event");

const getAllEvents = async (req, res) => {
  try {
    // const events = await Event.find({ date: { $gte: new Date() } });
    const events = await Event.find({});
    // console.log(events);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "registeredUsers",
      "name email"
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllEvents, getEventDetails };
