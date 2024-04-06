export interface Product {
  id: string;
  description: string;
  gender: Category;
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
export type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType = "shirts" | "pants" | "hoodies" | "hats";
