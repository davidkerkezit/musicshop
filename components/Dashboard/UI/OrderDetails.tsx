"use client";
import { completeOrder, getOrders } from "@/libs/actions";
import React, { useState } from "react";
import { FaAngleDoubleRight } from "@/components/UI/Icons";
import LoadingDots from "../../UI/LoadingDots";
import { AppDispatch } from "@/libs/store";
import { useDispatch } from "react-redux";
import { ordersUpdate } from "@/libs/features/ordersSlice";
import { CartItem } from "@/libs/features/cartSlice";
import { CheckoutType } from "@/libs/types";
interface OrderDetailsProps {
  order: CheckoutType;
  date: string;
  selectedCategory: string;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  date,

  selectedCategory,
}) => {
  const [isOpenId, setIsOpenId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const completeOrderHandler = async (id: string, isChecked: boolean) => {
    setIsLoading(true);
    const data = await Promise.all([
      await completeOrder(id, isChecked),
      await getOrders(),
    ]);
    dispatch(
      ordersUpdate({ orders: data[1].orders, category: selectedCategory })
    );
    setIsLoading(false);
  };
  const toggleDetails = (id: string) => {
    setIsOpenId(id);
  };
  return (
    <>
      <details
        className=" border-b-[1px] border-b-white/10 md:block hidden  "
        open={isOpenId !== null && isOpenId === order._id ? false : undefined}
      >
        <summary className="md:flex hidden  bg-white/20  cursor-pointer hover:bg-white/30 ">
          <div className=" items-start w-[2%] hidden lg:flex justify-center text-light-juice pt-2">
            <FaAngleDoubleRight />
          </div>
          <p className="w-[18%] md:w-[38%] xl:w-[25%] font-thin text-white/60 bg-white/5 px-1 py-1 text-base md:text-sm lg:text-base">
            {order._id}
          </p>
          <p className="w-[18%] px-1 py-1  text-center">
            {order.firstName} {order.lastName}
          </p>
          <p className="w-[18%] font-thin text-white/60 bg-white/5 px-1 py-1 text-center  text-base md:text-sm lg:text-base">
            {date}
          </p>
          <p className="w-[16%] md:w-[21%] xl:w-[13%] font-thin text-white/60  px-1 py-1 text-center">
            {order.totalPrice}.00 $
          </p>
          <div className="w-[18%] md:w-[5%] xl:w-[17%] bg-white/5 px-1 py-1  flex items-center justify-center">
            <p
              className={`${
                order.isChecked === true ? "bg-green-600" : "bg-yellow-600"
              } w-max px-4 rounded-md font-thin text-sm hidden xl:block`}
            >
              {order.isChecked ? "Completed" : "In procces"}
            </p>
            <div
              className={`w-[0.5rem] h-[0.5rem] rounded-full xl:hidden  ${
                order.isChecked === true ? "bg-green-600" : "bg-yellow-600"
              }`}
            ></div>
          </div>
          <p className="lg:w-[10%] w-[1%] xl:w-[15%] font-thin text-white/60  px-1 py-1 text-center hidden xl:block">
            Cash on Delivery
          </p>
        </summary>

        <div className="flex pt-4 px-[2%] bg-white/5 ">
          <h2 className=" bg-juice w-max px-2 text-black/80 ">
            Order ID : {order._id}
          </h2>
        </div>

        <div className="flex lg:flex-row flex-col py-4 px-[2%] lg:gap-5 bg-white/5 ">
          <div className="lg:w-1/2 w-full ">
            <p className="bg-light-juice w-max px-4 text-black mb-4">
              About Customer
            </p>
            <p className="font-thin">
              {order.firstName} {order.lastName}
            </p>
            <p className="font-thin">
              {order.streetName} {order.houseNumber}
            </p>
            <p className="font-thin">
              {order.city}({order.postalCode})
            </p>
            <p className="font-thin">{order.phoneNumber}</p>
            <p className="font-thin text-justify">{order.moreInformation}</p>
          </div>
          <div className="lg:w-1/2 w-full bg-white/5 p-5 flex flex-col gap-1 ">
            <p className="bg-light-juice w-max px-4 text-black mb-4">
              Order Information{" "}
            </p>
            {order.order.map((product: CartItem) => {
              return (
                <div
                  key={product.productId}
                  className="flex justify-between items-center border-b-[1px] border-b-light-juice/30"
                >
                  <p className="font-thin text-base">{product.name}</p>
                  <p className="font-thin text-base">
                    {product.quantity} x {product.price}.00 $
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex pb-4 px-[2%] bg-white/5 justify-end">
          <p className="w-max bg-light-juice px-2 py-1 text-black/80">
            {" "}
            Total price: {order.totalPrice}.00 $
          </p>
        </div>
        <div className="bg-white/10 flex flex-col justify-center items-center py-4 gap-1">
          <p>Delivery Status:</p>
          <p className="bg-yellow-600 w-max px-4 rounded-md font-thin text-sm">
            {!order.isChecked && "In proccess"}
          </p>
          <p className="bg-green-600 w-max px-4 rounded-md font-thin text-sm">
            {order.isChecked && "Completed"}
          </p>
        </div>
        <div className="bg-white/10  flex justify-center items-center pb-4 gap-4">
          <button
            onClick={() => completeOrderHandler(order._id, order.isChecked)}
            className={`px-2 py-1 ${
              order.isChecked === false
                ? "bg-green-600 hover:bg-green-500"
                : "bg-yellow-600 hover:bg-yellow-500"
            } rounded-md text-white w-[7rem] `}
          >
            {isLoading ? (
              <LoadingDots />
            ) : (
              <p> {order.isChecked ? "In proccess" : "Complete"}</p>
            )}
          </button>
          <button
            onClick={() => toggleDetails(order._id)}
            className="px-2 py-1 border-[1px] border-white/20 rounded-md font-thin w-[7rem]  hover:bg-white/10 "
          >
            Close
          </button>
        </div>
      </details>
      <details
        className=" border-b-[1px] border-b-white/10 md:hidden block  "
        open={isOpenId !== null && isOpenId === order._id ? false : undefined}
      >
        <summary className="  flex  bg-white/20  cursor-pointer hover:bg-white/30 ">
          <div className="flex flex-col w-[70%] text-sm pl-2">
            <p>
              {order.firstName} {order.lastName}
            </p>
            <p>{date}</p>
          </div>
          <div className="w-[30%] flex items-center justify-center flex-col">
            <p
              className={` font-thin text-white/60  w-full text-center text-sm text-white  ${
                order.isChecked ? "bg-green-900" : "bg-red-900"
              }`}
            >
              {order.isChecked ? "Completed" : "In Proccess"}
            </p>
            <p className="text-sm bg-black/30 w-full text-white text-center">
              {order.totalPrice}.00$
            </p>
          </div>
        </summary>
        <div className="flex pt-4 px-[2%] bg-white/5 ">
          <h2 className=" bg-juice w-max px-2 text-black/80 ">
            Order ID : {order._id}
          </h2>
        </div>

        <div className="flex md:flex-row flex-col py-4 px-[2%] bg-white/5 ">
          <div className="md:w-1/2 w-full ">
            <p className="bg-light-juice w-max px-4 text-black mb-4">
              About Customer
            </p>
            <p className="font-thin">
              {order.firstName} {order.lastName}
            </p>
            <p className="font-thin">
              {order.streetName} {order.houseNumber}
            </p>
            <p className="font-thin">
              {order.city}({order.postalCode})
            </p>
            <p className="font-thin">{order.phoneNumber}</p>
            <p className="font-thin">{order.moreInformation}</p>
          </div>
          <div className="md:w-1/2 w-full bg-white/5 p-5 flex flex-col gap-1 ">
            <p className="bg-light-juice w-max px-4 text-black mb-4">
              Order Information{" "}
            </p>
            {order.order.map((product: CartItem) => {
              return (
                <div
                  key={product.productId}
                  className="flex justify-between items-center border-b-[1px] border-b-light-juice/30"
                >
                  <p className="font-thin text-base">{product.name}</p>
                  <p className="font-thin text-base">
                    {product.quantity} x {product.price}.00 $
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex pb-4 px-[2%] bg-white/5 justify-end">
          <p className="w-max bg-light-juice px-2 py-1 text-black/80">
            {" "}
            Total price: {order.totalPrice}.00 $
          </p>
        </div>
        <div className="bg-white/10 flex flex-col justify-center items-center py-4 gap-1">
          <p>Delivery Status:</p>
          <p className="bg-yellow-600 w-max px-4 rounded-md font-thin text-sm">
            {!order.isChecked && "In proccess"}
          </p>
          <p className="bg-green-600 w-max px-4 rounded-md font-thin text-sm">
            {order.isChecked && "Completed"}
          </p>
        </div>
        <div className="bg-white/10  flex justify-center items-center pb-4 gap-4">
          <button
            onClick={() => completeOrderHandler(order._id, order.isChecked)}
            className={`px-2 py-1 ${
              order.isChecked === false
                ? "bg-green-600 hover:bg-green-500"
                : "bg-yellow-600 hover:bg-yellow-500"
            } rounded-md text-white w-[7rem] `}
          >
            {isLoading ? (
              <LoadingDots />
            ) : (
              <p> {order.isChecked ? "In proccess" : "Complete"}</p>
            )}
          </button>
          <button
            onClick={() => toggleDetails(order._id)}
            className="px-2 py-1 border-[1px] border-white/20 rounded-md font-thin w-[7rem]  hover:bg-white/10 "
          >
            Close
          </button>
        </div>
      </details>
    </>
  );
};

export default OrderDetails;
