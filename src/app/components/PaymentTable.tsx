"use client";

export default function PaymentTable({ payments }) {
  return (
    <table className="mt-4 w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="border p-2">Customer</th>
          <th className="border p-2">Meter Number</th>
          <th className="border p-2">Amount</th>
          <th className="border p-2">Month</th>
        </tr>
      </thead>
      <tbody>
        {payments.length === 0 ? (
          <tr>
            <td colSpan="4" className="p-4 text-center">No payments found</td>
          </tr>
        ) : (
          payments.map((payment) => (
            <tr key={payment.id} className="border text-center">
              <td className="p-2">{payment.customer_name}</td>
              <td className="p-2">{payment.meter_number}</td>
              <td className="p-2">₦{payment.amount}</td>
              <td className="p-2">{payment.month}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
