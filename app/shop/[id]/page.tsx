import { ProductInformatiom, SimilarProducts } from "@/components";
import Button from "@/components/UI/Button";
import { getProduct } from "@/libs/actions";
import { addItemToCart } from "@/libs/features/cartSlice";
import { AppDispatch } from "@/libs/store";
import { ProductType } from "@/libs/types";
import Image from "next/image";
import { AiOutlineShopping } from "react-icons/ai";
import { useDispatch } from "react-redux";
const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  // const dispatch = useDispatch<AppDispatch>();
  const {
    selectedProduct,
    category,
    similarProducts,
  }: {
    selectedProduct: ProductType;
    category: string;
    similarProducts: ProductType[];
  } = await getProduct(id);

  const addToCartHandler = () => {};
  return (
    <div className="flex flex-col gap-10 mx-14 ">
      <div className="flex pt-40  ">
        <div className="w-1/2 bg-white/10 flex items-center justify-center">
          <Image
            src={selectedProduct.imageUrl}
            alt="product"
            width={600}
            height={600}
            className="white-shadow "
          />
        </div>

        <div className="w-1/2 px-10 flex flex-col gap-4">
          <h2 className="text-5xl  font-semibold">{selectedProduct.name}</h2>
          <p className="text-xl">Category: {category}</p>
          <p className="text-lg  font-light text-white/60">
            {selectedProduct.about}
          </p>
          <p className="text-[4rem] font-extralight">
            <span className="text-lg  font-light pr-1">Price: </span>
            {selectedProduct.price}
            <span className="text-[3rem] font-extralight pl-1">$</span>
          </p>
          <div>
            {/* <Button
              isPending={false}
              label="Add to cart"
              icon={<AiOutlineShopping />}
              func={() => {}}
            /> */}
          </div>
        </div>
      </div>
      <ProductInformatiom
        aboutProduct={selectedProduct.description}
        aboutSeller={selectedProduct.aboutSeller}
      />
      <SimilarProducts products={similarProducts} category={category} />
    </div>
  );
};

export default page;
