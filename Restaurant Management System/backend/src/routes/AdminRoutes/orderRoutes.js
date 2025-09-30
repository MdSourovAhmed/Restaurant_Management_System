// const express = require('express');
// const router = express.Router();
// const orderController = require('../controllers/orderController');

// router.get('/', orderController.getOrders);
// router.post('/', orderController.createOrder);
// router.patch('/:id', orderController.updateOrderStatus);

// module.exports = router;

const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");
const Authenticate = require("../../middlewares/authMiddleware");

router.get("/",Authenticate, orderController.getOrders);
router.get("/:id",Authenticate, orderController.getOrdersByUser);
router.post("/",Authenticate, orderController.createOrder);
router.patch("/:id", Authenticate, orderController.updateOrderStatus);
router.delete("/:id", Authenticate, orderController.deleteOrder);

module.exports = router;
