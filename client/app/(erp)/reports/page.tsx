export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Reports
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Sales Report
          </h2>

          <p className="text-gray-600 mb-4">
            View all sales transactions and revenue details.
          </p>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            View Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Purchase Report
          </h2>

          <p className="text-gray-600 mb-4">
            Analyze purchase orders and vendor transactions.
          </p>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            View Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">
            Inventory Report
          </h2>

          <p className="text-gray-600 mb-4">
            Check stock movement and inventory levels.
          </p>

          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
}