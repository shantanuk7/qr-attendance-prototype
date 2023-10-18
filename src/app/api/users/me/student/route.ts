import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import Student from '@/model/studentModel';
import { connect } from '@/dbConfig/dbconfig'

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await Student.findOne({ _id: userId }).select("-password -isStudent");

        return NextResponse.json({
            message: "User found",
            data: user
        });


    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        );
    }
} 