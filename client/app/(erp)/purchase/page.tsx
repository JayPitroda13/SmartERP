export default function PurchasePage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Purchase Management
        </h1>

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
          Create Purchase Order
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search Purchase Order..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">PO No</th>
              <th className="text-left p-4">Vendor</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">PO-001</td>
              <td className="p-4">Dell India</td>
              <td className="p-4">27-06-2026</td>
              <td className="p-4">₹12,000</td>
              <td className="p-4 text-green-600">
                Received
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">PO-002</td>
              <td className="p-4">HP India</td>
              <td className="p-4">27-06-2026</td>
              <td className="p-4">₹18,500</td>
              <td className="p-4 text-orange-500">
                Pending
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-4">PO-003</td>
              <td className="p-4">Logitech</td>
              <td className="p-4">27-06-2026</td>
              <td className="p-4">₹9,000</td>
              <td className="p-4 text-green-600">
                Received
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}