import { Entity, Schema } from "redis-om";

class Product extends Entity {
  toJSON() {
    return {
      id: this.entityId,
      productName: this.productName,
      productDescription: this.productDescription,
      productPrice: this.productPrice,
      productCategory: this.productCategory,
    };
  }
}

export const productSchema = new Schema(
  Product,
  {
    productName: {
      type: "string",
    },
    productDescription: {
      type: "string",
    },
    productPrice: {
      type: "number",
    },
    productCategory: {
      type: "string",
    },
  },
  {
    dataStructure: "JSON",
  }
);
