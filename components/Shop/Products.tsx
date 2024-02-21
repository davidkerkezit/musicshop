import { ProductType } from "@/libs/types";
import ProductCard from "../UI/ProductCard";
import { unstable_noStore } from "next/cache";
import SearchQuery from "../UI/SearchQuery";

const Products = ({ products }: { products: ProductType[] }) => {
  unstable_noStore();

  return (
    <div className=" w-[80%] mx-auto">
      <SearchQuery />
      <div className=" grid grid-cols-4 gap-2">
        {products.map((product: ProductType, index: number) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
