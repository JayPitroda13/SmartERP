"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
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


interface ReportStats {
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

interface TopCustomer {
  customer: string;
  amount: number;
}

interface TopVendor {
  vendor: string;
  amount: number;
}

export default function ReportsPage() {
  const [stats, setStats] = useState<ReportStats>({
    companyCount: 0,
    customerCount: 0,
    inventoryCount: 0,
    totalSales: 0,
    totalPurchases: 0,
  });

  const [sales, setSales] = useState<Sale[]>([]);
const [purchases, setPurchases] = useState<Purchase[]>([]);
const [activities, setActivities] = useState<Activity[]>([]);

const [topCustomers, setTopCustomers] =
  useState<TopCustomer[]>([]);
const [topVendors, setTopVendors] =
  useState<TopVendor[]>([]);

  const fetchReports = async () => {
    const response = await fetch("/api/reports");
    const data = await response.json();

    if (data.success) {
  setStats(data.stats);
  setSales(data.sales);
  setPurchases(data.purchases);
  setTopCustomers(data.topCustomers);
  setTopVendors(data.topVendors);
}
  };

  const fetchActivities = async () => {
  const response = await fetch("/api/activity");

  const data = await response.json();

  if (data.success) {
    setActivities(data.activities);
  }
};

  useEffect(() => {
  fetchReports();
  fetchActivities();
}, []);

  const downloadSalesPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SmartERP - Sales Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Invoice No", "Customer", "Amount", "Status"]],
      body: sales.map((sale) => [
        sale.invoiceNo,
        sale.customer,
        `Rs. ${sale.amount}`,
        sale.status,
      ]),
    });

    doc.text(
      `Total Sales: Rs. ${stats.totalSales}`,
      14,
      (doc as any).lastAutoTable.finalY + 15
    );

    doc.save("Sales-Report.pdf");
  };

  const downloadPurchasePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SmartERP - Purchase Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["PO Number", "Vendor", "Amount", "Status"]],
      body: purchases.map((purchase) => [
        purchase.poNumber,
        purchase.vendor,
        `Rs. ${purchase.amount}`,
        purchase.status,
      ]),
    });

    doc.text(
      `Total Purchases: Rs. ${stats.totalPurchases}`,
      14,
      (doc as any).lastAutoTable.finalY + 15
    );

    doc.save("Purchase-Report.pdf");
  };

  const downloadFullReportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("SmartERP Business Report", 14, 20);

    doc.setFontSize(12);

    doc.text(`Companies: ${stats.companyCount}`, 14, 40);
    doc.text(`Customers: ${stats.customerCount}`, 14, 50);
    doc.text(`Inventory Items: ${stats.inventoryCount}`, 14, 60);
    doc.text(`Total Sales: Rs. ${stats.totalSales}`, 14, 70);
    doc.text(`Total Purchases: Rs. ${stats.totalPurchases}`, 14, 80);

    doc.save("SmartERP-Full-Report.pdf");
  };

  const downloadSalesExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sales);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Sales"
    );

    XLSX.writeFile(workbook, "Sales-Report.xlsx");
  };

  const downloadPurchaseExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(purchases);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Purchases"
    );

    XLSX.writeFile(workbook, "Purchase-Report.xlsx");
  };

  const downloadFullExcel = () => {
    const workbook = XLSX.utils.book_new();

    const summarySheet = XLSX.utils.json_to_sheet([
      {
        Companies: stats.companyCount,
        Customers: stats.customerCount,
        Inventory: stats.inventoryCount,
        TotalSales: stats.totalSales,
        TotalPurchases: stats.totalPurchases,
      },
    ]);

    XLSX.utils.book_append_sheet(
      workbook,
      summarySheet,
      "Summary"
    );

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(sales),
      "Sales"
    );

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(purchases),
      "Purchases"
    );

    XLSX.writeFile(
      workbook,
      "SmartERP-Full-Report.xlsx"
    );
  };
  const chartData = [
  {
    name: "Business",
    Sales: stats.totalSales,
    Purchases: stats.totalPurchases,
  },
];
const profit =
  stats.totalSales - stats.totalPurchases;

const businessStatus =
  profit > 0
    ? "Profitable"
    : profit < 0
    ? "Loss"
    : "Break Even";

    const profitMargin =
  stats.totalSales > 0
    ? ((profit / stats.totalSales) * 100).toFixed(2)
    : "0.00";

  const healthScore = Math.min(
  100,
  Math.max(
    0,
    Math.round(Number(profitMargin) * 5)
  )
);
const revenueEfficiency =
  stats.totalPurchases > 0
    ? (
        stats.totalSales /
        stats.totalPurchases
      ).toFixed(2)
    : "0.00";
  
const averageSaleValue =
  sales.length > 0
    ? Math.round(
        stats.totalSales / sales.length
      )
    : 0;

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-8">
        Reports Dashboard
      </h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={downloadSalesPDF}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Sales PDF
        </button>

        <button
          onClick={downloadPurchasePDF}
          className="bg-green-600 text-white px-5 py-3 rounded-lg"
        >
          Purchase PDF
        </button>

        <button
          onClick={downloadFullReportPDF}
          className="bg-purple-600 text-white px-5 py-3 rounded-lg"
        >
          Full PDF
        </button>

        <button
          onClick={downloadSalesExcel}
          className="bg-cyan-600 text-white px-5 py-3 rounded-lg"
        >
          Sales Excel
        </button>

        <button
          onClick={downloadPurchaseExcel}
          className="bg-emerald-600 text-white px-5 py-3 rounded-lg"
        >
          Purchase Excel
        </button>

        <button
          onClick={downloadFullExcel}
          className="bg-indigo-600 text-white px-5 py-3 rounded-lg"
        >
          Full Excel
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border p-6 mb-8">
  <h2 className="text-2xl font-bold mb-6">
    Sales vs Purchases Analytics
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold">
            Companies
          </h2>
          <p className="text-3xl font-bold mt-3">
            {stats.companyCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold">
            Customers
          </h2>
          <p className="text-3xl font-bold mt-3">
            {stats.customerCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold">
            Inventory Items
          </h2>
          <p className="text-3xl font-bold mt-3">
            {stats.inventoryCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold">
            Total Sales
          </h2>
          <p className="text-3xl font-bold mt-3">
            ₹{stats.totalSales}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
  <h2 className="text-lg font-semibold">
    Total Purchases
  </h2>

  <p className="text-3xl font-bold mt-3">
    ₹{stats.totalPurchases}
  </p>
</div>

<div className="bg-white p-6 rounded-xl shadow border">
  <h2 className="text-lg font-semibold">
    Profit
  </h2>

  <p
  className={`text-3xl font-bold mt-3 ${
    profit > 0
      ? "text-green-600"
      : profit < 0
      ? "text-red-600"
      : "text-gray-600"
  }`}
>
  ₹{profit}
</p>

</div>
<div className="bg-white p-6 rounded-xl shadow border">
  <h2 className="text-lg font-semibold">
    Business Status
  </h2>

  <p
    className={`text-3xl font-bold mt-3 ${
      businessStatus === "Profitable"
        ? "text-green-600"
        : businessStatus === "Loss"
        ? "text-red-600"
        : "text-gray-600"
    }`}
  >
    {businessStatus}
  </p>
</div>
<div className="bg-white p-6 rounded-xl shadow border">
  <h2 className="text-lg font-semibold">
    Profit Margin
  </h2>

  <p
    className={`text-3xl font-bold mt-3 ${
      Number(profitMargin) > 20
        ? "text-green-600"
        : Number(profitMargin) > 10
        ? "text-yellow-600"
        : "text-red-600"
    }`}
  >
    {profitMargin}%
  </p>
</div>

<div className="bg-white p-6 rounded-xl shadow border">
  <h2 className="text-lg font-semibold">
    Health Score
  </h2>

  <p
    className={`text-3xl font-bold mt-3 ${
      healthScore >= 70
        ? "text-green-600"
        : healthScore >= 40
        ? "text-yellow-600"
        : "text-red-600"
    }`}
  >
    {healthScore}/100
  </p>
</div>

<div className="bg-white p-6 rounded-xl shadow border">
  <h2 className="text-lg font-semibold">
    Revenue Efficiency
  </h2>

  <p
    className={`text-3xl font-bold mt-3 ${
      Number(revenueEfficiency) >= 1.5
        ? "text-green-600"
        : Number(revenueEfficiency) >= 1
        ? "text-yellow-600"
        : "text-red-600"
    }`}
  >
    {revenueEfficiency}x
  </p>
</div>

<div className="bg-white p-6 rounded-xl shadow border">
  <h2 className="text-lg font-semibold">
    Average Sale Value
  </h2>

  <p className="text-3xl font-bold mt-3 text-blue-600">
    ₹{averageSaleValue}
  </p>
</div>

</div>

    <div className="bg-white rounded-xl shadow border p-6 mb-8">
 <div className="flex items-center justify-between mb-4">
  <h2 className="text-2xl font-bold">
    Recent Activity
  </h2>

  <button
    className="text-blue-600 hover:text-blue-800 font-medium"
  >
    View All
  </button>
</div>

  <div className="space-y-3">
    {activities.length === 0 ? (
      <p className="text-gray-500">
        No activity found
      </p>
    ) : (
      activities.map((activity) => (
        <div
          key={activity.id}
          className="border rounded-lg p-4"
        >
         <div className="flex justify-between items-center">
  <p className="font-semibold">
    {activity.module} • {activity.action}
  </p>

  <p className="text-xs text-gray-500">
    {new Date(activity.createdAt).toLocaleString()}
  </p>
</div>

          <p className="text-gray-600 text-sm mt-1">
            {activity.description}
          </p>
        </div>
      ))
    )}
  </div>
</div>
    
    <div className="bg-white rounded-xl shadow border p-6 mb-8">
  <h2 className="text-2xl font-bold mb-4">
    Top Customers
  </h2>

  {topCustomers.length === 0 ? (
    <p className="text-gray-500">
      No customer sales data available
    </p>
  ) : (
    <div className="space-y-3">
      {topCustomers.map((customer, index) => (
        <div
          key={customer.customer}
          className="flex justify-between items-center border rounded-lg p-4"
        >
          <p className="font-semibold">
            #{index + 1} {customer.customer}
          </p>

          <p className="font-bold text-green-600">
            ₹{customer.amount}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
      
<div className="bg-white rounded-xl shadow border p-6 mb-8">
  <h2 className="text-2xl font-bold mb-4">
    Top Vendors
  </h2>

  {topVendors.length === 0 ? (
    <p className="text-gray-500">
      No purchase data available
    </p>
  ) : (
    <div className="space-y-3">
      {topVendors.map((vendor, index) => (
        <div
          key={vendor.vendor}
          className="flex justify-between items-center border rounded-lg p-4"
        >
          <p className="font-semibold">
            #{index + 1} {vendor.vendor}
          </p>

          <p className="font-bold text-blue-600">
            ₹{vendor.amount}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

      <div className="bg-white rounded-xl shadow border p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Recent Sales
        </h2>

        <table className="w-full border">
          <thead className="bg-slate-100">
            <tr>
              <th className="border p-3">Invoice No</th>
              <th className="border p-3">Customer</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="border p-3">
                  {sale.invoiceNo}
                </td>
                <td className="border p-3">
                  {sale.customer}
                </td>
                <td className="border p-3">
                  ₹{sale.amount}
                </td>
                <td className="border p-3">
                  {sale.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-2xl font-bold mb-4">
          Recent Purchases
        </h2>

        <table className="w-full border">
          <thead className="bg-slate-100">
            <tr>
              <th className="border p-3">PO Number</th>
              <th className="border p-3">Vendor</th>
              <th className="border p-3">Amount</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="border p-3">
                  {purchase.poNumber}
                </td>
                <td className="border p-3">
                  {purchase.vendor}
                </td>
                <td className="border p-3">
                  ₹{purchase.amount}
                </td>
                <td className="border p-3">
                  {purchase.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
} 