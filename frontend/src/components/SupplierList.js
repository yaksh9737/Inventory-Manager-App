// src/components/SupplierList.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

const SupplierList = ({ suppliers, onEdit, onDelete }) => {
    if (suppliers.length === 0) {
        return <p className="text-center text-gray-400">No suppliers available.</p>;
    }

    return (
        <div className="overflow-x-auto bg-[#2A2A3A] p-6 rounded-lg shadow-lg">
            <table className="min-w-full bg-[#1E1E2F] rounded-lg">
                <thead>
                    <tr>
                        <th className="py-3 px-6 bg-[#2A2A3A] text-neon-cyan text-left">Name</th>
                        <th className="py-3 px-6 bg-[#2A2A3A] text-neon-cyan text-left">Contact</th>
                        <th className="py-3 px-6 bg-[#2A2A3A] text-neon-cyan text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr key={supplier._id} className="hover:bg-[#2A2A3A] transition-colors">
                            <td className="py-3 px-6 text-white">{supplier.name}</td>
                            <td className="py-3 px-6 text-white">{supplier.contact}</td>
                            <td className="py-3 px-6 text-white">
                                <button
                                    onClick={() => onEdit(supplier)}
                                    className="text-neon-cyan hover:underline mr-4"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => onDelete(supplier._id)}
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

export default SupplierList;
