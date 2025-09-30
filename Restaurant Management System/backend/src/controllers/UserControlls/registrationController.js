const Registration = require('../models/Registration');
const Event = require('../models/Event');
const User = require('../models/User');
const QRCode = require('qrcode');
const { sendConfirmationEmail } = require('../config/emailConfig');

const submitRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const existing = await Registration.findOne({ user: userId, event: eventId });
    if (existing) return res.status(400).json({ message: 'Already registered' });

    if (event.registeredUsers.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is at capacity' });
    }

    const cancellationDeadline = new Date(event.date);
    cancellationDeadline.setDate(cancellationDeadline.getDate() - 3);

    const qrData = `Registration ID: ${userId}-${eventId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const registration = new Registration({
      user: userId,
      event: eventId,
      qrCode,
      cancellationDeadline
    });
    await registration.save();

    event.registeredUsers.push(userId);
    await event.save();

    const user = await User.findById(userId);
    const emailSent = await sendConfirmationEmail(user, event, qrCode, cancellationDeadline);
    if (emailSent) {
      registration.confirmationSent = true;
      await registration.save();
    }

    res.status(201).json({ message: 'Registered successfully', registration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;
    const registrations = await Registration.find({ user: userId })
      .populate('event', 'title date location')
      .sort({ registeredAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const registrationId = req.params.id;
    const userId = req.user.id;

    const registration = await Registration.findOne({ _id: registrationId, user: userId });
    if (!registration) return res.status(404).json({ message: 'Registration not found' });

    if (registration.status === 'cancelled') {
      return res.status(400).json({ message: 'Already cancelled' });
    }

    if (new Date() > registration.cancellationDeadline) {
      return res.status(400).json({ message: `Cancellation not allowed after ${registration.cancellationDeadline.toDateString()}` });
    }

    registration.status = 'cancelled';
    await registration.save();

    const event = await Event.findById(registration.event);
    event.registeredUsers = event.registeredUsers.filter(id => id.toString() !== userId.toString());
    await event.save();

    res.json({ message: 'Cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { submitRegistration, getMyRegistrations, cancelRegistration };