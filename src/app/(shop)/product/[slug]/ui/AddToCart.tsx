"use client";

import { SizeSelector, QuantitySelector } from "@/components/";
import { Product } from "@/interfaces";
import { useState } from "react";
import { CartProduct, Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store";
interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const addProductToCart = useCartStore((state) => state.addProductTocart);

  const addToCart = () => {

    if (!size) {
      setPosted(true);
      return;
    }
    const cartroduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };
    addProductToCart(cartroduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-400">Must select a size</span>
      )}
      {/* {Selector de tallas } */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* {Selector de cantidad } */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      {/* Boton */}
      <button onClick={addToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};
