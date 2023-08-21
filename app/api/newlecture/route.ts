import { connect } from "@/dbConfig/dbConfig";
import Lecture from "@/models/lectureModel";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest){
    try {
        const req = await request.json();
        // const {date, qrcode, subject} = req;

        console.log("request: ", req);

        const date = new Date();
        const {subject, qrcode} = req;
        const attendees = [''];

        const newLecture = new Lecture ({
            date,
            qrcode,
            subject,
            attendees
        })

        const savedLecture = await newLecture.save();
        console.log(savedLecture);
        return NextResponse.json({success:true, message:"Saved lecture", data:savedLecture,})
    } catch (error:any) {
        return NextResponse.json({error: error.message})
    }
}