import { GoPackage } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";

const NoProducts = () => {
  return (
    <div className="bg-white/5 w-[80%] mx-auto  h-[28rem] relative">
      <h1 className="text-center text-xl font-extralight  py-10">
        "No matching results found. Please adjust your search criteria or try a
        different keyword."
      </h1>
      <div className="">
        <GoPackage className="text-[15rem] text-white/30 absolute top-0 right-0 bottom-0 left-0 mx-auto my-auto" />
        <AiOutlineSearch className="text-[9rem] absolute top-[10rem] right-0 bottom-0 left-[0rem] mx-auto my-auto animate-circulation" />
      </div>
    </div>
  );
};

export default NoProducts;
