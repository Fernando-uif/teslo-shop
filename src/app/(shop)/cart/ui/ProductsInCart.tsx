"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import Link from "next/link";

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
                <Link
                  className="hover:underline cursor-pointer"
                  href={`/product/${product.slug}`}
                >
                  {product.title}
                </Link>
                <p>${product.price}</p>
                <QuantitySelector
                  quantity={3}
                  setQuantity={(value) => console.log(value)}
                />
                <button className="underline mt-3">Remove</button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default ProductsInCart;
