"use client";
import { PageBanner } from "@/components";
import LoadingDots from "@/components/UI/LoadingDots";
import { addOrder, cartProducts } from "@/libs/actions";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { ProductType } from "@/libs/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MASTERCARD from "@/assets/mastercard.png";
import DINACARD from "@/assets/dinacard.png";
import VISACARD from "@/assets/visacard.png";
import FEDEX from "@/assets/fedex.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { BASE_URL, order } from "@/libs/utils";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/libs/features/cartSlice";
import { useRouter } from "next/navigation";
import { MdDone } from "react-icons/md";

type FormFields = z.infer<typeof order>;

const page = () => {
  const totalPrice = useAppSelector((state) => state.cartSlice.totalPrice);
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(order),
  });
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { products } = await cartProducts(cartItems);
      setAllProducts(products);
      setIsLoading(false);
    };
    fetchData();
  }, [cartItems]);
  const onSubmit: SubmitHandler<FormFields> = async (data, e) => {
    e?.preventDefault();
    const formData = {
      ...data,
      order: cartItems,
      totalPrice,
      isChecked: false,
    };
    const { message } = await addOrder(formData);
    if (message === "Order added successfully") {
      dispatch(emptyCart());
      setIsSuccess(true);
      setTimeout(() => router.push(`${BASE_URL}`), 1000);
    }
  };

  return (
    <div>
      <PageBanner page="Checkout" />
      <div className="z-10 relative mb-20">
        {!isSuccess && (
          <div className="flex justify-center py-8 items-center flex-col">
            <h4 className="text-2xl font-bold">Payment method</h4>
            <p className="text-juice  text-sm">
              Choose a payment option and fill in the requested information
            </p>
          </div>
        )}

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl ">Order sent successfully</p>
            <MdDone size={64} className="text-light-juice" />
          </div>
        ) : (
          <form className="mx-20 flex" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[70%] rounded-l-xl bg-white/10 p-5 my-6 border-[1px] border-light-juice/20 ">
              <h4 className="pb-3 text-xl font-semibold">Payment options</h4>
              <div className="bg-white/10 p-3 rounded-lg">
                {/* Payment */}
                <div className=" flex flex-col gap-2">
                  <div className="flex justify-between  p-1">
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
                    <div className="flex items-center flex-row gap-2">
                      <Image
                        width={50}
                        height={30}
                        src={MASTERCARD}
                        alt="master-card"
                      />
                      <Image width={50} height={30} src={VISACARD} alt="visa" />
                      <Image
                        width={50}
                        height={30}
                        src={DINACARD}
                        alt="dina-card"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between bg-white/5 p-1">
                    <label className="flex flex-col  ">
                      <div className="flex items-center  gap-2">
                        <input
                          type="radio"
                          name="payment"
                          className="accent-light-juice"
                        />
                        <span className="text-light-juice">
                          Cash on delivery
                        </span>
                      </div>
                      <span className="pl-5 font-extralight text-sm">
                        Free delivery
                      </span>
                    </label>
                    <div className="flex items-center flex-row gap-2">
                      <Image width={50} height={30} src={FEDEX} alt="fedex" />
                    </div>
                  </div>
                </div>
                {/* About user */}
                <div className=" grid grid-cols-2 gap-5 my-4 pt-4 border-t-[1px] border-t-white/40 border-dotted">
                  <div className="flex flex-col ">
                    <div className="flex flex-row gap-2 items-center">
                      {" "}
                      <label className="font-thin">First name:</label>{" "}
                      {errors.firstName && (
                        <div className="text-red-500 text-sm">
                          {errors.firstName.message}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      {...register("firstName")}
                      placeholder="First name"
                      className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                      {" "}
                      <label className="font-thin">Last name:</label>{" "}
                      {errors.lastName && (
                        <div className="text-red-500 text-sm">
                          {errors.lastName.message}
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      {...register("lastName")}
                      placeholder="Last name"
                      className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                      {" "}
                      <label className="font-thin">City:</label>{" "}
                      {errors.city && (
                        <div className="text-red-500 text-sm">
                          {errors.city.message}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      {...register("city")}
                      placeholder="City"
                      className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                      {" "}
                      <label className="font-thin">Postal code:</label>{" "}
                      {errors.postalCode && (
                        <div className="text-red-500 text-sm">
                          {errors.postalCode.message}
                        </div>
                      )}
                    </div>
                    <input
                      type="number"
                      {...register("postalCode")}
                      placeholder="Postal code"
                      className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                      {" "}
                      <label className="font-thin">Street name:</label>{" "}
                      {errors.streetName && (
                        <div className="text-red-500 text-sm">
                          {errors.streetName.message}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      {...register("streetName")}
                      placeholder="Street name"
                      className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                      {" "}
                      <label className="font-thin">House number:</label>{" "}
                      {errors.houseNumber && (
                        <div className="text-red-500 text-sm">
                          {errors.houseNumber.message}
                        </div>
                      )}
                    </div>
                    <input
                      type="number"
                      placeholder="House number"
                      {...register("houseNumber")}
                      className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                      {" "}
                      <label className="font-thin">
                        More information:
                      </label>{" "}
                      {errors.moreInformation && (
                        <div className="text-red-500 text-sm">
                          {errors.moreInformation.message}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      {...register("moreInformation")}
                      placeholder="More information"
                      className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2 items-center">
                      {" "}
                      <label className="font-thin">Phone number:</label>{" "}
                      {errors.phoneNumber && (
                        <div className="text-red-500 text-sm">
                          {errors.phoneNumber.message}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      {...register("phoneNumber")}
                      placeholder="Phone number"
                      className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%] bg-white/20 rounded-xl flex flex-col justify-between border-[1px] border-light-juice/70 ">
              <div className="flex flex-col ">
                <p className="text-center text-2xl font-semibold py-4">
                  {" "}
                  Your order:
                </p>
                <div className=" flex flex-col gap-2 mt-4 h-max ">
                  {isLoading && <LoadingDots />}
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
                            <p className="text-base font-thin">
                              {product.name}
                            </p>
                            <p>{product.price}.00$</p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="mb-2 flex flex-col items-center">
                <div className="flex justify-between py-3 text-xl px-2 font-thin border-y-[1px] border-y-white/30  w-full  ">
                  <p>Total price:</p>
                  <p className="bg-light-juice text-black px-2">
                    ${totalPrice}.00$
                  </p>
                </div>

                <input
                  type="submit"
                  value="Done"
                  disabled={isLoading}
                  className="text-xl mx-auto w-[40%] text-center bg-white/10 py-2 font-thin mt-2 border-[1px] border-light-juice/40 rounded-lg"
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default page;
