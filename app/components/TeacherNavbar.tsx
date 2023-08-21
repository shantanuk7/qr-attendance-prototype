import Link from "next/link"

export default function TeacherNavbar(){
    return (
        <div className="h-20 w-full border-b-2 flex items-center justify-center p-2">
          <ul className="flex w-full justify-between px-3">

            <li className="p-2">
                Attendance App
            </li>
    
            <li className="p-2 cursor-pointer bg-slate-600 text-white rounded-md">
              <Link href="/teacher/subjects">Home</Link>
            </li>
            
          </ul>
        </div>
    )
}