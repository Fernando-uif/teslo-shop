import { getProductBySlug } from "@/actions";
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
  const product = await getProductBySlug(slug);

  // todo new
  if (!product) {
    redirect("/admin/products");
  }
  const title = slug === "new" ? "New product" : "Edit product";
  return (
    <div>
      <Title title={product?.title || ""} />
      <ProductForm product={product} />
    </div>
  );
}
