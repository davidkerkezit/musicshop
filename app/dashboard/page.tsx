import Options from "@/components/Dashboard/Options";
import AddProduct from "@/components/Dashboard/AddProduct";
import { getProducts } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import { PageBanner } from "@/components";
import Dashboard from "@/components/Dashboard/Dashboard";

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
    await getProducts(page, sort, query, collection);
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
