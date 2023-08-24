import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    product_title: String,
    color: String,
    producer: { type: String, required: true },
    createdAt: { type: Date, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    type: { type: String, required: true },
  },
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;