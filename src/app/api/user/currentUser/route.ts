import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";

import { getDataFromToken } from "@/helpers/getDataFromToken";
import { log } from "console";
connect();

export async function GET(request:NextRequest){
  console.log("in current User Controller");
  
   try {
   const userId = await getDataFromToken(request)
   console.log(userId);
   
   const user = await User.findById(userId).select("-password");
  
   
   if(!user){
     return NextResponse.json({error:"user doesn't exist"}
      ,{status:400})
   }
   return NextResponse.json({
    message:"User found",
    data:user
   })
   } catch (error:any) {
     return NextResponse.json({error:error.message}
      ,{status:500})
  }
}