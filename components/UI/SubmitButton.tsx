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
    // <button
    // disabled={status.pending}
    //   className=" flex gap-1  items-center border-[3px] border-juice rounded-full   mb-4  w-max"

    // >
    //   <div className="flex items-center m-1 pr-4  rounded-full w-full bg-neutral-700">
    //     <div className="text-3xl md:text-xl p-1 m-1 bg-neutral-500 rounded-full text-white border-[1px] border-juice">
    //       {icon}
    //     </div>
    //     {status.pending ?<LoadingDots/> :  <p className="text-base md:text-md pl-2">{label}</p>}

    //   </div>
    // </button>
    <button
      disabled={isSubmitting}
      className=" flex gap-1  items-center border-[3px] border-juice rounded-full   mb-4  w-max"
    >
      <div className="flex items-center m-1 pr-4  rounded-full w-full bg-neutral-700">
        <div className="text-3xl md:text-xl p-1 m-1 bg-neutral-500 rounded-full text-white border-[1px] border-juice">
          {icon}
        </div>
        {isSubmitting ? (
          <LoadingDots />
        ) : (
          <p className="text-base md:text-md pl-2">{label}</p>
        )}
      </div>
    </button>
  );
};

export default Button;
