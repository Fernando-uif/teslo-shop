"use server";

import prisma from "@/lib/prisma";
interface PaginationOptions {
  page?: number;
  take?: number;
}
export const getPaginatedProductsWidthImages = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1 Obtener los productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    // Total de paginas
    // QUiero que cuente todos los productos
    const totalCount = await prisma.product.count({});
    const totalPages = Math.ceil(totalCount / take);
    
    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
        description: product?.description || "",
      })),
    };
  } catch (error) {
    throw new Error("Not products");
  }
};
