"use client";

import LoadingDots from "./LoadingDots";

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
      disabled={isPending || label === "Out of stock"}
      className={` flex gap-1  items-center border-[3px] rounded-full   mb-4  w-max   ${
        label === "Out of stock" || isPending
          ? "cursor-not-allowed  border-juice/30"
          : "cursor-pointer  border-juice"
      }`}
      onClick={func}
    >
      <div className="flex items-center m-1 pr-4  rounded-full w-full bg-neutral-700 hover:bg-neutral-600 duration-200">
        <div
          className={`text-3xl md:text-xl p-1 m-1 bg-neutral-500 rounded-full text-white border-[1px] border-juice ${
            label === "Out of stock" || isPending
              ? "  border-juice/30 text-white/50"
              : "border-juice text-white"
          }`}
        >
          {icon}
        </div>
        {isPending ? (
          <LoadingDots />
        ) : (
          <p className="text-base md:text-md pl-2">{label}</p>
        )}
      </div>
    </button>
  );
};

export default Button;
