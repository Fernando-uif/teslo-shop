"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import { paypalCheckPayment } from "@/actions";

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
      // Al colocar el invoice_id lee estaremos diciendo que cuando cree esta orden tambien le coloque el orderId para que este en sus propiedades
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
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
  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order?.capture();
    if (!details || !details?.id) return;

    // Sera el transaction id que guardamos
    await paypalCheckPayment(details.id);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
    </div>
  );
};
