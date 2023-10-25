//using separate component to use client side feature - using <BUTTON>
// main job to set alive flag to false.
// NOTE: This does not actually change flag as of now, it is simply redirecting to home.

"use client"

import { useRouter } from "next/navigation"

export default function EndLectureButton(props:any){
    const router = useRouter();

    const endLecture = ()=>{
        console.log("Lecture ended for "+ props.lectureid);
        router.push("/teacher/home");
    }

    return (
        <button onClick={endLecture} className="bg-teal-700 text-slate-50 p-2">
            End Lecture          
        </button>
    )
}