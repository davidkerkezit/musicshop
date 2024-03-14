import {
  Filter,
  NewArrivals,
  NoProducts,
  Pagination,
  Products,
  SearchSection,
} from "@/components/Shop";
import { getProducts } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Music Shop | Shop",
  description:
    "Welcome to Musicshop London - your ultimate destination for music enthusiasts. Explore our vast collection of vinyl records, DJ equipment, and audio software. Discover top-quality products and elevate your music experience with Musicshop today.",
};
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page;
  const sort = searchParams?.sort;
  const query = searchParams?.q;
  const collection = searchParams?.collection;
  const {
    newProducts,
    products,
    pages,
  }: { newProducts: ProductType[]; products: ProductType[]; pages: number } =
    await getProducts(page, sort, query, collection);

  return (
    <>
      <SearchSection />
      <NewArrivals products={newProducts} />
      <Filter />
      {products.length > 0 ? (
        <Products parent="shop" products={products} />
      ) : (
        <NoProducts />
      )}
      {pages && <Pagination pagesNumber={pages} />}
    </>
  );
}
