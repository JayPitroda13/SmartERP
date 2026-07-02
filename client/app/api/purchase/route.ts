import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const purchases = await prisma.purchase.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      purchases,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch purchases",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const purchase = await prisma.purchase.create({
      data: {
        poNumber: body.poNumber,
        vendor: body.vendor,
        amount: Number(body.amount),
        status: body.status,
      },
    });

    return Response.json({
      success: true,
      purchase,
      message: "Purchase saved successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to save purchase",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const purchase = await prisma.purchase.update({
      where: {
        id: body.id,
      },
      data: {
        poNumber: body.poNumber,
        vendor: body.vendor,
        amount: Number(body.amount),
        status: body.status,
      },
    });

    return Response.json({
      success: true,
      purchase,
      message: "Purchase updated successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to update purchase",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.purchase.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
      message: "Purchase deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete purchase",
      },
      { status: 500 }
    );
  }
}