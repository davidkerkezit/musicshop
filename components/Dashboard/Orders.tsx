"use client";
import { getOrders } from "@/libs/actions";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { orders } = await getOrders();
      setAllOrders(orders);
    };
    fetchData();
  }, []);
  return (
    <div className="w-full mx-32">
      {allOrders.length > 0 &&
        allOrders.map((order: any) => {
          const dateObject = new Date(order.createdAt);
          const formattedDate = `${dateObject
            .getDate()
            .toString()
            .padStart(2, "0")}.${(dateObject.getMonth() + 1)
            .toString()
            .padStart(2, "0")}.${dateObject.getFullYear()}  
           ${dateObject.getHours().toString().padStart(2, "0")}:${dateObject
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;

          return (
            <details className=" border-b-[1px] border-b-white/10  ">
              <summary className="flex justify-between bg-white/20 px-1 py-1 cursor-pointer hover:bg-white/30">
                <p className="font-thin text-base flex items-center gap-2">
                  <FaAngleDoubleRight className="text-light-juice" /> Order by{" "}
                  {order.firstName} {order.lastName}
                </p>
                <p className="font-thin text-base"> {formattedDate}</p>
              </summary>
              <div className="flex py-4 px-4 bg-white/5 mx-2">
                <div className="w-1/2">
                  <p>About Customer</p>
                  <p>
                    {order.firstName} {order.lastName}
                  </p>
                  <p>
                    {order.streetName} {order.houseNumber} - {order.city}(
                    {order.postalCode})
                  </p>
                  <p>{order.phoneNumber}</p>
                  <p>{order.moreInformation}</p>
                </div>
                <div className="w-1/2">
                  {order.order.map((product: any) => {
                    return (
                      <div className="flex justify-between items-center">
                        <p className="font-thin text-base">{product.name}</p>
                        <p className="font-thin text-base">
                          {product.quantity} x {product.price}.00 $
                        </p>
                      </div>
                    );
                  })}
                  <p>Total price: {order.totalPrice}.00 $</p>
                </div>
              </div>
            </details>
          );
        })}
    </div>
  );
};

export default Orders;
