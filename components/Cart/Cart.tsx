"use client";
import { AppDispatch, useAppSelector } from "@/libs/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideCart, emptyCart } from "@/libs/features/cartSlice";
import { FaArrowRight } from "@/components/UI/Icons";
import { cartProducts } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import { BASE_URL } from "@/libs/utils";
import { useRouter } from "next/navigation";
import CartProductDetails from "./CartProductDetails";
import { EmptyCartAnimation } from ".";
const Cart = () => {
  const totalPrice = useAppSelector((state) => state.cartSlice.totalPrice);
  const showCart = useAppSelector((state) => state.cartSlice.isVisible);
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { products } = await cartProducts(cartItems);
      setAllProducts(products);
      setIsLoading(false);
    };
    fetchData();
  }, [cartItems]);

  const emptyCartHandler = () => {
    dispatch(emptyCart());
  };
  return (
    <div
      className={`fixed z-50 w-full md:w-[25%] h-[100vh] bg-black/70 backdrop-blur-xl p-4 flex flex-col justify-between  ${
        showCart && "animate-openFromRight"
      } ${showCart === false && "animate-closeToRight"} ${
        showCart === null && " -right-[100%] md:-right-[25%]"
      } `}
    >
      <div>
        <div className="flex justify-between items-end">
          <button
            className="bg-gray-800 p-2"
            onClick={() => dispatch(hideCart())}
          >
            <FaArrowRight className="text-xl text-juice" />
          </button>
          <p className={`text-xl font-thin`}>Your cart</p>
          {cartItems.length > 0 && (
            <button onClick={emptyCartHandler} disabled={isLoading}>
              Remove All
            </button>
          )}
        </div>
        <div
          className={` flex flex-col gap-2 mt-4 md:h-[41rem] h-[24rem] ${
            cartItems.length > 7 && "overflow-y-scroll"
          }`}
        >
          {allProducts.length > 0 ? (
            allProducts.map((product: ProductType) => {
              return (
                <CartProductDetails
                  key={product._id}
                  product={product}
                  isLoading={isLoading}
                />
              );
            })
          ) : (
            <EmptyCartAnimation />
          )}
        </div>
      </div>
      <div className="md:mb-16 ">
        <div className="flex justify-between py-3 text-xl px-2 font-thin border-y-[1px] border-y-white/30">
          <p className={`${cartItems.length === 0 && "hidden"}`}>
            Total price:
          </p>
          <p className="bg-light-juice text-black px-2">
            {cartItems.length === 0
              ? "No products in cart"
              : `  ${totalPrice}.00$`}
          </p>
        </div>

        <button
          onClick={() => {
            dispatch(hideCart());
            router.push(`${BASE_URL}/checkout`);
          }}
          disabled={isLoading || cartItems.length === 0}
          className={`text-xl w-full text-center bg-white/10 py-2 font-thin mt-2 border-[1px] border-light-juice/40 rounded-lg ${
            cartItems.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
