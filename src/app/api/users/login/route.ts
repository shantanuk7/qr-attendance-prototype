import {connect} from '@/dbConfig/dbconfig';
import User from '@/model/userModel';
import Teacher from '@/model/teacherModel';
import Student from '@/model/studentModel';
import {NextRequest,NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"


connect()

export async function POST(request: NextRequest) {
    const checkLogin = async (userRole:any,user:any,password:any)=>{
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }
        const tokenData = {
            id: user._id,
            email: user.email,
        };

        // Create Token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Successfully Login",
            success: true,
            user: {
                isAdmin: userRole === "user" ? user.isAdmin : false,
                isTeacher: userRole === "teacher" ? user.isTeacher : false,
                isStudent: userRole === "student" ? user.isStudent : false,
            },
        });

        response.cookies.set("token", token, { httpOnly: true });
        console.log("Till Here ok!!!!")
        return response;

    }
    try {
       
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if the user exists in the "users" collection
        const user = await User.findOne({ email }).select('_id email password isAdmin');
        if (user){
            let userRole = "user";
            return checkLogin(userRole,user,password)

        }
        // Check if the user exists in the "teachers" collection
        const teacher = await Teacher.findOne({ email }).select('_id email password isTeacher');
        if(teacher){
            let userRole = "teacher";
            return checkLogin(userRole,teacher,password)

        }
        //  Check if the user exists in the "Students collection
        const student = await Student.findOne({ email }).select('_id email password isStudent');
        if(student){
            let userRole = "student";
            return checkLogin(userRole,student,password)

        }

        if (!user && !teacher && !student) {
            return NextResponse.json({ error: "User Does Not Exist" }, { status: 400 });
        }

        // Check if Password is Correct for the user
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}