"use client";

import { useAddressStore, useCartStore } from "@/store";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { placeOrder } from "@/actions";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { itemsIncart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore((state) => state.cart);
  useEffect(() => {
    setLoaded(true);

    return () => {};
  }, []);
  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    console.log({ address });
    const resp = await placeOrder(productsToOrder, address);
    console.log(resp,'tenemos la resp');
    setIsPlacingOrder(false);
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Address to send</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address} </p>
        <p>{address.address2}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
      </div>
      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2 ">Orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Items</span>
        <span className="text-right">
          {itemsIncart === 1 ? "1 Item" : `${itemsIncart} Items`}
        </span>

        <span>SubTotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Taxes(15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="mt-5 mb-2  w-full">
        <p className="mb-5">
          <span className="text-xs">
            Accept our terms and conditions and privacy policy.
          </span>
        </p>
        {/* <p className="text-red-500" >Error sending the order</p> */}
        <button
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          onClick={onPlaceOrder}
          //href={"/orders/123"}
        >
          Continue order
        </button>
      </div>
    </div>
  );
};
