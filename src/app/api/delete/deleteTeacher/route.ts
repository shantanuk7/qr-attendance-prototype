import { connect } from '@/dbConfig/dbconfig';
import Teacher from '@/model/teacherModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
      const reqBody = await request.json();
      console.log(reqBody)
    const { email } = reqBody;

    // Find and delete the teacher by email
    const deletedTeacher = await Teacher.findOneAndDelete({ email });
    console.log(deletedTeacher)
    if (!deletedTeacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    const response = NextResponse.json({
      message: "Teacher deleted successfully",
      success: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
