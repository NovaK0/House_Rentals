import React from 'react';
import '../../cssfile/addproperty.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import EXIF from 'exif-js';
import exifr from 'exifr';


const Addproperty = () => {
  const[images,setImg]=useState("");
  const [userid,setUserid]=useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step,setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [logo,setLogo] = useState();
  const [rs,setRS] = useState(0);
  const [adtype,setadtype] = useState("");
  const [fakecheck,setfake] = useState("false");

  const navigate=useNavigate();

   const [prop,setprop] = useState({
    pname:"",
    ptype :"",
    availfrom:"",
    rent:"",
    proparea:"",
    nobathroom:"",
    parea:"",
    furnishing:"",
    maintainance:"",
    deposit:"",
    city:"",
    address:"",
    pincode:"",
    ptennants:"",
    statuss:"Vacant"

});

useEffect(()=>{
  const fetcuserid=()=>{
    setUserid(sessionStorage.getItem("Useridhouserental"));}
    fetcuserid();
},[])

const stepUp = (e) =>{
  e.preventDefault();
  setStep(step+1);
}

const stepDown = (e) =>{
  e.preventDefault();
  setStep(step-1);
}

let imageUrls = [];

 async function handleFileUpload (e) {
  const file = e.target.files[0];
 // Check if the file is an image
 if (!file.type.startsWith('image/')) {
  console.log('Invalid file type. Please upload an image file.');
  return;
}


  exifr.parse(file)
 
  .then((exif) => {
  console.log("exif.make",exif.Model);
    // Check if the image has EXIF data indicating it was captured by a camera
    if (exif && exif.Make && exif.Model) {
      setfake(true);
      console.log('The image was captured by a camera.');
    } else {
      // Get the dimensions of the image
     alert("Images seems to be taken from internet") ;
     setfake(false);

      // Check if the image was likely downloaded from the internet
     
    }

  

  })
  .catch((error) => {
    console.log(error);
  });





}

const handlelogo = async(e)=>{
  let file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.UPLOAD);
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dhrftdcwt/image/upload",
      formData
    );
    setLogo(response.data.secure_url);
    console.log(logo);
  }
    catch (error) {
      console.log(error);
    }

}

const handleimg=async (e)=>
{
   let files = e.target.files;
   const formData = new FormData();
   handleFileUpload(e);
   if(fakecheck)
   {
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", process.env.UPLOAD );
      setUploading(true);
      
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dhrftdcwt/image/upload",
          formData,
          {
           onUploadProgress: (progressEvent) => {
             setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
           },
          }
        );
        setUploading(false);
        setProgress(0);
        setFile(null);
      
        setImageUrl([...imageUrl,response.data.secure_url]);
       
        
       //  console.log(imageUrls);
       
        setImg([...images, imageUrl]);
      } catch (error) {
        console.log(error);
      }
    }
   }
   
   else{

   }
   
   
}



let name,value;
const handleinputdetails=(e)=>{
  name = e.target.name;
  value = e.target.value
  setprop({...prop,[name]:value}); 

}

const setadtyperent =()=>{
  console.log("rent");
  setadtype("Rent");
  setRS(rs+1);
}

const setadtypesell =()=>{
  console.log("sell");
  setadtype("Sell");
  setRS(rs+2);
}



const submitprop=async(e)=>{
  e.preventDefault();
  
  let vari = {...prop,"images":imageUrl};
  let vari2 = {...prop,"logo":logo};
  let vari3 = {...prop,"userid":userid};
  let vari4 = {...prop,"adtype":adtype};

  const{ pname,
  ptype,
  availfrom,
  rent,
  proparea,
  nobathroom,
  parea,
  furnishing, 
  maintainance,
  deposit,
  city,
  address,
  pincode,
  ptennants,
statuss} = prop;

 
  if(nobathroom==="" ||  rent==="" || proparea==="" || pname==="" ||  ptype==="" || 
  parea==="" || furnishing==="" || deposit==="" || city==="" ||  address==="" || pincode==="" ||
     availfrom===undefined)
  {
    alert("all fields are mandatory");
  }
  else{
    const res = await fetch("/Property/addproperty",{
      method: "POST",
      headers: {
        "Content-Type" :  "application/json",
        
      },
      body: JSON.stringify({
        userid,
        pname,
        ptype,
        availfrom,
        rent,
        proparea,
        nobathroom,
        parea,
        furnishing, 
        maintainance,
        deposit,
        imageUrl,
        logo,
        city,
        address,
        pincode,
        ptennants,
        adtype,
        statuss
      })
    });
    const resdata = await res.json();
    if(!resdata)
    {
      alert("Invalid Registration");
    }
    else
    { 
      alert("Successfull");
      navigate('../SellerHome');

    }
  }

 
}


  return (
    <>

 {rs===0 &&
  <>
  <div className='selecttype'>
  <div class="card text-white bg-success mb-3" style={{maxWidth: "18rem"}}>
  <div class="card-header">Advertisement for Sell or Rent</div>
  <div class="card-body">
    <h5 class="card-title" style={{marginLeft:"35%"}}>Select</h5>
    <div className='buttonselect'>
    <button type="button" class="btn btn-light" onClick={setadtyperent}>Rent</button>
    <button type="button" class="btn btn-light" onClick={setadtypesell}>Sell</button>
    </div>
  </div>
</div>
  </div>
  </>
  }
{ rs===1 &&
<>
<section class="section0">
  <h1 style={{marginTop:"0.5rem"}}>Property Details</h1>

  <div className='formbodyprop'>
    <form>
    { step === 0 &&
    <>
    
    <div class="fieldgroup">
          <input type="text" name="pname" id="pname" onChange={handleinputdetails} value={prop.pname} placeholder="Property Name" />
        </div>
        <div class="fieldgroup">
        <input type="number" placeholder='Rent per month' name="rent" id="rent" onChange={handleinputdetails} value={prop.rent}  />
    
        </div>

        <div class="fieldgroup">
        <input type="number"placeholder='Deposit money' name="deposit" id="deposit" onChange={handleinputdetails} value={prop.deposit}  />
          
        </div>


        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
    Property Type
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.ptype}
    inputProps={{
      name: 'ptype',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="1BHK">1BHK</option>
    <option value="2BHK">2BHK</option>
    <option value="3BHK">3BHK</option>
    <option value="3BHK+">3BHK+</option>
  </NativeSelect>
        </div>

        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
   Maintainance Included
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.maintainance}
    inputProps={{
      name: 'maintainance',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
   
  </NativeSelect>
        </div>

        <div style={{marginLeft:"40%"}}>
        <button type="button" class="btn btn-success" onClick={stepUp}>Next</button>
          </div>
         

          </>
    }



{step === 1 &&
<>
<div class="fieldgroup">
        <input type="number" placeholder='Property Area' name="proparea" id="proparea" onChange={handleinputdetails} value={prop.proparea}  />
         
        </div>

       

        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
   Parking Area
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.parea}
    inputProps={{
      name: 'parea',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
   
  </NativeSelect>
        </div>

     
        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
   Furnishing Type
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.furnishing}
    inputProps={{
      name: 'furnishing',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="Full Furnished">Full Furnished</option>
    <option value="Semi Furnished">Semi Furnished</option>
    <option value="Unfurnished">Unfurnished</option>
  </NativeSelect>
        </div>

        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
  No of Bathrooms
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.nobathroom}
    inputProps={{
      name: 'nobathroom',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="2+">2+</option>
  </NativeSelect>
        </div>

        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
  Preferred tenants
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.ptennants}
    inputProps={{
      name: 'ptennants',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="Family">Family</option>
    <option value="Girls">Girls</option>
    <option value="Bachelor's">Bachelor's</option>
  </NativeSelect>
        </div>

        <div className='btnspn'>
        <div style={{marginLeft:"0%"}}>
        <button type="button" class="btn btn-success" onClick={stepDown}>Back</button>
          </div>

        <div style={{marginLeft:"65%"}}>
        <button type="button" class="btn btn-success" onClick={stepUp}>Next</button>
          </div>

        </div>
        


        </>


}
{
step===2&&
<>

 <div class="fieldgroup">
        <input type="text" placeholder='Address' name="address" id="address" onChange={handleinputdetails} value={prop.address}  />
      
        </div> 
        <div class="fieldgroup">
        <input type="text" name="city" placeholder='City' id="city" onChange={handleinputdetails} value={prop.city}  />
        
        </div> 
        <div class="fieldgroup">
        <input type="text" placeholder='Pincode' name="pincode" id="pincode" onChange={handleinputdetails} value={prop.pincode}  />
         
        </div> 
       
      <div> Available from</div>
        <div class="fieldgroup" style={{marginTop:"-1rem"}}>
       
        <input type="date" name="availfrom" id="availfrom"  onChange={handleinputdetails} value={prop.availfrom}  />
        
        </div>
     
        <div> Property Logo</div>
        <div class="fieldgroup" style={{marginTop:"-.5rem"}}>
       
        <input type="file" name="logo" id="logo"  onChange={handlelogo} value={prop.logo}  />
        
        </div>

        <div className='btnspn'>
        <div style={{marginLeft:"0%"}}>
        <button type="button" class="btn btn-success" onClick={stepDown}>Back</button>
          </div>

        <div style={{marginLeft:"65%"}}>
        <button type="button" class="btn btn-success" onClick={stepUp}>Next</button>
          </div>

        </div>


        </>}
        {
        step === 3&&
        <>

       
        <div> Property Images</div>
        <div class="fieldgroup" style={{marginTop:"-.5rem"}}>
       
        <input type="file" name="images" id="images"  onChange={handleimg} value = {prop.images}/>
        
        </div>
        {uploading && <div>Uploading... {progress}%</div>}
       


        <div className='btnspn'>
        <div style={{marginLeft:"0%"}}>
        <button type="button" class="btn btn-success" onClick={stepDown}>Back</button>
          </div>

        <div style={{marginLeft:"55%"}}>
        <button type="button" class="btn btn-success" onClick={submitprop}>Submit</button>
          </div>

        </div>
        </>

  } 
    </form>
  </div>
</section>
</>
}
{
  rs===2 &&
  <>
<section class="section0">
  <h1 style={{marginTop:"0.5rem"}}>Property Details</h1>

  <div className='formbodyprop'>
    <form>
    { step === 0 &&
    <>
    
    <div class="fieldgroup">
          <input type="text" name="pname" id="pname" onChange={handleinputdetails} value={prop.pname} placeholder="Property Name" />
        </div>
        <div class="fieldgroup">
        <input type="number" placeholder='Selling Price' name="rent" id="rent" onChange={handleinputdetails} value={prop.rent}  />
    
        </div>

        <div class="fieldgroup">
        <input type="number"placeholder='Advance Money' name="deposit" id="deposit" onChange={handleinputdetails} value={prop.deposit}  />
          
        </div>


        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
    BHK
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.ptype}
    inputProps={{
      name: 'ptype',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="1BHK">1BHK</option>
    <option value="2BHK">2BHK</option>
    <option value="3BHK">3BHK</option>
    <option value="3BHK+">3BHK+</option>
  </NativeSelect>
        </div>

        {/* <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
   Maintainance Included
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
    defaultValue=""
    onChange={handleinputdetails} value={prop.maintainance}
    inputProps={{
      name: 'maintainance',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
   
  </NativeSelect>
        </div> */}

        <div style={{marginLeft:"40%"}}>
        <button type="button" class="btn btn-success" onClick={stepUp}>Next</button>
          </div>
         

          </>
    }



{step === 1 &&
<>
<div class="fieldgroup">
        <input type="number" placeholder='Property Area' name="proparea" id="proparea" onChange={handleinputdetails} value={prop.proparea}  />
         
        </div>

       

        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
   Parking Area
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.parea}
    inputProps={{
      name: 'parea',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
   
  </NativeSelect>
        </div>

     
        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
   Furnishing Type
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.furnishing}
    inputProps={{
      name: 'furnishing',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="Full Furnished">Full Furnished</option>
    <option value="Semi Furnished">Semi Furnished</option>
    <option value="Unfurnished">Unfurnished</option>
  </NativeSelect>
        </div>

        <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
  No of Bathrooms
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
   IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
    defaultValue=""
    onChange={handleinputdetails} value={prop.nobathroom}
    inputProps={{
      name: 'nobathroom',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="2+">2+</option>
  </NativeSelect>
        </div>

        {/* <div class="fieldgroup">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
  Preferred tenants
  </InputLabel>
  <NativeSelect style={{width:"100%"}}
    defaultValue=""
    onChange={handleinputdetails} value={prop.ptennants}
    inputProps={{
      name: 'ptennants',
      id: 'uncontrolled-native',
    }}
    
  >
    <option value="">Select</option>
    <option value="Family">Family</option>
    <option value="Girls">Girls</option>
    <option value="Bachelor's">Bachelor's</option>
  </NativeSelect>
        </div> */}

        <div className='btnspn'>
        <div style={{marginLeft:"0%"}}>
        <button type="button" class="btn btn-success" onClick={stepDown}>Back</button>
          </div>

        <div style={{marginLeft:"65%"}}>
        <button type="button" class="btn btn-success" onClick={stepUp}>Next</button>
          </div>

        </div>
        


        </>


}
{
step===2&&
<>

 <div class="fieldgroup">
        <input type="text" placeholder='Address' name="address" id="address" onChange={handleinputdetails} value={prop.address}  />
      
        </div> 
        <div class="fieldgroup">
        <input type="text" name="city" placeholder='City' id="city" onChange={handleinputdetails} value={prop.city}  />
        
        </div> 
        <div class="fieldgroup">
        <input type="text" placeholder='Pincode' name="pincode" id="pincode" onChange={handleinputdetails} value={prop.pincode}  />
         
        </div> 
       
      <div> Available from</div>
        <div class="fieldgroup" style={{marginTop:"-1rem"}}>
       
        <input type="date" name="availfrom" id="availfrom"  onChange={handleinputdetails} value={prop.availfrom}  />
        
        </div>
     
        <div> Property Logo</div>
        <div class="fieldgroup" style={{marginTop:"-.5rem"}}>
       
        <input type="file" name="logo" id="logo"  onChange={handlelogo} value={prop.logo}  />
        
        </div>

        <div className='btnspn'>
        <div style={{marginLeft:"0%"}}>
        <button type="button" class="btn btn-success" onClick={stepDown}>Back</button>
          </div>

        <div style={{marginLeft:"65%"}}>
        <button type="button" class="btn btn-success" onClick={stepUp}>Next</button>
          </div>

        </div>


        </>}
        {
        step === 3&&
        <>

       
        <div> Property Images</div>
        <div class="fieldgroup" style={{marginTop:"-.5rem"}}>
       
        <input type="file" name="images" id="images"  onChange={handleimg} value = {prop.images}/>
        
        </div>
        {uploading && <div>Uploading... {progress}%</div>}
       


        <div className='btnspn'>
        <div style={{marginLeft:"0%"}}>
        <button type="button" class="btn btn-success" onClick={stepDown}>Back</button>
          </div>

        <div style={{marginLeft:"55%"}}>
        <button type="button" class="btn btn-success" onClick={submitprop}>Submit</button>
          </div>

        </div>
        </>

  } 
    </form>
  </div>
</section>
</>
  
}

    </>
  )
}

export default Addproperty;