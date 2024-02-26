"use client";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logoutAuthAction } from "@/libs/actions";
import { useState } from "react";
import LoadingDots from "../UI/LoadingDots";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/libs/utils";

const Logout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logoutHandler = async () => {
    setIsLoading(true);
    const status = await logoutAuthAction();
    status === 201 && router.push(`${BASE_URL}`);
    setIsLoading(false);
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
