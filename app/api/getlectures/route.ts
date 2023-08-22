import Lecture from "@/models/lectureModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

console.log("Trying to connect to mongodb server...");
connect();

export async function POST(request: NextRequest){
    try {
        const req = await request.json();
        const subject = req.subject;
        console.log(subject);
        
        const data = await Lecture.find({subject: subject});

        return NextResponse.json({
            data: data,
            message: "Successfully got data",
            success: true
        });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: error,
            message: "Error while getting subjects data in api route",
            success: false
        });
    }
}