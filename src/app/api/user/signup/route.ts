import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    console.log(reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User aleready exist" },
        {
          status: 400,
        }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification Email
    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
    return NextResponse.json({
      message:"User Register Succesfully",
      success:true,
      savedUser  
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
