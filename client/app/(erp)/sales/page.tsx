export default function SalesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Sales Management
        </h1>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Create Invoice
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search Invoice..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Invoice No</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">INV-001</td>
              <td className="p-4">ABC Traders</td>
              <td className="p-4">27-06-2026</td>
              <td className="p-4">₹15,000</td>
              <td className="p-4 text-green-600">Paid</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">INV-002</td>
              <td className="p-4">XYZ Enterprises</td>
              <td className="p-4">27-06-2026</td>
              <td className="p-4">₹22,000</td>
              <td className="p-4 text-orange-500">Pending</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">INV-003</td>
              <td className="p-4">Global Tech</td>
              <td className="p-4">27-06-2026</td>
              <td className="p-4">₹8,500</td>
              <td className="p-4 text-green-600">Paid</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}