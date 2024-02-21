import { getProducts } from "@/libs/actions";
import {
  Products,
  NewArrivals,
  SearchSection,
  Filter,
  NoProducts,
  Pagination,
} from "@/components";
import { ProductType } from "@/libs/types";
import SearchQuery from "@/components/UI/SearchQuery";

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
    <div>
      <SearchSection />
      <NewArrivals products={newProducts} />
      <Filter />

      {products.length > 0 ? <Products products={products} /> : <NoProducts />}
      {pages && <Pagination pagesNumber={pages} />}
    </div>
  );
}
