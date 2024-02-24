"use client";
import { AppDispatch, useAppSelector } from "@/libs/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addItemToCart,
  decreaseItemCart,
  hideCart,
  emptyCart,
  removeProductFromCart,
} from "@/libs/features/cartSlice";
import { FaArrowRight } from "react-icons/fa";
import { cartProducts } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import LoadingDots from "./UI/LoadingDots";
import { BASE_URL } from "@/libs/utils";
import { useRouter } from "next/navigation";

const Cart = () => {
  const totalPrice = useAppSelector((state) => state.cartSlice.totalPrice);

  const showCart = useAppSelector((state) => state.cartSlice.isVisible);
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [allProducts, setAllProducts] = useState<any>([]);
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

  const increaseHandler = (id: string, price: number, name: string) => {
    dispatch(addItemToCart({ productId: id, quantity: 1, price, name }));
  };
  const decreaseHandler = (id: string, price: number, name: string) => {
    dispatch(decreaseItemCart({ productId: id, quantity: 1, price, name }));
  };
  const removeFromCartHandler = (id: string, price: number, name: string) => {
    setIsLoading(true);

    dispatch(
      removeProductFromCart({ productId: id, quantity: 1, price, name })
    );
  };
  const emptyCartHandler = () => {
    dispatch(emptyCart());
  };
  return (
    <div
      className={`fixed z-50 w-[25%] h-[100vh] bg-black/70 backdrop-blur-xl p-4 flex flex-col justify-between  ${
        showCart && "animate-openFromRight"
      } ${showCart === false && "animate-closeToRight"} ${
        showCart === null && "-right-[25%]"
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
          {cartItems.length === 0 ? (
            <p></p>
          ) : (
            <button onClick={emptyCartHandler} disabled={isLoading}>
              Remove All
            </button>
          )}
        </div>
        <div
          className={` flex flex-col gap-2 mt-4 h-[41rem] ${
            cartItems.length > 7 && "overflow-y-scroll"
          }`}
        >
          {allProducts.length > 0 &&
            allProducts.map((product: ProductType) => {
              return (
                <div className="flex flex-col items-center justify-center">
                  {isLoading ? (
                    <LoadingDots />
                  ) : (
                    <div className="flex bg-white/10 justify-between items-center pr-4 w-full">
                      <div className="bg-white/20 m-1">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-20 h-20 rounded-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-base font-thin">{product.name}</p>
                        {cartItems.find(
                          (prod: any) => prod.productId === product._id
                        )?.quantity !== 0 && (
                          <div className="flex   items-center bg-white/10 text-white rounded-full border-[1px] border-juice/20 p-1 ">
                            <button
                              disabled={isLoading}
                              onClick={() =>
                                increaseHandler(
                                  product._id,
                                  product.price,
                                  product.name
                                )
                              }
                              className="text-white bg-black/30 text-xl p-1  flex items-center justify-center rounded-full w-[1.6rem] h-[1.6rem]"
                            >
                              +
                            </button>

                            <p className=" px-4">
                              {cartItems.length > 0 &&
                                cartItems.find(
                                  (prod: any) => prod.productId === product._id
                                )?.quantity}
                            </p>
                            <button
                              disabled={isLoading}
                              onClick={() =>
                                decreaseHandler(
                                  product._id,
                                  product.price,
                                  product.name
                                )
                              }
                              className="text-white bg-black/30 text-xl p-1 flex items-center justify-center rounded-full w-[1.6rem] h-[1.6rem]"
                            >
                              -
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end font-thin justify-center gap-4 h-full">
                        <p className="text-sm font-medium  bg-light-juice text-black px-2  ">
                          {(cartItems.find(
                            (prod: any) => prod.productId === product._id
                          )?.quantity || 0) * product.price}
                          .00 $
                        </p>
                        <button
                          onClick={() =>
                            removeFromCartHandler(
                              product._id,
                              product.price,
                              product.name
                            )
                          }
                          className=" bg-white/10 px-2 "
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="mb-16 ">
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
