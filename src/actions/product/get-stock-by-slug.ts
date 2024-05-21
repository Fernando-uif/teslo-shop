"use server";
import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    const totalStock = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
      select: { inStock: true },
    });

    return totalStock?.inStock || 0;
  } catch (error) {
    return 0;
  }
};
