import { connect } from "@/dbConfig/dbConfig";
import Lecture from "@/models/lectureModel";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const { subject, qrcode } = requestData;

    // Create a new Date instance for the lecture's date
    const date = new Date();

    const attendees: string[] = [];

    const newLecture = new Lecture({
      date,
      qrcode,
      subject,
      attendees,
    });

    const savedLecture = await newLecture.save();
    console.log(savedLecture);

    return NextResponse.json({
      success: true,
      message: "Saved lecture",
      data: savedLecture,
    });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ error: error.message });
  }
}
