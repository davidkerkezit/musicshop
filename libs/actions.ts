import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { BASE_URL } from "./utils";

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
      `${process.env.BASE_URL}/api/dashboard/${id}`,
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