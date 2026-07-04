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

    const totalSales = sales.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );

    const totalPurchases = purchases.reduce(
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