import {
  ProductDetails,
  ProductInformation,
  SimilarProducts,
} from "@/components/Shop";
import { getEditableProduct, getProduct } from "@/libs/actions";
import { ProductType } from "@/libs/types";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { selectedProduct } = await getEditableProduct(params.id);

  return {
    title: `Music Shop | ${selectedProduct.name}`,

    description: `Explore our featured product at Musicshop London - ${selectedProduct.name}. Delve into the details of this top-quality ${selectedProduct.name}, crafted for music aficionados. Elevate your sound with ${selectedProduct.name} from Musicshop today.`,
  };
}

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const {
    selectedProduct,
    category,
    similarProducts,
  }: {
    selectedProduct: ProductType;
    category: string;
    similarProducts: ProductType[];
  } = await getProduct(id);

  return (
    <div className="flex flex-col gap-10 mx-14 ">
      <ProductDetails selectedProduct={selectedProduct} category={category} />
      <ProductInformation
        aboutProduct={selectedProduct.description}
        aboutSeller={selectedProduct.aboutSeller}
      />
      <SimilarProducts products={similarProducts} category={category} />
    </div>
  );
};

export default page;
