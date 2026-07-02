"use client";

import { useEffect, useState } from "react";

interface Sale {
  id: string;
  invoiceNo: string;
  customer: string;
  amount: number;
  status: string;
}

export default function SalesPage() {
  const [editingId, setEditingId] = useState("");

  const [invoiceNo, setInvoiceNo] = useState("");
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  const [sales, setSales] = useState<Sale[]>([]);

  const clearForm = () => {
    setEditingId("");
    setInvoiceNo("");
    setCustomer("");
    setAmount("");
    setStatus("Pending");
  };

  const fetchSales = async () => {
    const response = await fetch("/api/sales");
    const data = await response.json();

    if (data.success) {
      setSales(data.sales);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const saveSale = async () => {
    const response = await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invoiceNo,
        customer,
        amount,
        status,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchSales();
    }
  };

  const updateSale = async () => {
    const response = await fetch("/api/sales", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        invoiceNo,
        customer,
        amount,
        status,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchSales();
    }
  };

  const deleteSale = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/sales", {
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
      fetchSales();
    }
  };

  const editSale = (sale: Sale) => {
    setEditingId(sale.id);
    setInvoiceNo(sale.invoiceNo);
    setCustomer(sale.customer);
    setAmount(String(sale.amount));
    setStatus(sale.status);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Sales Management
      </h1>

      <div className="bg-white p-6 rounded-lg shadow border max-w-6xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">
              Invoice Number
            </label>

            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Invoice Number"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Customer
            </label>

            <input
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Customer Name"
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
              <option>Paid</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {editingId ? (
            <>
              <button
                onClick={updateSale}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Update Invoice
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
              onClick={saveSale}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Save Invoice
            </button>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          Sales List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-3">Invoice No</th>
                <th className="border p-3">Customer</th>
                <th className="border p-3">Amount</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="border p-3">{sale.invoiceNo}</td>
                  <td className="border p-3">{sale.customer}</td>
                  <td className="border p-3">₹{sale.amount}</td>
                  <td className="border p-3">{sale.status}</td>

                  <td className="border p-3 flex gap-2">
                    <button
                      onClick={() => editSale(sale)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteSale(sale.id)}
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