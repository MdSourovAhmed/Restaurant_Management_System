const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// General email sender
const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};

// Password reset email
const sendResetEmail = async (user, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const html = `
    <h2>Password Reset Request</h2>
    <p>Hi ${user.name},</p>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
  `;
  return sendEmail(user.email, 'Password Reset - Event Registration System', html);
};

// Username/email recovery email
const sendRecoveryEmail = async (user, secondaryEmail) => {
  const html = `
    <h2>Username Recovery</h2>
    <p>Your registered email for Event Registration System is: <strong>${user.email}</strong></p>
    <p>If you need to reset your password, use the "Forgot Password" option.</p>
  `;
  return sendEmail(secondaryEmail, 'Username Recovery - Event Registration System', html);
};

// Registration confirmation email (from previous)
const sendConfirmationEmail = async (user, event, qrCode, cancellationDeadline) => {
  const html = `
    <h2>Thank you for registering for ${event.title}!</h2>
    <p>Date: ${event.date.toDateString()}</p>
    <p>Location: ${event.location}</p>
    <p>Your QR Code Ticket:</p>
    <img src="${qrCode}" alt="QR Code Ticket" />
    <p>Scan this at the event entrance. Note: Cancellation is not allowed after ${cancellationDeadline.toDateString()}.</p>
  `;
  return sendEmail(user.email, `Registration Confirmed: ${event.title}`, html);
};

module.exports = { transporter, sendEmail, sendResetEmail, sendRecoveryEmail, sendConfirmationEmail };