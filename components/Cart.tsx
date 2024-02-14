"use client";
import { AppDispatch, useAppSelector } from "@/libs/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideCart } from "@/libs/features/cartSlice";
import { FaArrowRight } from "react-icons/fa";
import { cartProducts } from "@/libs/actions";
import { ProductType } from "@/libs/types";

const Cart = () => {
  const showCart = useAppSelector((state) => state.cartSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [cart, setCart] = useState<null | any[]>(null);
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const cartCache = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(cartCache);

        const { products } = await cartProducts(cartCache);
        setAllProducts(products);
      }
    };
    fetchData();
  }, []);
  const removeFromCartHandler = async (id: string) => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newCart = cart.filter((product: any) => product.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      const { products } = await cartProducts(newCart);
      setAllProducts(products);
    }
  };
  const increaseHandler = async (id: string) => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newCart = cart.map((product: any) => {
        if (product.id === id) {
          product.quantity += 1;
        }
        return product;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      const { products } = await cartProducts(newCart);
      setAllProducts(products);
    }
  };
  const decreaseHandler = async (id: string) => {
    if (typeof window !== "undefined") {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newCart = cart
        .map((product: any) => {
          if (product.id === id) {
            product.quantity -= 1;
          }
          return product;
        })
        .filter((product: any) => product.quantity > 0); // Filter out products with quantity 0
      localStorage.setItem("cart", JSON.stringify(newCart));
      const { products } = await cartProducts(newCart);
      setAllProducts(products);
    }
  };
  return (
    <div
      className={`absolute z-50 w-[25%] h-[100vh] bg-black/70 backdrop-blur-xl p-4   ${
        showCart && "animate-openFromRight"
      } ${showCart === false && "animate-closeToRight"} ${
        showCart === null && "-right-[25%]"
      } `}
    >
      <div className="flex justify-between items-end">
        <button
          className="bg-gray-800 p-2"
          onClick={() => dispatch(hideCart())}
        >
          <FaArrowRight className="text-xl text-juice" />
        </button>
        <p className="text-xl font-thin">Your cart</p>
        <p>Remove all</p>
      </div>
      <div className=" flex flex-col gap-2 mt-4">
        {allProducts.length > 0 &&
          allProducts.map((product: ProductType) => (
            <div className="flex bg-[#2f2f2f] justify-between items-center pr-4">
              <div className="bg-[#929292] m-1">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 rounded-full object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-base font-thin">{product.name}</p>
                <div className="flex font-thin gap-3 items-center">
                  <button
                    onClick={() => increaseHandler(product._id)}
                    className="bg-gray-400 text-black h-[1.5rem] rounded-full w-[1.5rem] text-center "
                  >
                    +
                  </button>
                  <p className="">
                    {cart !== null &&
                      cart.find((prod) => prod.id === product._id).quantity}
                  </p>
                  <button
                    onClick={() => decreaseHandler(product._id)}
                    className="bg-gray-400 text-black h-[1.5rem] rounded-full w-[1.5rem] text-center "
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end font-thin">
                <p className="text-base font-thin   ">{product.price}.00 $</p>
                <button onClick={() => removeFromCartHandler(product._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
