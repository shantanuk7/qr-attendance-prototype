import {connect} from '@/dbConfig/dbconfig';
import Teacher from '@/model/teacherModel';
import {NextRequest,NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        console.log(reqBody);

        //check if Teacher is exist
        const teacher = await Teacher.findOne({email});
        
         if (teacher){
            return NextResponse.json({error:"Teacher already exist!!"},
            {status:400})
         }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        const newTeacher = new Teacher({
            username,
            email,
            password: hashedPassword
        })
        console.log("New Teacher = "+newTeacher);
        const savedTeacher = await newTeacher.save()
        console.log("Saved Teacher: ",savedTeacher);

         return NextResponse.json({Message:"Teacher Created Successfully",
         success: true,
         savedTeacher
        })

    }
    catch(error: any){
        return NextResponse.json({ error:error.message},
            {status:500});
    }
}