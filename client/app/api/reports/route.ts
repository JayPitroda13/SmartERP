import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const companyCount = await prisma.company.count();

    const customerCount = await prisma.customer.count();

    const inventoryCount = await prisma.inventory.count();

    const sales = await prisma.sales.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const purchases = await prisma.purchase.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const allSales = await prisma.sales.findMany();

    const allPurchases = await prisma.purchase.findMany();

    const recentActivities = await prisma.activity.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const customerTotals = allSales.reduce(
      (acc: Record<string, number>, sale) => {
        acc[sale.customer] =
          (acc[sale.customer] || 0) + sale.amount;

        return acc;
      },
      {}
    );

    const topCustomers = Object.entries(customerTotals)
      .map(([customer, amount]) => ({
        customer,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    const vendorTotals = allPurchases.reduce(
      (
        acc: Record<string, number>,
        purchase
      ) => {
        acc[purchase.vendor] =
          (acc[purchase.vendor] || 0) +
          purchase.amount;

        return acc;
      },
      {}
    );

    const topVendors = Object.entries(vendorTotals)
      .map(([vendor, amount]) => ({
        vendor,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    const totalSales = allSales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    const totalPurchases = allPurchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    return Response.json({
      success: true,

      stats: {
        companyCount,
        customerCount,
        inventoryCount,
        totalSales,
        totalPurchases,
      },

      sales,
      purchases,

      topCustomers,
      topVendors,

      recentActivities,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to load reports",
      },
      { status: 500 }
    );
  }
}