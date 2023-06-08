import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import wishlogo from '../images/heart(2).png';
const Navbar = () => {
  const navigate = useNavigate();
  const [isloggedin,setLogin]=useState(sessionStorage.getItem("Useridhouserental"));
  const [userid,setUserid] = useState();
  const [usertype,setType] = useState();


 
useEffect(()=>{
const fetchtype =async() =>{
  if(isloggedin==null)
{

}
else{

  setUserid(isloggedin);
 
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({"userid":isloggedin})

};
  let req = await fetch('/User/gettype',options)
.then(res =>
  res.json().
  then(data=>{
    if(data.status)
    {
     
    }
    else{
    
      setType(data[0].Usertype);
    }
   
  }))
}}
fetchtype();
},[]);

  
//gotohome
const gotohome=(e)=>
{
  e.preventDefault();
  navigate('../');
}

//goto about
const gotoabout=(e)=>
{
  e.preventDefault();
  navigate('../About');
}
//goto property
const gotoproperty=(e)=>
{
  e.preventDefault();
  navigate('../Property');
}
//goto contact
const gotocontact=(e)=>
{
  e.preventDefault();
  navigate('../Contact');
}
//goto top
const gototop=(e)=>{
  e.preventDefault();
  navigate('../');
  window.scrollTo({
    top: 0, 
    behavior: 'smooth'
  });
}
//BuyerHome
const gotoBuyerHome=(e)=>
{
  e.preventDefault();
  navigate('/BuyerHome');
}

//Goto Wishlist
const wishlistpage=(e)=>
{ e.preventDefault();
  navigate('/Wishlistpage');
}

//Goto requests
const gotorequests=()=>{
  navigate('../Buyerrequests');
}

//Goto Average Cost
const gotoavgcost=()=>{
  navigate('../Buyeravgcost');
}

//Goto owned property
const gotoownedprop=()=>{

  navigate('../Ownedproperty');
  
}

//logout
const logout =(e)=>{
  e.preventDefault();
  sessionStorage.removeItem("useremailhouserenral");
  sessionStorage.removeItem("Useridhouserental");
  navigate('../');
}
  return (
    <>


  {usertype == "Seller"?
  <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
    <div className="container">
      <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
<h3>House<span className="color-b">Rentals</span></h3>

      <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
        <ul className="navbar-nav">

        <Link to='/SellerHome/Sellerhomecard'>
          <li className="nav-item">
          <button type="button" class="btn btn-light">Home</button>
          </li>
        </Link>

          <Link to='/SellerHome/SellerAbout'>
          <li className="nav-item">
          <button type="button" class="btn btn-light">About</button>
          </li>
          </Link>

          <Link to='/Property'>
          <li className="nav-item">
          <button type="button" class="btn btn-light">Properties</button>
          </li>
          </Link>
         


      
        </ul>
      </div>

    </div>

    <div  style={{marginRight:"4rem"}}> 
    <button type="button" class="btn btn-danger" onClick={logout}>Logout</button>
    </div>
  </nav>
  :  usertype=="Buyer"?
  <nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
  <div className="container">
    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
  <h3>House<span className="color-b">Rentals</span></h3>

    <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
      <ul className="navbar-nav">


        <li className="nav-item">
        <button type="button" className="btn btn-light" onClick={gotoBuyerHome}>Home</button>
        </li>
  

 
        <li className="nav-item">
        <button type="button" className="btn btn-light" onClick={gotoabout}>About</button>
        </li>
     
        <li className="nav-item">
          <button type="button" class="btn btn-light" onClick={gotoproperty}>Property</button>
          </li>

      
       
        <li className="nav-item">
        <div class="dropdown">
  <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    More
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <button class="dropdown-item" onClick={gotorequests}>Requests</button>
    <button class="dropdown-item" onClick={gotoavgcost}>Price Trends </button>
    <button class="dropdown-item" onClick={gotoownedprop}>Owned Property</button>
  </div>
</div>
</li>
      </ul>
    </div>

  </div>
  <div style={{marginRight:"2rem"}}>
    <button style={{background:"white",border:"none",padding:"2px"}} type='button' onClick={wishlistpage}><img src={wishlogo} alt="Wishlist"/>Wishlist</button>
  </div>
  <div  style={{marginRight:"4rem"}}> 
    <button type="button" class="btn btn-danger" onClick={logout}>Logout</button>
    </div>
</nav>
:
<nav className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top">
    <div className="container">
      <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
<h3>House<span className="color-b">Rentals</span></h3>

      <div className="navbar-collapse collapse justify-content-center" id="navbarDefault">
        <ul className="navbar-nav">

          
          <li className="nav-item">
          <button type="button" class="btn btn-light" onClick={gotohome}>Home</button>
          </li>

          <li className="nav-item">
          <button type="button" class="btn btn-light" onClick={gotoabout}>About</button>
          </li>

          <li className="nav-item">
          <button type="button" class="btn btn-light" onClick={gotoproperty}>Property</button>
          </li>

         
        </ul>
      </div>
    </div>
    <div  style={{marginRight:"4rem"}}> 
    {isloggedin===null?
    <button  type="button" class="btn btn-success" onClick={gototop}>Login</button>
    :
    <button type="button" class="btn btn-danger" onClick={logout}>Logout</button>
    }
    </div>
  </nav>
}
    </>
  )
}

export default Navbar;