"use server";

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  console.log(address, "address", userId, "userID");
  try {
    const newAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error setting the info",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      city: address.city,
      postalCode: address.postalCode,
    };
    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }
    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addressToSave,
    });
    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("The information could not be recorded");
  }
};
