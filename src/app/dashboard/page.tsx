"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Sidebar from "@/app/components/Sidebar";
import RevenueChart from "@/app/components/RevenueChart";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    const fetchAnalytics = async () => {
      const { data, error } = await supabase.from("payments").select("*");

      if (error) {
        console.error("Error fetching payments:", error);
        return;
      }

      let revenue = 0;
      let transactions = data.length;
      let revenueByMonth = {};

      data.forEach((payment) => {
        revenue += payment.amount;

        if (revenueByMonth[payment.month]) {
          revenueByMonth[payment.month] += payment.amount;
        } else {
          revenueByMonth[payment.month] = payment.amount;
        }
      });

      setTotalRevenue(revenue);
      setTotalTransactions(transactions);
      setMonthlyRevenue(revenueByMonth);
    };

    getUser();
    fetchAnalytics();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
        <p className="mt-2">Welcome, {user?.email}</p>

        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">Total Revenue</h2>
            <p className="text-xl font-semibold text-green-600">₦{totalRevenue.toLocaleString()}</p>
          </div>

          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">Total Transactions</h2>
            <p className="text-xl font-semibold text-blue-600">{totalTransactions}</p>
          </div>
        </div>

        {/* Monthly Revenue */}
        <h2 className="mt-6 text-xl font-bold">Monthly Revenue</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(monthlyRevenue).map((month) => (
            <div key={month} className="p-4 bg-white rounded shadow">
              <h3 className="text-md font-semibold">{month}</h3>
              <p className="text-lg font-bold text-green-600">₦{monthlyRevenue[month].toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <RevenueChart data={monthlyRevenue} />
      </div>
    </div>
  );
}
