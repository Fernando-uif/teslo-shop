"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();
  if (!authToken) {
    return {
      ok: false,
      message: "Was not possible get the token",
    };
  }
  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);
  if (!resp) {
    return {
      ok: false,
      message: "Error",
    };
  }
  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];
  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Is not paid in paypal",
    };
  }
  // todo realizar el pago en la base de datos

  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });
    // revalidar path
    revalidatePath(`/orders/${orderId}`);
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Paiment not possible",
    };
  }

};

const getPayPalBearerToken = async () => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL || "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };
  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((resp) => resp.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  payPalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypaoOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${payPalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  try {
    const response = await fetch(paypaoOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((resp) => resp.json());
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
