const Supplier = require('../models/Supplier');

// Get all suppliers
exports.getSuppliers = async (req, res) => {
    const suppliers = await Supplier.find();
    res.json(suppliers);
};

// Add a new supplier
exports.addSupplier = async (req, res) => {
    const { name, contact } = req.body;
    const supplier = new Supplier({ name, contact });
    await supplier.save();
    res.json(supplier);
};

// Update a supplier
exports.updateSupplier = async (req, res) => {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(supplier);
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supplier deleted' });
};
