import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    designation: {type: String},
    joiningDate: String,
    salary: {type: Number, default: 0}
})

export default mongoose.models.Employee || mongoose.model('Employee', employeeSchema)