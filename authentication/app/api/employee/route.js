import { connectDB } from "@/util/db";
import User from "@/model/User";
import Employee from "@/model/Employee"
import bcyprt from 'bcryptjs'


export async function POST(req){
    await connectDB()
    const {name, email, password, designation, joiningDate, salary} = await req.json();

    // console.log(email)

    const userExist = await User.findOne({email})
    if(userExist){
        return Response.json({message: "Email Already Exist", success: false})
    }

   
    const hashedPassword = await bcyprt.hash(password, 10);
// console.log(hashedPassword)
    const user = await User.create({name: name, email: email, password: hashedPassword})
    
    const employee = await Employee.create({
        userId: user._id,
        designation: designation,
        joiningDate: joiningDate,
        salary: salary
    })
    
    return Response.json({message: "New Employee Created", success: true, data: employee})
}


export async function GET(){
     await connectDB()
    const employees = await Employee.find()
    .populate("userId")

    return Response.json(employees)
}