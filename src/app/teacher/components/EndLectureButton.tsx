//using separate component to use client side feature - using <BUTTON>
// main job to set alive flag to false.
// NOTE: This does not actually change flag as of now, it is simply redirecting to home.

"use client"
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation"

export default function EndLectureButton(props:any){
    const router = useRouter();

    const endLecture = ()=>{
        console.log("Lecture ended for "+ props.lectureid);
        router.push("/teacher");
    }

    return (
        <Button
      onClick={endLecture}
      variant="contained" // Use a contained button style
      style={{
        backgroundColor: '#028a74', // Teal color
        color: '#fff', // Slate color
        padding: '8px 16px', // Adjust padding as needed
      }}
    >
      End Lecture
    </Button>
    )
}