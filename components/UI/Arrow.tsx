"use client";
import { useRouter } from "next/navigation";
const Arrow = ({
  page,
  icon,
  isHidden,
}: {
  page: number;
  icon: React.ReactNode;
  isHidden: boolean;
}) => {
  const router = useRouter();
  const arrowHandling = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", String(page));
    router.push(currentUrl.href);
  };

  return (
    <button
      onClick={arrowHandling}
      className={`border-[3px] border-juice/30   rounded-full text-base w-[32px] h-[32px] flex justify-center items-center  ${
        isHidden && "hidden"
      }`}
    >
      {icon}
    </button>
  );
};

export default Arrow;
