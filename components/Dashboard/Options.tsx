"use client";
import { FiEdit } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { useDispatch } from "react-redux";
import { selectDashboardOption } from "@/libs/features/dashboardSlice";
const Options = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dashboardOption = useAppSelector((state) => state.dashboardSlice);
  const isAddDashboardStyle: string =
    dashboardOption === "add"
      ? "bg-white/10  border-r-[5px] border-r-juice"
      : "bg-transparent  border-r-[5px] border-r-transparent";
  const isEditDashboardStyle: string =
    dashboardOption === "edit"
      ? "bg-white/10  border-r-[5px] border-r-juice"
      : "bg-transparent  border-r-[5px] border-r-transparent";
  return (
    <div className="w-1/5 flex flex-col p-3 bg-white/5 h-[100vh]">
      <button
        onClick={() => dispatch(selectDashboardOption("add"))}
        className={`text-xl font-thin flex items-center py-3 px-2 gap-2 hover:bg-white/20  ${isAddDashboardStyle}`}
      >
        <BsPlusCircle size={15} />
        Add Product
      </button>
      <button
        onClick={() => dispatch(selectDashboardOption("edit"))}
        className={`text-xl font-thin flex items-center gap-2 py-3 px-2 hover:bg-white/20 ${isEditDashboardStyle}`}
      >
        <FiEdit size={15} />
        All Products
      </button>
    </div>
  );
};

export default Options;
