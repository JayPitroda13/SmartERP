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

  const fetchReports = async () => {
    const response = await fetch("/api/reports");
    const data = await response.json();

    if (data.success) {
      setStats(data.stats);
      setSales(data.sales);
      setPurchases(data.purchases);
    }
  };

  useEffect(() => {
    fetchReports();
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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