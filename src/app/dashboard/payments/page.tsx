"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import PaymentTable from "@/app/components/PaymentTable";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [month, setMonth] = useState("");
  const [search, setSearch] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      let query = supabase.from("payments").select("*");

      // Filter by month
      if (month) {
        query = query.eq("month", month);
      }

      // Filter by customer name (case-insensitive search)
      if (search) {
        query = query.ilike("customer_name", `%${search}%`);
      }

      // Filter by meter number (exact match)
      if (meterNumber) {
        query = query.eq("meter_number", meterNumber);
      }

      // Filter by date range
      if (startDate && endDate) {
        query = query.gte("date", startDate).lte("date", endDate);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error fetching payments:", error);
      } else {
        setPayments(data || []);
      }
    };

    fetchPayments();
  }, [month, search, meterNumber, startDate, endDate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">Payments</h1>

      {/* Search & Filters */}
      <div className="mt-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by Customer Name"
          className="border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Meter Number"
          className="border p-2"
          value={meterNumber}
          onChange={(e) => setMeterNumber(e.target.value)}
        />
        <select
          className="border p-2"
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
        </select>

        <label> Start </label>
        <input
          type="date"
          className="border p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label> End </label>
        <input
          type="date"
          className="border p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Pass filtered payments to PaymentTable */}
      <PaymentTable payments={payments} />
    </div>
  );
}
