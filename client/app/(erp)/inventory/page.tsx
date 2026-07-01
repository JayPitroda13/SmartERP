export default function InventoryPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Inventory Management
        </h1>

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Add Item
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search Item..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Item Name</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Unit Price</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">Printer Paper</td>
              <td className="p-4">Stationery</td>
              <td className="p-4">5</td>
              <td className="p-4">₹250</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">USB Cable</td>
              <td className="p-4">Accessories</td>
              <td className="p-4">12</td>
              <td className="p-4">₹150</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Keyboard</td>
              <td className="p-4">Hardware</td>
              <td className="p-4">8</td>
              <td className="p-4">₹900</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}