const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, enum: ['registered', 'cancelled'], default: 'registered' },
  registeredAt: { type: Date, default: Date.now },
  confirmationSent: { type: Boolean, default: false },
  qrCode: { type: String },
  cancellationDeadline: { type: Date, required: true }
});

registrationSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);