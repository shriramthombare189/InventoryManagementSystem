import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Package, Layers, ShoppingCart, Truck, Users } from "lucide-react";

// Inventory Management System - Dashboard + Sidebar Navigation using Tailwind CSS
export default function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: Home },
    { name: "Products", icon: Package },
    { name: "Stock", icon: Layers },
    { name: "Purchases", icon: ShoppingCart },
    { name: "Sales", icon: ShoppingCart },
    { name: "Suppliers", icon: Truck },
    { name: "Customers", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
              IM
            </div>
            <h1 className="text-lg font-semibold text-gray-800">Inventory</h1>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setActivePage(name)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activePage === name
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t pt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">
              <Users className="w-4 h-4" />
            </div>
            <span>asdsadfdsfa12@gmail.com</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activePage === "Dashboard" && <DashboardPage />}
        {activePage === "Products" && <ProductsPage />}
      </main>
    </div>
  );
}

// Dashboard Page
function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <p className="text-gray-500 mb-6">Overview of inventory statistics</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -4 }} className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Products</h3>
          <p className="text-3xl font-bold mt-2">120</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Stock</h3>
          <p className="text-3xl font-bold mt-2">2,480</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Low Stock Items</h3>
          <p className="text-3xl font-bold mt-2">6</p>
        </motion.div>
      </div>
    </div>
  );
}

// Products Page (matches image layout)
function ProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="text-gray-500 text-sm">Manage your product catalog</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:opacity-90">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <input
          type="text"
          placeholder="Search products by name, SKU, or barcode..."
          className="w-full p-3 border rounded-lg mb-4 bg-gray-50 focus:outline-none"
        />

        <table className="w-full text-sm text-left border-t">
          <thead className="text-gray-600 uppercase text-xs bg-gray-50">
            <tr>
              <th className="p-3">SKU</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Cost Price</th>
              <th className="p-3">Selling Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="text-center py-12 text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10 mb-2 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3v1a1 1 0 001 1h16a1 1 0 001-1V3m-4 18H8a2 2 0 01-2-2V7h12v12a2 2 0 01-2 2z"
                    />
                  </svg>
                  No products found
                  <p className="text-gray-400 text-sm">Add a product to get started.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
