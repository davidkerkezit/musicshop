"use client";
import { PageBanner } from "@/components";
import { cartProducts } from "@/libs/actions";
import { useAppSelector } from "@/libs/store";
import { ProductType } from "@/libs/types";
import React, { useEffect, useState } from "react";

const page = () => {
  const totalPrice = useAppSelector((state) => state.cartSlice.totalPrice);
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log(cartItems);

    const fetchData = async () => {
      setIsLoading(true);
      const { products } = await cartProducts(cartItems);
      setAllProducts(products);
      setIsLoading(false);
    };
    fetchData();
  }, [cartItems]);
  return (
    <div>
      <PageBanner page="Checkout" />
      <div className="z-10 relative">
        <div className="flex justify-center py-4 items-center flex-col">
          <h4 className="text-2xl font-bold">Payment method</h4>
          <p className="text-juice  text-sm">
            Choose a payment option and fill in the requested information
          </p>
        </div>
        <form className="mx-20 flex">
          <div className="w-[70%] rounded-l-xl bg-white/10 p-5 my-3 ">
            <h4 className="pb-3 text-xl font-semibold">Payment options</h4>
            <div className="bg-white/10 p-3 rounded-lg">
              {/* Payment */}
              <div className=" flex flex-col gap-1">
                <label className="flex flex-col  ">
                  <div className="flex items-center  gap-2">
                    <input
                      type="radio"
                      name="payment"
                      className="accent-light-juice"
                    />
                    <span>Credit/debit card</span>
                  </div>
                  <span className="pl-5 font-extralight text-sm">
                    Secure transfer using your bank account
                  </span>
                </label>
                <label className="flex flex-col  ">
                  <div className="flex items-center  gap-2">
                    <input
                      type="radio"
                      name="payment"
                      className="accent-light-juice"
                    />
                    <span className="text-light-juice">Cash on delivery</span>
                  </div>
                  <span className="pl-5 font-extralight text-sm">
                    Free delivery
                  </span>
                </label>
              </div>
              {/* About user */}
              <div className=" grid grid-cols-2 gap-5 my-4 pt-4 border-t-[1px] border-t-white/40 border-dotted">
                <div className="flex flex-col ">
                  <label className="font-thin">First name:</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-thin">Last name:</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-thin">City:</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-thin">Postal code:</label>
                  <input
                    type="text"
                    placeholder="Postal code"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-thin">Street name:</label>
                  <input
                    type="text"
                    placeholder="Street name"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-thin">House number:</label>
                  <input
                    type="text"
                    placeholder="House number"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-thin">More information:</label>
                  <input
                    type="text"
                    placeholder="More information"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-thin">Phone number:</label>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%] bg-white/20 rounded-xl flex flex-col justify-between border-[1px] border-light-juice/20 ">
            <div className="flex flex-col ">
              <p className="text-center text-2xl font-semibold py-2">
                {" "}
                Your order:
              </p>
              <div className=" flex flex-col gap-2 mt-4 h-max ">
                {allProducts.length > 0 &&
                  allProducts.map((product: ProductType) => {
                    return (
                      <div className="flex bg-black/50 justify-between items-center ">
                        <div className="bg-white/20 m-1">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col items-center  pr-2">
                          <p className="text-base font-thin">{product.name}</p>
                          <p>{product.price}.00$</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="mb-2 ">
              <div className="flex justify-between py-3 text-xl px-2 font-thin border-y-[1px] border-y-white/30">
                <p>Total price:</p>
                <p className="bg-light-juice text-black px-2">
                  ${totalPrice}.00$
                </p>
              </div>

              <button
                disabled={isLoading}
                className="text-xl mx-auto w-[70%] text-center bg-white/10 py-2 font-thin mt-2 border-[1px] border-light-juice/40 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
