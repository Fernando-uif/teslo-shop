import { notFound } from "next/navigation";

import { ProductGrid, Title } from "@/components";
import { getPaginatedProductsWidthImages } from "@/actions";
import Pagination from "@/components/ui/pagination/Pagination";

interface Props {
  params: {
    gender: string;
  };

  searchParams: {
    page?: string;
  };
}

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;
  const { page } = searchParams;

  const textGender = gender
    ?.slice(0, 1)
    ?.toUpperCase()
    ?.concat(gender.slice(1, gender.length));
  const { currentPage, products, totalPages } =
    await getPaginatedProductsWidthImages({ gender, page: Number(page) });

  return (
    <>
      <Title title={textGender} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
