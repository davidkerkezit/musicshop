"use client";
import { getOrders } from "@/libs/actions";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "../UI/Loading";
const OrderDetails = React.lazy(() => import("./OrderDetails")); // Lazy load OrderDetails component

const Orders = () => {
  const [selectedCategory, setSelectedCategory] = useState("allorders");
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [ordersLenght, setOrderLenght] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const { orders } = await getOrders();

      selectedCategory === "allorders" && setAllOrders(orders);
      selectedCategory === "completed" &&
        setAllOrders(orders.filter((order: any) => order.isChecked === true));
      selectedCategory === "inproccess" &&
        setAllOrders(orders.filter((order: any) => order.isChecked === false));
      setIsLoading(false);
      setOrderLenght(orders);
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div className="w-full mx-32 mt-10">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex justify-center mb-4">
            {" "}
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("allorders");
              }}
              className={` w-[10rem] py-2 rounded-l-lg border-r-[1px] border-r-light-juice/40 flex items-center gap-2 justify-center  ${
                selectedCategory === "allorders"
                  ? "bg-light-juice text-black/80"
                  : "bg-white/10 text-white hover:bg-white/20 duration-200"
              }`}
            >
              <p> All Orders</p>
              <p className="bg-white rounded-full text-black w-[1rem] h-[1rem] flex items-center justify-center p-3">
                {ordersLenght.length}
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("inproccess");
              }}
              className={` w-[10rem] py-2 flex items-center gap-2 justify-center   ${
                selectedCategory === "inproccess"
                  ? "bg-yellow-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20 duration-200"
              }`}
            >
              <p>In Proccess</p>{" "}
              <p className="bg-white text-black rounded-full w-[1rem] h-[1rem] flex items-center justify-center p-3 gap-2">
                {
                  ordersLenght.filter((order: any) => order.isChecked === false)
                    .length
                }
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("completed");
              }}
              className={` w-[10rem] py-2 rounded-r-lg border-l-[1px] border-l-light-juice/40 flex items-center justify-center p-3 gap-2 ${
                selectedCategory === "completed"
                  ? "bg-green-600 text-white "
                  : "bg-white/10 text-white hover:bg-white/20 duration-200"
              }`}
            >
              <p>Completed</p>
              <p className="bg-white text-black rounded-full w-[1rem] h-[1rem] flex items-center justify-center p-3">
                {
                  ordersLenght.filter((order: any) => order.isChecked === true)
                    .length
                }
              </p>
            </button>
          </div>
          <div className="flex">
            <p className="w-[20%]  text-white/80 bg-white/10 px-1 py-1 text-center border-r-[1px] border-r-light-juice/20">
              Order ID
            </p>
            <p className="w-[18%] px-1 py-1 text-white/80 bg-white/10  text-center border-r-[1px] border-r-light-juice/20">
              Customer
            </p>
            <p className="w-[18%]  text-white/80 bg-white/10 px-1 py-1 text-center border-r-[1px] border-r-light-juice/20">
              Created At
            </p>
            <p className="w-[16%]  text-white/80 bg-white/10  px-1 py-1 text-center border-r-[1px] border-r-light-juice/20">
              Pricing
            </p>
            <p className="w-[18%] text-white/80 bg-white/10 px-1 py-1  flex items-center justify-center border-r-[1px] border-r-light-juice/20">
              Delivery Status
            </p>
            <p className="w-[10%]  text-white/80 bg-white/10 px-1 py-1 text-center">
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
                <Suspense fallback={""}>
                  <OrderDetails
                    order={order}
                    date={formattedDate}
                    setAllOrders={setAllOrders}
                    setOrderLenght={setOrderLenght}
                    selectedCategory={selectedCategory}
                  />
                </Suspense>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Orders;
