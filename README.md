# E-Commerce Dashboard

A multi-tenant e-commerce dashboard built with **React**, **Redux Toolkit**, and **Tailwind CSS**. It allows managing inventory, simulating real-time updates, tracking orders, and operating shopping carts — all in a single, modular interface.

---

## Features

-  **Multi-Tenant Switching** — Filter data per store (Store 1, 2, 3, or All)
-  **Inventory Management** — Add, edit, and delete products per store
-  **Export to CSV** — Download full inventory with one click
-  **Shopping Cart Panel** — Dynamic cart with stock-aware quantity limits
-  **Store-wise Analytics** — Track total products and value by tenant
-  **Search + Pagination** — Search inventory by name and browse with pagination
-  **Order Placement** — Simulated order creation and cart clearing

---

##  Project Structure

```

src/
├── app/                 # Redux store setup
├── components/          # Reusable UI components
│   ├── ProductCard.jsx
│   ├── ShoppingCartPanel.jsx
│   └── Navbar.jsx
├── features/            # Redux slices (inventory, cart, orders, tenant)
│   ├── inventory/
│   ├── cart/
│   ├── orders/
│   └── tenant/
├── pages/               # Main views (Dashboard, OrdersPage, InventoryDashboard)
├── utils/               # Helpers & mock WebSocket simulation
└── main.jsx             # App entry point
└── App.jsx             # App entry point
└── App.css             # App entry point

````

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Akshat-git-04/Assignment-DAY-7.git
cd Assignment-DAY-7
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## 🔧 Tech Stack

* **React**
* **Redux Toolkit**
* **Tailwind CSS**
* **uuid** — for generating product/order IDs
* **React Icons** — for clean UI icons
* **Vite** — blazing-fast dev server

---

## Exporting Inventory

Export your current filtered inventory to `.csv` including:

* Product ID
* Name
* Quantity
* Price
* Tenant

This allows easy backup or import into spreadsheets.

---
