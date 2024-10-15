// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import InventoryPage from './pages/InventoryPage';
import SupplierPage from './pages/SupplierPage';

const App = () => (
    <Router>
        <Navbar />
        <div className="container mx-auto">
            <Routes>
                <Route path="/" element={<Navigate to="/inventory" />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/suppliers" element={<SupplierPage />} />
            </Routes>
        </div>
    </Router>
);

export default App;
