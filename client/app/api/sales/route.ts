import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const sales = await prisma.sales.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      sales,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch sales",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const sale = await prisma.sales.create({
      data: {
        invoiceNo: body.invoiceNo,
        customer: body.customer,
        amount: Number(body.amount),
        status: body.status,
      },
    });

    return Response.json({
      success: true,
      sale,
      message: "Sale saved successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to save sale",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const sale = await prisma.sales.update({
      where: {
        id: body.id,
      },
      data: {
        invoiceNo: body.invoiceNo,
        customer: body.customer,
        amount: Number(body.amount),
        status: body.status,
      },
    });

    return Response.json({
      success: true,
      sale,
      message: "Sale updated successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to update sale",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.sales.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
      message: "Sale deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete sale",
      },
      { status: 500 }
    );
  }
}