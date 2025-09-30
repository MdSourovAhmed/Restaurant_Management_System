// const express = require('express');
// const router = express.Router();
// const inventoryController = require('../controllers/inventoryController');

// router.get('/', inventoryController.getInventory);
// router.patch('/:id', inventoryController.updateInventory);
// router.get('/low-stock', inventoryController.getLowStock);

// module.exports = router;


const express = require('express');
const router = express.Router();
const inventoryController = require('../../controllers/inventoryController');

router.get('/', inventoryController.getInventory);
router.post('/', inventoryController.createInventory);
router.patch('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);
router.get('/low-stock', inventoryController.getLowStock);

module.exports = router;