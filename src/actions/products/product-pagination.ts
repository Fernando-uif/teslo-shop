"use server";

import { Category } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
interface PaginationOptions {
  page?: number;
  take?: number;
  // poner que gender es del tipo de los que mandaran
  gender?: Category;
}
export const getPaginatedProductsWidthImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page <= 1) page = 1;
  try {
    let products;
    let totalCount;
    if (gender) {
      products = await prisma.product.findMany({
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
        where: {
          gender: gender,
        },
      });
      totalCount = await prisma.product.count({
        where: {
          gender: gender,
        },
      });
    } else {
      products = await prisma.product.findMany({
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
      totalCount = await prisma.product.count({});
    }

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
