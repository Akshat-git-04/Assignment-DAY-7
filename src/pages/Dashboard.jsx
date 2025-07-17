import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import ShoppingCartPanel from '../components/ShoppingCartPanel';

import {
  addToCart,
  removeFromCart,
  clearCart,
  cartSelectors,
  decreaseQuantity,
} from '../features/cart/cartSlice';

import {
  addOrder,
} from '../features/orders/ordersSlice';

import {
  inventorySelectors,
} from '../features/inventory/inventorySlice';

export default function Dashboard() {
  const dispatch = useDispatch();

  const tenantId = useSelector(state => state.tenant.currentTenant);
  const allProducts = useSelector(inventorySelectors.selectAll);
  const cartItems = useSelector(cartSelectors.selectAll);

  console.log('Tenant:', tenantId);
console.log('Sample product:', allProducts[0]);

const products = tenantId === 'all' ? allProducts : allProducts.filter(p => p.tenantId === tenantId);

  const productMap = Object.fromEntries(allProducts.map(p => [p.id, p]));


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;
  const totalPages = Math.ceil(products.length / perPage);

  const paginatedProducts = products.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    dispatch(addOrder({ items: cartItems }));
    dispatch(clearCart());
    alert('Order placed!');
  };

  const handleIncrease = (id) => {
    dispatch(addToCart({ id })); 
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">E-commerce Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}  
                isAdmin={false}
              />
            ))}
          </div>

          {/* Pagination UI */}
            <div className="flex justify-center mt-6 items-center gap-2">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => i + 1)
                .filter(p => Math.abs(p - currentPage) <= 1)
                .map(p => (
                <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-1 rounded ${
                    currentPage === p
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    {p}
                </button>
                ))}

            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
            >
                Next
            </button>
            </div>
        </div>

        <div className="md:col-span-1">
          <ShoppingCartPanel
            cartItems={cartItems}
            productMap={productMap} 
            onRemove={handleRemove}
            onCheckout={handleCheckout}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
           />
        </div>
      </div>
    </div>
  );
}
