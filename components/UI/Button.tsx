"use client";

import LoadingDots from "./LoadingDots";
import { FaLock } from "@/components/UI/Icons";

const Button = ({
  icon,
  label,
  func,
  isPending,
}: {
  icon: React.ReactElement;
  label: string;
  func: (e: any) => Promise<void> | void;
  isPending: boolean;
}) => {
  return (
    <button
      disabled={
        isPending || label === "Out of stock" || label === "No Permission"
      }
      className={` flex gap-1  items-center border-[2px] md:border-[3px] rounded-full   mb-4 ${
        label === "Delete" || label === "Edit" ? "w-[8rem]" : "w-max"
      }     ${
        label === "Out of stock" || isPending || label === "No Permission"
          ? "cursor-not-allowed  border-juice/30"
          : "cursor-pointer  border-juice"
      }`}
      onClick={func}
    >
      <div className="flex items-center m-1 pr-3 md:pr-4  rounded-full w-full bg-neutral-700 hover:bg-neutral-600 duration-200">
        <div
          className={`text-lg md:text-xl p-1 m-1 bg-neutral-500 rounded-full text-white border-[1px] border-juice ${
            label === "Out of stock" || isPending || label === "No Permission"
              ? "  border-juice/30 text-white/50"
              : "border-juice text-white"
          }`}
        >
          {icon}
        </div>
        {isPending ? (
          <LoadingDots />
        ) : (
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm md:text-md md:pl-2 pl-1">{label}</p>
            {label === "No Permission" && (
              <FaLock size={12} className="text-white/50" />
            )}
          </div>
        )}
      </div>
    </button>
  );
};

export default Button;
