import QRCode from 'qrcode';
import Link from 'next/link';

const generateQR = async text => {
  try {
    const qr = (await QRCode.toFile('qr.png',text,{
        errorCorrectionLevel: 'H',
        type: 'png'
    }))

    console.log(qr);
    return qr; 
  } catch (err) {
    console.error(err)
  }
}

export default async function QR(){
    await generateQR("test");
    return <div>
            <img src="/qr.png"/>
            QR code
    </div>
}