import { getPaginatedProductsWidthImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { products } = await getPaginatedProductsWidthImages({ page });
  console.log(products,'proeud');
  if (!products?.length) {
    redirect("/");
  }
  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />
    </>
  );
}
