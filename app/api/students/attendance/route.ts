//This api route is completely responsible for handling QR code scan processing
// - First checks 

import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import Lecture from "@/models/lectureModel";
import mongoose from "mongoose";

connect();

export async function POST(request: NextRequest) {
    console.log("Got the request on api route. Now starting with the request processing...");

    const req = await request.json();
    console.log("Request: " + req.data);
    const { studEmail, lectureid, qrcodetext } = req;

    console.log("Checking if the lecture for requested qr code exists...");
    try {
        console.log("Lecture id is : ", lectureid);

        const lectureIdAsObjectId = new mongoose.Types.ObjectId(lectureid);

        try {
            // Use the static findByIdAndUpdate method on the Mongoose model
            const updatedLecture = await Lecture.findByIdAndUpdate(
                lectureIdAsObjectId,
                { $addToSet: { attendees: [studEmail] } },
                { new: true }
            );

            if (updatedLecture) {
                console.log("Attendance recorded:", updatedLecture);
                console.log("Done. QR code was correct and attendance has been marked.");
                return NextResponse.json({success:true, message:"Done. QR code was correct and attendance has been marked."})
            } else {
                console.log("Lecture not found.");
                return NextResponse.json({success:false, message:"Lecture with that QR was not found."})
            }
        } catch (error) {
            console.error("Error updating lecture:", error);
            return NextResponse.json({success:false, message:"Error updating lecture"})
        }
        
    } catch (error) {
        console.log("Error while checking lecture existence: ", error);
        return NextResponse.json({success:false, error:error})
    }
}
