"use client";
import React, { useEffect, useState } from "react";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";

export const OrderSummary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { itemsIncart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  },[]);

  useEffect(()=>{
    if(itemsIncart === 0 && loaded === true){
      router.replace('/empty')
    }
  },[itemsIncart,loaded,router])

  if (!loaded) return <p>Loading...</p>;

  return (
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
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
