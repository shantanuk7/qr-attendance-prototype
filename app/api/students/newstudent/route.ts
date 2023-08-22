import { connect } from "@/dbConfig/dbConfig";
import Student from "@/models/studentsModel";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { name, email, course } = req;

        const newStudent = new Student({
            name,
            email,
            course
        });

        const savedStudent = await newStudent.save();
        console.log(savedStudent);
        return NextResponse.json({ success: true, message: "Saved student", data: savedStudent });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
