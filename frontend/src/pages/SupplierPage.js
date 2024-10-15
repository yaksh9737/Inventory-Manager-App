// src/pages/SupplierPage.js
import React, { useState, useEffect } from 'react';
import SupplierList from '../components/SupplierList';
import SupplierForm from '../components/SupplierForm';
import { fetchSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../api';

const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [currentSupplier, setCurrentSupplier] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetchSuppliers();
            setSuppliers(response.data);
        } catch (error) {
            console.error('Failed to fetch suppliers:', error);
            setError('Failed to load suppliers. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (supplierData) => {
        setLoading(true);
        setError('');
        try {
            if (currentSupplier) {
                await updateSupplier(currentSupplier._id, supplierData);
                setSuccessMessage('Supplier updated successfully!');
            } else {
                console.log("Submitting Supplier Data:", supplierData);
                await addSupplier(supplierData);
                setSuccessMessage('Supplier added successfully!');
            }
            setCurrentSupplier(null);
            loadSuppliers();
        } catch (error) {
            console.error('Failed to save supplier:', error);
            setError('Failed to save supplier. Please check the details and try again.');
        } finally {
            setLoading(false);
            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const handleEditSupplier = (supplier) => {
        setCurrentSupplier(supplier);
        setSuccessMessage('');
        setError('');
    };

    const handleDeleteSupplier = async (supplierId) => {
        if (!window.confirm('Are you sure you want to delete this supplier?')) return;
        setLoading(true);
        setError('');
        try {
            await deleteSupplier(supplierId);
            setSuccessMessage('Supplier deleted successfully!');
            loadSuppliers();
        } catch (error) {
            console.error('Failed to delete supplier:', error);
            setError('Failed to delete supplier. Please try again later.');
        } finally {
            setLoading(false);
            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-[#1E1E2F] text-white min-h-screen">
            <h1 className="text-4xl font-extrabold text-neon-cyan text-center mb-8">Manage Suppliers</h1>

            {error && (
                <div className="bg-red-500 text-white p-4 rounded mb-6">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="bg-green-500 text-white p-4 rounded mb-6">
                    {successMessage}
                </div>
            )}

            <div className="flex flex-col lg:flex-row lg:space-x-8">
                {/* Supplier Form */}
                <div className="lg:w-1/3 mb-8 lg:mb-3">
                    <SupplierForm
                        onSubmit={handleFormSubmit}
                        currentSupplier={currentSupplier}
                        loading={loading}
                    />
                </div>

                {/* Supplier List */}
                <div className="lg:w-2/3">
                    {loading ? (
                        <p className="text-center mt-4">Loading suppliers...</p>
                    ) : (
                        <SupplierList
                            suppliers={suppliers}
                            onEdit={handleEditSupplier}
                            onDelete={handleDeleteSupplier}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupplierPage;
