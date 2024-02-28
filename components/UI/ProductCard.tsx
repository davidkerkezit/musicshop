"use client";
import Image from "next/image";
import Button from "./Button";
import { AiOutlineShopping } from "react-icons/ai";
import { ProductType } from "@/libs/types";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import Portal from "./Modals/Portal";
import SuccessfullyEdit from "./Modals/SuccessfullyEdit";
import DeletingProduct from "./Modals/DeletingProduct";

const ProductCard = ({ product }: { product: ProductType }) => {
  const pathname = usePathname();
  const [confirmation, setConfirmation] = useState<null | boolean>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const isShopPage = pathname.startsWith("/shop");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const [isDeletePending, setIsDeletePending] = useState(false);
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const router = useRouter();
  const deleteProductHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeletePending(true);
    setShowModal(false);

    const status = await deleteProduct(
      product.imageUrl,
      product._id,
      product.category
    );

    setIsDeletePending(false);
    const url = `${pathname}?${searchParams}`;

    status === 201 && router.refresh();
  };
  const addToCartHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    price: number,
    name: string,
    inStock: number,
    category: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const productQuantity = cartItems.find(
      (item) => item.productId === id
    )?.quantity;

    if (productQuantity === undefined || inStock > productQuantity) {
      setIsAddedToCart(true);

      dispatch(
        addItemToCart({
          productId: id,
          quantity: 1,
          price,
          name,
          inStock,
          category,
        })
      );
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 1000);
    }
  };
  return (
    <>
      {showModal && (
        <Portal setHidden={setShowModal}>
          <DeletingProduct
            name={product.name}
            deletingConfirmation={setConfirmation}
            showModal={setShowModal}
            image={product.imageUrl}
            deleteProductHandler={deleteProductHandler}
          />
        </Portal>
      )}
      <Link
        href={`${
          isShopPage
            ? `${BASE_URL}/shop/${product._id}`
            : `${BASE_URL}/dashboard/${product._id}`
        }`}
        className="mx-2  bg-[#313131] rounded-2xl h-max pt-[1px] hover:bg-[#424242] duration-200  "
      >
        <div className="w-[90%] bg-[#e1e1e1] aspect-square mx-auto md:mt-0 lg:mt-4 rounded-2xl flex items-center justify-center relative  ">
          <Image
            width={300}
            height={300}
            src={product.imageUrl}
            alt={product.name}
            className={`  custom-shadow aspect-square p-3 object-contain  `}
          />
          {!isShopPage && (
            <div className="absolute top-1 right-1 bg-[#6e6e6e] p-2 rounded-full ">
              {product.access ? (
                <FaUnlock className="  text-base text-green-500 " />
              ) : (
                <FaLock className="  text-base  text-red-500" />
              )}
            </div>
          )}

          {!isShopPage ? <FaLockOpen /> : <FaLock />}
        </div>
        <div className="w-[90%] py-2  mx-auto flex flex-col items-center gap-2 mt-3">
          <p className="text-white/70 font-thin  ">{product.name}</p>
          <p className="text-white/70 font-thin mb-4  ">{product.price}.00 $</p>
          {isShopPage && (
            <Button
              isPending={false}
              label={`${
                product.inStock === 0 ? "Out of stock" : "Add to cart"
              }`}
              icon={<AiOutlineShopping />}
              func={(e) =>
                addToCartHandler(
                  e,

                  product._id,
                  product.price,
                  product.name,
                  product.inStock,
                  product.category
                )
              }
            />
          )}

          {isDashboardPage && (
            <div className="flex flex-col items-center ">
              <Button
                isPending={isDeletePending}
                label={`${product.access ? "Delete" : "No Permission"}`}
                icon={<RiDeleteBin2Line />}
                func={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowModal(true);
                }}
              />
              <Button
                label={`${product.access ? "Edit" : "No Permission"}`}
                icon={<VscEdit />}
                isPending={false}
                func={() => router.push(`${BASE_URL}/dashboard/${product._id}`)}
              />
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
