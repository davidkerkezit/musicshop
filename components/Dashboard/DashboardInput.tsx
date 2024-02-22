import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const DashboardInput = ({
  label,
  placeholder,
  value,
  name,
  registerValue,
  register,
  type,
  error,
  setValue,
}: {
  label: string;
  placeholder: string;
  value: string | number | undefined;
  name: string;
  registerValue: any;
  register: any;
  type: string;
  error: any;
  setValue: any;
}) => {
  return (
    <div className="flex flex-col   ">
      <div className="flex gap-2 items-center">
        <label htmlFor="" className="px-1 text-lg font-light">
          {label}:
        </label>
        <p className="text-sm text-red-500">
          {error && error[registerValue] && error[registerValue].message}
        </p>
      </div>

      <input
        onChange={(e) => setValue("name", e.target.value)}
        className="bg-transparent border-light-juice border-[1px] rounded-lg p-2 placeholder:font-thin text-sm focus:outline-none focus:border-juice text-white "
        type={type}
        placeholder={placeholder}
        id={name}
        // value={value}
        {...register(registerValue)}
      />
    </div>
  );
};

export default DashboardInput;
