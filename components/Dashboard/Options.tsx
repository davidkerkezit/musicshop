"use client";
import { FiEdit } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { useDispatch } from "react-redux";
import { selectDashboardOption } from "@/libs/features/dashboardSlice";
import { Router } from "next/router";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BASE_URL } from "@/libs/utils";
import { FiTruck } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getOrders } from "@/libs/actions";
import { GoMail } from "react-icons/go";

const Options = () => {
  const [ordersLength, setOrdersLength] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getOrders();

      setOrdersLength(
        data.orders.filter((item: any) => item.isChecked === false).length
      );
    };
    fetchData();
  }, []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const option = searchParams.get("option") || "addproduct";
  const isAddDashboardStyle: string =
    option === "addproduct"
      ? "bg-white/10  border-r-[5px] border-r-juice"
      : "bg-transparent  border-r-[5px] border-r-transparent";
  const isEditDashboardStyle: string =
    option === "editproducts"
      ? "bg-white/10  border-r-[5px] border-r-juice"
      : "bg-transparent  border-r-[5px] border-r-transparent";
  const ordersDashboardStyle: string =
    option === "orders"
      ? "bg-white/10  border-r-[5px] border-r-juice"
      : "bg-transparent  border-r-[5px] border-r-transparent";
  const isSubscriptionsStyle: string =
    option === "subscriptions"
      ? "bg-white/10  border-r-[5px] border-r-juice"
      : "bg-transparent  border-r-[5px] border-r-transparent";
  return (
    <div className="w-1/5 flex flex-col py-3 bg-white/5 h-[100vh]">
      <button
        onClick={() => router.push(`${BASE_URL}/dashboard?option=addproduct`)}
        className={`text-xl font-thin flex items-center py-3 px-2 gap-2 hover:bg-white/20  ${isAddDashboardStyle}`}
      >
        <BsPlusCircle size={15} />
        Add Product
      </button>
      <button
        onClick={() => router.push(`${BASE_URL}/dashboard?option=editproducts`)}
        className={`text-xl font-thin flex items-center gap-2 py-3 px-2 hover:bg-white/20 ${isEditDashboardStyle}`}
      >
        <FiEdit size={15} />
        All Products
      </button>
      <button
        onClick={() => router.push(`${BASE_URL}/dashboard?option=orders`)}
        className={`text-xl font-thin flex items-center justify-between gap-2 py-3 px-2 hover:bg-white/20 ${ordersDashboardStyle}`}
      >
        <div className="flex items-center gap-2">
          {" "}
          <FiTruck size={15} />
          <p>Orders</p>
        </div>
        {ordersLength > 0 && (
          <p className="bg-light-juice text-black w-[1.3rem] h-[1.3rem] rounded-full flex items-center justify-center text-sm">
            {ordersLength}
          </p>
        )}
      </button>
      <button
        onClick={() =>
          router.push(`${BASE_URL}/dashboard?option=subscriptions`)
        }
        className={`text-xl font-thin flex items-center py-3 px-2 gap-2 hover:bg-white/20  ${isSubscriptionsStyle}`}
      >
        <GoMail size={15} />
        Subscriptions
      </button>
    </div>
  );
};

export default Options;
