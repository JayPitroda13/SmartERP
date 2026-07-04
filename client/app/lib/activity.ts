import { prisma } from "./prisma";

export async function logActivity(
  module: string,
  action: string,
  description: string
) {
  try {
    await prisma.activity.create({
      data: {
        module,
        action,
        description,
      },
    });
  } catch (error) {
    console.error(
      "Activity Log Error:",
      error
    );
  }
}