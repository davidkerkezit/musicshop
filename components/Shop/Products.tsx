import { ProductType } from "@/libs/types";
import ProductCard from "../UI/ProductCard";
import { unstable_noStore } from "next/cache";

const Products = ({ products }: { products: ProductType[] }) => {
  unstable_noStore();
  return (
    <div className=" w-[80%] grid grid-cols-4  mx-auto gap-2">
      {products.map((product: ProductType, index: number) => {
        return <ProductCard product={product} />;
      })}
    </div>
  );
};

export default Products;
