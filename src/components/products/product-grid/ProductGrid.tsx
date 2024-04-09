import { Children } from "react";

import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";
interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {Children.toArray(
        products.map((product) => (
          <ProductGridItem  product={product} />
        ))
      )}
    </div>
  );
};
