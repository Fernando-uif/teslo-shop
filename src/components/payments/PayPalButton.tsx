"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";
import { setTransactionId } from "@/actions/paypal/set-transaction-id";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <>
        <div className="animate-pulse">
          <div className="h-11 mb-2 rounded bg-gray-300" />
          <div className="h-11 rounded bg-gray-300" />
        </div>
      </>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          // invoice_id:'order_id',
          amount: {
            currency_code: "USD",
            value: `${roundedAmount}`,
          },
        },
      ],
    });
    // todo guardar el id en la orden en la base de datos
    // setTransactionId
    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error(`Not possible to get the transaction`);
    }
    return transactionId;
  };

  return <PayPalButtons createOrder={createOrder} />;
};
