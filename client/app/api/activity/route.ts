import { prisma } from "../../lib/prisma";

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      activities,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch activities",
      },
      { status: 500 }
    );
  }
}