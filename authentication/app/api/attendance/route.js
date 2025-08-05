import { connectDB } from "@/util/db";
import Attendance from "@/model/Attendance";
import bcyprt from 'bcryptjs'


export async function POST(req){
    await connectDB()
    const {date, userId, status} = await req.json();
    const user = await Attendance.create({date,userId,status})
    return Response.json({message: "Attendance Marked", success: true})
}


export async function GET(){
    const attendance = await Attendance.find()
    return Response.json(attendance)
}