import QRCode from 'qrcode';
import axios from 'axios';
import Link from 'next/link';

const generateQR = async text => {
  try {
    const qr = await QRCode.toDataURL(text, { // Use toDataURL instead of toFile
      errorCorrectionLevel: 'H',
      type: 'png'
    });
    return qr;
  } catch (err) {
    console.error(err)
  }
}

export default async function QR({ params }) {

  // Generate qr based on this password
  const randomstring = Math.random().toString(36).slice(-8);
  const paramSubject = params.subject;

  // Add lecture in database
  const data = { subject: paramSubject, qrcode: randomstring };
  try {
    const res = await axios.post("http://127.0.0.1:3000/api/newlecture", data);
    if (res) 
      console.log("Response got in subject qr code generation page: ", res);
    
    // Pass lecture id along with the qrcode text as data for generating qr code.
    const qrdata = {
      qrcodetext: randomstring,
      lectureid: res.data.data._id,
    }

    console.log("Now generating QR code based on this data:", qrdata);

    const qrCodeDataURL = await generateQR(JSON.stringify(qrdata));

    return (
      <div className='text-center flex flex-col items-center justify-center'>
        <h2 className='p-5'>{paramSubject} lecture QR CODE</h2>
        <img src={qrCodeDataURL} alt="QR Code" />
        <Link href={`/teacher/viewlog/${paramSubject}`} className='bg-slate-600 rounded-full text-white font-semibold px-4 py-2'>End</Link>
      </div>
    );
  } catch (error) {
    console.error("Error with Axios request: ", error);
    return <div>Error occurred</div>; // You might want to handle errors more gracefully
  }
}
