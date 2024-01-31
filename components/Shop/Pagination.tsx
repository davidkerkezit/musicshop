"use client";
import { useEffect, useState } from "react";
import {
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineDoubleRight,
  AiOutlineRight,
} from "react-icons/ai";
import Arrow from "../UI/Arrow";
import { useSearchParams } from "next/navigation";
import Pages from "./Pages";

const Pagination = ({ pagesNumber }: { pagesNumber: number }) => {
  const [isHiddenLeftArrows, setIsHiddenLeftArrows] = useState<true | false>(
    true
  );
  const [isHiddenRightArrows, setIsHiddenRightArrows] = useState<true | false>(
    true
  );
  const params = useSearchParams();
  const selectedPageQuery = params.get("page") ?? "1";
  const selectedPageNumber = parseInt(selectedPageQuery);
  useEffect(() => {
    setIsHiddenLeftArrows(pagesNumber === 1 || selectedPageNumber === 1);
    setIsHiddenRightArrows(
      pagesNumber === 1 || selectedPageNumber === pagesNumber
    );
  }, [pagesNumber, selectedPageQuery, selectedPageNumber]);
  return (
    <div className="p-2 my-10 mx-auto flex flex-row items-center justify-center gap-2 bg-white/10 w-max rounded-full">
      <Arrow
        icon={<AiOutlineDoubleLeft />}
        page={1}
        isHidden={isHiddenLeftArrows}
      />
      <Arrow
        icon={<AiOutlineLeft />}
        page={selectedPageNumber - 1}
        isHidden={isHiddenLeftArrows}
      />
      <Pages pagesNumber={pagesNumber} />
      <Arrow
        icon={<AiOutlineRight />}
        page={selectedPageNumber + 1}
        isHidden={isHiddenRightArrows}
      />
      <Arrow
        icon={<AiOutlineDoubleRight />}
        page={pagesNumber}
        isHidden={isHiddenRightArrows}
      />
    </div>
  );
};

export default Pagination;
{
  /* <Link
href={"/"}
className="border-[3px] border-juice p-4 rounded-full w-[14px] h-[14px] flex items-center justify-center"
>

</Link> */
}
