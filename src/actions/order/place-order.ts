"use server";

import { auth } from "@/auth.config";
import { Address } from "@/interfaces";
import type { Size } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}
export const placeOrder = async (
  productsId: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  // user
  if (!userId) {
    return {
      ok: false,
      message: "There is not an user session",
    };
  }
  // Get user info
  // carry the same product with the same id

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map((product) => product.productId),
      },
    },
  });

  const itemsInOrder = productsId.reduce(
    (count, prod) => count + prod.quantity,
    0
  );
  // total
  const { subTotal, tax, total } = productsId.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);
      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax = subTotal * 0.15;
      totals.total = subTotal * 1.15;
      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // transaccion
  const prismaTransaction = await prisma.$transaction(async (tx) => {
    // 1. update product store

    // 2. create the order header and detail
    const order = await tx.order.create({
      data: {
        userId,
        itemsInOrder,
        subTotal,
        tax,
        total,
        OrderItem: {
          createMany: {
            data: productsId.map((p) => ({
              quantity: p?.quantity,
              size: p?.size,
              productId: p?.productId,
              price:
                products.find((product) => product.id === p.productId)?.price ||
                0,
            })),
          },
        },
      },
    });
    // 3. Set the order direction
    return { order };
  });
};
