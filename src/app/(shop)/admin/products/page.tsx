// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import Link from "next/link";
import { Children } from "react";

import { IoCardOutline } from "react-icons/io5";
import { getPaginatedProductsWidthImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";

interface Props {
  searchParams: {
    page?: string;
  };
}
export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWidthImages({ page });

  return (
    <>
      <Title title="Manage products" />
      <div className="flex justify-end mb-5">
        <Link className="btn-primary" href={"/admin/product/new"}>
          New product
        </Link>
      </div>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genre
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Size
              </th>
            </tr>
          </thead>
          <tbody>
            {Children.toArray(
              products.map((product) => {
                return (
                  <>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link href={`/product/${product.slug}`}>
                          <ProductImage
                            src={product?.ProductImage?.[0]?.url}
                            width={80}
                            height={80}
                            alt={product.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                        </Link>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link
                          className="hover:underline"
                          href={`/admin/product/${product.slug}`}
                        >
                          {product.title}
                        </Link>
                      </td>
                      <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                        {currencyFormat(product.price)}
                      </td>
                      <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {product.gender}
                      </td>
                      <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {product.inStock}
                      </td>
                      <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {product.sizes.join(", ")}
                      </td>
                    </tr>
                  </>
                );
              })
            )}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
