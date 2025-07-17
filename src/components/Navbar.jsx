import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1><Link to="/" className="text-xl font-bold">My App</Link></h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Products</Link>
          <Link to="/inventory" className="hover:underline">Inventory</Link>
          <Link to="/orders" className="hover:underline">My Orders</Link>
        </div>
      </div>
    </nav>
  );
}
