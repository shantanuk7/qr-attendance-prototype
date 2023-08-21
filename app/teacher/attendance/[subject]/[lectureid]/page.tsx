'use client'

import axios from "axios";

import { useState, useEffect } from "react";

interface Attendance {
  _id: string;
  date: string;
  subject: string;
  attendees: string[];
}

export default function AttendanceSheet({params}:any) {
  // const [data, setData] = useState<Attendance>();
  const [data, setData] = useState<Attendance | null>(null);;
  
  useEffect(() => {
    
    const lectureid = decodeURIComponent(params.lectureid);
    
    const fetchData = async () => {
      try {

        const sendData = { id: lectureid }

        const response = await axios.post("/api/getattendance", sendData);
        const responseData = response.data.data; // Assuming the API response structure is correct
        console.log(response);
        
        setData(responseData);

        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

// Function to format the date
const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
    };


    return (
      <div className="text-center">
        <h2 className="font-semibold p-3">
          Attendance log for subject: {params.subject} as on{" "}
          {data && formatDate(data.date)}
        </h2>
        {data && (data.attendees).length > 0 ? (
          <table className="mx-auto my-auto border-collapse w-auto">
            <thead>
              <tr>
                <th className="bg-gray-200 p-2 border">Student Email</th>
              </tr>
            </thead>
            <tbody>
              {data.attendees.map((studentEmail:string) => (
                <tr key={studentEmail}>
                  <td className="border px-7 py-2">{studentEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="p-5">No attendance found!</h1>
        )}
      </div>
    );
}
