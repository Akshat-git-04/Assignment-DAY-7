import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  setSearch,
  setPage,
  inventorySelectors,
} from '../features/inventory/inventorySlice';
import { switchTenant } from '../features/tenant/tenantSlice';
import { simulateInventorySocket } from '../utils/mockWebSocket';

export default function InventoryDashboard() {
  const dispatch = useDispatch();
  const tenantId = useSelector(state => state.tenant.currentTenant);
  const { search, page, perPage } = useSelector(state => state.inventory);

  const allProducts = useSelector(inventorySelectors.selectAll);

  // Apply filters
  const filteredProducts = allProducts
    .filter(p => tenantId === 'all' || p.tenantId === tenantId)
    .filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  const paginated = filteredProducts.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const [form, setForm] = useState({ name: '', quantity: '', price: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => simulateInventorySocket(dispatch), []);

  const handleSubmit = () => {
    if (editing) {
      dispatch(updateProduct({ ...editing, ...form }));
      setEditing(null);
    } else {
      dispatch(addProduct(form, tenantId));
    }
    setForm({ name: '', quantity: '', price: '' });
  };

  const handleEdit = (product) => {
    setEditing(product);
    setForm({ name: product.name, quantity: product.quantity, price: product.price });
  };

  const handleCSVExport = () => {
    const csv = [
      ['ID', 'Name', 'Quantity', 'Price', 'Tenant'],
      ...filteredProducts.map(p => [p.id, p.name, p.quantity, p.price, p.tenantId]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'products.csv';
    a.click();
  };

  // --- 🧠 Analytics ---
  const productCountByStore = allProducts.reduce((acc, p) => {
    acc[p.tenantId] = (acc[p.tenantId] || 0) + 1;
    return acc;
  }, {});

  const totalValueByStore = allProducts.reduce((acc, p) => {
    acc[p.tenantId] = (acc[p.tenantId] || 0) + p.quantity * p.price;
    return acc;
  }, {});

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📦 Inventory Dashboard</h1>
        <button
          onClick={handleCSVExport}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {/* Store Selector & Search */}
      <div className="flex gap-2 mb-4">
        <select
          className="border p-2"
          value={tenantId}
          onChange={e => dispatch(switchTenant(e.target.value))}
        >
          <option value="all">All Stores</option>
          <option value="store-1">Store 1</option>
          <option value="store-2">Store 2</option>
          <option value="store-3">Store 3</option>
        </select>

        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Search product..."
          value={search}
          onChange={e => dispatch(setSearch(e.target.value))}
        />
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border p-4 rounded text-center">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-xl font-bold">{allProducts.length}</p>
        </div>
        {['store-1', 'store-2', 'store-3'].map(store => (
          <div key={store} className="bg-gray-50 border p-4 rounded text-center">
            <p className="text-sm text-gray-600">Products in {store.replace('-', ' ')}</p>
            <p className="font-semibold">{productCountByStore[store] || 0}</p>
            <p className="text-xs text-gray-500">
              Value: ₹{totalValueByStore[store]?.toFixed(2) || '0.00'}
            </p>
          </div>
        ))}
      </div>

      {/* Add / Edit Form */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <input
          placeholder="Name"
          className="border p-2"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: +e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2"
          value={form.price}
          onChange={e => setForm({ ...form, price: +e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editing ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Product List */}
      <ul className="divide-y border-t">
        {paginated.map(product => (
          <li key={product.id} className="py-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-600">
                Qty: {product.quantity} | ₹{product.price}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteProduct(product.id))}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          onClick={() => dispatch(setPage(Math.max(page - 1, 1)))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => i + 1)
          .filter(p => Math.abs(p - page) <= 1)
          .map(p => (
            <button
              key={p}
              onClick={() => dispatch(setPage(p))}
              className={`px-3 py-1 rounded ${
                page === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {p}
            </button>
          ))}

        <button
          onClick={() => dispatch(setPage(Math.min(page + 1, totalPages)))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
