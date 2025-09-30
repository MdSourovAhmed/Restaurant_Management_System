// const express = require('express');
// const router = express.Router();
// const tableController = require('../controllers/tableController');

// router.get('/', tableController.getTables);
// router.get('/availability', tableController.getAvailableTables);

// module.exports = router;



const express = require('express');
const router = express.Router();
const tableController = require('../../controllers/tableController');

router.get('/', tableController.getTables);
router.get('/availability', tableController.getAvailableTables);
router.post('/', tableController.createTable);
router.patch('/:id', tableController.updateTable);
router.delete('/:id', tableController.deleteTable);

module.exports = router;