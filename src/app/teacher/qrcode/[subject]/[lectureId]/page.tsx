import QRCode from 'qrcode';
import EndLectureButton from "@/app/teacher/components/EndLectureButton"

const generateQR = async (text:any) => {
  try {
    //Generating the QR Code with qrcode package:
    const qr = await QRCode.toDataURL(text);
    return qr;
  } catch (err) {
    console.error(err)
  }
}

export default async function QRpage({params}:any){
// Generate qr based on this password
  const randomstring = Math.random().toString(36).slice(-8);

  const paramSubject = decodeURIComponent(params.subject);
  // const paramSubject = params.subject;
  const lectureId = params.lectureId;
  // Add lecture in database
  const data = { subject: paramSubject, qrcode: randomstring };
  try {
    // Pass lecture id along with the qrcode text as data for generating qr code.
    const qrdata = {
      qrcodetext: randomstring,
      lectureid: lectureId,
    }

    console.log("Now generating QR code based on this data:", qrdata);

    const qrCodeDataURL = await generateQR(JSON.stringify(qrdata));

    console.log(params);
    return(
        <div className="flex flex-col text-center items-center">
            <h1>
                Attendance for : <strong> {' ' + (paramSubject)} </strong> 
            </h1>
            <h2>
                Lecture ID: {lectureId}
            </h2>

            <img src={qrCodeDataURL} alt="QR Code" className='max-w-xs'/>

            <EndLectureButton lectureId={params.lectureId}/>
        </div>
    )  } catch (error) {
        console.error("Error with Axios request: ", error);
        return <div>Error occurred</div>;
    }
}
