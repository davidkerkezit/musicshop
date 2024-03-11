"use client";
import { ProductType } from "@/libs/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../../UI/ProductCard";
import { FaArrowRight } from "@/components/UI/Icons";
import { BASE_URL } from "@/libs/utils";
import Image from "next/image";

const SimilarProducts = ({
  products,
  category,
}: {
  products: ProductType[];
  category: string;
}) => {
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  useEffect(() => {
    switch (category) {
      case "DJ Equipments":
        setSelectedCollection("djequipments");
        break;
      case "Vinyls":
        setSelectedCollection("vinyls");
        break;
      case "Softweres":
        setSelectedCollection("softweres");
        break;

      default:
        setSelectedCollection("");
        break;
    }
  }, [category]);
  return (
    <div className=" bg-white/5 md:border-[1px] border-y-[1px] border-light-juice/40 py-2 md:rounded-2xl  overflow-x-scroll md:overflow-hidden w-full">
      <div className="flex justify-between px-4 md:py-2 py-5">
        <h3 className="text-xl">Similar Products</h3>
        <Link
          href={`${BASE_URL}/shop?collection=${selectedCollection}#sort`}
          className="font-thin pr-2 flex items-center gap-2"
        >
          See all
          <FaArrowRight size={12} />
        </Link>
      </div>
      <div className="md:flex md:justify-center justify-start md:gap-0 gap-1  grid grid-cols-2">
        {products.map((product: ProductType) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              parent="singleproduct"
            />
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;
