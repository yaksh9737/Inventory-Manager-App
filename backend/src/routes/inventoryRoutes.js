const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', inventoryController.getInventory);
router.post('/', inventoryController.addInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);
router.get('/export', inventoryController.exportCSV);
router.post('/import', upload.single('file'), inventoryController.importCSV);
router.get('/low-stock', inventoryController.getLowStock);

module.exports = router;
