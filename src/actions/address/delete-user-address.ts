"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    deleteAddress(userId);
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
  }
};

const deleteAddress = async (userId: string) => {
  const deleted = await prisma.userAddress.delete({
    where: {
      userId,
    },
  });
  return {
    ok: true,
    message: "The user was delete",
    user: deleted,
  };
};
