"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState,useEffect } from "react";
import Link from "next/link";
const QRReaderComponent = ()=>{
  const [scanerRsult,setScanerResult] = useState(null);

  useEffect(()=>{
    const scan =new Html5QrcodeScanner('render',{
      qrbox:{
        width:250,
        height:250,
      },
      fps:5,
    });
    scan.render(success,error)
    function success(result:any){
      scan.clear();
      setScanerResult(result);
    }
    function error(error:any){
     console.warn(error);
    }
  
  },[])

console.log(Html5QrcodeScanner)
  return (
    <div >
    
      
     
    <h1>QR code Scan</h1>
    <div >
      {scanerRsult?<div>Success:<Link href={'http://'+scanerRsult}>
        {scanerRsult}
        </Link></div>:<div id="render"></div>}
    </div>
   </div>
  );
};

export default QRReaderComponent;
