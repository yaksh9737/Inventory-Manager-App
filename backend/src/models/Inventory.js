const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', InventorySchema);
