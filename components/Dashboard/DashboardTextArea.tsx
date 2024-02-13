import React from "react";

const DashboardTextArea = ({
  label,
  placeholder,
  value,
  name,
  registerValue,
  register,
  type,
  error,
}: {
  label: string;
  placeholder: string;
  value: string | number | undefined;
  name: string;
  registerValue: any;
  register: any;
  type: string;
  error: any;
}) => {
  return (
    <div className="flex flex-col   ">
      <div className="flex flex-col ">
        <label htmlFor="" className="px-1 text-lg font-light">
          {label}:
        </label>
        <p className="text-sm text-red-500">
          {error && error[registerValue] && error[registerValue].message}
        </p>
      </div>
      <textarea
        rows={4}
        className="bg-transparent border-juice/40 border-[1px] rounded-lg p-2 placeholder:font-thin text-sm focus:outline-none focus:border-juice resize-none appearance-none"
        type={type}
        placeholder={placeholder}
        id={name}
        value={value}
        {...register(registerValue)}
      />
    </div>
  );
};

export default DashboardTextArea;
