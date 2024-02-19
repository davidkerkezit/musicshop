"use client";
import Image from "next/image";
import Button from "./Button";
import { AiOutlineShopping } from "react-icons/ai";
import { ProductType } from "@/libs/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiDeleteBin2Line } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";
import { BASE_URL } from "@/libs/utils";
import { ButtonHTMLAttributes, useState } from "react";
import { cartProducts, deleteProduct } from "@/libs/actions";
import LoadingDots from "./LoadingDots";
import { AiOutlineDelete } from "react-icons/ai";
import { isPending } from "@reduxjs/toolkit";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/libs/features/cartSlice";

const ProductCard = ({ product }: { product: ProductType }) => {
  const pathname = usePathname();
  const isShopPage = pathname.startsWith("/shop");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const [isDeletePending, setIsDeletePending] = useState(false);
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const deleteProductHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    img: string,
    id: string,
    category: string
  ) => {
    setIsDeletePending(true);

    e.preventDefault();
    e.stopPropagation();
    await deleteProduct(img, id, category);
    setIsDeletePending(false);
  };
  const addToCartHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    price: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItemToCart({ productId: id, quantity: 1, price }));
  };
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
          <Button
            isPending={false}
            label="Add to cart"
            icon={<AiOutlineShopping />}
            func={(e) =>
              addToCartHandler(
                e,

                product._id,
                product.price
              )
            }
          />
        )}

        {isDashboardPage && (
          <div className="flex flex-col items-center ">
            <Button
              isPending={isDeletePending}
              label="Delete"
              icon={<RiDeleteBin2Line />}
              func={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                deleteProductHandler(
                  e,
                  product.imageUrl,
                  product._id,
                  product.category
                )
              }
            />
            <Button
              label="Edit product"
              icon={<VscEdit />}
              isPending={false}
              func={() => router.push(`${BASE_URL}/dashboard/${product._id}`)}
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
