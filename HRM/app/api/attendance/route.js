import { connectDB } from "@/util/db";
import Attendance from "@/model/Attendance";
import mongoose from "mongoose";

export async function POST(req) {
  await connectDB();
  const { date, userId, status } = await req.json();

  try {
    // ✅ Validate ObjectId before using it
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return Response.json(
        { message: "Invalid userId: must be a valid MongoDB ObjectId", success: false },
        { status: 400 }
      );
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const attendance = await Attendance.create({
      date,
      userId: userObjectId,
      status
    });

    return Response.json({ message: "Attendance Marked", success: true, data: attendance });
  } catch (error) {
    console.error("Error marking attendance:", error);
    return Response.json(
      { message: "Failed to mark attendance", success: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const attendance = await Attendance.find();
  return Response.json(attendance);
}
