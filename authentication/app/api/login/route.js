import User from "@/model/User";
import { connectDB } from "@/util/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user)
    return Response.json(
      { message: "User Not Found!", success: false },
      { status: 404 }
    );

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return Response.json(
      { message: "Invalid Password", success: false },
      { status: 404 }
    );

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return Response.json({ message: "Valid", token: token, success: true, role: user.role });
}