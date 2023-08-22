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
import { UserAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import axios from "axios";

export default function Home() {
  const [scanResult, setScanResult] = useState(null);
  const [attendance, setAttendance] = useState(false);
  const [correctUser, setCorrectUser] = useState(true);
  const { user, loading } = UserAuth();

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (!loading && user) {
          const userData = { email: user.email };
          const checkUserResponse = await axios.post("api/students/checkLogin", userData);
          setCorrectUser(checkUserResponse.data.success);
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkUser();

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
            studEmail: user.email,
            lectureid: lectureid,
            qrcodetext: qrcodetext,
          };

          console.log("Starting axios post request...");
          const req = await axios.post("/api/students/attendance", sendData);
          console.log(req.data);

          setAttendance(req.data.success);
        } catch (error) {
          console.log(error);
        }
      };

      const onScanFailure = (error:any) => {
        console.warn(`Code scan error = ${error}`);
      };

      scanner.render(onScanSuccess, onScanFailure);
    };

    if (!loading && user) {
      initializeScanner();
    }
  }, [user, loading]);

  return (
    <main className="">
      <Navbar/>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {correctUser ? (
            scanResult && attendance ? (
              <div className="text-center p-5">
                Congratulations!! Your attendance has been marked!
              </div>
            ) : (
              <div id="reader"></div>
            )
          ) : (
            <div>Please login with a registered account.</div>
          )}
        </div>
      )}
    </main>
  );
}

