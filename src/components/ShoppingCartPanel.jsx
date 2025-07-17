// src/components/ShoppingCartPanel.jsx
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export default function ShoppingCartPanel({
  cartItems,
  productMap,
  onRemove,
  onCheckout,
  onIncrease,
  onDecrease
}) {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => {
            const stock = productMap[item.id]?.quantity ?? 0;
            const atStockLimit = item.quantity >= stock;
            const atMinQuantity = item.quantity <= 1;

            return (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} × {item.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {/* − Button */}
                    <button
                      onClick={() => onDecrease(item.id)}
                      className={`px-2 py-1 rounded ${
                        atMinQuantity
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                          : 'bg-gray-200 hover:bg-gray-300 text-black'
                      }`}
                      disabled={atMinQuantity}
                      title={atMinQuantity ? 'Minimum quantity is 1' : ''}
                    >
                      −
                    </button>

                    <span className="min-w-[20px] text-center">{item.quantity}</span>

                    {/* + Button */}
                    <button
                      onClick={() => onIncrease(item.id)}
                      className={`px-2 py-1 rounded ${
                        atStockLimit
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                          : 'bg-gray-200 hover:bg-gray-300 text-black'
                      }`}
                      disabled={atStockLimit}
                      title={atStockLimit ? 'No more stock available' : ''}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt size={16} />
                </button>
              </div>
            );
          })}

          <div className="flex justify-between font-semibold text-lg pt-4 border-t">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={onCheckout}
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 px-4 py-2 rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
