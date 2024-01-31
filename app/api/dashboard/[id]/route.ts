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
    switch (modelName) {
      case "DJ":
        category = "DJ Equipments";
        similarProducts = await DJ.find({ _id: { $ne: id } })
          .sort({ createdAt: -1 })
          .limit(6);

        break;
      case "Vinyl":
        category = "Vinyls";
        similarProducts = await Vinyl.find({ _id: { $ne: id } })
          .sort({ createdAt: -1 })
          .limit(6);

        break;
      case "Softwere":
        category = "Softweres";
        similarProducts = await Softwere.find({ _id: { $ne: id } })
          .sort({ createdAt: -1 })
          .limit(6);

        break;
      default:
        category = "";
        similarProducts = [];

        console.log("Error: No category found");

        break;
    }

    const selectedProduct = await Product.aggregate(selectedProductPipeline);

    return NextResponse.json({
      selectedProduct: selectedProduct[0],
      category,
      similarProducts,
    });
  } catch (err) {
    console.error("Error:", err);
  }
}
