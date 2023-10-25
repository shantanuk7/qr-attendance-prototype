"use client";
import TeacherSidebar from "@/app/teacher/components/TeacherSidebar";
import SubjectListItem from "../components/SubjectListItem";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Subject {
  _id: string;
  course: string;
  subject: string;
}

export default function Home() {
  const [data, setData] = useState<Subject[]>([]);
  const router = useRouter();

  //on page load, display all subjects list
  useEffect(() => {
    try {
      axios
        .get<{ data: Subject[] }>("/api/teacher/getSubjects")
        .then((res) => {
          setData(res.data.data);
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //create new lecture on clicking new lecture QR Button.
  const newLecture = (course:String, subject: String) => {
    try {
      console.log("got the call to start new lecture...");

      const sendData = {
        course,
        subject,
      };

      axios.post("/api/teacher/newLecture", sendData)
      .then((res) => {
        console.log("sent the data: ", sendData);
        console.log(res);

        const lectureId = res.data.data._id;
        router.push(`/teacher/qrcode/${subject}/${lectureId}`);

      });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <main className="">
      <TeacherSidebar
        isOpen={false}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <ul className="m-5">
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item._id}>
              <SubjectListItem course={item.course} subject={item.subject} newAttendance={newLecture}/>
            </li>
          ))
        ) : (
          <p>NO Subjects in database</p>
        )}
      </ul>
    </main>
  );
}
