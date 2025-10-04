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

server.use(express.json());
server.use(cors())


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

// Error Handling
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
