import Lecture from "@/models/lectureModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

console.log("Trying to connect to mongodb server...");
connect();

export async function GET(){
    try {
        const data = await Lecture.find({});
        console.log(data);
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