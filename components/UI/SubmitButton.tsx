"use client";
import LoadingDots from "./LoadingDots";

const Button = ({
  icon,
  label,
  isSubmitting,
}: {
  icon: React.ReactElement;
  label: string;
  isSubmitting: boolean;
}) => {
  return (
    <button
      disabled={isSubmitting || label === "No Permission"}
      className={`flex gap-1  items-center border-[2px] md:border-[3px] border-juice rounded-full   mb-4  w-max ${
        label === "No Permission" ? "cursor-not-allowed" : "cursor-pointer"
      } `}
    >
      <div className="flex items-center m-1  pr-4  rounded-full w-full bg-neutral-700 hover:bg-neutral-600 duration-200">
        <div
          className={`text-xl md:text-xl p-1 m-1 bg-neutral-500 rounded-full text-white border-[1px] border-juice  `}
        >
          {icon}
        </div>
        {isSubmitting ? (
          <LoadingDots />
        ) : (
          <p className="text-sm md:text-md pl-1 md:pl-2">{label}</p>
        )}
      </div>
    </button>
  );
};

export default Button;
