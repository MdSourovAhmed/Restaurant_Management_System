const Admin = require("../../models/Admin");
const ResetToken = require("../../models/ResetToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendResetEmail, sendRecoveryEmail } = require("../../config/emailConfig");

const verifyAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    res.json({ user: { id: admin._id, name:admin.name} });
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res) => {
  const { name, email, password, secondaryEmail, role } = req.body;
  console.log('body is: ', req.body);
  try {
    const existingadmin = await Admin.findOne({
      $or: [{ email }, { secondaryEmail }],
    });
    if (existingadmin)
      return res
        .status(400)
        .json({ message: "Email or secondary email already in use" });

    const admin = new Admin({ name, email, password, secondaryEmail, role });
    await admin.save();
    // console.log(admin);

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res
      .status(201)
      .json({ token, user: { id: admin._id, name, email, role: admin.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      token,
      user: { id: admin._id, name: admin.name, email, role: admin.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "admin not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000);

    await ResetToken.create({ user: admin._id, token, expiresAt });

    const emailSent = await sendResetEmail(admin, token);
    if (!emailSent)
      return res.status(500).json({ message: "Failed to send reset email" });

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const resetToken = await ResetToken.findOne({ token, used: false });
    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const admin = await Admin.findById(resetToken.admin);
    if (!admin) return res.status(404).json({ message: "admin not found" });

    admin.password = newPassword;
    await admin.save();

    resetToken.used = true;
    await resetToken.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const recoverAdmin= async (req, res) => {
  const { secondaryEmail } = req.body;
  try {
    const admin = await Admin.findOne({ secondaryEmail });
    if (!admin)
      return res
        .status(404)
        .json({ message: "No admin found with this secondary email" });

    const emailSent = await sendRecoveryEmail(admin, secondaryEmail);
    if (!emailSent)
      return res.status(500).json({ message: "Failed to send recovery email" });

    res.json({ message: "adminname recovery email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  verifyAdmin,
  signup,
  login,
  forgotPassword,
  resetPassword,
  recoverAdmin,
};
