import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();

// i have forgotPasswordTOken and 
//and i have forgotPasswordTokenExpiry 
// first 


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const origin = request.headers.get("origin") || process.env.DOMAIN;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does't exist" },
        {
          status: 400,
        }
      );
    }
    

    //send verification Email
    await sendEmail({email,emailType:"RESET",userId:user._id,origin})

    return NextResponse.json({
      message: "Password reset link sent to email",
      success: true,
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
