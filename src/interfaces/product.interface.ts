export interface Product {
  id: string;
  description: string;
  gender: "men" | "women" | "kid" | "unisex";
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;

  // TODO type
  // type: ValidType;
}
export interface ProductImage {
  id: number;
  url: string;
  productId?: string;
}
export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}

export type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType = "shirts" | "pants" | "hoodies" | "hats";
