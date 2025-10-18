import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🧩 Dummy Random Product Data
  const dummyProducts = [
    {
      id: 1,
      sku: "PROD-001",
      name: "Wireless Mouse",
      category: "Electronics",
      costPrice: 350,
      sellingPrice: 499,
      stock: 25,
    },
    {
      id: 2,
      sku: "PROD-002",
      name: "Bluetooth Speaker",
      category: "Electronics",
      costPrice: 1200,
      sellingPrice: 1799,
      stock: 8,
    },
    {
      id: 3,
      sku: "PROD-003",
      name: "Office Chair",
      category: "Furniture",
      costPrice: 3200,
      sellingPrice: 4999,
      stock: 0,
    },
    {
      id: 4,
      sku: "PROD-004",
      name: "Notebook Pack (Set of 5)",
      category: "Stationery",
      costPrice: 120,
      sellingPrice: 199,
      stock: 60,
    },
    {
      id: 5,
      sku: "PROD-005",
      name: "LED Monitor 24 inch",
      category: "Electronics",
      costPrice: 7200,
      sellingPrice: 8999,
      stock: 10,
    },
    {
      id: 6,
      sku: "PROD-006",
      name: "Water Bottle - 1L",
      category: "Daily Use",
      costPrice: 60,
      sellingPrice: 99,
      stock: 100,
    },
    {
      id: 7,
      sku: "PROD-007",
      name: "Table Lamp",
      category: "Home Decor",
      costPrice: 450,
      sellingPrice: 699,
      stock: 4,
    },
    {
      id: 8,
      sku: "PROD-008",
      name: "Laptop Bag",
      category: "Accessories",
      costPrice: 800,
      sellingPrice: 1199,
      stock: 30,
    },
  ];

  // 🕒 Simulated API call
  useEffect(() => {
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, 1000); // simulate API delay
  }, []);

  // 🔍 Search functionality
  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="Products" />

      <main className="flex-1 p-8 overflow-y-auto">
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
            placeholder="Search products by name, SKU, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 bg-gray-50 focus:outline-none"
          />

          {loading ? (
            <p className="text-center py-6 text-gray-500">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No products found.</p>
          ) : (
            <table className="w-full text-sm text-left border-t">
              <thead className="text-gray-600 uppercase text-xs bg-gray-50">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Cost Price</th>
                  <th className="p-3">Selling Price</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{p.sku}</td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">₹{p.costPrice}</td>
                    <td className="p-3">₹{p.sellingPrice}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
