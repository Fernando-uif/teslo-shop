import { ProductGrid, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";

const product = initialData.products;

export default function Home() {
  return (
    <>
      <Title title="Shop" subTitle="All products" className="mb-2" />
      <ProductGrid products={product} />
    </>
  );
}
