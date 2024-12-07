import connectDb from "../../../../../middleware/mongoose";
import User from "../../../../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export const POST = async (req, res) => {
  await connectDb();
  try {
    const body = await req.json();
    console.log("Parsed body:", body);

    if (!body || body.length === 0) {
      console.log("Request body is empty or not parsed correctly.");
    }

    let user = await User.findOne({ email: body.email });
    const bytes = CryptoJS.AES.decrypt(user.password, "secretAB");
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

    if (user) {
      if (body.email == user.email && body.password == decryptedPass) {
        var token = jwt.sign(
          { success: true, email: user.email, name: user.name },
          "jwtsecret",
          { expiresIn: "2d" }
        );
        return new Response(
          JSON.stringify({
            success: true,
            email: user.email,
            name: user.name,
            token,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Incorrect password",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "The email is not registered.",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(JSON.stringify({ error: "Failed to login" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
