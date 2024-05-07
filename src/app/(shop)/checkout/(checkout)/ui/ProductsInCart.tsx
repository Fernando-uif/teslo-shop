"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useCartStore } from "@/store";

import { currencyFormat } from "@/utils";

const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {React.Children.toArray(
        productsInCart.map((product) => {
          return (
            <div className="flex mb-5">
              <Image
                src={`/products/${product.image}`}
                alt={`${product.title}`}
                width={100}
                height={100}
                style={{
                  width: "100px",
                  height: "100px",
                  aspectRatio: "1/1",
                }}
                className="mr-5"
              />
              <div>
                <span className="">
                  {product.size} - {product.title} ({product.quantity})
                </span>
                <p className="font-bold">
                  {currencyFormat(product.price * product.quantity)}
                </p>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default ProductsInCart;
