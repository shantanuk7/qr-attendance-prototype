import {getDataFromToken} from '@/helpers/getDataFromToken';
import { NextRequest,NextResponse } from 'next/server';
import Teacher from '@/model/teacherModel'

import {connect} from '@/dbConfig/dbconfig'

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await Teacher.findOne({_id: userId}).select("-password -isAdmin");

        return NextResponse.json({
            message: "User found",
            data:user
        });


    } catch (error:any) {
        return NextResponse.json({ error: error.message },
            {status:500}
            );
    }
} 