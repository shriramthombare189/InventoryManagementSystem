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
import { IndianRupee, CreditCard, Wallet, Clock } from "lucide-react";

export default function Dashboard() {
  const [filter, setFilter] = useState("month");
  const [graphType, setGraphType] = useState("sales");

  // Dummy data for all graph types
  const graphData = {
    sales: {
      day: [
        { name: "Mon", sales: 400, purchases: 300 },
        { name: "Tue", sales: 500, purchases: 350 },
        { name: "Wed", sales: 450, purchases: 200 },
        { name: "Thu", sales: 600, purchases: 400 },
        { name: "Fri", sales: 700, purchases: 500 },
        { name: "Sat", sales: 800, purchases: 600 },
        { name: "Sun", sales: 650, purchases: 500 },
      ],
      month: [
        { name: "Jan", sales: 4000, purchases: 3500 },
        { name: "Feb", sales: 4500, purchases: 3800 },
        { name: "Mar", sales: 5000, purchases: 4200 },
        { name: "Apr", sales: 5200, purchases: 4500 },
        { name: "May", sales: 6000, purchases: 5000 },
        { name: "Jun", sales: 7000, purchases: 5500 },
        { name: "Jul", sales: 7500, purchases: 5800 },
        { name: "Aug", sales: 7200, purchases: 6000 },
        { name: "Sep", sales: 8000, purchases: 6400 },
        { name: "Oct", sales: 8500, purchases: 7000 },
        { name: "Nov", sales: 9000, purchases: 7600 },
        { name: "Dec", sales: 9500, purchases: 8000 },
      ],
      year: [
        { name: "2021", sales: 40000, purchases: 35000 },
        { name: "2022", sales: 48000, purchases: 39000 },
        { name: "2023", sales: 55000, purchases: 44000 },
        { name: "2024", sales: 60000, purchases: 50000 },
        { name: "2025", sales: 68000, purchases: 54000 },
      ],
    },
    profit: {
      day: [
        { name: "Mon", profit: 100, loss: 20 },
        { name: "Tue", profit: 120, loss: 30 },
        { name: "Wed", profit: 90, loss: 25 },
        { name: "Thu", profit: 140, loss: 40 },
        { name: "Fri", profit: 160, loss: 50 },
        { name: "Sat", profit: 180, loss: 60 },
        { name: "Sun", profit: 130, loss: 35 },
      ],
      month: [
        { name: "Jan", profit: 4000, loss: 1200 },
        { name: "Feb", profit: 4200, loss: 1500 },
        { name: "Mar", profit: 4600, loss: 1600 },
        { name: "Apr", profit: 4800, loss: 1800 },
        { name: "May", profit: 5200, loss: 1900 },
        { name: "Jun", profit: 5500, loss: 2100 },
        { name: "Jul", profit: 6000, loss: 2300 },
        { name: "Aug", profit: 6400, loss: 2500 },
        { name: "Sep", profit: 6600, loss: 2600 },
        { name: "Oct", profit: 6800, loss: 2800 },
        { name: "Nov", profit: 7200, loss: 2900 },
        { name: "Dec", profit: 7400, loss: 3000 },
      ],
      year: [
        { name: "2021", profit: 40000, loss: 15000 },
        { name: "2022", profit: 45000, loss: 18000 },
        { name: "2023", profit: 50000, loss: 20000 },
        { name: "2024", profit: 54000, loss: 23000 },
        { name: "2025", profit: 58000, loss: 25000 },
      ],
    },
    billing: {
      day: [
        { name: "Mon", bills: 25 },
        { name: "Tue", bills: 30 },
        { name: "Wed", bills: 28 },
        { name: "Thu", bills: 35 },
        { name: "Fri", bills: 40 },
        { name: "Sat", bills: 45 },
        { name: "Sun", bills: 20 },
      ],
      month: [
        { name: "Jan", bills: 400 },
        { name: "Feb", bills: 380 },
        { name: "Mar", bills: 420 },
        { name: "Apr", bills: 450 },
        { name: "May", bills: 480 },
        { name: "Jun", bills: 500 },
        { name: "Jul", bills: 550 },
        { name: "Aug", bills: 530 },
        { name: "Sep", bills: 560 },
        { name: "Oct", bills: 590 },
        { name: "Nov", bills: 610 },
        { name: "Dec", bills: 640 },
      ],
      year: [
        { name: "2021", bills: 4200 },
        { name: "2022", bills: 4500 },
        { name: "2023", bills: 4800 },
        { name: "2024", bills: 5200 },
        { name: "2025", bills: 5500 },
      ],
    },
  };

  const currentData = graphData[graphType][filter];

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

        {/* Top 3 Cards */}
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

        {/* New Cards */}
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

        {/* Graph Controls */}
        <div className="flex flex-wrap justify-between items-center mb-5">
          <div className="flex gap-3">
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

          <select
            value={graphType}
            onChange={(e) => setGraphType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 font-semibold text-gray-700 bg-white"
          >
            <option value="sales">Sales vs Purchases</option>
            <option value="profit">Profit vs Loss</option>
            <option value="billing">Billing Overview</option>
          </select>
        </div>

        {/* Dynamic Graph */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            {graphType === "sales"
              ? "Sales vs Purchases"
              : graphType === "profit"
              ? "Profit vs Loss"
              : "Billing Overview"}{" "}
            ({filter.toUpperCase()} View)
          </h3>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart
              data={currentData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {graphType === "sales" && (
                <>
                  <Bar dataKey="sales" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="purchases" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </>
              )}
              {graphType === "profit" && (
                <>
                  <Bar dataKey="profit" fill="#16a34a" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="loss" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </>
              )}
              {graphType === "billing" && (
                <Bar dataKey="bills" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
