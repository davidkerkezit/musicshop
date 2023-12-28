"use client";
import { useAppSelector } from "@/libs/store";
import React from "react";

const Cart = () => {
  const showCart = useAppSelector((state) => state.cartSlice);

  return (
    <div
      className={`absolute z-50 w-full h-[100vh] bg-black/70 backdrop-blur-xl text-center text-4xl  ${
        showCart && "animate-openFromRight"
      } ${showCart === false && "animate-closeToRight"} ${
        showCart === null && "-right-[100%]"
      } `}
    >
      Cart
    </div>
  );
};

export default Cart;
