import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ProductGrid, Title } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  const allProducts = initialData.products.filter(
    (product) => product.gender === id
  );
  const idName = id.slice(0, 1).toUpperCase().concat(id.slice(1, id.length));

  return (
    <>
      <Title title={idName} />
      <ProductGrid products={allProducts} />
    </>
  );
}
