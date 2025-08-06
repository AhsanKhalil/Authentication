// import mongoose from "mongoose";


// const attendanceSchema = new mongoose.Schema({
//     userId: {type: mongoose.ObjectId},
//     date: String,
//     status: String
// })

// export default mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema)

import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
});

export default mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
