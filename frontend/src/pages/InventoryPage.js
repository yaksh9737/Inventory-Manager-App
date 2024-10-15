// src/pages/InventoryPage.js
import React, { useState, useEffect } from 'react';
import InventoryList from '../components/InventoryList';
import InventoryForm from '../components/InventoryForm';
import { fetchInventory, addInventory, updateInventory, deleteInventory, fetchSuppliers } from '../api';

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        loadInventory();
        loadSuppliers();
    }, []);

    const loadInventory = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetchInventory();
            setInventory(response.data);
        } catch (error) {
            console.error('Failed to fetch inventory:', error);
            setError('Failed to load inventory. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const loadSuppliers = async () => {
        setLoading(true);
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

    const handleFormSubmit = async (itemData) => {
        setLoading(true);
        setError('');
        try {
            if (currentItem) {
                await updateInventory(currentItem._id, itemData);
                setSuccessMessage('Inventory item updated successfully!');
            } else {
                await addInventory(itemData);
                setSuccessMessage('Inventory item added successfully!');
            }
            setCurrentItem(null);
            loadInventory();
        } catch (error) {
            console.error('Failed to save inventory item:', error);
            setError('Failed to save item. Please check the details and try again.');
        } finally {
            setLoading(false);
            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const handleEditItem = (item) => {
        setCurrentItem(item);
        setSuccessMessage('');
        setError('');
    };

    const handleDeleteItem = async (itemId) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        setLoading(true);
        setError('');
        try {
            await deleteInventory(itemId);
            setSuccessMessage('Inventory item deleted successfully!');
            loadInventory();
        } catch (error) {
            console.error('Failed to delete inventory item:', error);
            setError('Failed to delete item. Please try again later.');
        } finally {
            setLoading(false);
            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-[#1E1E2F] text-white min-h-screen">
            <h1 className="text-4xl font-extrabold text-neon-cyan text-center mb-8">Manage Inventory</h1>

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
                {/* Inventory Form */}
                <div className="lg:w-1/3 mb-8 lg:mb-3">
                    <InventoryForm
                        onSubmit={handleFormSubmit}
                        currentItem={currentItem}
                        loading={loading}
                        suppliers={suppliers}
                    />
                </div>

                {/* Inventory List */}
                <div className="lg:w-2/3">
                    {loading ? (
                        <p className="text-center mt-4">Loading inventory...</p>
                    ) : (
                        <InventoryList
                            inventory={inventory}
                            onEdit={handleEditItem}
                            onDelete={handleDeleteItem}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;
