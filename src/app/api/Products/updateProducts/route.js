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
      const exist = await Product.findById(body[i]._id);
      if (!exist) {
        console.log(`Product with ID ${body[i]._id} not found.`);
        return new Response(
          JSON.stringify({
            error: `Product with ID ${body[i]._id} not found.`,
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      let p = await Product.findByIdAndUpdate(body[i]._id, body[i]);
    }
    return new Response(JSON.stringify({ error: "Successfully updated " }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Failed to add products" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
