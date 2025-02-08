"use client";

export default function Sidebar() {
  return (
    <nav className="w-60 bg-blue-500 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold">PHED Analytics</h2>
      <ul className="mt-4">
        <li className="mt-2"><a href="/dashboard" className="block p-2">Dashboard</a></li>
        <li className="mt-2"><a href="/dashboard/payments" className="block p-2">Payments</a></li>
        <li className="mt-2"><a href="/auth/logout" className="block p-2">Logout</a></li>
      </ul>
    </nav>
  );
}
