export const revalidate = 60; // seconds
import { ProductGrid, Title } from "@/components";
import { getPaginatedProductsWidthImages } from "@/actions";
import Pagination from "@/components/ui/pagination/Pagination";
import { Category } from "@/interfaces/product.interface";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: Category;
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
  const { products, totalPages } = await getPaginatedProductsWidthImages({
    gender,
    page: Number(page),
  });

  return (
    <>
      <Title title={textGender} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
