import { ProductType } from "@/libs/types";
import { Filter, Pagination, Products, SearchForm } from "..";

const EditProducts = ({
  products,
  pages,
}: {
  products: ProductType[];
  pages: number;
}) => {
  return (
    <div className="w-full mx-32 flex flex-col items-center">
      <SearchForm />
      <Filter />
      <Products products={products} />
      <Pagination pagesNumber={pages} />
    </div>
  );
};

export default EditProducts;
