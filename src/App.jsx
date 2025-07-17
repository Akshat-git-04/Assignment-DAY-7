import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InventoryDashboard from './pages/InventoryDashboard';
import EcommerceDashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import OrdersPage from './pages/OrdersPage';
// import AuditLogPage from './pages/AuditLogPage';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/inventory" element={<InventoryDashboard />} />
        <Route path="/dashboard" element={<EcommerceDashboard />} />
        <Route path="/orders" element={<OrdersPage />} />
        {/* <Route path="/audit" element={<AuditLogPage />} /> */}
      </Routes>
    </Router>
  );
}
