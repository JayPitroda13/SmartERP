"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface DashboardStats {
  companyCount: number;
  customerCount: number;
  inventoryCount: number;
  totalSales: number;
  totalPurchases: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [stats, setStats] = useState<DashboardStats>({
    companyCount: 0,
    customerCount: 0,
    inventoryCount: 0,
    totalSales: 0,
    totalPurchases: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    const response = await fetch("/api/reports");
    const data = await response.json();

    if (data.success) {
      setStats(data.stats);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchDashboardData();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const chartData = [
    {
      name: "Business",
      Sales: stats.totalSales,
      Purchases: stats.totalPurchases,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-5 gap-6 mb-8">
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm">Companies</h3>
          <p className="text-3xl font-bold mt-2">
            {stats.companyCount}
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm">Customers</h3>
          <p className="text-3xl font-bold mt-2">
            {stats.customerCount}
          </p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm">Inventory</h3>
          <p className="text-3xl font-bold mt-2">
            {stats.inventoryCount}
          </p>
        </div>

        <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm">Sales</h3>
          <p className="text-3xl font-bold mt-2">
            ₹{stats.totalSales}
          </p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm">Purchases</h3>
          <p className="text-3xl font-bold mt-2">
            ₹{stats.totalPurchases}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">
          Sales vs Purchases
        </h2>

        <div className="h-96">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="Sales"
                fill="#f97316"
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="Purchases"
                fill="#dc2626"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          SmartERP Overview
        </h2>

        <p>
          Welcome to SmartERP. All business statistics shown
          above are loaded live from the PostgreSQL database.
        </p>

        <div className="mt-4">
          Logged in as:
          <strong>
            {" "}
            {session.user?.email}
          </strong>
        </div>
      </div>
    </div>
  );
}