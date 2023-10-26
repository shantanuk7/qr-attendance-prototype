import Lecture from "@/model/lectureModel";
import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

console.log("Trying to connect to mongodb server...");
connect();

export async function POST(request: NextRequest){
    try {
        
        const req = await request.json();
        console.log("Now got request from the lectures client:");
        console.log("Request is: ", req);
        
        const {course, subject, date} = req;

        // Convert the date string to a JavaScript Date object
        const desiredDate = new Date(date);

        // Set the start time for the desired date
        const startOfDay = new Date(desiredDate.getFullYear(), desiredDate.getMonth(), desiredDate.getDate());

        // Set the end time for the desired date
        const endOfDay = new Date(desiredDate.getFullYear(), desiredDate.getMonth(), desiredDate.getDate() + 1);

        const data = await Lecture.findOne({course: course, subject:subject, date: {
            $gte: startOfDay,
            $lt: endOfDay,
          }});

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