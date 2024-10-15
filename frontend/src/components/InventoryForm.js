// src/components/InventoryForm.js
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa'; // Importing icons

const InventoryForm = ({ onSubmit, suppliers, currentItem, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        category: '',
        supplier: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentItem) {
            setFormData({
                name: currentItem.name || '',
                quantity: currentItem.quantity || '',
                category: currentItem.category || '',
                supplier: currentItem.supplier?._id || '',
            });
        } else {
            setFormData({
                name: '',
                quantity: '',
                category: '',
                supplier: '',
            });
        }
    }, [currentItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.quantity || !formData.category || !formData.supplier) {
            setError('All fields are required.');
            return;
        }

        try {
            await onSubmit(formData);
            // Clear the form after successful submission
            setFormData({
                name: '',
                quantity: '',
                category: '',
                supplier: '',
            });
        } catch (err) {
            setError('Failed to submit the form. Please try again.');
            console.error("Form submission error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#2A2A3A] p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-neon-cyan text-center">
                {currentItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
            </h2>
            {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
            <div className="space-y-6">
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                        Item Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-white rounded-md bg-[#1E1E2F] focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-colors"
                        placeholder="Enter item name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="quantity">
                        Quantity
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-white rounded-md bg-[#1E1E2F] focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-colors"
                        placeholder="Enter quantity"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-white rounded-md bg-[#1E1E2F] focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-colors"
                        placeholder="Enter category"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="supplier">
                        Supplier
                    </label>
                    <select
                        id="supplier"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-white rounded-md bg-[#1E1E2F] focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-colors"
                        required
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map(supp => (
                            <option key={supp._id} value={supp._id}>{supp.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className={`flex items-center justify-center w-full py-3 px-4 rounded bg-[#39FF14] text-black font-bold hover:bg-[#2A2A3A] hover:text-neon-cyan transition-transform transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {currentItem ? <FaEdit className="mr-2" /> : <FaPlus className="mr-2" />}
                    {currentItem ? 'Update Item' : 'Add Item'}
                </button>
            </div>
        </form>
    );
};

export default InventoryForm;
