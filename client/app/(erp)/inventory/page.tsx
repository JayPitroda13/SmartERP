"use client";

import { useEffect, useState } from "react";

interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  stock: number;
  unitPrice: number;
}

export default function InventoryPage() {
  const [editingId, setEditingId] = useState("");

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const clearForm = () => {
    setEditingId("");
    setItemName("");
    setCategory("");
    setStock("");
    setUnitPrice("");
  };

  const fetchInventory = async () => {
    const response = await fetch("/api/inventory");
    const data = await response.json();

    if (data.success) {
      setInventory(data.inventory);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const saveItem = async () => {
    const response = await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemName,
        category,
        stock,
        unitPrice,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchInventory();
    }
  };

  const updateItem = async () => {
    const response = await fetch("/api/inventory", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        itemName,
        category,
        stock,
        unitPrice,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (data.success) {
      clearForm();
      fetchInventory();
    }
  };

  const deleteItem = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/inventory", {
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
      fetchInventory();
    }
  };

  const editItem = (item: InventoryItem) => {
    setEditingId(item.id);
    setItemName(item.itemName);
    setCategory(item.category);
    setStock(String(item.stock));
    setUnitPrice(String(item.unitPrice));
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Inventory Management
      </h1>

      <div className="bg-white p-6 rounded-lg shadow border max-w-6xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">
              Item Name
            </label>

            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter category"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Stock
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter stock quantity"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Unit Price
            </label>

            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter unit price"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          {editingId ? (
            <>
              <button
                onClick={updateItem}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Update Item
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
              onClick={saveItem}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Save Item
            </button>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">
          Inventory List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-3">Item Name</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Stock</th>
                <th className="border p-3">Unit Price</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td className="border p-3">{item.itemName}</td>
                  <td className="border p-3">{item.category}</td>
                  <td className="border p-3">{item.stock}</td>
                  <td className="border p-3">₹{item.unitPrice}</td>

                  <td className="border p-3 flex gap-2">
                    <button
                      onClick={() => editItem(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
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