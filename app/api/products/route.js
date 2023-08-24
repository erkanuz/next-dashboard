import connectMongoDB from "@/libs/mongodb";
import Product from "@/models/produtcs";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const products = await Product.find();
    return NextResponse.json({ products });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted"}, { status: 200 });
}