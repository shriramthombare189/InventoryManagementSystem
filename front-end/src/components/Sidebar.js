import React from "react";
import { Home, Package, Layers, ShoppingCart, Truck, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar({ activePage }) {
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Products", icon: Package, path: "/products" },
    { name: "Stock", icon: Layers, path: "/stock" },
    { name: "Purchases", icon: ShoppingCart, path: "/purchases" },
    { name: "Sales", icon: ShoppingCart, path: "/sales" },
    { name: "Suppliers", icon: Truck, path: "/suppliers" },
    { name: "Customers", icon: Users, path: "/customers" },
  ];

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
            IM
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Inventory</h1>
        </div>

        <nav className="space-y-1">
          {navItems.map(({ name, icon: Icon, path }) => (
            <Link
              key={name}
              to={path}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activePage === name
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t pt-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">
            <Users className="w-4 h-4" />
          </div>
          <span>admin@ims.com</span>
        </div>
      </div>
    </aside>
  );
}
