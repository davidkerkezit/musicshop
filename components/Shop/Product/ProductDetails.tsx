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
    <div className="flex pt-40  ">
      <div className=" bg-white/10 flex items-center justify-center h-[28rem]  w-1/2">
        <Image
          src={selectedProduct.imageUrl}
          alt="product"
          width={400}
          height={400}
          className="white-shadow "
        />
      </div>

      <div className="w-1/2 px-10 flex flex-col gap-4">
        <h2 className="text-5xl  font-semibold">{selectedProduct.name}</h2>
        <div className="flex  text-xl gap-2">
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
        <p className="text-lg  font-light text-white/60">
          {selectedProduct.about}
        </p>
        <p className="text-[4rem] font-extralight">
          <span className="text-lg  font-light pr-1">Price: </span>
          {selectedProduct.price}
          <span className="text-[3rem] font-extralight pl-1">$</span>
        </p>
        <div>
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
