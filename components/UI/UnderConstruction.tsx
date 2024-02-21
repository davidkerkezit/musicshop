import Image from "next/image";
import React from "react";
import UNDERCONSTRUCTION from "@/assets/underconstruction.png";
const UnderConstruction = () => {
  return (
    <div>
      <Image
        width={500}
        height={500}
        src={UNDERCONSTRUCTION}
        alt="underConstruction"
      />
    </div>
  );
};

export default UnderConstruction;
