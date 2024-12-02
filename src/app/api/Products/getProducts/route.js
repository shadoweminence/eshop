import Product from "../../../../../models/Product";
import connectDb from "../../../../../middleware/mongoose";

export const GET = async () => {
  await connectDb();
  try {
    let products = await Product.find();
    return new Response(JSON.stringify({ products }));
  } catch (error) {
    return new Response({ error: "Failed to fetch products" });
  }
};
