import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch customers",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        gstNumber: body.gstNumber,
        email: body.email,
        phone: body.phone,
      },
    });

    return Response.json({
      success: true,
      customer,
      message: "Customer saved successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to save customer",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const customer = await prisma.customer.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        gstNumber: body.gstNumber,
        email: body.email,
        phone: body.phone,
      },
    });

    return Response.json({
      success: true,
      customer,
      message: "Customer updated successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to update customer",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.customer.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete customer",
      },
      { status: 500 }
    );
  }
}