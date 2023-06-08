import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { useNavigate,useLocation } from "react-router-dom";
import Navbar from '../Navbar';
import '../../cssfile/Seller.css';

const Updatesingledet = () => {
  const [dataa,setData] = useState();
  const [allimg,setallimg] = useState();
    const navigate = useNavigate();
    const [propdet,setpropdet] = useState();
    const [userid,setUserid] = useState(sessionStorage.getItem("Useridhouserental"));
    const [uploading, setUploading] = useState(false);
    const [adtype,setadtype] = useState();
  const [previmg,setprevimg] = useState();
    const [progress, setProgress] = useState(1);
    const [step,setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [logo,setLogo] = useState();
  const [rs,setRS] = useState(1);
  const[images,setImg]=useState("");

    const location = useLocation();
  
    const [prop_id,setPropid] = useState(location.state.id);
    
    useEffect(()=>{
        let options={
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"prop_id":prop_id})
        };
        const fetchdet=async()=>{

            let req = await fetch('Property/getsingleprop',options)
            .then(res=>
                res.json()).
                then(data=>{
                    setpropdet(data.props[0]);
                    setadtype(data.props[0].adtype);
                    setallimg(data.props[0].images);
                    setLogo(data.props[0].logo);
                })
            
        }
        fetchdet();
    },[prop_id])

    let imageUrls=[]



const stepUp = (e) =>{
    e.preventDefault();
    setStep(step+1);
  }
  
  const stepDown = (e) =>{
    e.preventDefault();
    setStep(step-1);
  }

  

  const handlelogo = async(e)=>{
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "owqakpor");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhrftdcwt/image/upload",
        formData
      );
      setLogo(response.data.secure_url);
      
    }
      catch (error) {
        console.log(error);
      }
  
  }
  

  const handleimg=async (e)=>
  {
     let files = e.target.files;
     const formData = new FormData();
     let arr = [];
     for (let i = 0; i < files.length; i++) {
       formData.append("file", files[i]);
       formData.append("upload_preset", "owqakpor");
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
       
        //  setImageUrl([...imageUrl,response.data.secure_url]);
         arr.push(response.data.secure_url);



        //  setImg([...images, imageUrl]);
        

       } catch (error) {
         console.log(error);
       }
     }
     setallimg([...allimg,...arr]);
    
    }
     let name,value;
const handleinputdetails=(e)=>{
  name = e.target.name;
  value = e.target.value
  setpropdet({...propdet,[name]:value});
 

}

const submitprop=async(e)=>{
    e.preventDefault();
    console.log("Pehle",allimg);
    console.log("ImageUrl",imageUrl);
   
    console.log("All",allimg);
    let vari2 = {...propdet,"logo":logo};
    let vari3 = {...propdet,"userid":userid};
    let vari4 = {...propdet,"adtype":adtype};
    
   console.log(allimg);
    const{ 
    prop_id,
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
    city,
    address,
    pincode,
    ptennants} = propdet;
 
    
    
  
   
    if(nobathroom==="" ||  rent==="" || proparea==="" || pname==="" ||  ptype==="" || 
    parea==="" || furnishing==="" || deposit==="" || city==="" ||  address==="" || pincode==="" ||
       availfrom===undefined)
    {
      alert("all fields are mandatory");
    }
    else{
      const res = await fetch("/Property/updatedet",{
        method: "POST",
        headers: {
          "Content-Type" :  "application/json",
          
        },
        body: JSON.stringify({
          prop_id,  
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
          allimg,
          logo,
          city,
          address,
          pincode,
          ptennants,
          adtype
        })
      });
      const resdata = await res.json();
      if(!resdata)
      {
        alert("Invalid Data");
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
<Navbar/>
  { adtype==="Rent" &&
<>
<section className="section0">
  <h1 style={{marginTop:"0.5rem"}}>Update Details</h1>

  <div className='formbodyprop'>
    <form>
    { step === 0 &&
    <>
    
    <div class="fieldgroup">
          <input type="text" name="pname" id="pname" onChange={handleinputdetails} value={propdet.pname} placeholder="Property Name" />
        </div>
        <div class="fieldgroup">
        <input type="number" placeholder='Rent per month' name="rent" id="rent" onChange={handleinputdetails} value={propdet.rent}  />
    
        </div>

        <div class="fieldgroup">
        <input type="number"placeholder='Deposit money' name="deposit" id="deposit" onChange={handleinputdetails} value={propdet.deposit}  />
          
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
    onChange={handleinputdetails} value={propdet.ptype}
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
    onChange={handleinputdetails} value={propdet.maintainance}
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
        <input type="number" placeholder='Property Area' name="proparea" id="proparea" onChange={handleinputdetails} value={propdet.proparea}  />
         
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
    onChange={handleinputdetails} value={propdet.parea}
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
    onChange={handleinputdetails} value={propdet.furnishing}
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
  <NativeSelect

  IconComponent={(_props) => (
    <div style={{ display: 'none' }}>
    </div>
  )}
   style={{width:"100%"}}
    defaultValue=""
    onChange={handleinputdetails} value={propdet.nobathroom}
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
    onChange={handleinputdetails} value={propdet.ptennants}
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
        <input type="text" placeholder='Address' name="address" id="address" onChange={handleinputdetails} value={propdet.address}  />
      
        </div> 
        <div class="fieldgroup">
        <input type="text" name="city" placeholder='City' id="city" onChange={handleinputdetails} value={propdet.city}  />
        
        </div> 
        <div class="fieldgroup">
        <input type="text" placeholder='Pincode' name="pincode" id="pincode" onChange={handleinputdetails} value={propdet.pincode}  />
         
        </div> 
       
      <div> Available from</div>
        <div class="fieldgroup" style={{marginTop:"-1rem"}}>
       
        <input type="date" name="availfrom" id="availfrom"  onChange={handleinputdetails} value={propdet.availfrom.toString().slice(0,10)}  />
        
        </div>
     
        <div> Property Logo</div>
        <div class="fieldgroup" style={{marginTop:"-.5rem"}}>
       
        <input type="file" name="logo" id="logo"  onChange={handlelogo}/>
        
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
       
        <input type="file" name="images" id="images"  onChange={handleimg} />
        
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
 adtype==="Sell" &&
  <>
<section className="section10">
  <h1 style={{marginTop:"0.5rem"}}>Update Details</h1>

  <div className='formbodyprop'>
    <form>
    { step === 0 &&
    <>
    
    <div class="fieldgroup">
          <input type="text" name="pname" id="pname" onChange={handleinputdetails} value={propdet.pname} placeholder="Property Name" />
        </div>
        <div class="fieldgroup">
        <input type="number" placeholder='Selling Price' name="rent" id="rent" onChange={handleinputdetails} value={propdet.rent}  />
    
        </div>

        <div class="fieldgroup">
        <input type="number"placeholder='Advance Money' name="deposit" id="deposit" onChange={handleinputdetails} value={propdet.deposit}  />
          
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
    onChange={handleinputdetails} value={propdet.ptype}
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
        <input type="number" placeholder='Property Area' name="proparea" id="proparea" onChange={handleinputdetails} value={propdet.proparea}  />
         
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
    onChange={handleinputdetails} value={propdet.parea}
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
    onChange={handleinputdetails} value={propdet.furnishing}
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
    onChange={handleinputdetails} value={propdet.nobathroom}
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
        <input type="text" placeholder='Address' name="address" id="address" onChange={handleinputdetails} value={propdet.address}  />
      
        </div> 
        <div class="fieldgroup">
        <input type="text" name="city" placeholder='City' id="city" onChange={handleinputdetails} value={propdet.city}  />
        
        </div> 
        <div class="fieldgroup">
        <input type="text" placeholder='Pincode' name="pincode" id="pincode" onChange={handleinputdetails} value={propdet.pincode}  />
         
        </div> 
       
      <div> Available from</div>
        <div class="fieldgroup" style={{marginTop:"-1rem"}}>
       
        <input type="date" name="availfrom" id="availfrom"  onChange={handleinputdetails} value={propdet.availfrom}  />
        
        </div>
     
        <div> Property Logo</div>
        <div class="fieldgroup" style={{marginTop:"-.5rem"}}>
       
        <input type="file" name="logo" id="logo"  onChange={handlelogo} value={propdet.logo}  />
        
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
       
        <input type="file" name="images" id="images"  onChange={handleimg} value = {propdet.images}/>
        
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

export default Updatesingledet;