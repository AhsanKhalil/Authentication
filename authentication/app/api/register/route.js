import { connectDB } from "@/util/db";
import User from "@/model/User";
import bcyprt from 'bcryptjs'


export async function POST(req){
    await connectDB()
    const {name, email, password} = await req.json();


    const userExist = await User.findOne({email})
    if(userExist){
        return Response.json({message: "Email Already Exist", success: false})
    }

   
    const hashedPassword = await bcyprt.hash(password, 10);

    const user = await User.create({name: name, email: email, password: hashedPassword})
    return Response.json({message: "User Registered", success: true})

}