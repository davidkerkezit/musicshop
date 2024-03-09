import { RiAddCircleLine } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { FiTruck } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

const DashboardNav = () => {
  return (
    <div className="fixed bg-white text-black z-50 w-full h-[3rem] bottom-0 left-0 right-0 flex text-lg font-thin">
      <button className="w-[20%] flex justify-center items-center flex-col">
        <GrEdit />
        <p className="text-[10px] leading-5"> Edit Product</p>{" "}
      </button>
      <button className="w-[20%] flex justify-center items-center flex-col  ">
        <FiTruck />
        <p className="text-[10px] leading-5"> Orders</p>{" "}
      </button>
      <button className="w-[20%] flex flex-col justify-center items-center ">
        <RiAddCircleLine />
        <p className="text-[10px] leading-5"> Add Product</p>{" "}
      </button>
      <button className="w-[20%] flex justify-center items-center flex-col">
        <BiMessageDetail />
        <p className="text-[10px] leading-5"> Inbox</p>{" "}
      </button>
      <button className="w-[20%] flex justify-center items-center flex-col ">
        <FiSend />
        <p className="text-[10px] leading-5"> Subscription</p>{" "}
      </button>
    </div>
  );
};

export default DashboardNav;
