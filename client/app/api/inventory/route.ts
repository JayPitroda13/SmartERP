import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      inventory,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch inventory",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const item = await prisma.inventory.create({
      data: {
        itemName: body.itemName,
        category: body.category,
        stock: Number(body.stock),
        unitPrice: Number(body.unitPrice),
      },
    });

    return Response.json({
      success: true,
      item,
      message: "Item saved successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to save item",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const item = await prisma.inventory.update({
      where: {
        id: body.id,
      },
      data: {
        itemName: body.itemName,
        category: body.category,
        stock: Number(body.stock),
        unitPrice: Number(body.unitPrice),
      },
    });

    return Response.json({
      success: true,
      item,
      message: "Item updated successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to update item",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.inventory.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete item",
      },
      { status: 500 }
    );
  }
}