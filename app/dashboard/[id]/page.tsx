import { getEditableProduct } from "@/libs/actions";
import { EditProduct } from "@/components";
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
