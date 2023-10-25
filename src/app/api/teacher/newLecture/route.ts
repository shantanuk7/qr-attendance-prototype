import { connect } from "@/dbConfig/dbconfig";
import Lecture from "@/model/lectureModel";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest){
    try {

        console.log("Got the request on api/newLecture");
        
        const req = await request.json();
        // const {date, qrcode, subject} = req;
        if(req)
        {
            console.log("request: ", req);
        }

        const date = new Date();
        const {subject, course} = req;
        const attendees = [''];
        const alive = true;

        const newLecture = new Lecture ({
            date,
            alive,
            course,
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