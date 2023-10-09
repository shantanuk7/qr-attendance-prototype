import { connect } from '@/dbConfig/dbconfig';
import Student from '@/model/studentModel';
import generatePassword from '@/helpers/generatePassword';
import * as csv from 'fast-csv'; // Import fast-csv properly
import fs, { writeFile } from 'fs';
import path, { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';


connect(); // Initialize the database connection

export async function POST(request: NextRequest) {
  try {

    const reqBody = await request.formData();
    console.log("API Response:", reqBody);
    const file = reqBody.get('csvFile') as File;; // Access the uploaded file using get() method
    const courseName = reqBody.get('courseName'); // Access other form fields
    if (!file) {
      throw new Error('No file uploaded.');
    }
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes);
    const path = join(process.cwd(), 'uploads', file.name) 
    await writeFile(path,buffer,(error)=>{
      console.log(error);
    })
    

    const filePath = path;
    const students: any[] = [];

    fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on('data', async (row) => {
      try {
        const password = await generatePassword(row.email);
  
        const student = new Student({
          name: row.name,
          email: row.email,
          rollNo: row.rollNo,
          password: password,
          courseName: courseName,
          isStudent: true,
        });
  
        await student.save();
      } catch (error) {
        console.error('Error processing a student:', error);
      }
    })
    .on('end', async () => {
      console.log('All students processed');
      try {
        await fs.promises.unlink(filePath); // Asynchronous file deletion
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    });
  
      return NextResponse.json({ message: 'Students added successfully.' },{ status: 200 });
  } catch (error) {
    console.error("Error"+error);
    return NextResponse.json({ message: 'An error occurred on the server.' }, { status: 500 });
  }
}
