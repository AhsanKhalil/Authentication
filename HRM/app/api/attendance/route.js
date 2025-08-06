// import { connectDB } from "@/util/db";
// import Attendance from "@/model/Attendance";
// import bcyprt from 'bcryptjs'


// export async function POST(req){
//     await connectDB()
//     const {date, userId, status} = await req.json();
//     const user = await Attendance.create({date,userId,status})
//     return Response.json({message: "Attendance Marked", success: true})
// }


// export async function GET(){
//     const attendance = await Attendance.find()
//     return Response.json(attendance)
// }

import { connectDB } from "@/util/db";
import Attendance from "@/model/Attendance";
import mongoose from "mongoose";

export async function POST(req) {
  await connectDB();
  const { date, userId, status } = await req.json();

  try {
    const userObjectId = new mongoose.Types.ObjectId(userId); // Convert string to ObjectId
    const attendance = await Attendance.create({ date, userId: userObjectId, status });

    return Response.json({ message: "Attendance Marked", success: true });
  } catch (error) {
    console.error("Error marking attendance:", error);
    return Response.json({ message: "Failed to mark attendance", success: false }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const attendance = await Attendance.find();
  return Response.json(attendance);
}
