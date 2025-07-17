import React from 'react';
import { FaShoppingCart, FaEdit, FaTrashAlt, FaBoxOpen } from 'react-icons/fa';

export default function ProductCard({ product, cartItems, onAddToCart, onEdit, onDelete, isAdmin }) {
  const cartItem = cartItems.find(item => item.id === product.id);
  const inCartQuantity = cartItem?.quantity || 0;
  const atStockLimit = inCartQuantity >= product.quantity;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg mb-3">
        <FaBoxOpen className="text-5xl text-gray-400" />
      </div>

      <h3 className="font-semibold text-lg mb-2 truncate">{product.name}</h3>

      <div className="flex items-center justify-between mb-2">
        <span className="text-xl font-bold text-blue-600">₹{product.price}</span>
        <span className="text-sm text-gray-600">Stock: {product.quantity}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.quantity === 0 || atStockLimit}
          className={`flex-1 px-3 py-2 rounded flex items-center justify-center gap-1
            ${product.quantity === 0 || atStockLimit
              ? 'bg-gray-300 text-white cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          title={
            product.quantity === 0
              ? 'Out of Stock'
              : atStockLimit
              ? 'Already added maximum stock to cart'
              : 'Add to Cart'
          }
        >
          <FaShoppingCart size={14} />
          Add to Cart
        </button>

        {isAdmin && (
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            >
              <FaEdit size={14} />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
            >
              <FaTrashAlt size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
