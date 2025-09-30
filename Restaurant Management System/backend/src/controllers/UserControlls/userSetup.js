const User = require("../../models/User");
const ResetToken = require("../../models/ResetToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendResetEmail, sendRecoveryEmail } = require("../../config/emailConfig");

const verifyUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user: { id: user._id, name: user.name } });
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res) => {
  // const { name, email, password, secondaryEmail, role } = req.body;
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    // const existingUser = await User.findOne({
    //   $or: [{ email }, { secondaryEmail }],
    // });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email or secondary email already in use" });

    const user = new User({
      name,
      email,
      password,
      secondaryEmail: "",
      role: "user",
    });
    await user.save();
    console.log(user);

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res
      .status(201)
      .json({ token, user: { id: user._id, name, email, role: "user" } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      token,
      user: { id: user._id, name: user.name, email, role: "user" },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000);

    await ResetToken.create({ user: user._id, token, expiresAt });

    const emailSent = await sendResetEmail(user, token);
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

    const user = await User.findById(resetToken.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    resetToken.used = true;
    await resetToken.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const recoverUsername = async (req, res) => {
  const { secondaryEmail } = req.body;
  try {
    const user = await User.findOne({ secondaryEmail });
    if (!user)
      return res
        .status(404)
        .json({ message: "No user found with this secondary email" });

    const emailSent = await sendRecoveryEmail(user, secondaryEmail);
    if (!emailSent)
      return res.status(500).json({ message: "Failed to send recovery email" });

    res.json({ message: "Username recovery email sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  verifyUser,
  signup,
  login,
  forgotPassword,
  resetPassword,
  recoverUsername,
};
