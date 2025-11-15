import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
connect();

export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json();
    const {email,password} = reqBody;

   const user =  await User.findOne({email});
   if(!user){
      return NextResponse.json({error:"User is not presnt signUp please"},{status:400})
   }
     if (!user.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in." },
        { status: 403 }
      );
    }
   console.log("user exist");
   const validPassword =   await bcrypt.compare(password,user.password);
   if(!validPassword){
     return NextResponse.json({error:"check Your credential"},{status:400})
   
   }
   const tokenData = {
    id:user._id,
    userName:user.userName,
    email:user.email
   }

   const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{ expiresIn: '1h' })


   const response = NextResponse.json({
    message:"logged in Success",
    success:true
   })

   response.cookies.set("token",token,{
    httpOnly:true
   })

   return response;
     
  } catch (error:any) {
     return NextResponse.json({error:error.message}
      ,{status:500})
  }
}