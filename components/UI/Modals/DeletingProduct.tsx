import Image from "next/image";
import LOGO from "@/assets/logo.png";

const DeletingProduct = ({
  name,
  showModal,
  image,
  deleteProductHandler,
}: {
  name: string;
  showModal: any;
  image: string;
  deleteProductHandler: any;
}) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className=" p-12 bg-[#1c1c21] rounded-lg shadow-lg  mx-auto left-0 right-0 top-0 bottom-0 my-auto h-max fixed flex flex-col items-center md:min-w-[400px] md:max-w-[600px] w-[90%] border-[1px] border-light-juice/20 z-50"
    >
      <Image src={LOGO} alt="logo" width={100} height={100} />
      <h2 className="text-xl font-bold mb-4 text-light-juice pt-4 text-center">
        Are you sure you want to delete{" "}
        <span className="text-white">{name}</span>?
      </h2>
      <div className="w-[5rem] h-[5rem] flex items-center justify-center my-4">
        <Image alt="product" width={80} height={80} src={image} />
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={(e) => {
            deleteProductHandler(e);
          }}
          className="bg-white px-2 rounded-md text-black text-lg py-1 border-[1px] border-light-juice w-[6rem]"
        >
          Confirm{" "}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            showModal(false);
          }}
          className="bg-white px-2 rounded-md text-black text-lg py-2 border-[1px] border-light-juice w-[6rem]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletingProduct;
