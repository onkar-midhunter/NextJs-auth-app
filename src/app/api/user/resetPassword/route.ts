import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.Model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    if (!token && !password) {
      return NextResponse.json(
        { error: "Pls provide token and password" },
        { status: 400 }
      );
    }
    const user = await User.findOne({
      forgotPasswordToken: token,
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid user details" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "User password changed succesfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
