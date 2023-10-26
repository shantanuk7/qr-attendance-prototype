"use client"
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  const [scanResult, setScanResult] = useState(null);
  const [attendance, setAttendance] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const checkUser = async () => {
      const getUserDetails = async () => {
        try {
          const res = await axios.get('/api/users/me/student');
          setEmail(res.data.data.email);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
    
      // Call the function to fetch user details when the component mounts.
      getUserDetails();
    const initializeScanner = async () => {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 3,
      },
      false //verbose
      );

      const onScanSuccess = async (decodedText:any, decodedResult:any) => {
        try {
          console.log(`Code matched = ${decodedText}`, decodedResult);
          scanner.clear();
          setScanResult(decodedText);

          const dataInJson = JSON.parse(decodedText);
          console.log("this data is being sent to validate: ", dataInJson);
          const { lectureid, qrcodetext } = dataInJson;

          const sendData = {
            studEmail: email,
            lectureid: lectureid,
            qrcodetext: qrcodetext,
          };

          console.log("Starting axios post request...");
          const req = await axios.post("/api/students/attendance", sendData);
          console.log(req.data);
          setAttendance(req.data.success);
          toast.success('Successfully Marked!')
          router.push("/student")
        } catch (error) {
          console.log(error);
        }
      };

      const onScanFailure = (error:any) => {
        console.warn(`Code scan error = ${error}`);
      };

      scanner.render(onScanSuccess, onScanFailure);
    };

    if (email) {
      initializeScanner();
    }
  }
  checkUser();
},[email, router]);

  return (
    <main className="">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
  {email ? (
    <div>
      <div id="reader"></div>
    </div>
  ) : (
    <div>
      {email ? (
        scanResult && attendance ? (
          <div className="text-center p-5">
            Congratulations!! Your attendance has been marked!
          </div>
        ) : (
          <div id="reader"></div>
        )
      ) : (
        <div>Please login with a registered account</div>
      )}
    </div>
  )}
</main>
  );
}
