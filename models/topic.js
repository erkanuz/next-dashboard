import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
});

const topicSchema = new Schema(
  {
    customer_name: { type: String, required: true },
    order_date: { type: Date, required: true },
    products: [productSchema],
    total_amount: { type: Number, required: true },
    shipping_address: { type: String, required: true },
    status_type: { type: String, required: true },
    payment_method: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;