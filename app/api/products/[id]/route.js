import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/produtcs";
import { NextResponse } from "next/server";

export async function GET( request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const product = await Product.findOne({ _id: id });
    return NextResponse.json({ product }, { status: 200 });
}

export async function PUT(request, { params }) {
    const { id } = params;
    const { newProT: product_title, newProC: color, newProP: producer, newProPi: price, newProCre: createdAt, newIn: inStock, newProTy: type  } = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {product_title, description, producer, createdAt, price, inStock, type});
    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}