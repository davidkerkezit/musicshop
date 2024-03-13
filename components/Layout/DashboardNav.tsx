"use client";
import { RiAddCircleLine } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { FiTruck } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { useDispatch } from "react-redux";
import { getOrders, getQuestions } from "@/libs/actions";
import { ordersUpdate } from "@/libs/features/ordersSlice";
import { questionsUpdate } from "@/libs/features/questionsSlice";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { BASE_URL } from "@/libs/utils";

const DashboardNav = () => {
  const path = usePathname();
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const option = searchParams.get("option") || "addproduct";
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

  return (
    <div
      className={`fixed bg-white text-black z-50 w-full h-[3.5rem] bottom-0 left-0 right-0  text-lg font-thin md:hidden ${
        path.includes("dashboard") ? "flex" : "hidden"
      }`}
    >
      <button
        className={`w-[20%] flex justify-center items-center flex-col  border-t-[3px] ${
          option === "editproducts"
            ? "border-t-juice bg-light-juice/40"
            : "border-t-black/70 bg-white"
        } pt-3 `}
        onClick={() => router.push(`${BASE_URL}/dashboard?option=editproducts`)}
      >
        <GrEdit />
        <p className="text-[10px] leading-5"> Edit Products</p>{" "}
      </button>
      <button
        className={`w-[20%] flex justify-center items-center flex-col bg-light-juice/40 border-t-[3px] relative ${
          option === "orders"
            ? "border-t-juice bg-light-juice/40"
            : "border-t-black/70 bg-white"
        } pt-3 `}
        onClick={() => router.push(`${BASE_URL}/dashboard?option=orders`)}
      >
        <FiTruck />
        <p className="text-[10px] leading-5"> Orders</p>{" "}
        {(!isLoading || inProccessOrders.length !== 0) && (
          <p className="bg-juice text-white absolute top-0 left-7 right-0 bottom-7 w-[1.2rem] h-[1.2rem] rounded-full flex justify-center items-center p-[2px] text-sm mx-auto my-auto">
            {inProccessOrders.length}
          </p>
        )}
      </button>
      <button
        className={`w-[20%] flex justify-center items-center flex-col bg-light-juice/40 border-t-[3px] pb-3 ${
          option === "addproduct"
            ? "border-t-juice bg-light-juice/40"
            : "border-t-black/70 bg-white"
        } pt-3 `}
        onClick={() => router.push(`${BASE_URL}/dashboard?option=addproduct`)}
      >
        <RiAddCircleLine size={80} />
      </button>
      <button
        className={`w-[20%] flex justify-center items-center flex-col bg-light-juice/40 border-t-[3px] relative ${
          option === "questions"
            ? "border-t-juice bg-light-juice/40"
            : "border-t-black/70 bg-white"
        } pt-3 `}
        onClick={() => router.push(`${BASE_URL}/dashboard?option=questions`)}
      >
        <BiMessageDetail />
        <p className="text-[10px] leading-5"> Inbox</p>{" "}
        {(!isLoading || unreadQuestions.length > 0) && (
          <p className="bg-juice text-white absolute top-0 left-7 right-0 bottom-7 w-[1.2rem] h-[1.2rem] rounded-full flex justify-center items-center p-[2px] text-sm mx-auto my-auto">
            {unreadQuestions.length}
          </p>
        )}
      </button>
      <button
        className={`w-[20%] flex justify-center items-center flex-col bg-light-juice/40 border-t-[3px] ${
          option === "subscriptions"
            ? "border-t-juice bg-light-juice/40"
            : "border-t-black/70 bg-white"
        } pt-3 `}
        onClick={() =>
          router.push(`${BASE_URL}/dashboard?option=subscriptions`)
        }
      >
        <FiSend />
        <p className="text-[10px] leading-5"> Subscriptions</p>{" "}
      </button>
    </div>
  );
};

export default DashboardNav;
