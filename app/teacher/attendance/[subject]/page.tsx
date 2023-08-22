"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Lecture {
  _id: number;
  date: string;
  subject: string;
}

export default function LecturesLog({ params }: any) {
  const paramsubject = decodeURIComponent(params.subject);
  const [data, setData] = useState<Lecture[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sendData = { subject: paramsubject };

        const response = await axios.post("/api/getlectures", sendData);
        const responseData = response.data.data; // Assuming the API response structure is correct
        console.log(response); // Check the structure of the response data
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
      {data && data.length == 0 ? (
        <h2 className="text-center font-semibold p-3">
          No Attendance found for subject: {paramsubject}
        </h2>
      ) : (
        <h2 className="text-center font-semibold p-3">
          Attendance log for subject: {paramsubject}
        </h2>
      )}

      {data &&
        data.map((item) => (
          <div key={item._id} className="p-2">
            <h3 className="inline">{formatDate(item.date)}</h3>
            <Link
              href={`/teacher/attendance/${item.subject}/${item._id}`}
              className="bg-slate-600 text-white rounded-md px-2 py-[2px] m-1 whitespace-nowrap"
            >
              View Attendance
            </Link>
          </div>
        ))}
    </div>
  );
}
