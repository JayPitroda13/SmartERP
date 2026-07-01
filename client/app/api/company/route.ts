import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch companies",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const company = await prisma.company.create({
      data: {
        name: body.name,
        gstNumber: body.gstNumber,
        email: body.email,
        phone: body.phone,
        address: body.address,
      },
    });

    return Response.json({
      success: true,
      company,
      message: "Company saved successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to save company",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const company = await prisma.company.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        gstNumber: body.gstNumber,
        email: body.email,
        phone: body.phone,
        address: body.address,
      },
    });

    return Response.json({
      success: true,
      company,
      message: "Company updated successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to update company",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.company.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to delete company",
      },
      { status: 500 }
    );
  }
}