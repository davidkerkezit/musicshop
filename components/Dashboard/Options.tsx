"use client";
import {
  FiTruck,
  BsPlusCircle,
  FiEdit,
  RiQuestionnaireFill,
  GoMail,
} from "@/components/UI/Icons";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { BASE_URL } from "@/libs/utils";
import { useEffect, useState } from "react";
import { getOrders, getQuestions } from "@/libs/actions";
import { ordersUpdate } from "@/libs/features/ordersSlice";
import Logout from "./UI/Logout";
import LoadingDots from "../UI/LoadingDots";
import { questionsUpdate } from "@/libs/features/questionsSlice";

const Options = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const unreadQuestions = useAppSelector(
    (state) => state.questionsSlice.unreadQuestions
  );
  const inProccessOrders = useAppSelector(
    (state) => state.ordersSlice.inProccess
  );
  const allQuestions = useAppSelector(
    (state) => state.questionsSlice.allQuestions
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getOrders();
      const { questions } = await getQuestions();
      dispatch(ordersUpdate(data));
      dispatch(
        questionsUpdate({
          questions: questions,
          category: "all",
        })
      );

      setIsLoading(false);
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
  const isQuestionsStyle: string =
    option === "questions"
      ? "bg-white/10  border-r-[5px] border-r-juice"
      : "bg-transparent  border-r-[5px] border-r-transparent";
  return (
    <div className="w-1/5 md:flex flex-col py-3 bg-white/5 h-[100vh] hidden">
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
          <FiTruck size={15} />
          <p>Orders</p>
        </div>
        {isLoading ? (
          <LoadingDots />
        ) : (
          inProccessOrders.length > 0 && (
            <p className="bg-light-juice text-black w-[1.3rem] h-[1.3rem] rounded-full flex items-center justify-center text-sm">
              {inProccessOrders.length}
            </p>
          )
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

      <button
        onClick={() => router.push(`${BASE_URL}/dashboard?option=questions`)}
        className={`text-xl font-thin flex items-center justify-between gap-2 py-3 px-2 hover:bg-white/20  ${isQuestionsStyle}`}
      >
        <div className="flex items-center gap-2">
          {" "}
          <RiQuestionnaireFill size={15} />
          <p>Questions</p>
        </div>
        {isLoading ? (
          <LoadingDots />
        ) : (
          unreadQuestions.length > 0 && (
            <p className="bg-light-juice text-black w-[1.3rem] h-[1.3rem] rounded-full flex items-center justify-center text-sm">
              {unreadQuestions.length}
            </p>
          )
        )}
      </button>
      <Logout />
    </div>
  );
};

export default Options;
