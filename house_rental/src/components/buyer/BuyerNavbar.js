import React from 'react';
import { useNavigate } from 'react-router-dom';
const BuyerNavbar = () => {
  const navigate = useNavigate();
  const gotohome=()=>
{
  navigate('../Home');
}

const gotoBuyerHome=()=>
{
  navigate('/BuyerHome');
}
const gotoAbout=()=>
{
  navigate('/BuyerAbout');
}
const gotoContact=()=>
{
  navigate('/BuyerContact')
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


          <li className="nav-item">
          <button type="button" className="btn btn-light" onClick={gotoBuyerHome}>Home</button>
          </li>
    

   
          <li className="nav-item">
          <button type="button" className="btn btn-light" onClick={gotoAbout}>About</button>
          </li>
       

        
          <li className="nav-item">
          <button type="button" className="btn btn-light" onClick={gotoContact}>Contact</button>
          </li>
        
        
          <li className="nav-item">
          <button type="button" className="btn btn-light" onClick={gotohome}>Logout</button>
          </li>
      
        </ul>
      </div>

    </div>
  </nav>
    
    
    
    </>
  )
}

export default BuyerNavbar;