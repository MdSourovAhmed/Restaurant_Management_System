const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const adminMiddleware = require('../../middlewares/adminMiddleware');
const { createEvent, updateEvent, deleteEvent, getAllUsers, deleteUser, getAllRegistrations, getRegistrationsByEvent, rejectRegistration } = require('../controllers/adminController');

// Validation middleware
const validateErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Events
router.post('/events', 
  authMiddleware, adminMiddleware,
  body('title').trim().notEmpty().withMessage('Title required'),
  body('date').isISO8601().withMessage('Invalid date'),
  validateErrors,
  createEvent
);
// router.post('/events', 
//   authMiddleware, adminMiddleware,
//   body('title').trim().notEmpty().withMessage('Title required'),
//   body('date').isISO8601().withMessage('Invalid date'),
//   validateErrors,
//   createEvent
// );

router.put('/events/:id', 
  authMiddleware, adminMiddleware,
  param('id').isMongoId().withMessage('Invalid Event ID'),
  validateErrors,
  updateEvent
);

router.delete('/events/:id', 
  authMiddleware, adminMiddleware,
  param('id').isMongoId().withMessage('Invalid Event ID'),
  validateErrors,
  deleteEvent
);

// Users
router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

router.delete('/users/:id', 
  authMiddleware, adminMiddleware,
  param('id').isMongoId().withMessage('Invalid User ID'),
  validateErrors,
  deleteUser
);

// Registrations
router.get('/registrations', authMiddleware, adminMiddleware, getAllRegistrations);
router.get('/registrations/by-event', authMiddleware, adminMiddleware, getRegistrationsByEvent);


router.delete('/registrations/:id', 
  authMiddleware, adminMiddleware,
  param('id').isMongoId().withMessage('Invalid Registration ID'),
  validateErrors,
  rejectRegistration
);

module.exports = router;