import connectMongoDB from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import DJ from "@/models/dj";
import Vinyl from "@/models/vinyl";
import Softwere from "@/models/softwere"; // Corrected the import name

export async function PATCH(request: NextRequest, response: NextResponse) {
  try {
    const { products } = await request.json();
    console.log(products);

    await connectMongoDB(); // Connect to MongoDB

    // Create an array to store all the update promises
    const updatePromises = [];

    for (const element of products) {
      let model;

      if (element.category === "djequipment") {
        model = DJ;
      } else if (element.category === "vinyl") {
        model = Vinyl;
      } else if (element.category === "softwere") {
        // Corrected the spelling of "software"
        model = Softwere;
      }
      console.log(model);

      if (model) {
        // Find the current product
        const currentProduct = await model.findById(element.productId);
        console.log(currentProduct);

        // Calculate the new value for inStock
        const newInStock = currentProduct.inStock - element.quantity;

        // Update the product with the new inStock value
        updatePromises.push(
          model.findByIdAndUpdate(element.productId, {
            inStock: newInStock,
          })
        );
      }
    }

    // Wait for all update promises to resolve
    await Promise.all(updatePromises);

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product", id: null },
      { status: 500 }
    );
  }
}
