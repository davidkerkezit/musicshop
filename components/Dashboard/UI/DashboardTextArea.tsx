"use client";
const DashboardTextArea = ({
  label,
  placeholder,
  value,
  name,
  registerValue,
  register,
  type,
  error,
  setValue,
  access,
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
  access: boolean;
}) => {
  return (
    <div className="flex flex-col   ">
      <div className="flex lg:items-center md:gap-2 lg:flex-row flex-col ">
        <label htmlFor="" className="px-1 text-lg font-light">
          {label}:
        </label>
        <p className="text-sm text-red-500">
          {error && error[registerValue] && error[registerValue].message}
        </p>
      </div>
      <textarea
        disabled={!access}
        onChange={(e) => setValue(name, e.target.value)}
        rows={4}
        className={`bg-transparent border-light-juice border-[1px] rounded-lg p-2 placeholder:font-thin text-sm focus:outline-none focus:border-juice resize-none appearance-none ${
          access ? "cursor-text " : "cursor-not-allowed"
        }`}
        type={type}
        placeholder={placeholder}
        id={name}
        // value={value}
        {...register(registerValue)}
      />
    </div>
  );
};

export default DashboardTextArea;
