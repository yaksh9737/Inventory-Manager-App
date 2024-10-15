// src/components/SupplierForm.js
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa'; // Importing icons

const SupplierForm = ({ onSubmit, currentSupplier, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentSupplier) {
            setFormData({
                name: currentSupplier.name || '',
                contact: currentSupplier.contact || '',
            });
        } else {
            setFormData({
                name: '',
                contact: '',
            });
        }
    }, [currentSupplier]);

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

        if (!formData.name || !formData.contact) {
            setError('All fields are required.');
            return;
        }

        try {
            await onSubmit(formData);
            // Clear the form after successful submission
            setFormData({
                name: '',
                contact: '',
            });
        } catch (err) {
            setError('Failed to submit the form. Please try again.');
            console.error("Form submission error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#2A2A3A] p-8 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-semibold mb-6 text-neon-cyan text-center">
                {currentSupplier ? 'Edit Supplier' : 'Add New Supplier'}
            </h2>
            {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
            <div className="space-y-6">
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-white rounded-md bg-[#1E1E2F] focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-colors"
                        placeholder="Enter supplier name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="contact">
                        Contact
                    </label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-white rounded-md bg-[#1E1E2F] focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-colors"
                        placeholder="Enter contact details"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`flex items-center justify-center w-full py-3 px-4 rounded bg-[#39FF14] text-black font-bold hover:bg-[#2A2A3A] hover:text-neon-cyan transition-transform transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {currentSupplier ? <FaEdit className="mr-2" /> : <FaPlus className="mr-2" />}
                    {currentSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
            </div>
        </form>
    );
};

export default SupplierForm;
