import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { BASE_URL } from "./utils";
import { redirect } from "next/navigation";

export async function getProducts(
  page: any,
  sort: any,
  query: any,
  collection: any
) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/shop`);

    // Append defined parameters to the URL
    if (page !== undefined) url.searchParams.append("page", page);
    if (sort !== undefined) url.searchParams.append("sort", sort);
    if (query !== undefined) url.searchParams.append("q", query);
    if (collection !== undefined)
      url.searchParams.append("collection", collection);

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the response data

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading products:", error);
    throw error;
  }
}

export async function getProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/shop/${id}`,
      {
        cache: "no-store",
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the response data

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading products:", error);
    throw error;
  }
}
export async function getEditableProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/shop/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading products:", error);
    throw error;
  }
}

export async function loginAuthAction(
  prevState: any,
  formData: FormData
): Promise<number | string | void> {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        cache: "no-store",
        credentials: "include",
      }
    );

    if (response.ok) {
      return response.status;
    } else {
      // If not successful, return the status code
      return response.status;
    }
  } catch (error) {
    console.log("Error:", error);
    // Handle the error as needed
    return; // Return void in case of error
  }
}

export async function addNewProduct(formData: any) {
  try {
    // First fetch request to upload the image
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
      {
        method: "POST",
        body: JSON.stringify({
          image: formData.imageSrc,
          categoryPath: formData.selectedCategory,
          subCategoryPath: formData.selectedSubCategory,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },

        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();

    // Second fetch request to add product details
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
      body: JSON.stringify({
        name: formData.name,
        price: parseInt(formData.price),
        about: formData.aboutProduct,
        description: formData.productDescription,
        aboutSeller: formData.aboutSeller,
        imageUrl: data.url,
        category: formData.selectedCategory,
        inStock: formData.inStock,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to add product");
    }

    // Handle success scenario
    console.log("Product added successfully!");
    // You can perform additional actions here like refreshing or navigating to another page
  } catch (error) {
    // Handle errors appropriately
  }
}
export async function deleteProduct(img: string, id: string, category: string) {
  try {
    // First fetch request to upload the image
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
      {
        method: "DELETE",
        body: JSON.stringify({
          image: img,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },

        cache: "no-store",
      }
    );

    // Second fetch request to add product details
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
      body: JSON.stringify({
        id: id,
        category: category,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to add product");
    }

    // Handle success scenario
    console.log("Product added successfully!");
    // You can perform additional actions here like refreshing or navigating to another page
  } catch (error) {
    // Handle errors appropriately
  }
}
export async function cartProducts(cart: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          cart,
        }),
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the response data

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading products:", error);
    throw error;
  }
}

export async function editProduct(formData: any) {
  let data;
  try {
    // First fetch request to upload the image
    if (formData.imageSrc !== null) {
      const responseDeleteImage = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
        {
          method: "DELETE",
          body: JSON.stringify({
            image: formData.currentImage,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },

          cache: "no-store",
        }
      );
      console.log("ok");
      if (!responseDeleteImage.ok) {
        throw new Error("Failed to delete image");
      }
      console.log("ok");
      const responseUploadImage = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
        {
          method: "POST",
          body: JSON.stringify({
            image: formData.imageSrc,
            categoryPath: formData.selectedCategory,
            subCategoryPath: formData.selectedSubCategory,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },
        }
      );
      console.log("ok");
      if (!responseUploadImage.ok) {
        throw new Error("Failed to upload image");
      }

      data = await responseUploadImage.json();
    }

    // Second fetch request to add product details
    const category =
      formData.selectedCategory === "dj"
        ? "djequipment"
        : formData.selectedCategory === "vinyls"
        ? "vinyl"
        : "softwere";

    if (category === formData.currentCategory) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shop/${formData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },
          body: JSON.stringify({
            id: formData.id,
            name: formData.name,
            price: parseInt(formData.price),
            about: formData.aboutProduct,
            description: formData.productDescription,
            aboutSeller: formData.aboutSeller,
            imageUrl:
              formData.imageSrc === null ? formData.currentImage : data.url,
            category: formData.selectedCategory,
            inStock: formData.inStockValue,
          }),
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      // Handle success scenario
      console.log("Product upload successfully!");
      // You can perform additional actions here like refreshing or navigating to another page
    }
    if (category !== formData.currentCategory && formData.imageSrc !== null) {
      // Second fetch request to add product details
      const responseDeleteProduct = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shop`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },
          body: JSON.stringify({
            id: formData.id,
            category: formData.currentCategory,
          }),
        }
      );

      if (!responseDeleteProduct.ok) {
        throw new Error("Failed to add product");
      }

      // Handle success scenario
      console.log("Product deleted successfully!");
      // You can perform additional actions here like refreshing or navigating to another page
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name,
          price: parseInt(formData.price),
          about: formData.aboutProduct,
          description: formData.productDescription,
          aboutSeller: formData.aboutSeller,
          imageUrl:
            formData.imageSrc === null ? formData.currentImage : data.url,
          category: formData.selectedCategory,
          inStock: formData.inStockValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      const uploadedProductData = await res.json();
      // Handle success scenario
      console.log(uploadedProductData.id);
      redirect(`${BASE_URL}/dashboard/${uploadedProductData.id}`);

      // You can perform additional actions here like refreshing or navigating to another page
    } else if (
      category !== formData.currentCategory &&
      formData.imageSrc === null
    ) {
      const responseDeleteImage = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
        {
          method: "DELETE",
          body: JSON.stringify({
            image: formData.currentImage,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },

          cache: "no-store",
        }
      );
      console.log("ok");
      if (!responseDeleteImage.ok) {
        throw new Error("Failed to delete image");
      }
      console.log("ok");
      const responseUploadImage = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
        {
          method: "POST",
          body: JSON.stringify({
            image: formData.currentImage,
            categoryPath: formData.selectedCategory,
            subCategoryPath: formData.selectedSubCategory,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },
        }
      );
      console.log("ok");
      if (!responseUploadImage.ok) {
        throw new Error("Failed to upload image");
      }

      data = await responseUploadImage.json();
      const responseDeleteProduct = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shop`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
          },
          body: JSON.stringify({
            id: formData.id,
            category: formData.currentCategory,
          }),
        }
      );

      if (!responseDeleteProduct.ok) {
        throw new Error("Failed to add product");
      }

      // Handle success scenario
      console.log("Product deleted successfully!");
      // You can perform additional actions here like refreshing or navigating to another page
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name,
          price: parseInt(formData.price),
          about: formData.aboutProduct,
          description: formData.productDescription,
          aboutSeller: formData.aboutSeller,
          imageUrl:
            formData.imageSrc === null ? formData.currentImage : data.url,
          category: formData.selectedCategory,
          inStock: formData.inStockValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      const uploadedProductData = await res.json();
      // Handle success scenario
      console.log(uploadedProductData.id);
      redirect(`${BASE_URL}/dashboard/${uploadedProductData.id}`);

      // You can perform additional actions here like refreshing or navigating to another page
    }
  } catch (error) {
    // Handle errors appropriately
  }
}
