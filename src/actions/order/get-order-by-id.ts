"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "Must be authenticated",
    };
  }
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (!order) throw `${id} doesn't exist`;
    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw `${id} doesn't belong to the user`;
      }
    }

    return { ok: true, order };
  } catch (error) {
    return {
      ok: false,
      message: "Try later",
    };
  }
};
