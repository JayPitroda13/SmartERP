export default function CustomerPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Customer Management
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add Customer
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search Customer..."
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Customer Name</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">GST Number</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">ABC Traders</td>
              <td className="p-4">9876543210</td>
              <td className="p-4">abc@gmail.com</td>
              <td className="p-4">27ABCDE1234F1Z5</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">XYZ Enterprises</td>
              <td className="p-4">9988776655</td>
              <td className="p-4">xyz@gmail.com</td>
              <td className="p-4">27XYZAB1234K1Z8</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Global Tech</td>
              <td className="p-4">9123456789</td>
              <td className="p-4">contact@globaltech.com</td>
              <td className="p-4">27GTECH1234P1Z2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}