import React from "react";

const DashboardInput = ({
  label,
  placeholder,
  value,
}: {
  label: string;
  placeholder: string;
  value: string | number | undefined;
}) => {
  return (
    <div className="flex flex-col   ">
      <label htmlFor="" className="px-1 text-lg font-light">
        {label}:
      </label>
      <input
        className="bg-transparent border-juice/40 border-[1px] rounded-lg p-2 placeholder:font-thin text-lg"
        type="text"
        placeholder={placeholder}
        name=""
        id=""
        value={value}
      />
    </div>
  );
};

export default DashboardInput;
