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

  try {
    // transaccion
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. update product store
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productsId
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(
            `Product ${product.id} doen't have an especific quantity`
          );
        }
        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            // no hacer porque es valor viejo el inStock
            // inStock: product.inStock - productQuantity,
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });
      const updatedProducts = await Promise.all(updatedProductsPromises);
      // Verificar valores negativos en la exitencia
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} There is not more products`);
        }
      });

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
                  products.find((product) => product.id === p.productId)
                    ?.price || 0,
              })),
            },
          },
        },
      });
      // 3. Set the order direction
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return { order, orderAddress, updatedProducts };
    });
    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
