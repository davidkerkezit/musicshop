"use client";
import Image from "next/image";
import Button from "./Button";
import { AiOutlineShopping } from "react-icons/ai";
import { ProductType } from "@/libs/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDeleteBin2Line } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";
import { BASE_URL } from "@/libs/utils";

const ProductCard = ({ product }: { product: ProductType }) => {
  const pathname = usePathname();
  const isShopPage = pathname.startsWith("/shop");
  const isDashboardPage = pathname.startsWith("/dashboard");

  return (
    <Link
      href={`${
        isShopPage
          ? `${BASE_URL}/shop/${product._id}`
          : `${BASE_URL}/dashboard/${product._id}`
      }`}
      className="mx-2  bg-[#313131] rounded-2xl h-max pt-[1px] "
    >
      <div className="w-[90%] bg-[#e1e1e1] aspect-square mx-auto mt-4 rounded-2xl flex items-center justify-center ">
        <Image
          width={300}
          height={300}
          src={product.imageUrl}
          alt={product.name}
          className="custom-shadow aspect-square p-3 object-contain"
        />
      </div>
      <div className="w-[90%] py-2  mx-auto flex flex-col items-center gap-2 mt-3">
        <p className="text-white/70 font-thin  ">{product.name}</p>
        <p className="text-white/70 font-thin mb-4  ">{product.price}.00 $</p>
        {isShopPage && (
          <Button label="Add to cart" icon={<AiOutlineShopping />} />
        )}

        {isDashboardPage && (
          <div className="flex flex-col items-center ">
            <Button label="Edit product" icon={<VscEdit />} />{" "}
            <Button label="Delete" icon={<RiDeleteBin2Line />} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
