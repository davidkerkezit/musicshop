import { getEditableProduct } from "@/libs/actions";
import { EditProduct } from "@/components";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { selectedProduct } = await getEditableProduct(params.id);

  return {
    title: `Music Shop | ${selectedProduct.name}`,
  };
}
const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { selectedProduct } = await getEditableProduct(id);
  return (
    <>
      <EditProduct selectedProduct={selectedProduct} />
    </>
  );
};

export default page;
