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
      disabled={isPending}
      className=" flex gap-1  items-center border-[3px] border-juice rounded-full   mb-4  w-max"
      onClick={func}
    >
      <div className="flex items-center m-1 pr-4  rounded-full w-full bg-neutral-700">
        <div className="text-3xl md:text-xl p-1 m-1 bg-neutral-500 rounded-full text-white border-[1px] border-juice">
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
