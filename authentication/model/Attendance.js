import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema({
    userId: {type: mongoose.ObjectId},
    date: String,
    status: String
})

export default mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema)