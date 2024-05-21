import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  let [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);
  console.log(product, "tenemos el product");
  // todo new
  if (!product && slug !== "new") {
    redirect("/admin/products");
  }
  const title = slug === "new" ? "New product" : "Edit product";
  let product2: any = {
    ...product,
  };
  return (
    <div>
      <Title title={product?.title || ""} />
      <ProductForm product={product2 ?? {}} categories={categories} />
    </div>
  );
}
