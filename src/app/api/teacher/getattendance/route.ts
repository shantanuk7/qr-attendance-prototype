import Lecture from "@/model/lectureModel";
import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Student from "@/model/studentModel";

console.log("Trying to connect to mongodb server...");
connect();

export async function POST(request: NextRequest){

    //First, get list of attendees.
    try {
        const req = await request.json();
        console.log("Now got request from the lectures client:");
        console.log("Request is: ", req);
        
        const {course, subject, date} = req;

        // Conversion, start and end of dates.
        const desiredDate = new Date(date);
        const startOfDay = new Date(desiredDate.getFullYear(), desiredDate.getMonth(), desiredDate.getDate());
        const endOfDay = new Date(desiredDate.getFullYear(), desiredDate.getMonth(), desiredDate.getDate() + 1);
    
        const lecture = await Lecture.findOne({course: course, subject:subject, date: {
            $gte: startOfDay,
            $lt: endOfDay,
        }});

        // Fetching student data based on the attendee emails
        const studentEmails = lecture.attendees;
        console.log("Reached point of getting emails: ", studentEmails);
        
        const students = await Student.find({ email: { $in: studentEmails } });

        // Formatting student data into an array of objects with name and roll number
        const formattedData = students.map(student => ({
            name: student.name,
            rollNumber: student.rollNumber
        }));

        return NextResponse.json({
            data: formattedData,
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