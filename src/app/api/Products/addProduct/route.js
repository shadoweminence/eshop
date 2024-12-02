import Product from "../../../../../models/Product";
import connectDb from "../../../../../middleware/mongoose";
export const POST = async (req, res) => {
  await connectDb();
  try {
    const body = await req.json();
    console.log("Parsed body:", body);

    if (!body || body.length === 0) {
      console.log("Request body is empty or not parsed correctly.");
    }
    for (let i = 0; i < body.length; i++) {
      let p = new Product({
        title: body[i].title,
        slug: body[i].slug,
        desc: body[i].desc,
        img: body[i].img,
        category: body[i].category,
        size: body[i].size,
        color: body[i].color,
        price: body[i].price,
        availableQty: body[i].availableQty,
      });
      await p.save();
    }

    return new Response(
      JSON.stringify({
        success: "Products added successfully",
        data: body,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Failed to add products" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
