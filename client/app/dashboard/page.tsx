export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm">Total Sales</h3>
          <p className="text-3xl font-bold mt-2">
            ₹1,25,000
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm">Customers</h3>
          <p className="text-3xl font-bold mt-2">
            320
          </p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm">Inventory Items</h3>
          <p className="text-3xl font-bold mt-2">
            850
          </p>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm">Revenue</h3>
          <p className="text-3xl font-bold mt-2">
            ₹8,75,000
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Sales
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>INV-001</span>
              <span>₹15,000</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>INV-002</span>
              <span>₹22,000</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>INV-003</span>
              <span>₹8,500</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Purchases
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span>PO-001</span>
              <span>₹12,000</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>PO-002</span>
              <span>₹18,500</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>PO-003</span>
              <span>₹9,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Low Stock Items
          </h2>

          <ul className="space-y-2">
            <li>Printer Paper - 5 Left</li>
            <li>USB Cable - 3 Left</li>
            <li>Keyboard - 2 Left</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Add Customer
            </button>

            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              Create Invoice
            </button>

            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}