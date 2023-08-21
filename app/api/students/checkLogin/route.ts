//Checks whether logged in user exists in the student database.

import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import Student from "@/models/studentsModel";
console.log("Starting the user check request");

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(email);

    const data = await Student.findOne({ email: email });

    if (data) {
      console.log("Found user with the email id", data);
      return NextResponse.json({
        success: true,
        message: "User with same email exists.",
      });
    } else {
      console.log("User not found.");
      return NextResponse.json({
        success: false,
        message:"User with the email does not exist! Please check whether you are logged in with correct email id.",
      });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.error();
  }
}
