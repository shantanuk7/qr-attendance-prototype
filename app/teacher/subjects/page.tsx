//Teachers view
//by default subjects
"use client";

import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";

interface Subject {
  _id: string;
  subject: string;
}

export default function Subjects() {
  const [data, setData] = useState<Subject[]>([]);

  useEffect(() => {
    try {
      axios
        .get<{ data: Subject[] }>("/api/subjects/getsubjects")
        .then((res) => {
          setData(res.data.data);
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <main className="">
      <ul className="m-5">
        {data.length > 0 ? (
          data.map((item) => (
            <li className="border-slate-600 border p-2 m-1" key={item._id}>
              {item.subject}
              <Link
                className="bg-slate-600 text-white rounded-md px-2 py-[2px] m-1 whitespace-nowrap"
                href={`/teacher/attendance/${item.subject}`}
              >
                View Log
              </Link>
              <Link
                className="bg-slate-600 text-white rounded-md px-2 py-[2px] m-1 whitespace-nowrap"
                href={`/teacher/qrcode/${item.subject}`}
              >
                Mark Attendance
              </Link>
            </li>
          ))
        ) : (
          <p>NO data</p>
        )}
      </ul>

      <div className="fixed bottom-5 right-5 flex space-x-2">
        <Link
          href="/teacher/newstudent"
          className="bg-slate-600 rounded-full text-white font-semibold px-4 py-2"
        >
          New Student
        </Link>
        <Link
          href="/teacher/newsubject"
          className="bg-slate-600 rounded-full text-white font-semibold px-4 py-2"
        >
          New Subject
        </Link>
      </div>
    </main>
  );
}
