import { connect } from "@/dbConfig/dbConfig";
import Subject from "@/models/subjectModel";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest){
    try {
        const req = await request.json();
        const { course, subject } = req;

        const formattedCourse = decodeURIComponent(course);
        const formattedSubject = decodeURIComponent(subject);
        
        console.log(formattedCourse + " " + formattedSubject);
        
        console.log("request: "+req);
        if(formattedCourse && formattedSubject){

            const newSubject = new Subject ({
                course: formattedCourse,
                subject: formattedSubject,
            })

            const savedSubject = await newSubject.save();
            console.log(savedSubject);
            return NextResponse.json({success:true, message:"Saved subject"})
        } else {
            return NextResponse.json({success:false, message:"Could not save subject due to problem with course or subject name"})
        }

    } catch (error:any) {
        console.error(error);
        return NextResponse.json({error: error.message})
    }
}