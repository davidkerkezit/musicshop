"use client";
import { ProductType } from "@/libs/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../UI/ProductCard";
import { FaArrowRight } from "react-icons/fa";
import { BASE_URL } from "@/libs/utils";

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
    <div className="w-max bg-juice/40 py-2 rounded-2xl ">
      <div className="flex justify-between px-4 py-2">
        <h3 className="text-xl">Similar Products</h3>
        <Link
          href={`${BASE_URL}/shop?collection=${selectedCollection}`}
          className="font-thin pr-2 flex items-center gap-2"
        >
          See all
          <FaArrowRight size={12} />
        </Link>
      </div>
      <div className="flex justify-center">
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;
