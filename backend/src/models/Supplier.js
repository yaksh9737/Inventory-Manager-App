const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    itemsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }]
}, { timestamps: true });

module.exports = mongoose.model('Supplier', SupplierSchema);
