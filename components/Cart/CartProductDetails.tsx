import {
  CartItem,
  addItemToCart,
  decreaseItemCart,
  removeProductFromCart,
} from "@/libs/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/libs/store";
import { ProductType } from "@/libs/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LoadingDots from "../UI/LoadingDots";

const CartProductDetails = ({
  product,
  isLoading,
}: {
  product: ProductType;
  isLoading: boolean;
}) => {
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const [updatedItem, setUpdatedItem] = useState<null | string>(null);
  const dispatch = useDispatch<AppDispatch>();
  const increaseHandler = (
    id: string,
    price: number,
    name: string,
    inStock: number,
    category: string
  ) => {
    const productQuantity = cartItems.find(
      (item) => item.productId === id
    )?.quantity;

    if (productQuantity && inStock > productQuantity) {
      setUpdatedItem(id);

      dispatch(
        addItemToCart({
          productId: id,
          quantity: 1,
          price,
          name,
          inStock: inStock,
          category: category,
        })
      );
      setTimeout(() => {
        setUpdatedItem(null);
      }, 400);
    }
  };
  const decreaseHandler = (
    id: string,
    price: number,
    name: string,
    inStock: number,
    category: string
  ) => {
    const productQuantity = cartItems.find(
      (item: CartItem) => item.productId === id
    )?.quantity;
    if (productQuantity && productQuantity > 0) {
      setUpdatedItem(id);
      dispatch(
        decreaseItemCart({
          productId: id,
          quantity: 1,
          price,
          name,
          inStock,
          category,
        })
      );
      setTimeout(() => {
        setUpdatedItem(null);
      }, 400);
    }
  };
  const removeFromCartHandler = (
    id: string,
    price: number,
    name: string,
    inStock: number,
    category: string
  ) => {
    setUpdatedItem(id);
    dispatch(
      removeProductFromCart({
        productId: id,
        quantity: 1,
        price,
        name,
        inStock,
        category,
      })
    );
    setTimeout(() => {
      setUpdatedItem(null);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading && updatedItem === product._id ? (
        <div className="w-full h-[4rem] bg-white/10 flex items-center justify-center">
          <LoadingDots />
        </div>
      ) : (
        <div className="flex bg-white/10 justify-between items-center pr-4 w-full">
          <div className="bg-white/20 m-1">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-20 h-20 rounded-full object-contain"
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-base font-thin">{product.name}</p>
            {cartItems.find((prod: CartItem) => prod.productId === product._id)
              ?.quantity !== 0 && (
              <div className="flex   items-center bg-white/10 text-white rounded-full border-[1px] border-juice/20 p-1 ">
                <button
                  disabled={isLoading}
                  onClick={() =>
                    increaseHandler(
                      product._id,
                      product.price,
                      product.name,
                      product.inStock,
                      product.category
                    )
                  }
                  className="text-white bg-black/30 text-xl p-1  flex items-center justify-center rounded-full w-[1.6rem] h-[1.6rem]"
                >
                  +
                </button>

                <p className=" px-4">
                  {cartItems.length > 0 &&
                    cartItems.find(
                      (prod: CartItem) => prod.productId === product._id
                    )?.quantity}
                </p>
                <button
                  disabled={isLoading}
                  onClick={() =>
                    decreaseHandler(
                      product._id,
                      product.price,
                      product.name,
                      product.inStock,
                      product.category
                    )
                  }
                  className="text-white bg-black/30 text-xl p-1 flex items-center justify-center rounded-full w-[1.6rem] h-[1.6rem]"
                >
                  -
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end font-thin justify-center gap-4 h-full">
            <p className="text-sm font-medium  bg-light-juice text-black px-2  ">
              {(cartItems.find(
                (prod: CartItem) => prod.productId === product._id
              )?.quantity || 0) * product.price}
              .00 $
            </p>
            <button
              onClick={() =>
                removeFromCartHandler(
                  product._id,
                  product.price,
                  product.name,
                  product.inStock,
                  product.category
                )
              }
              className=" bg-white/10 px-2 "
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartProductDetails;
