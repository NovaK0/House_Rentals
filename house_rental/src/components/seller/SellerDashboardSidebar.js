import React from 'react';
import { useState } from 'react';
import '../../cssfile/Seller.css';
import SellerNavbar from './SellerNavbar.js';
import add from '../../images/add_property.png';
import updateproperty from '../../images/updateproperty.png';
import deleteproperty from '../../images/deleteproperty.png';
import readproperty from '../../images/readproperty.png';
import Sellerhomecard from './Sellerhomecard';
import Addproperty from './Addproperty';
import UpdateProperty from './UpdateProperty';
import DeleteProperty from './DeleteProperty';
import ListProperty from './ListProperty';
import SellerHome from './SellerHome.js';
import { Link } from 'react-router-dom';
const SellerDashboardSidebar = () => {

  return (
    <>
 
   
  
    <div>

    <Link to='/SellerHome/Addproperty'>
    <div id = "firstimg">
    <img src={add} alt="Add Icon"/></div>
    <div id = "imgtext">Add Property</div>
    </Link>

    <Link to='/SellerHome/UpdateProperty'>
    <div id="otherimg"><img src={updateproperty} alt = "Update Property"/></div>
    <div  id="imgtext" >Update Details</div>
    </Link>

    <Link to='/SellerHome/DeleteProperty'>
    <div id="otherimg" style={{marginLeft:"1.7rem"}}><img src={deleteproperty} alt = "Delete Property"/></div>
    <div  id="imgtext">Delete Property</div>
    </Link>

    <Link to='/SellerHome/ListProperty'>
    <div id="otherimg" style={{marginLeft:"1.7rem"}}><img src={readproperty} alt = "Read Property"/></div>
   <div  id="imgtext">Property List</div>
   </Link>


 </div>
    

   
    </>
  )
}

export default SellerDashboardSidebar;