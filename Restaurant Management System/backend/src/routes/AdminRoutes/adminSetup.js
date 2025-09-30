const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {
  verifyAdmin,
  signup,
  login,
  forgotPassword,
  resetPassword,
  recoverAdmin,
} = require("../../controllers/AdminControlls/adminSetup");
const rateLimit = require("express-rate-limit");

// Rate limits for auth routes to prevent brute-force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit to 10 requests per window per IP
  message: "Too many requests, please try again later.",
});

const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit to 3 reset requests per hour per IP
  message: "Too many reset attempts, please try again later.",
});

// Validation middleware
const validateErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// router.post('/signup',
//   authLimiter,
//   body('name').trim().notEmpty().withMessage('Name is required'),
//   body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
//   body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
//   body('secondaryEmail').optional().isEmail().normalizeEmail().withMessage('Invalid secondary email'),
//   validateErrors,
//   signup
// );

router.get("/me", require("../../middlewares/adminMiddleware"),verifyAdmin);

router.post("/signup", authLimiter, signup);

router.post(
  "/login",
  authLimiter,
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  validateErrors,
  login
);

router.post(
  "/forgot-password",
  resetLimiter,
  body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  validateErrors,
  forgotPassword
);

router.post(
  "/reset-password",
  resetLimiter,
  body("token").notEmpty().withMessage("Token is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters"),
  validateErrors,
  resetPassword
);

router.post(
  "/recover-username",
  resetLimiter,
  body("secondaryEmail")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid secondary email"),
  validateErrors,
  recoverAdmin
);

module.exports = router;
