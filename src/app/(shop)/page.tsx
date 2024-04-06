
import { getPaginatedProductsWidthImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import Pagination from "@/components/ui/pagination/Pagination";
import { redirect } from "next/navigation";

export const revalidate = 60;

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWidthImages({ page });

  if (!products?.length) {
    redirect("/");
  }
  return (
    <>
      <Title title="Shop" subtitle="All products" className="mb-2" />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
