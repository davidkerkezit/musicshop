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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
      {
        method: "POST",
        body: JSON.stringify({
          image: formData.imageSrc,
          categoryPath: formData.selectedCategory,
          subCategoryPath: formData.selectedSubCategory,
          format: "png",
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
    console.log("Cart update successful");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading products:", error);
    throw error;
  }
}

export async function editProduct(formData: any) {
  try {
    // Upload or delete image if needed
    await handleImageUpload(formData);

    // Update product details
    await updateProductDetails(formData);

    console.log("Product edited successfully!");
    // You can perform additional actions here like refreshing or navigating to another page
  } catch (error) {
    console.error("Error editing product:", error);
    // Handle errors appropriately
  }
}

async function handleImageUpload(formData: any) {
  if (formData.imageSrc !== null) {
    // Delete current image
    await deleteImage(formData.currentImage);

    // Upload new image
    const imageUrl = await uploadImage(formData.imageSrc);
    formData.imageUrl = imageUrl; // Update formData with new image URL
  }
}

async function deleteImage(imageUrl: string) {
  // Delete image from server
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

async function uploadImage(imageSrc: string) {
  // Upload image to server
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/images`,
    {
      method: "POST",
      body: JSON.stringify({ image: imageSrc }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to upload image");
  }
  const data = await response.json();
  return data.url;
}

async function updateProductDetails(formData: any) {
  const category = getCategory(formData.selectedCategory);
  console.log(category, formData.selectedCategory);

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
        imageUrl: formData.imageUrl,
        category: category,
        inStock: formData.inStockValue,
      }),
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to update product details");
  }
}

function getCategory(selectedCategory: string): string {
  switch (selectedCategory) {
    case "dj":
      return "djequipment";
    case "vinyls":
      return "vinyl";
    case "softweres":
      return "softwere";
    default:
      throw new Error("Invalid category");
  }
}
