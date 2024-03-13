const StoreStatistic = ({
  icon,
  quantity,
  label,
}: {
  icon: React.ReactElement;
  quantity: string;
  label: string;
}) => {
  return (
    <div className="bg-black/50 flex flex-row gap-8 lg:gap-4 items-center py-2 px-5 flex-1 rounded-2xl border-[1px] border-juice/50 w-[80%] md:w-1/2 lg:py-4">
      <div className="text-2xl lg:text-4xl text-juice">{icon}</div>
      <div className="flex gap-2 lg:flex-col lg:gap-0">
        <p className="text-base font-semibold lg:text-lg">{quantity}</p>
        <p className="text-base lg:text-lg text-white/70 w-max">{label}</p>
      </div>
    </div>
  );
};

export default StoreStatistic;
