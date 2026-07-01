"use client";

import { useEffect, useState } from "react";

interface Company {
  id: string;
  name: string;
  gstNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export default function CompanyPage() {
  const [editingId, setEditingId] = useState("");

  const [name, setName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [companies, setCompanies] = useState<Company[]>([]);

  const clearForm = () => {
    setEditingId("");
    setName("");
    setGstNumber("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  const fetchCompanies = async () => {
    const response = await fetch("/api/company");
    const data = await response.json();

    if (data.success) {
      setCompanies(data.companies);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const saveCompany = async () => {
    const response = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        gstNumber,
        email,
        phone,
        address,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchCompanies();
    }
  };

  const updateCompany = async () => {
    const response = await fetch("/api/company", {
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
        address,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchCompanies();
    }
  };

  const deleteCompany = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/company", {
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
      fetchCompanies();
    }
  };

  const editCompany = (company: Company) => {
    setEditingId(company.id);
    setName(company.name || "");
    setGstNumber(company.gstNumber || "");
    setEmail(company.email || "");
    setPhone(company.phone || "");
    setAddress(company.address || "");
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Company Management
      </h1>

      <div className="bg-white p-6 rounded-lg shadow border max-w-6xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">
              Company Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter company name"
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

        <div className="mt-6">
          <label className="block mb-2 font-medium">
            Address
          </label>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows={4}
            placeholder="Enter Company Address"
          />
        </div>

        <div className="flex gap-3 mt-6">
          {editingId ? (
            <>
              <button
                onClick={updateCompany}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Update Company
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
              onClick={saveCompany}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Save Company
            </button>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          Company List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-3">Company Name</th>
                <th className="border p-3">GST Number</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td className="border p-3">{company.name}</td>
                  <td className="border p-3">{company.gstNumber}</td>
                  <td className="border p-3">{company.email}</td>
                  <td className="border p-3">{company.phone}</td>

                  <td className="border p-3 flex gap-2">
                    <button
                      onClick={() => editCompany(company)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCompany(company.id)}
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