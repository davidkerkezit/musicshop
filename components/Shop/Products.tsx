import { ProductType } from "@/libs/types";
import ProductCard from "../UI/ProductCard";
import { unstable_noStore } from "next/cache";
import SearchQuery from "../UI/SearchQuery";

const Products = ({
  products,
  parent,
}: {
  products: ProductType[];
  parent: string;
}) => {
  unstable_noStore();

  return (
    <div className="md:w-[80%] w-full mx-auto">
      <SearchQuery />
      <div
        className={` grid   gap-2 ${
          parent === "dashboard"
            ? " grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "lg:grid-cols-4 grid-cols-2 sm:grid-cols-3"
        }`}
      >
        {products.map((product: ProductType, index: number) => {
          return (
            <ProductCard key={product._id} product={product} parent="shop" />
          );
        })}
      </div>
    </div>
  );
};

export default Products;
