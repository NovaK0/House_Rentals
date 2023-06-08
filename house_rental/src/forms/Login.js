import React from 'react';
import '../cssfile/login.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import loginsideimg from '../images/image(16).png'
const Login = ({childToParent}) => {
  const navigate=useNavigate();

  console.log("login");
  //to set login details
  const [Usertype,setUserType]=useState("");
  const [Email,setUserEmail]=useState("");
  const [Password,setPassword]=useState("");
 //error
 const [error,setError]=useState("");
 //Display
 const [dis,setDisplay]=useState("none");
 console.log(dis);

 //toggle between signup and login
  const handlestate=()=>{
    console.log("In login state toggle function");
    childToParent(false);
  }

 

//onSubmit login
const checkInputdetails=(e)=>
{
  e.preventDefault();
  const Usertype=document.getElementById("Usertype").value;
  const Email=document.getElementById("Email").value;
  const Password=document.getElementById("Password").value;

  setUserType("");
  setUserEmail("");
  setPassword("");

  if(Usertype=="")
  {
  setError("Please select UserType...");
  setDisplay(1);
  }
  else if(Email=="")
  {
    // console.log("ssss");
    setError("Please Enter Email...");
    setDisplay(1);
    // document.getElementById("alertss").style.display="block";
  }
  else if( Password=="")
  {
    setError("Please enter Password...");
    setDisplay(1);
  }
  else
  {
    const data={
      
      "Email":Email,
      "Password":Password,
      "Usertype":Usertype
    }
   
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }
    
    let req=fetch("http://localhost:5000/User/Login",options);
    req.then(res =>
          res.json()).then(d => 
            {
              if(d.Status)
              {
                alert(d.Status);
                
              }
              else
              {
                sessionStorage.setItem("useremailhouserenral",d.Email);
                sessionStorage.setItem("Useridhouserental",d.Userid);

      
                            
                if(Usertype=="Seller")
                {
                  navigate('../SellerHome');

                }
                else if(Usertype=="Buyer")
                {
                  console.log(Usertype);
                  navigate('../BuyerHome');
                 }
                }
          })


}}
  return (
    <>
   
    
    <div className='mainform'>
     <div className='loginsideimg'>
      <img src={loginsideimg} alt = "Image"/>
      
      </div> 
    <div className='form'>
    <div className='header'>Login</div>

    <form className='main_form' method='Post'>
    <div className="form-inner">
        <input type="email" placeholder="Email" id='Email' size='15' name='Email' required/>
        <input type="password" placeholder="Password" id='Password' size='15' name='Password' required/>

       
   <select className="form-select" style={{borderRadius:"1.2rem",height:"3.5rem",backgroundColor:"#d0dfe8",width:"19.5rem"}}  id="Usertype" name="Usertype">
  <option value="">Select User-Type</option>
  <option value="Seller">Seller</option>
  <option value="Buyer">Buyer</option>
</select> 
      
        <button type="submit" className='loginbutton' onClick={checkInputdetails}>Login</button>
        <div style={{color:"black",marginLeft:"42.5%"}}>OR</div> 
        <button type="button" className="btn btn-success" id='loginbutton1' onClick={handlestate}>Signup</button>
       
</div>
    </form>
    </div>
    </div>
  
    
    </>
  )
}

export default Login;