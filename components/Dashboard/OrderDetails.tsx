"use client";
import { completeOrder, getOrders } from "@/libs/actions";
import React, { useState } from "react";
import { FaAngleDoubleRight, FaAngleDoubleDown } from "react-icons/fa";
interface OrderDetailsProps {
  order: any; // Replace 'any' with the actual type of order
  date: string;
  setAllOrders: React.Dispatch<React.SetStateAction<any[]>>;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({
  order,
  date,
  setAllOrders,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const completeOrderHandler = async (id: string, isChecked: boolean) => {
    const { product } = await completeOrder(id, isChecked);
    const { orders } = await getOrders();
    setAllOrders(orders);
  };
  const toggleDetails = () => {
    setIsOpen(false);
  };
  return (
    <details className=" border-b-[1px] border-b-white/10  " open={isOpen}>
      <summary className="flex  bg-white/20  cursor-pointer hover:bg-white/30">
        <div className="flex items-center w-[2%] justify-center text-light-juice">
          <FaAngleDoubleRight />
        </div>
        <p className="w-[18%] font-thin text-white/60 bg-white/5 px-1 py-1">
          {order._id}
        </p>
        <p className="w-[18%] px-1 py-1  text-center">
          {order.firstName} {order.lastName}
        </p>
        <p className="w-[18%] font-thin text-white/60 bg-white/5 px-1 py-1 text-center">
          {date}
        </p>
        <p className="w-[16%] font-thin text-white/60  px-1 py-1 text-center">
          {order.totalPrice}.00 $
        </p>
        <div className="w-[18%] bg-white/5 px-1 py-1  flex items-center justify-center">
          <p
            className={`${
              order.isChecked === true ? "bg-green-600" : "bg-yellow-600"
            } w-max px-4 rounded-md font-thin text-sm`}
          >
            {order.isChecked ? "Completed" : "In procces"}
          </p>
        </div>
        <p className="w-[10%] font-thin text-white/60  px-1 py-1 text-center">
          Cash on Delivery
        </p>
      </summary>
      <div className="flex pt-4 px-[2%] bg-white/5 ">
        <h2 className=" bg-juice w-max px-2 text-black/80 ">
          Order ID : {order._id}
        </h2>
      </div>

      <div className="flex py-4 px-[2%] bg-white/5 ">
        <div className="w-1/2 ">
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
        <div className="w-1/2 bg-white/5 p-5 flex flex-col gap-1 ">
          <p className="bg-light-juice w-max px-4 text-black mb-4">
            Order Information{" "}
          </p>
          {order.order.map((product: any) => {
            return (
              <div className="flex justify-between items-center border-b-[1px] border-b-light-juice/30">
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
          {!order.isChecked && "In procces"}
        </p>
      </div>
      <div className="bg-white/10  flex justify-center items-center pb-4 gap-4">
        <button
          onClick={() => completeOrderHandler(order._id, order.isChecked)}
          className={`px-2 py-1 ${
            order.isChecked === false
              ? "bg-green-600 hover:bg-green-500"
              : "bg-yellow-600 hover:bg-yellow-500"
          } rounded-md text-white w-[6rem] `}
        >
          {order.isChecked ? "In procces" : "Complete"}
        </button>
        <button
          onClick={toggleDetails}
          className="px-2 py-1 border-[1px] border-white/20 rounded-md font-thin w-[6rem]  hover:bg-white/10"
        >
          Close
        </button>
      </div>
    </details>
  );
};

export default OrderDetails;
