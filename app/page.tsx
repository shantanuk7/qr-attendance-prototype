//By default STUDENTS View is presented. 
//Teacher option provides further teacher access.

/*
QR code scanner using Html5QrcodeScanner package.
Once successfully scanned:
- scanned data stored in a const
- axios post request sends data to api/attendance route
- response received is either "Success in recording attendance" or some error.
- authentication, validation and mongodb querying is done on api/attendance route.
*/

"use client"
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
// import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import { UserAuth } from "./context/AuthContext"; // Use only UserAuth here, not AuthContextProvider

import Navbar from "./components/Navbar";
import axios from "axios";

export default function Home() {
  const [scanResult, setScanResult] = useState(null);
  const [attendance, setAttendance] = useState(false);
  const [correctUser, setCorrectUser] = useState(true);
  const { user, loading } = UserAuth(); // Destructure the 'loading' state
  
  useEffect(()=>{

    const checkUser = async () => {
      try {
        if (!loading && user) { // Check if user is available and loading is false
          console.log(user);
          const userData = { email: user.email };
          const checkUser = await axios.post("api/students/checkLogin", userData);
          (checkUser.data.success) ? setCorrectUser(true) : setCorrectUser(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    checkUser();

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox:{
        width: 250,
        height: 250,
      },
      fps: 3,
    },
    false //verbose
    );
  
    async function onScanSuccess (decodedText:any, decodedResult:any) {
      // handle the scanned code as you like, for example:
      console.log(`Code matched = ${decodedText}`, decodedResult);
      scanner.clear();
      setScanResult(decodedText); // Update the state with the scan result

      const dataInJson = JSON.parse(decodedText);
      console.log("this data is being sent to validate: ", dataInJson);
      const { lectureid, qrcodetext } = dataInJson;
  
      const sendData = {
        studEmail: user.email,
        lectureid: lectureid,
        qrcodetext: qrcodetext,
      };
  
      try {
        console.log("Starting axios post request...");
        const req = await axios.post("/api/students/attendance", sendData);
        console.log(req.data);

        if(req.data.success == false){
          setAttendance(false);
        } else {
          setAttendance(true);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    
    function onScanFailure(error:any) {
      // handle scan failure, usually better to ignore and keep scanning.
      // for example:
      console.warn(`Code scan error = ${error}`);
    }
  
    scanner.render(onScanSuccess, onScanFailure);

  }, [user, loading]);

  return (
    <main className="">
      <Navbar/>
        {
          (correctUser)
          ? ((scanResult && attendance)
            ? <div className="text-center p-5">Congratulations!! Your attendance has been marked!</div>
            : <div id="reader"></div>)
          : <div>Please login with a registered account.</div>
        }
    </main>

  )
}
