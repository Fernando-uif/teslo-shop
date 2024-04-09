"use client";

import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, setQuantity }: Props) => {
  // const [count, setCount] = useState(quantity);
  const onValueChanged = (value: number) => {
    if (!(value + quantity)) return;
    // setCount((prev) => prev + value);
    setQuantity(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded select-none">
        {quantity}
      </span>
      <button onClick={() => onValueChanged(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
