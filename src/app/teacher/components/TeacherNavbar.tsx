"use client";

import { useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import { IconUserCircle } from "@tabler/icons-react";
import { IconBellFilled } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";
import { IconMenu2 } from "@tabler/icons-react";

export default function TeacherNavbar():React.FC {
  //Sidebar component requirement
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav>
      <div className="flex items-center justify-between p-1 h-12">
        <div className="flex items-center">
        
        <button onClick={toggleSidebar}>
          <IconMenu2 size={28} color="#374151" className="text-gray-700 m-1"/>
          
        </button>
          <h1 className="text-gray-700 font-semibold px-2 text-xl leading-loose">
            Attendance App
          </h1>
        </div>
        <div className="flex items-center">
          <IconBellFilled size={28} color="#374151" className="text-gray-700 m-1"/>
          <IconUserCircle size={32} color="#374151"/>
          <IconDotsVertical size={32} color="#374151"/>
        </div>
      </div>
      <hr className="text-gray-500 border border-1" />
      <TeacherSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
}
