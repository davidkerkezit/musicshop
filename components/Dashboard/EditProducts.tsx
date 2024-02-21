import { ProductType } from "@/libs/types";
import { Filter, NoProducts, Pagination, Products, SearchForm } from "..";
import SearchQuery from "../UI/SearchQuery";

const EditProducts = ({
  products,
  pages,
}: {
  products: ProductType[];
  pages: number;
}) => {
  return (
    <div className="w-full mx-10 flex flex-col items-center">
      <SearchForm />
      <Filter />

      {products.length > 0 ? <Products products={products} /> : <NoProducts />}
      {products.length > 0 && <Pagination pagesNumber={pages} />}
    </div>
  );
};

export default EditProducts;
