import React from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../features/orders/ordersSlice';

export default function OrdersPage() {
  const orders = useSelector(selectOrders);

  // Sort orders by newest first
  const sortedOrders = [...orders].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧾 My Orders</h1>

      {sortedOrders.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <div key={order.id} className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Order #{order.id.slice(0, 6)}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.timestamp).toLocaleString()}
                </p>
              </div>

              <ul className="divide-y text-sm">
                {order.items.map(item => (
                  <li key={item.id} className="py-2 flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 mt-2 border-t font-semibold flex justify-between">
                <span>Total</span>
                <span>
                  ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
