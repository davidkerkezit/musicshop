import { getEditableProduct } from "@/libs/actions";
import EditProduct from "@/components/Dashboard/EditProduct";
const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { selectedProduct } = await getEditableProduct(id);
  console.log(selectedProduct);

  return (
    <div>
      <EditProduct selectedProduct={selectedProduct} category={"DJ"} />
    </div>
  );
};

export default page;
