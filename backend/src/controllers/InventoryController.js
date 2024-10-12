const Inventory = require('../models/Inventory');
const Supplier = require('../models/Supplier');
const { Parser } = require('json2csv');
const fs = require('fs');
const csv = require('csv-parser');

// Get all inventory items
exports.getInventory = async (req, res) => {
    const inventory = await Inventory.find().populate('supplier');
    res.json(inventory);
};

// Add a new inventory item
exports.addInventory = async (req, res) => {
    const { name, quantity, category, supplier } = req.body;
    const item = new Inventory({ name, quantity, category, supplier });
    await item.save();
    res.json(item);
};

// Update an inventory item
exports.updateInventory = async (req, res) => {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
};

// Delete an inventory item
exports.deleteInventory = async (req, res) => {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inventory item deleted' });
};

// CSV Export
exports.exportCSV = async (req, res) => {
    const inventory = await Inventory.find().populate('supplier');
    const parser = new Parser();
    const csvData = parser.parse(inventory);
    fs.writeFileSync('inventory.csv', csvData);
    res.download('inventory.csv');
};

// CSV Import
exports.importCSV = async (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            for (let item of results) {
                const { name, quantity, category, supplier } = item;
                await Inventory.create({ name, quantity, category, supplier });
            }
            res.json({ message: 'CSV data imported successfully' });
        });
};

// Low Stock Alert
exports.getLowStock = async (req, res) => {
    const threshold = req.query.threshold || 5;
    const lowStockItems = await Inventory.find({ quantity: { $lt: threshold } });
    res.json(lowStockItems);
};
