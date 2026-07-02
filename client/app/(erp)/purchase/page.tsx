"use client";

import { useEffect, useState } from "react";

interface Purchase {
  id: string;
  poNumber: string;
  vendor: string;
  amount: number;
  status: string;
}

export default function PurchasePage() {
  const [editingId, setEditingId] = useState("");

  const [poNumber, setPoNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const clearForm = () => {
    setEditingId("");
    setPoNumber("");
    setVendor("");
    setAmount("");
    setStatus("Pending");
  };

  const fetchPurchases = async () => {
    const response = await fetch("/api/purchase");
    const data = await response.json();

    if (data.success) {
      setPurchases(data.purchases);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const savePurchase = async () => {
    const response = await fetch("/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        poNumber,
        vendor,
        amount,
        status,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchPurchases();
    }
  };

  const updatePurchase = async () => {
    const response = await fetch("/api/purchase", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        poNumber,
        vendor,
        amount,
        status,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchPurchases();
    }
  };

  const deletePurchase = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this purchase order?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/purchase", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      fetchPurchases();
    }
  };

  const editPurchase = (purchase: Purchase) => {
    setEditingId(purchase.id);
    setPoNumber(purchase.poNumber);
    setVendor(purchase.vendor);
    setAmount(String(purchase.amount));
    setStatus(purchase.status);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Purchase Management
      </h1>

      <div className="bg-white p-6 rounded-lg shadow border max-w-6xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">
              PO Number
            </label>

            <input
              type="text"
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter PO Number"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Vendor
            </label>

            <input
              type="text"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Vendor Name"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Amount"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option>Pending</option>
              <option>Received</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {editingId ? (
            <>
              <button
                onClick={updatePurchase}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Update Purchase
              </button>

              <button
                onClick={clearForm}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={savePurchase}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Save Purchase
            </button>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          Purchase List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-3">PO Number</th>
                <th className="border p-3">Vendor</th>
                <th className="border p-3">Amount</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="border p-3">{purchase.poNumber}</td>
                  <td className="border p-3">{purchase.vendor}</td>
                  <td className="border p-3">₹{purchase.amount}</td>
                  <td className="border p-3">{purchase.status}</td>

                  <td className="border p-3 flex gap-2">
                    <button
                      onClick={() => editPurchase(purchase)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deletePurchase(purchase.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}