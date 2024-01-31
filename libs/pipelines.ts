import { Model, Document, Types } from "mongoose";
import mongoose from "mongoose";

interface BaseDocument extends Document {
  _id: Types.ObjectId;
}

type BaseModel<T extends BaseDocument> = Model<T>;

type PipelineStage<T extends BaseDocument> =
  | {
      $unionWith: {
        coll: string;
      };
    }
  | {
      $count: string;
    }
  | {
      $match: {
        name?: {
          $regex: RegExp;
        };

        _id?: T["_id"]; // Make _id optional
      };
    }
  | {
      $skip: number;
    }
  | {
      $limit: number;
    }
  | {
      $sort: {
        [key: string]: 1 | -1; // Specify the type for $sort
      };
    }
  | {
      $group: {
        _id: null;
        totalProducts: { $sum: number };
      };
    };

type NewArrivalsPipeline<T extends BaseDocument> = Array<PipelineStage<T>>;

export function createNewArrivalsPipeline<T extends BaseDocument>(
  models: Array<BaseModel<T>>
): NewArrivalsPipeline<T> {
  const newArrivalsAggregatePipeline: Array<NewArrivalsPipeline<T>> =
    models.map((model) => [
      {
        $unionWith: {
          coll: model.collection.name,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

  // Flatten the array of pipelines
  const newArrivalsFlattenedPipeline: NewArrivalsPipeline<T> =
    newArrivalsAggregatePipeline.flat();

  return newArrivalsFlattenedPipeline;
}
export function createAllProductsPipeline<T extends BaseDocument>(
  models: Array<BaseModel<T>>,
  query: string | null,
  page: number | null,
  pageSize: number | null,
  sort: string | null
): Array<PipelineStage<T>> {
  const pipeline: Array<PipelineStage<T>> = [];

  models.forEach((model) => {
    pipeline.push({
      $unionWith: {
        coll: model.collection.name,
      },
    });
  });

  if (query) {
    pipeline.push({
      $match: {
        name: {
          $regex: new RegExp(query, "i"),
        },
      },
    });
  }

  // Add sorting based on the 'sort' parameter
  if (sort) {
    switch (sort) {
      case "lowprice":
        pipeline.push({
          $sort: {
            price: 1,
          },
        });
        break;
      case "highprice":
        pipeline.push({
          $sort: {
            price: -1,
          },
        });
        break;
      case "oldest":
        pipeline.push({
          $sort: {
            createdAt: 1,
          },
        });
        break;
      case "newest":
        pipeline.push({
          $sort: {
            createdAt: -1,
          },
        });
        break;
      default:
        break;
    }
  }

  // Add $skip and $limit stages at the end
  if (page !== null && pageSize !== null) {
    pipeline.push(
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: pageSize,
      }
    );
  }

  return pipeline;
}

export function createPagesNumberPipeline<T extends BaseDocument>(
  models: Array<BaseModel<T>>,
  query: string | null
): Array<PipelineStage<T>> {
  const pipeline: Array<PipelineStage<T>> = [];

  models.forEach((model) => {
    pipeline.push({
      $unionWith: {
        coll: model.collection.name,
      },
    });
  });

  if (query) {
    pipeline.push({
      $match: {
        name: {
          $regex: new RegExp(query, "i"),
        },
      },
    });
  }
  pipeline.push({
    $group: {
      _id: null,
      totalProducts: { $sum: 1 },
    },
  });

  return pipeline;
}

export function createProductPipeline<T extends BaseDocument>(
  models: Array<BaseModel<T>>,
  id: string
): Array<PipelineStage<T>> {
  const pipeline: Array<PipelineStage<T>> = [];

  // Use $unionWith to perform a union operation on multiple collections
  models.forEach((model) => {
    pipeline.push({
      $unionWith: {
        coll: model.collection.name,
      },
    });
  });

  if (id) {
    const objectId = new mongoose.Types.ObjectId(id);

    // Use $match to filter documents based on the provided ID
    pipeline.push({
      $match: {
        _id: objectId,
      },
    });
  }

  return pipeline;
}
