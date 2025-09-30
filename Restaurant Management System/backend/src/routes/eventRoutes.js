const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const { getAllEvents, getEventDetails } = require('../controllers/eventController');

// Validation middleware
const validateErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', getAllEvents);

router.get('/:id', 
  param('id').isMongoId().withMessage('Invalid Event ID'),
  validateErrors,
  getEventDetails
);

module.exports = router;