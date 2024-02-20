"use client";
import { getOrders } from "@/libs/actions";
import React, { Suspense, useEffect, useState } from "react";
const OrderDetails = React.lazy(() => import("./OrderDetails")); // Lazy load OrderDetails component

const Skeleton = () => {
  return (
    <div className="flex h-[2rem] bg-white/10">
      <p className="w-[20%] font-thin text-white/60 bg-white/5 px-1 py-1"></p>
      <p className="w-[18%] px-1 py-1  text-center"></p>
      <p className="w-[18%] font-thin text-white/60 bg-white/5 px-1 py-1"></p>
      <p className="w-[16%] px-1 py-1  text-center"></p>
      <p className="w-[18%] font-thin text-white/60 bg-white/5 px-1 py-1"></p>
      <p className="w-[10%] px-1 py-1  text-center"></p>
    </div>
  );
};
const Orders = () => {
  const [allOrders, setAllOrders] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { orders } = await getOrders();
      setAllOrders(orders);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full mx-32 mt-10">
      <div className="flex">
        <p className="w-[20%]  text-white/60 bg-light-juice/40 px-1 py-1 text-center">
          Order ID
        </p>
        <p className="w-[18%] px-1 py-1 bg-light-juice/20  text-center">
          Customer
        </p>
        <p className="w-[18%]  text-white/60 bg-light-juice/40 px-1 py-1 text-center">
          Created At
        </p>
        <p className="w-[16%]  text-white/60 bg-light-juice/20  px-1 py-1 text-center">
          Pricing
        </p>
        <p className="w-[18%] bg-light-juice/40 px-1 py-1  flex items-center justify-center">
          Delivery Status
        </p>
        <p className="w-[10%]  text-white/60 bg-light-juice/20  px-1 py-1 text-center">
          Payment
        </p>
      </div>
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
            <Suspense fallback={<Skeleton />}>
              <OrderDetails
                order={order}
                date={formattedDate}
                setAllOrders={setAllOrders}
              />
            </Suspense>
          );
        })}
    </div>
  );
};

export default Orders;
