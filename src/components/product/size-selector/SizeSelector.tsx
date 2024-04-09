import type { Size } from "@/interfaces/product.interface";
import clsx from "clsx";
import React from "react";
interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeChanged: (size: Size) => void;
}
export const SizeSelector = ({ availableSizes, selectedSize,onSizeChanged }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Available Sizes</h3>
      <div className="flex">
        {React.Children.toArray(
          availableSizes.map((size) => {
            return (
              <button
               
                onClick={()=>{
                  onSizeChanged(size);
                }}
                className={clsx("mx-2 hover:underline text-lg", {
                  underline: size === selectedSize,
                })}
              >
                {size}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
