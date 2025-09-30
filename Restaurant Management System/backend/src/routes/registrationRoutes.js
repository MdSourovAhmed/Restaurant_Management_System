const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const { submitRegistration, getMyRegistrations, cancelRegistration } = require('../controllers/registrationController');
const authMiddleware = require('../middlewares/authMiddleware');
const rateLimit = require('express-rate-limit');

// Rate limit for registration actions
const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit to 5 registrations per hour per IP
  message: 'Too many registration attempts, please try again later.'
});

// Validation middleware
const validateErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', 
  authMiddleware,
  registrationLimiter,
  body('eventId').isMongoId().withMessage('Invalid Event ID'),
  validateErrors,
  submitRegistration
);

router.get('/my', authMiddleware, getMyRegistrations);

router.delete('/:id', 
  authMiddleware,
  param('id').isMongoId().withMessage('Invalid Registration ID'),
  validateErrors,
  cancelRegistration
);

module.exports = router;