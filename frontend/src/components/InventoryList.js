// src/components/InventoryList.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

const InventoryList = ({ inventory, onEdit, onDelete }) => {
    if (inventory.length === 0) {
        return <p className="text-center text-gray-400">No inventory items available.</p>;
    }

    return (
        <div className="overflow-x-auto bg-[#2A2A3A] p-6 rounded-lg shadow-lg">
            <table className="min-w-full bg-[#1E1E2F] rounded-lg">
                <thead>
                    <tr>
                        <th className="py-3 px-6 bg-[#2A2A3A] text-neon-cyan text-left">Item Name</th>
                        <th className="py-3 px-6 bg-[#2A2A3A] text-neon-cyan text-left">Quantity</th>
                        <th className="py-3 px-6 bg-[#2A2A3A] text-neon-cyan text-left">Category</th>
                        <th className="py-3 px-6 bg-[#2A2A3A] text-neon-cyan text-left">Supplier</th>
                        <th className="py-3 px-6 bg-[#2A2A3A] text-neon-cyan text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item._id} className="hover:bg-[#2A2A3A] transition-colors">
                            <td className="py-3 px-6 text-white">{item.name}</td>
                            <td className="py-3 px-6 text-white">{item.quantity}</td>
                            <td className="py-3 px-6 text-white">{item.category}</td>
                            <td className="py-3 px-6 text-white">{item.supplier ? item.supplier.name : 'N/A'}</td>
                            <td className="py-3 px-6 text-white">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="text-neon-cyan hover:underline mr-4"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => onDelete(item._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
