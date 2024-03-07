import { ProductType } from "@/libs/types";
import ProductCard from "../UI/ProductCard";
import { unstable_noStore } from "next/cache";
import SearchQuery from "../UI/SearchQuery";

const Products = ({ products }: { products: ProductType[] }) => {
  unstable_noStore();

  return (
    <div className="md:w-[80%] w-full mx-auto">
      <SearchQuery />
      <div className=" grid lg:grid-cols-4 grid-cols-2 gap-2">
        {products.map((product: ProductType, index: number) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
