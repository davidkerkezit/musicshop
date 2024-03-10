"use client";
import { ProductType } from "@/libs/types";
import Image from "next/image";
import Button from "../../UI/Button";
import { AiOutlineShopping } from "@/components/UI/Icons";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { addItemToCart } from "@/libs/features/cartSlice";
import Link from "next/link";
import { BASE_URL } from "@/libs/utils";

const ProductDetails = ({
  selectedProduct,
  category,
}: {
  selectedProduct: ProductType;
  category: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
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
    }
  };
  return (
    <div className="flex md:pt-40 pt-20 md:flex-row flex-col ">
      <div className=" bg-white/10 flex items-center justify-center h-[28rem]  w-full md:w-1/2">
        <Image
          src={selectedProduct.imageUrl}
          alt="product"
          width={400}
          height={400}
          className="white-shadow w-full"
        />
      </div>

      <div className="md:w-1/2 w-full md:px-10 px-2 md:mt-0 mt-2 flex flex-col gap-1 md:gap-4">
        <h2 className="md:text-5xl text-3xl  font-semibold">
          {selectedProduct.name}
        </h2>
        <div className="flex  md:text-xl text-base gap-2">
          <p>Category: </p>
          {category === "DJ Equipments" && (
            <Link
              className="text-light-juice"
              href={`${BASE_URL}/shop?collection=djequipments`}
            >
              {category}
            </Link>
          )}
          {category === "Vinyls" && (
            <Link
              className="text-light-juice"
              href={`${BASE_URL}/shop?collection=vinyls`}
            >
              {category}
            </Link>
          )}
          {category === "Softweres" && (
            <Link
              className="text-light-juice"
              href={`${BASE_URL}/shop?collection=softweres`}
            >
              {category}
            </Link>
          )}
        </div>
        <p className="text-lg  font-light text-white/60 my-2 md:my-0">
          {selectedProduct.about}
        </p>
        <p className="md:text-[4rem] text-2xl font-extralight">
          <span className="text-lg  font-light pr-1">Price: </span>
          {selectedProduct.price}.00
          <span className="md:text-[3rem] text-xl font-extralight pl-1">$</span>
        </p>
        <div className="md:mt-0 mt-4">
          <Button
            isPending={false}
            label={`${
              selectedProduct.inStock === 0 ? "Out of stock" : "Add to cart"
            }`}
            icon={<AiOutlineShopping />}
            func={(e) =>
              addToCartHandler(
                e,

                selectedProduct._id,
                selectedProduct.price,
                selectedProduct.name,
                selectedProduct.inStock,
                selectedProduct.category
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
