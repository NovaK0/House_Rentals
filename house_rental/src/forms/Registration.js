import React from 'react'
import '../cssfile/registration.css';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";


const Registration = ({childRegParent}) => {
  const navigate = useNavigate();
const [det,setDet] = useState({
  Username:"",
  Password:"",
  Confirmpassword:"",
  Email:"",
  Usertype:"",
  ContactNo:"",
  Address:""
})
let name,value;
const handleinputdetails=(e)=>
{
  name = e.target.name;
  value = e.target.value
  setDet({...det,[name]:value});
}
const submitHandle=async (e)=>
{
  e.preventDefault();
  const {Username,
  Password,
  Confirmpassword,
  Email,
  Usertype,
  ContactNo,
  Address} = det;
  if (Password !==Confirmpassword)
  {
    alert("Password Doesn't match");
  }
  else{
    const res = await fetch("/User/SignUp",{
      method: "POST",
      headers: {
        "Content-Type" :  "application/json",
        
      },
      body: JSON.stringify({
        Username,
        Password,
        Email,
        Usertype,
        ContactNo,
        Address
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
      navigate('/Home');
    }
    console.log(det);
  }
 
}

const handleregchild = ()=>{
  
  childRegParent(true);
}

  return (
   <>

<div className="container1">
    <div className="title"><h4>SignUp</h4></div>
    <div className="content">
      <form action="#">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Username</span>
            <input type="text" placeholder="Enter username"  name="Username" onChange={handleinputdetails} value={det.Username} required/>
          </div>
  
          <div className="input-box">
            <span className="details">Email</span>
            <input type="text" placeholder="Enter your email"  name="Email" onChange={handleinputdetails} value={det.Email} required/>
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input type="text" placeholder="Enter your number" name="ContactNo" onChange={handleinputdetails} value={det.ContactNo} required/>
          </div>
          <div className="input-box">
            <span className="details">Address</span>
            <input type="text" placeholder="Enter permanent address"  name="Address" onChange={handleinputdetails} value={det.Address} required/>
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="text" placeholder="Enter your password" name="Password" onChange={handleinputdetails} value={det.Password} required/>
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input type="text" placeholder="Confirm your password" name="Confirmpassword" onChange={handleinputdetails} value={det.Confirmpassword} required/>
          </div>
        </div>
        
        <div className="gender-details">
        <span className="gender-title"  style={{marginLeft:"40%"}}>User Type</span>
        <div className='setradio'>
        <div className="radioset">
        <input type="radio" className='radioin' name="Usertype" value="Seller" id="dot-1"onChange={handleinputdetails}/> &nbsp;Seller
        </div>
        <div className="radioset">
        <input type="radio"className='radioin' name="Usertype" id="dot-2" value="Buyer"  onChange={handleinputdetails}/> &nbsp;Buyer
        </div>
        </div>
        </div>
      
        <div className="button9">
          <input type="button" onClick={submitHandle} value="SignUp"/>
        </div>
       <div style={{marginLeft:"45%"}}><b>OR</b></div>
       <div className="button9">
          <input  type="button" value="Login" onClick={handleregchild}/>
        </div>
       
      </form>
    </div>
  </div>
  
   </>
  )
}

export default Registration