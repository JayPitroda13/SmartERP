"use client";

import { useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  gstNumber?: string;
  email?: string;
  phone?: string;
}

export default function CustomerPage() {
  const [editingId, setEditingId] = useState("");

  const [name, setName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [customers, setCustomers] = useState<Customer[]>([]);

  const clearForm = () => {
    setEditingId("");
    setName("");
    setGstNumber("");
    setEmail("");
    setPhone("");
  };

  const fetchCustomers = async () => {
    const response = await fetch("/api/customer");
    const data = await response.json();

    if (data.success) {
      setCustomers(data.customers);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const saveCustomer = async () => {
    const response = await fetch("/api/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        gstNumber,
        email,
        phone,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchCustomers();
    }
  };

  const updateCustomer = async () => {
    const response = await fetch("/api/customer", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        name,
        gstNumber,
        email,
        phone,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchCustomers();
    }
  };

  const deleteCustomer = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/customer", {
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
      fetchCustomers();
    }
  };

  const editCustomer = (customer: Customer) => {
    setEditingId(customer.id);
    setName(customer.name || "");
    setGstNumber(customer.gstNumber || "");
    setEmail(customer.email || "");
    setPhone(customer.phone || "");
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Customer Management
      </h1>

      <div className="bg-white p-6 rounded-lg shadow border max-w-6xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">
              Customer Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              GST Number
            </label>

            <input
              type="text"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter GST Number"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Email"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Phone Number"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {editingId ? (
            <>
              <button
                onClick={updateCustomer}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Update Customer
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
              onClick={saveCustomer}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Save Customer
            </button>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          Customer List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-3">Customer Name</th>
                <th className="border p-3">GST Number</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="border p-3">{customer.name}</td>
                  <td className="border p-3">{customer.gstNumber}</td>
                  <td className="border p-3">{customer.email}</td>
                  <td className="border p-3">{customer.phone}</td>

                  <td className="border p-3 flex gap-2">
                    <button
                      onClick={() => editCustomer(customer)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCustomer(customer.id)
                      }
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