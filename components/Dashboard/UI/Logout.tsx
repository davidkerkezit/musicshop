"use client";
import { RiLogoutCircleLine } from "@/components/UI/Icons";
import { logoutAuthAction } from "@/libs/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/libs/utils";
import LoadingDots from "@/components/UI/LoadingDots";

const Logout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logoutHandler = async () => {
    setIsLoading(true);
    const status = await logoutAuthAction();
    if (status === 201) {
      window.location.href = BASE_URL;
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <button
          onClick={logoutHandler}
          className={`text-xl font-thin flex items-center py-3 px-2 gap-2 hover:bg-white/20  `}
        >
          <RiLogoutCircleLine size={15} />
          Log out
        </button>
      )}
    </>
  );
};

export default Logout;
