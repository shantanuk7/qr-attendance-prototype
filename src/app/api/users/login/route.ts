import {connect} from '@/dbConfig/dbconfig';
import User from '@/model/userModel';
import Teacher from '@/model/teacherModel';
import {NextRequest,NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if the user exists in the "users" collection
        const user = await User.findOne({ email });

        // Check if the user exists in the "teachers" collection
        const teacher = await Teacher.findOne({ email });

        if (!user && !teacher) {
            return NextResponse.json({ error: "User Does Not Exist" }, { status: 400 });
        }

        // Check if Password is Correct for the user
        let userRole = "";
        let userDoc;

        if (user) {
            userRole = "user";
            userDoc = user;
        } else if (teacher) {
            userRole = "teacher";
            userDoc = teacher;
        }

        const isPasswordValid = await bcryptjs.compare(password, userDoc.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }

        // Create Token Data
        const tokenData = {
            id: userDoc._id,
            username: userDoc.username,
            email: userDoc.email,
        };

        // Create Token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Successfully Login",
            success: true,
            user: {
                isAdmin: userRole === "user" ? userDoc.isAdmin : false,
                isStudent: userRole === "user" ? userDoc.isStudent : false,
                isTeacher: userRole === "teacher" ? userDoc.isTeacher : false,
            },
        });

        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}