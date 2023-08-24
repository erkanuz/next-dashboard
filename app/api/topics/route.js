import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { customer_name, order_date, products, total_amount, shipping_address, payment_method, status_type } = await request.json();
  await connectMongoDB();
  const productObjects = products.map((product) => ({
    product_id: product.product_id,
    product_name: product.product_name,
    quantity: product.quantity,
    unit_price: product.unit_price,
  }));
  await Topic.create({ customer_name, order_date, products: productObjects, total_amount, shipping_address, payment_method, status_type });
  return NextResponse.json({message: "Topic Created"}, {status: 201});
}

export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted"}, { status: 200 });
}