const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('mongo-sanitize');
const hpp = require('hpp');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');
dotenv.config();

const server = express();
connectDB();





// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');


server.use(express.json());
server.use(cors())

// // MongoDB Connection
// mongoose.connect('mongodb://localhost/restaurant', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Routes
server.use('/api/admin/auth',require('./src/routes/AdminRoutes/adminSetup'))
server.use('/api/admin/menu', require('./src/routes/AdminRoutes/menuRoutes'));
server.use('/api/admin/orders', require('./src/routes/AdminRoutes/orderRoutes'));
server.use('/api/admin/tables', require('./src/routes/AdminRoutes/tableRoutes'));
server.use('/api/admin/reservations', require('./src/routes/AdminRoutes/reservationRoutes'));
server.use('/api/admin/inventory', require('./src/routes/AdminRoutes/inventoryRoutes'));
server.use('/api/admin/reports', require('./src/routes/AdminRoutes/reportRoutes'));


server.use('/api/auth', require('./src/routes/UserRoutes/userSetup'));
server.use('/api/menu', require('./src/routes/AdminRoutes/menuRoutes'));
server.use('/api/orders', require('./src/routes/AdminRoutes/orderRoutes'));
server.use('/api/tables', require('./src/routes/AdminRoutes/tableRoutes'));
server.use('/api/reservations', require('./src/routes/AdminRoutes/reservationRoutes'));
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// // Security Middlewares
// server.use(helmet());
// server.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173/',
//   credentials: true
// }));
// server.use(express.json({ limit: '10kb' }));
// server.use(express.urlencoded({ extended: true, limit: '10kb' }));
// server.use(hpp());
// server.use((req, res, next) => {
//   req.body = mongoSanitize(req.body);
//   req.query = mongoSanitize(req.query);
//   req.params = mongoSanitize(req.params);
//   next();
// });

// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Too many requests, please try again later.'
// });
// server.use(globalLimiter);

// // Routes
// server.use('/api/events', require('./src/routes/eventRoutes'));
// server.use('/api/registrations', require('./src/routes/registrationRoutes'));
// server.use('/api/auth', require('./src/routes/userRoutes'));
// server.use('/api/auth/admin', require('./src/routes/adminSetup')); // New admin routes
// server.use('/api/admin', require('./src/routes/adminRoutes')); // New admin routes

// Error Handling
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));