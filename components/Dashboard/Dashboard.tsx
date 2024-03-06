"use client";
import { ProductType } from "@/libs/types";
import { useSearchParams } from "next/navigation";
import {
  AddProduct,
  EditProducts,
  Orders,
  Subscriptions,
  Questions,
} from "@/components/Dashboard";

const Dashboard = ({
  products,
  pages,
}: {
  products: ProductType[];
  pages: number;
}) => {
  const searchParams = useSearchParams();
  const option = searchParams.get("option") || "addproduct";
  return (
    <>
      {option === "addproduct" && <AddProduct />}
      {option === "editproducts" && (
        <EditProducts products={products} pages={pages} />
      )}
      {option === "orders" && <Orders />}
      {option === "subscriptions" && <Subscriptions />}
      {option === "questions" && <Questions />}
    </>
  );
};

export default Dashboard;
