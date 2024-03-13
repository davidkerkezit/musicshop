"use client";
import LoadingDots from "@/components/UI/LoadingDots";
import MASTERCARD from "@/assets/mastercard.png";
import DINACARD from "@/assets/dinacard.png";
import VISACARD from "@/assets/visacard.png";
import FEDEX from "@/assets/fedex.png";
import { addOrder, cartProducts, updateProducts } from "@/libs/actions";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { ProductType } from "@/libs/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { BASE_URL, orderSchema } from "@/libs/utils";
import { useDispatch } from "react-redux";
import { CartItem, emptyCart } from "@/libs/features/cartSlice";
import { useRouter } from "next/navigation";
import { MdDone } from "@/components/UI/Icons";

type FormFields = z.infer<typeof orderSchema>;

const CheckoutDetails = () => {
  const totalPrice = useAppSelector((state) => state.cartSlice.totalPrice);
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(orderSchema),
  });
  useEffect(() => {
    if (cartItems.length > 0) {
      const fetchData = async () => {
        setIsLoading(true);
        const { products } = await cartProducts(cartItems);
        setAllProducts(products);
        setIsLoading(false);
      };
      fetchData();
    } else {
      router.push(`${BASE_URL}/shop`);
    }
  }, [cartItems]);
  const onSubmit: SubmitHandler<FormFields> = async (data, e) => {
    e?.preventDefault();
    const formData = {
      ...data,
      order: cartItems,
      totalPrice,
      isChecked: false,
    };
    const status = await updateProducts(cartItems);
    if (status === 200) {
      const orderDataStatus = await addOrder(formData);
      if (orderDataStatus === 201) {
        dispatch(emptyCart());
        setIsSuccess(true);
        setTimeout(() => router.push(`${BASE_URL}`), 1000);
      }
    }
  };

  return (
    <div className="z-10 relative mb-20">
      {!isSuccess && (
        <div className="flex justify-center md:py-8 pt-7 items-center flex-col">
          <h4 className="text-2xl font-bold">Payment method</h4>
          <p className="text-juice  text-sm md:text-left text-center">
            Choose a payment option and fill in the requested information
          </p>
        </div>
      )}

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-3xl ">Order sent successfully</p>
          <MdDone size={64} className="text-light-juice" />
        </div>
      ) : (
        <form
          className="md:mx-20  flex md:flex-row flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="md:w-[70%] w-full md:rounded-l-xl bg-white/10 p-5 my-6 md:border-[1px] border-y-[1px] border-light-juice/20 ">
            <h4 className="pb-3 text-xl font-semibold">Payment options</h4>
            <div className="bg-white/10 p-3 rounded-lg">
              {/* Payment */}
              <div className=" flex flex-col gap-2">
                <div className="flex justify-between md:flex-row flex-col  p-1">
                  <label className="flex flex-col  ">
                    <div className="flex items-center  gap-2">
                      <input
                        disabled
                        type="radio"
                        name="payment"
                        className="accent-light-juice cursor-not-allowed"
                      />
                      <span>Credit/debit card</span>
                    </div>
                    <span className="pl-5 font-extralight text-sm">
                      Secure transfer using your bank account (Not Available )
                    </span>
                  </label>
                  <div className="flex items-center flex-row gap-2 md:ml-0 ml-4">
                    <Image
                      width={50}
                      height={30}
                      src={MASTERCARD}
                      alt="master-card"
                      className=" w-[10%] md:w-1/3"
                    />
                    <Image
                      width={50}
                      height={30}
                      src={VISACARD}
                      alt="visa"
                      className=" w-[10%] md:w-1/3"
                    />
                    <Image
                      width={50}
                      height={30}
                      src={DINACARD}
                      alt="dina-card"
                      className=" w-[10%] md:w-1/3"
                    />
                  </div>
                </div>
                <div className="flex justify-between md:flex-row flex-col bg-white/5 p-1">
                  <label className="flex flex-col  ">
                    <div className="flex items-center  gap-2">
                      <input
                        checked
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
                  <div className="flex items-center flex-row gap-2 ml-5 md:ml-0 md:mt-0 my-1">
                    <Image
                      width={50}
                      height={30}
                      src={FEDEX}
                      alt="fedex"
                      className=" w-[10%] md:w-full"
                    />
                  </div>
                </div>
              </div>
              {/* About user */}
              <div className=" grid md:grid-cols-2 grid-cols-1 gap-5 my-4 pt-4 border-t-[1px] border-t-white/40 border-dotted">
                <div className="flex flex-col ">
                  <div className="flex md:flex-row flex-col md:gap-2 md:items-center">
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
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md text-white focus:outline-none focus:border-light-juice"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex md:flex-row flex-col md:gap-2 md:items-center">
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
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md text-white focus:outline-none focus:border-light-juice"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex md:flex-row flex-col md:gap-2 md:items-center">
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
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md text-white focus:outline-none focus:border-light-juice"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex md:flex-row flex-col md:gap-2 md:items-center">
                    {" "}
                    <label className="font-thin">Postal code:</label>{" "}
                    {errors.postalCode && (
                      <div className="text-red-500 text-sm">
                        {errors.postalCode.message}
                      </div>
                    )}
                  </div>
                  <input
                    type="string"
                    {...register("postalCode")}
                    placeholder="Postal code"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md text-white focus:outline-none focus:border-light-juice"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex md:flex-row flex-col md:gap-2 md:items-center">
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
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md text-white focus:outline-none focus:border-light-juice"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex md:flex-row flex-col md:gap-2 md:items-center">
                    {" "}
                    <label className="font-thin">House number:</label>{" "}
                    {errors.houseNumber && (
                      <div className="text-red-500 text-sm">
                        {errors.houseNumber.message}
                      </div>
                    )}
                  </div>
                  <input
                    type="string"
                    placeholder="House number"
                    {...register("houseNumber")}
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md text-white focus:outline-none focus:border-light-juice"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex md:flex-row flex-col md:gap-2 md:items-center">
                    {" "}
                    <label className="font-thin">More information:</label>{" "}
                  </div>
                  <input
                    type="text"
                    {...register("moreInformation")}
                    placeholder="More information"
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md text-white focus:outline-none focus:border-light-juice"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex md:flex-row flex-col md:gap-2 md:items-center">
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
                    className="bg-white/5 font-thin p-2 border-[1px] border-light-juice/50 rounded-md text-white focus:outline-none focus:border-light-juice"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[30%] w-full md:bg-white/20 bg-white/5 md:rounded-xl flex flex-col justify-between border-[1px] md:border-light-juice/70 border-light-juice/10 ">
            <div className="flex flex-col ">
              <p className="text-center text-2xl font-semibold py-4">
                {" "}
                Your order:
              </p>
              <div className=" flex flex-col gap-2 mt-4 h-max ">
                {isLoading && <LoadingDots />}
                {allProducts.length > 0 &&
                  allProducts.map((product: ProductType) => {
                    const quantity = cartItems.find(
                      (item: CartItem) => item.productId === product._id
                    )?.quantity;
                    return (
                      <div
                        key={product._id}
                        className="flex md:bg-black/50 bg-white/10 justify-between items-center "
                      >
                        <div className="bg-white/20 m-1">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col items-end  pr-2">
                          <p className="text-sm md:text-base font-thin">
                            {product.name}
                          </p>
                          <div className="flex">
                            <p className=" md:bg-light-juice/20 pl-2 text-gray-300">
                              {quantity && quantity}x
                            </p>
                            <p className=" md:bg-light-juice/20 pr-2 text-gray-300">
                              {product.price}.00$
                            </p>
                            <p className="bg-light-juice px-2 text-black ">
                              {quantity
                                ? quantity * product.price
                                : product.price}
                              .00$
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="mb-2 flex flex-col items-center md:mt-0 mt-10">
              <div className="flex justify-between py-3 text-xl px-2 font-thin border-y-[1px] border-y-white/30  w-full bg-black/30 ">
                <p>Total price:</p>
                <p className="bg-light-juice text-black px-2">
                  ${totalPrice}.00$
                </p>
              </div>

              <input
                type="submit"
                value="Done"
                disabled={isLoading}
                className="text-xl mx-auto w-[40%] cursor-pointer text-center bg-white/10 md:bg-gradient-to-r md:from-black/20 md:to-black/30 py-2 font-thin mt-2 border-[1px] border-light-juice/40 hover:border-light-juice rounded-lg hover:from-black/20 hover:to-black/10 duration-200 "
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutDetails;
