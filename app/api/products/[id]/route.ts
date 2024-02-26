import connectMongoDB from "@/libs/mongodb";
import { createProductPipeline } from "@/libs/pipelines";
import DJ from "@/models/dj";
import Vinyl from "@/models/vinyl";
import Softwere from "@/models/softwere";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const models = [DJ, Vinyl, Softwere];
  await connectMongoDB();
  const selectedProductPipeline = createProductPipeline(models, id);

  try {
    let modelName: string | null = null;
    for (const model of models) {
      const product = await model.findById(id);

      if (product) {
        modelName = model.modelName;

        break;
      }
    }
    let category: string;
    let similarProducts: any[];

    const modelMap: { [key: string]: any } = {
      DJ: { category: "DJ Equipments", model: DJ },
      Vinyl: { category: "Vinyls", model: Vinyl },
      Softwere: { category: "Softweres", model: Softwere },
    };

    const modelInfo =
      modelName !== null ? modelMap[modelName] : { category: "", model: null };
    category = modelInfo.category;
    similarProducts = modelInfo.model
      ? await modelInfo.model
          .find({ _id: { $ne: id } })
          .sort({ createdAt: -1 })
          .limit(6)
      : [];
    if (!modelInfo.model) console.log("Error: No category found");

    const selectedProduct = await Product.aggregate(selectedProductPipeline);

    return NextResponse.json(
      {
        selectedProduct: selectedProduct[0],
        category,
        similarProducts,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error:", err);
  }
}
export async function PATCH(request: NextRequest, response: NextResponse) {
  try {
    const {
      id,
      name,
      price,
      imageUrl,
      about,
      description,
      aboutSeller,
      category,
      inStock,
    } = await request.json();

    let model: any;
    let mongoCategory: string;
    console.log(category, "Test");

    const categoryMap: {
      [key: string]: { model: any; mongoCategory: string };
    } = {
      dj: { model: DJ, mongoCategory: "djequipment" },
      vinyls: { model: Vinyl, mongoCategory: "vinyl" },
      softweres: { model: Softwere, mongoCategory: "softwere" },
    };

    const categoryInfo = categoryMap[category];
    model = categoryInfo?.model;
    mongoCategory = categoryInfo?.mongoCategory || "";
    await connectMongoDB(); // Connect to MongoDB
    console.log(imageUrl, "hir", id);

    const product = await model.findByIdAndUpdate(id, {
      name,
      price,
      imageUrl,
      about,
      description,
      aboutSeller,
      category: mongoCategory,
      inStock,
    });

    console.log("Product updated successfully");
    return NextResponse.json(
      { status: "success", id: product._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product", id: null },
      { status: 500 }
    );
  }
}
