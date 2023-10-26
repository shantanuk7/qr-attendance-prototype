"use client";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { Tab } from "@mui/material";
import styles from "./Calendar.module.css";

export default function Attendance({ params }: any) {
  const [activeTab, setActiveTab] = useState("Daily");
  const courseName = decodeURIComponent(params.course);
  const subjectName = decodeURIComponent(params.subject);
  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const [data, setData] = useState<any>(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    //Need course name, subject and date for finding lecture of that subject and displaying details.

    const fetchData = async () => {
      try {

        // const isoDate = date.toISOString();

        const sendData = {
          course: courseName,
          subject: subjectName,
          date: date,
        };

        console.log("Sending date to /teacher/getattedance api: ", sendData);
        const response = await axios.post(
          "/api/teacher/getattendance",
          sendData
        );
        const responseData = response.data.data; // Assuming the API response structure is correct
        console.log(response);

        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [date]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>
        {courseName} | {subjectName}
      </h1>
      <div className="flex p-1 rounded-xl border-2 border-gray-200 w-full text-center">
        <div
          className={`cursor-pointer px-4 py-2 rounded-lg m-0.5 w-1/2 ${
            activeTab === "Daily" ? "bg-teal-500 text-white" : "bg-white"
          }`}
          onClick={() => handleTabClick("Daily")}
        >
          Daily
        </div>
        <div
          className={`cursor-pointer px-4 py-2 rounded-lg m-0.5 w-1/2 ${
            activeTab === "Cumulative" ? "bg-teal-500 text-white" : "bg-white"
          }`}
          onClick={() => handleTabClick("Cumulative")}
        >
          Cumulative
        </div>
      </div>
      <div className="mt-2">
        {activeTab === "Daily" && <DailyContent changeDate={(date:any)=>setDate(date)} date={date} data={data}/>}
        {activeTab === "Cumulative" && <CumulativeContent />}
      </div>
    </div>
  );
}

const DailyContent = (props:any) => {
  //calendar

  console.log("in daily content: ", props.data);
  
  const handleDateChange = (newDate: any) => {
    props.changeDate(newDate);
  };

  return (
      <div className="">
      <div className="p-2">
        <Calendar
          onChange={handleDateChange}
          value={props.date}
          className={styles.customCalendar}
          locale="en-US"
          />
      </div>
          {(props.date) &&
      <div className="">
        <ContentBasedOnDate selectedDate={props.date} lectureData={props.data}/>
      </div>
    }
    </div>
  );
};

const ContentBasedOnDate = ({ selectedDate, lectureData }: any) => {
  const formattedDate = selectedDate.toDateString();
  console.log("Lecture data: ", lectureData);

  return (
    <div>
      {(lectureData) 
      ? 
      (<table className="border-collapse mx-auto">
      <thead>
        <tr>
          <th className="bg-gray-200 p-2 border">Email</th>
          <th className="bg-gray-200 p-2 border">Name</th>
          <th className="bg-gray-200 p-2 border">Roll No</th>
        </tr>
      </thead>
      <tbody>
        {lectureData && (lectureData.map((student:any) => (
          <tr key={student.rollNumber}>
            <td className="border px-4 py-1">{student.email}</td>
            <td className="border px-4 py-1">{student.name}</td>
            <td className="border px-4 py-1">{student.rollNumber}</td>
          </tr>
        )))}
      </tbody>
    </table>)
      : 
      <h2>No lecture data as on {formattedDate} </h2> 
      }
    </div>
  );
};

const CumulativeContent = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold">Cumulative Content Goes Here</h2>
      <p>This is the content for the Cumulative tab.</p>
    </div>
  );
};
