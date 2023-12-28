const Label = ({ quote, label }: { quote: string; label: string }) => {
  return (
    <div className="z-10">
      <p className="text-sm md:text-lg text-juice text-center pt-5 italic font-thin">
        {quote}
      </p>
      <h2 className="text-3xl font-semibold text-center pt-3 uppercase">
        {label}
      </h2>
    </div>
  );
};

export default Label;
