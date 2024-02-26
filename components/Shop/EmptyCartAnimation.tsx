import EMPTYCART from "@/assets/emptycart.png";
import Image from "next/image";

function EmptyCartAnimation() {
  return (
    <div className=" flex items-center justify-center flex-col mt-20 animate-opacity">
      <Image alt="empty-cart" src={EMPTYCART} width={300} height={300} />
      <p className="text-gray-200 font-bold text-xl">Your cart is empty</p>
    </div>
  );
}

export default EmptyCartAnimation;
