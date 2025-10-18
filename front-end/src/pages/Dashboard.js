import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { IndianRupee, CreditCard, Wallet, Clock } from "lucide-react"; // Added icons

export default function Dashboard() {
  const [filter, setFilter] = useState("month");

  // Dummy stock data
  const dataOptions = {
    day: [
      { name: "Mon", stock: 240 },
      { name: "Tue", stock: 320 },
      { name: "Wed", stock: 180 },
      { name: "Thu", stock: 290 },
      { name: "Fri", stock: 310 },
      { name: "Sat", stock: 200 },
      { name: "Sun", stock: 150 },
    ],
    month: [
      { name: "Jan", stock: 2200 },
      { name: "Feb", stock: 1800 },
      { name: "Mar", stock: 2600 },
      { name: "Apr", stock: 3000 },
      { name: "May", stock: 2800 },
      { name: "Jun", stock: 3100 },
      { name: "Jul", stock: 3500 },
      { name: "Aug", stock: 2900 },
      { name: "Sep", stock: 2700 },
      { name: "Oct", stock: 4000 },
      { name: "Nov", stock: 3600 },
      { name: "Dec", stock: 4100 },
    ],
    year: [
      { name: "2020", stock: 18000 },
      { name: "2021", stock: 22000 },
      { name: "2022", stock: 25000 },
      { name: "2023", stock: 30000 },
      { name: "2024", stock: 34000 },
      { name: "2025", stock: 38000 },
    ],
  };

  // Dummy financials
  const investment = 120000;
  const revenue = 200000;
  const profit = revenue - investment;
  const netProfit = profit;
  const receivedOnline = 85000;
  const receivedCash = 40000;
  const pendingAmount = 15000;

  const formatINR = (n) =>
    "₹" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="Dashboard" />

      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">
          Grocery Inventory Dashboard
        </h2>

        {/* === TOP 3 FINANCIAL CARDS === */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Total Investment",
              value: formatINR(investment),
              gradient: "from-yellow-400 to-orange-500",
              icon: IndianRupee,
            },
            {
              title: "Total Profit",
              value: formatINR(profit),
              gradient: "from-blue-400 to-indigo-600",
              icon: IndianRupee,
            },
            {
              title: "Net Profit",
              value: formatINR(netProfit),
              gradient: "from-green-400 to-emerald-600",
              icon: IndianRupee,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${card.gradient} text-white rounded-2xl shadow-lg p-6 flex items-center justify-between`}
            >
              <div>
                <h3 className="text-lg font-medium opacity-90">{card.title}</h3>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <card.icon size={32} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* === NEW 3 RECEIVABLE CARDS === */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Received Online",
              value: formatINR(receivedOnline),
              gradient: "from-purple-400 to-purple-600",
              icon: CreditCard,
            },
            {
              title: "Received Cash",
              value: formatINR(receivedCash),
              gradient: "from-amber-400 to-yellow-500",
              icon: Wallet,
            },
            {
              title: "Pending Amounts",
              value: formatINR(pendingAmount),
              gradient: "from-rose-400 to-red-500",
              icon: Clock,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${card.gradient} text-white rounded-2xl shadow-lg p-6 flex items-center justify-between`}
            >
              <div>
                <h3 className="text-lg font-medium opacity-90">{card.title}</h3>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                <card.icon size={32} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* === GRAPH FILTER BUTTONS === */}
        <div className="flex gap-3 mb-5 justify-end">
          {["day", "month", "year"].map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-4 py-2 rounded-lg font-semibold shadow-sm ${
                filter === opt
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              {opt.toUpperCase()}
            </button>
          ))}
        </div>

        {/* === BAR CHART === */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Stock Levels ({filter.toUpperCase()} View)
          </h3>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart
              data={dataOptions[filter]}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="stock"
                fill="#10b981"
                barSize={50}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
