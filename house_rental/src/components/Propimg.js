import React from 'react'
import { useState} from 'react';
import {useEffect } from 'react';
import '../cssfile/App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import EXIF from 'exif-js';
const Propimg = (props) => {

  const [prop_id,setPropid] =useState(props.prop_id);
  
  const [propimg,setimg] = useState([]);
 
  useEffect(()=>{
    
    let options={
        method: 'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({"prop_id":prop_id})
    };
    const fetchimg=async()=>{
        let req = await fetch('Property/getpropimg',options)
        .then(res=>
            res.json()).
            then(data=>{
                
                setimg(data.data);
            })
        
    }
    fetchimg();
},[])


function handleFileUpload(e) {
  const file = e.target.files[0];
  const img = document.createElement("img");
  const reader = new FileReader();
  reader.readAsDataURL( );

  reader.onload = function (e) {
    img.src = e.target.result;
    EXIF.getData(img, function() {
      const exifData = EXIF.getAllTags(this);
      const make = exifData.Make;
      const model = exifData.Model;
      const date = exifData.DateTimeOriginal;
      const latitude = exifData.GPSLatitude;
      const longitude = exifData.GPSLongitude;
      // Compare the extracted data against known device and camera specifications
    });
  }
}
  return (
  <>
   <Carousel>
{
  propimg?
  propimg.map((img)=>{
    return(
      <>
        <img
          className="d-block w-100 imgghr"
          src={img}
          alt="Image"
        />

      </>
    )
  })
  :
  <div></div>
}
</Carousel>
  </>
  )
}

export default Propimg;