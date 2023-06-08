import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const SellerNavbar = () => {
  const navigate = useNavigate();

  //gotohome
const gotohome=()=>
{
  sessionStorage.removeItem("useremailhouserenral");
  sessionStorage.removeItem("Useridhouserental");
  navigate('../Home');
}

  return (
    <>
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

          <Link to='/SellerHome/SellerContact'>
          <li className="nav-item">
          <button type="button" class="btn btn-light">Contact</button>
          </li>
          </Link>
        
          <li className="nav-item">
          <button type="button" class="btn btn-light" onClick={gotohome}>Logout</button>
          </li>
      
        </ul>
      </div>

    </div>
  </nav>
    
    
    </>
  )
}

export default SellerNavbar;