"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueChart({ data }) {
  const chartData = Object.keys(data).map((month) => ({
    name: month,
    revenue: data[month],
  }));

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Revenue Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
