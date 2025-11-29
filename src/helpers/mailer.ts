import User from "@/models/user.Model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId,origin }: any) => {
  try {
    //covert to hashed Token
    const baseUrl = origin || process.env.DOMAIN;
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 600000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST!,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
      },
    });

    const mailOptions = {
      from: "onkar123@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset Your Password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${baseUrl}/verifyemail?token=${hashedToken}">here</a> to verify Email
            or copy and paste the link below in your browser. <br> ${baseUrl}/verifyemail?token=${hashedToken}
            </p>`
          : `<p>Click <a href="${baseUrl}/resetPassword?token=${hashedToken}">here</a> to Reset your password
or copy and paste the link below in your browser. <br> ${baseUrl}/resetPassword?token=${hashedToken}
</p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
