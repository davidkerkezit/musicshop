"use client";
import { getOrders } from "@/libs/actions";
import React, { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { useDispatch } from "react-redux";
import { ordersUpdate } from "@/libs/features/ordersSlice";
import { CheckoutType } from "@/libs/types";
const OrderDetails = React.lazy(() => import("./UI/OrderDetails"));

const Orders = () => {
  const [selectedCategory, setSelectedCategory] = useState("allorders");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const selectedOrdersCategory = useAppSelector(
    (state) => state.ordersSlice.selectedOrdersCategory
  );
  const allOrders = useAppSelector((state) => state.ordersSlice.allOrders);
  const inProccessOrders = useAppSelector(
    (state) => state.ordersSlice.inProccess
  );
  const completedOrders = useAppSelector(
    (state) => state.ordersSlice.completed
  );

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const { orders } = await getOrders();
      setIsLoading(false);
      dispatch(ordersUpdate({ orders, category: selectedCategory }));
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div className="w-full md:mx-4 xl:mx-5 mx-2 mt-10">
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
              className={` md:w-[10rem] w-max px-2 py-2 rounded-l-lg border-r-[1px] border-r-light-juice/40 flex items-center gap-2 justify-center  md:text-base text-sm ${
                selectedCategory === "allorders"
                  ? "bg-light-juice text-black/80"
                  : "bg-white/10 text-white hover:bg-white/20 duration-200"
              }`}
            >
              <p> All Orders</p>
              <p className="bg-white text-black rounded-full w-[1rem] h-[1rem] flex items-center justify-center p-1 md:p-3 gap-1 md:gap-2 md:text-base text-sm">
                {allOrders.length}
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("inproccess");
              }}
              className={` md:w-[10rem] w-max px-2 py-2 flex items-center gap-2 justify-center md:text-base text-sm  ${
                selectedCategory === "inproccess"
                  ? "bg-yellow-600 text-white"
                  : "bg-white/10 text-white hover:bg-white/20 duration-200"
              }`}
            >
              <p>In Proccess</p>{" "}
              <p className="bg-white text-black rounded-full w-[1rem] h-[1rem] flex items-center justify-center p-1 md:p-3 gap-1 md:gap-2 md:text-base text-sm">
                {inProccessOrders.length}
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("completed");
              }}
              className={` md:w-[10rem] w-max px-2 py-2 rounded-r-lg border-l-[1px] border-l-light-juice/40 flex items-center justify-center p-1 md:p-3 gap-1 md:gap-2 md:text-base text-sm ${
                selectedCategory === "completed"
                  ? "bg-green-600 text-white "
                  : "bg-white/10 text-white hover:bg-white/20 duration-200"
              }`}
            >
              <p>Completed</p>
              <p className="bg-white text-black rounded-full w-[1rem] h-[1rem] flex items-center justify-center p-1 md:p-3 gap-1 md:md:text-base text-sm">
                {completedOrders.length}
              </p>
            </button>
          </div>
          <div className="hidden md:flex">
            <p className="w-[20%] md:w-[38%] xl:w-[27%] text-white/80 bg-white/10 px-1 py-1 text-center border-r-[1px] border-r-light-juice/20">
              Order ID
            </p>
            <p className="w-[18%] px-1 py-1 text-white/80 bg-white/10  text-center border-r-[1px] border-r-light-juice/20">
              Customer
            </p>
            <p className="w-[18%]  text-white/80 bg-white/10 px-1 py-1 text-center border-r-[1px] border-r-light-juice/20">
              Created At
            </p>
            <p className="w-[16%] md:w-[21%] xl:w-[13%]  text-white/80 bg-white/10  px-1 py-1 text-center border-r-[1px] border-r-light-juice/20">
              Pricing
            </p>
            <p className="w-[18%] md:w-[5%] lg:w-[17%] text-white/80 bg-white/10 px-1 py-1  flex items-center justify-center border-r-[1px] border-r-light-juice/20 ">
              <span className="hidden xl:block"> Delivery Status</span>
            </p>
            <p className="w-[10%] xl:w-[15%]  text-white/80 bg-white/10 px-1 py-1 text-center hidden xl:block">
              Payment
            </p>
          </div>
          <div className="flex md:hidden">
            <p className="w-[70%]  text-white/80 bg-white/10 px-1 py-1 text-center border-r-[1px] border-r-light-juice/20 md:text-base text-sm">
              About order
            </p>
            <p className="w-[30%] px-1 py-1 text-white/80 bg-white/10  text-center border-r-[1px] border-r-light-juice/20 md:text-base text-sm">
              Status
            </p>
          </div>
          {selectedOrdersCategory.length > 0 &&
            selectedOrdersCategory.map((order: CheckoutType) => {
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
                <OrderDetails
                  key={order._id}
                  order={order}
                  date={formattedDate}
                  selectedCategory={selectedCategory}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Orders;
