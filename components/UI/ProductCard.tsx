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
import { ButtonHTMLAttributes, useState } from "react";
import { cartProducts, deleteProduct } from "@/libs/actions";
import LoadingDots from "./LoadingDots";
import { AiOutlineDelete } from "react-icons/ai";

const ProductCard = ({ product }: { product: ProductType }) => {
  const pathname = usePathname();
  const isShopPage = pathname.startsWith("/shop");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const [isDeletePending, setIsDeletePending] = useState(false);

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
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Retrieve existing cart items from localStorage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingProductIndex = existingCartItems.findIndex(
      (item: any) => item.id === id
    );

    if (existingProductIndex !== -1) {
      // If the product already exists, update its quantity
      existingCartItems[existingProductIndex].quantity += 1;
    } else {
      // If the product doesn't exist, add it to the cart
      existingCartItems.push({ id, quantity: 1 });
    }

    // Store the updated cart items back into localStorage
    localStorage.setItem("cart", JSON.stringify(existingCartItems));
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
          // <Button label="Add to cart" icon={<AiOutlineShopping />} />
          <button
            onClick={(e) =>
              addToCartHandler(
                e,

                product._id
              )
            }
          >
            Add to Cart
          </button>
        )}

        {isDashboardPage && (
          <div className="flex flex-col items-center ">
            <button
              onClick={(e) =>
                deleteProductHandler(
                  e,
                  product.imageUrl,
                  product._id,
                  product.category
                )
              }
              disabled={isDeletePending}
              className=" flex gap-1  items-center border-[3px] border-juice rounded-full   mb-4  w-max"
            >
              <div className="flex items-center m-1 pr-4  rounded-full w-full bg-neutral-700">
                <div className="text-3xl md:text-xl p-1 m-1 bg-neutral-500 rounded-full text-white border-[1px] border-juice">
                  <AiOutlineDelete />
                </div>
                {isDeletePending ? (
                  <LoadingDots />
                ) : (
                  <p className="text-base md:text-md pl-2">Delete</p>
                )}
              </div>
            </button>
            {/* <Button label="Edit product" icon={<VscEdit />} />{" "}
            <Button label="Delete" icon={<RiDeleteBin2Line />} /> */}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
