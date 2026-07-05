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

interface Sale {
  id: string;
  invoiceNo: string;
  customer: string;
  amount: number;
  status: string;
}

interface Purchase {
  id: string;
  poNumber: string;
  vendor: string;
  amount: number;
  status: string;
}

interface Activity {
  id: string;
  module: string;
  action: string;
  description: string;
  createdAt: string;
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

  const [sales, setSales] = useState<Sale[]>([]);
const [purchases, setPurchases] = useState<Purchase[]>([]);
const [activities, setActivities] = useState<Activity[]>([]);

const [topCustomers, setTopCustomers] = useState<
  { customer: string; amount: number }[]
>([]);

const [topVendors, setTopVendors] = useState<
  { vendor: string; amount: number }[]
>([]);

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
  setSales(data.sales || []);
  setPurchases(data.purchases || []);
  setActivities(data.recentActivities || []);

  setTopCustomers(data.topCustomers || []);
  setTopVendors(data.topVendors || []);
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
      <div className="flex justify-between items-start mb-6">
  <div>
    <h1 className="text-3xl font-bold">
      Dashboard
    </h1>

    <p className="text-gray-600 mt-2">
      Welcome back,
      <span className="font-semibold">
        {" "}
        {session.user?.email}
      </span>{" "}
      👋
    </p>
    <div className="mt-3 text-sm text-gray-600">
  <p>
    Today At A Glance
  </p>

  <p>
    {stats.companyCount} Companies •{" "}
    {stats.customerCount} Customers •{" "}
    {stats.inventoryCount} Inventory Items
  </p>

  <p>
    ₹{stats.totalSales} Sales • ₹
    {stats.totalPurchases} Purchases
  </p>
</div>
  </div>

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

      <div className="bg-white rounded-xl shadow p-6 mb-8">
  <h2 className="text-xl font-semibold mb-4">
    Quick Actions
  </h2>

  <div className="flex flex-wrap gap-4">
    <button
      onClick={() => router.push("/company")}
      className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
    >
      + New Company
    </button>

    <button
      onClick={() => router.push("/customer")}
      className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
    >
      + New Customer
    </button>

    <button
      onClick={() => router.push("/sales")}
      className="bg-orange-500 text-white px-5 py-3 rounded-lg hover:bg-orange-600"
    >
      + New Sale
    </button>

    <button
      onClick={() => router.push("/purchase")}
      className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700"
    >
      + New Purchase
    </button>
  </div>
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

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Sales
          </h2>

          {sales.length === 0 ? (
            <p>No sales available.</p>
          ) : (
            <div className="space-y-3">
              {sales.map((sale) => (
                <div
                  key={sale.id}
                  className="border-b pb-2"
                >
                  <div className="font-semibold">
                    {sale.invoiceNo}
                  </div>

                  <div className="text-sm text-gray-600">
                    {sale.customer}
                  </div>

                  <div className="text-orange-600 font-bold">
                    ₹{sale.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Purchases
          </h2>

          {purchases.length === 0 ? (
            <p>No purchases available.</p>
          ) : (
            <div className="space-y-3">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="border-b pb-2"
                >
                  <div className="font-semibold">
                    {purchase.poNumber}
                  </div>

                  <div className="text-sm text-gray-600">
                    {purchase.vendor}
                  </div>

                  <div className="text-red-600 font-bold">
                    ₹{purchase.amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
  <h2 className="text-xl font-semibold mb-4">
    Recent Activities
  </h2>

  {activities.length === 0 ? (
    <p>No activities available.</p>
  ) : (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="border-b pb-3"
        >
          <div className="font-semibold">
            {activity.module} • {activity.action}
          </div>

          <div className="text-sm text-gray-600">
            {activity.description}
          </div>

          <div className="text-xs text-gray-400">
            {new Date(
              activity.createdAt
            ).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

<div className="grid grid-cols-2 gap-6 mb-8">
  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-xl font-semibold mb-4">
      Top Customers
    </h2>

    {topCustomers.length === 0 ? (
      <p>No customer data available.</p>
    ) : (
      <div className="space-y-3">
        {topCustomers.map((customer, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-2"
          >
            <span>{customer.customer}</span>

            <span className="font-bold text-green-600">
              ₹{customer.amount}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>

  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-xl font-semibold mb-4">
      Top Vendors
    </h2>

    {topVendors.length === 0 ? (
      <p>No vendor data available.</p>
    ) : (
      <div className="space-y-3">
        {topVendors.map((vendor, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-2"
          >
            <span>{vendor.vendor}</span>

            <span className="font-bold text-red-600">
              ₹{vendor.amount}
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          SmartERP Overview
        </h2>

        <div className="space-y-3">
  <p>
    Welcome to SmartERP. All business statistics shown
    above are loaded live from the PostgreSQL database.
  </p>

  <div>
    <strong>Database Status:</strong> Connected
  </div>

  <div>
    <strong>Last Updated:</strong>{" "}
    {new Date().toLocaleString()}
  </div>

  <div>
    <strong>Environment:</strong> Production Ready
  </div>
</div>

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