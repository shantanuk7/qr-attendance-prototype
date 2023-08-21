import Lecture from "@/models/lectureModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

console.log("Trying to connect to mongodb server...");
connect();

export async function POST(request: NextRequest){
    try {
        
        
        const req = await request.json();
        console.log("Now got request from the lectures client:");
        console.log("Request is: ", req);
        
        const lectureid = req.id;
        
        const data = await Lecture.findOne({_id: lectureid});

        return NextResponse.json({
            data: data,
            message: "Successfully got data",
            success: true
        });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: error,
            message: "Error while getting lecture data in api route",
            success: false
        });
    }
}