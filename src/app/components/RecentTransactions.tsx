// src/app/components/RecentTransactions.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("id, customer_name, amount, month")
        .order("id", { ascending: false }) // Get latest transactions first
        .limit(5); // Only fetch the 5 most recent transactions

      if (error) {
        console.error("Error fetching transactions:", error);
      } else {
        setTransactions(data || []);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="mt-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold text-gray-700">Recent Transactions</h2>
      <table className="w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="border p-2">Customer</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Month</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-4 text-center text-gray-500">
                No recent transactions
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id} className="border text-center">
                <td className="p-2">{tx.customer_name}</td>
                <td className="p-2">₦{tx.amount}</td>
                <td className="p-2">{tx.month}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
