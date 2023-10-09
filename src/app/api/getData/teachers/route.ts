import {connect} from "@/dbConfig/dbconfig"
import Teacher from "@/model/teacherModel"

import { NextRequest,NextResponse } from 'next/server';
connect();

export async function GET(request: NextRequest) {
    try {
      // Define a projection to exclude the specified fields
      const projection = {
        _id: 0, // Exclude _id
        isTeacher: 0, // Exclude isTeacher
        password: 0, // Exclude password
      };
  
      const teachers = await Teacher.find({}, projection); // Fetch teachers with projection
      return NextResponse.json({
        message: "User found",
        data:teachers
    });
    } catch (error:any) {
      return NextResponse.json({ error: error.message },
        {status:500}
        );
    }
  }

  
  
  
  
  