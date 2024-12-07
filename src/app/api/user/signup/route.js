import connectDb from "../../../../../middleware/mongoose";
import User from "../../../../../models/User";
var CryptoJs = require("crypto-js");

export const POST = async (req, res) => {
  await connectDb();
  try {
    const body = await req.json();
    console.log("Parsed body:", body);

    if (!body || body.length === 0) {
      console.log("Request body is empty or not parsed correctly.");
    }

    const { name, email } = body;
    let u = new User({
      name,
      email,
      password: CryptoJs.AES.encrypt(body.password, "secretAB").toString(),
    });
    await u.save();

    return new Response(
      JSON.stringify({
        success: "User added successfully",
        data: body,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Failed to add user" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
