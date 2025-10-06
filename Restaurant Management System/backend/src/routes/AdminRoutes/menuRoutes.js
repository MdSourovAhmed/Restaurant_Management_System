// const express = require('express');
// const router = express.Router();
// const menuController = require('../controllers/menuController');

// router.get('/', menuController.getMenuItems);
// router.post('/', menuController.createMenuItem);

// module.exports = router;




const express = require('express');
const router = express.Router();
const menuController = require('../../controllers/menuController');

router.get('/', menuController.getMenuItems);
router.get('/categories', menuController.getMenuCategories);
router.post('/', menuController.createMenuItem);
router.get('/:category', menuController.getMenuItemsByCategory);
router.patch('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;