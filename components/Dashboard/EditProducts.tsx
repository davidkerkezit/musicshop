"use client";
import { ProductType } from "@/libs/types";
import { Filter, NoProducts, Pagination, Products } from "@/components/Shop";
import SearchForm from "../Forms/SearchForm";

const EditProducts = ({
  products,
  pages,
}: {
  products: ProductType[];
  pages: number;
}) => {
  return (
    <div className="w-full lg:mx-10 flex flex-col items-center">
      <SearchForm />
      <Filter />
      {products.length > 0 ? (
        <Products parent="dashboard" products={products} />
      ) : (
        <NoProducts />
      )}
      {products.length > 0 && <Pagination pagesNumber={pages} />}
    </div>
  );
};

export default EditProducts;
