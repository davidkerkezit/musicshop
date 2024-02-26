import { getProducts } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import { PageBanner, Dashboard, Options } from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | Dashboard",

  description: "Feel Our Vibe",
};
export default async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page;
  const sort = searchParams?.sort;
  const query = searchParams?.q;
  const collection = searchParams?.collection;

  const { products, pages }: { products: ProductType[]; pages: number } =
    await getProducts(page, "newest", query, collection);

  return (
    <div>
      <PageBanner page="Dashboard" />
      <div className="z-10 relative flex">
        <Options />
        <Dashboard products={products} pages={pages} />
      </div>
    </div>
  );
}
