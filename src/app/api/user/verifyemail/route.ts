import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";



connect();

export async function POST(request:NextRequest){
  try {
    const reqBody = await request.json();
    const {token} = reqBody;
    // console.log(token);
    const user = await User.findOne({
      verifyToken:token,
      verifyTokenExpiry:{$gt: Date.now()}
    });
    if(!user){
      return NextResponse.json({error:"Invalid token details"},{status:400})
    }
    //add true to a isVerified and cleanUp verifyToken and verifyTokenExpiry
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
    return NextResponse.json({
      message:"Email Verified Succesfully",
      success:true
    })


  } catch (error:any) {
      return NextResponse.json({error:error.message},{status:500})
  }
}