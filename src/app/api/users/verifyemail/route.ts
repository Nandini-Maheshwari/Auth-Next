import {connect} from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const {token} = reqBody
    console.log(token);

    const user = await User.findOne({verifyToken: token, 
    verifyTokenExpiry: {$gt: Date.now()}})

    if(!user) {
      return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save()

    const email = user.email; // Declare the 'email' variable

    //send verification email
    await sendEmail({email, emailType: "VERIFY", userId: user._id})

    return NextResponse.json({
      message: "Email verified successfully",
      success: true
    })

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}