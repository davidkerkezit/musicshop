// HELPERS FUNCTIONS
// Aws S3 Helpers
async function deleteImage(imageUrl: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
    {
      method: "DELETE",
      body: JSON.stringify({ image: imageUrl }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete image");
  }
}
async function uploadImage(
  image: string,
  category: string,
  subcategory: string,
  format: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
    {
      method: "POST",
      body: JSON.stringify({
        image: image,
        categoryPath: category,
        subCategoryPath: subcategory,
        format: format,
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
  return data;
}
// MongoDB Helpers
async function uploadProduct(
  id: string,
  name: string,
  price: string,
  about: string,
  description: string,
  aboutSeller: string,
  currentImage: string,
  oldImage: string,
  newImage: string,
  category: string,
  inStock: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
      body: JSON.stringify({
        name: name,
        price: parseInt(price),
        about: about,
        description: description,
        aboutSeller: aboutSeller,
        imageUrl: newImage === null ? oldImage : newImage,
        category: category,
        inStock: inStock,
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
export async function getProducts(
  page: any,
  sort: any,
  query: any,
  collection: any
) {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    // Append defined parameters to the URL
    if (page !== undefined) url.searchParams.append("page", page);
    if (sort !== undefined) url.searchParams.append("sort", sort);
    if (query !== undefined) url.searchParams.append("q", query);
    if (collection !== undefined)
      url.searchParams.append("collection", collection);
    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`getProducts response error`);
    }
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
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
    console.error("Error loading product:", error);
    throw error;
  }
}
export async function getEditableProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
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
    console.error("Error loading product:", error);
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
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
    return response.status;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function addNewProduct(formData: any) {
  try {
    const data = await uploadImage(
      formData.imageSrc,
      formData.selectedCategory,
      formData.selectedSubCategory,
      "png"
    );
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
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

    console.log("Product added successfully!");
  } catch (error) {
    console.log("Error message: Error on addNewProduct action");
  }
}
export async function deleteProduct(img: string, id: string, category: string) {
  try {
    await deleteImage(img);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
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
      throw new Error("Failed to delete product");
    }

    console.log("Product deleted successfully!");
  } catch (error) {
    console.log("Error message: Error on deleteProduct action");
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

export async function editProduct(formData: any) {
  let data;
  try {
    // First fetch request to upload the image
    if (formData.imageSrc !== null) {
      await deleteImage(formData.currentImage);
      data = await uploadImage(
        formData.imageSrc,
        formData.selectedCategory,
        formData.selectedSubCategory,
        "png"
      );
    }

    // Second fetch request to add product details
    const category =
      formData.selectedCategory === "dj"
        ? "djequipment"
        : formData.selectedCategory === "vinyls"
        ? "vinyl"
        : "softwere";
    console.log(data);

    if (category === formData.currentCategory) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${formData.id}`,
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
      const dataProduct = res.json();
      return dataProduct;
      // You can perform additional actions here like refreshing or navigating to another page
    }
    if (category !== formData.currentCategory && formData.imageSrc !== null) {
      // Second fetch request to add product details
      const responseDeleteProduct = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
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
            imageUrl:
              formData.imageSrc === null ? formData.currentImage : data.url,
            category: formData.selectedCategory,
            inStock: formData.inStockValue,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      const uploadedProductData = await res.json();
      // Handle success scenario

      return uploadedProductData;
      // add test comment
      // You can perform additional actions here like refreshing or navigating to another page
    } else if (
      category !== formData.currentCategory &&
      formData.imageSrc === null
    ) {
      const imageResponse = await uploadImage(
        formData.currentImage,
        formData.selectedCategory,
        formData.selectedSubCategory,
        "url"
      );

      await deleteImage(formData.currentImage);

      const responseDeleteProduct = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
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
      // You can perform additional actions here like refreshing or navigating to another page
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
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
            imageUrl: imageResponse.fileName,
            category: formData.selectedCategory,
            inStock: formData.inStockValue,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      const uploadedProductData = await res.json();
      // Handle success scenario
      return uploadedProductData;
      // You can perform additional actions here like refreshing or navigating to another page
    }
  } catch (error) {
    // Handle errors appropriately
  }
}

export async function addOrder(formData: any) {
  const {
    firstName,
    lastName,
    city,
    houseNumber,
    streetName,
    totalPrice,
    order,
    isChecked,
    moreInformation,
    postalCode,
    phoneNumber,
  } = formData;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        city,
        houseNumber,
        streetName,
        totalPrice,
        order,
        isChecked,
        moreInformation,
        postalCode,
        phoneNumber,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to add order");
    }

    console.log("Order added successfully!");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error message: Error on addOrder action");
  }
}
export async function getOrders() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order`);
    if (!res.ok) {
      throw new Error("Failed to add order");
    }
    const data = res.json();
    return data;
    console.log("Order added successfully!");
  } catch (error) {
    console.log("Error message: Error on addOrder action");
  }
}
export async function completeOrder(id: string, isChecked: boolean) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delivery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
      body: JSON.stringify({
        id,
        isChecked,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to add order");
    }
    const data = res.json();
    return data;
    console.log("Order added successfully!");
  } catch (error) {
    console.log("Error message: Error on addOrder action");
  }
}

export async function sendMessage(
  name: string,
  email: string,
  message: string
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to add order");
    }
    const data = res.json();
    return data;
    console.log("Order added successfully!");
  } catch (error) {
    console.log("Error message: Error on addOrder action");
  }
}
export async function addSubscription(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to add order");
    }
    const data = res.json();
    return data;
    console.log("Order added successfully!");
  } catch (error) {
    console.log("Error message: Error on addOrder action");
  }
}
