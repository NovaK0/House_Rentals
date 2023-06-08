import React from 'react';
import Navbar from '../Navbar'
import Addproperty from './Addproperty';
import UpdateProperty from './UpdateProperty';
import DeleteProperty from './DeleteProperty';
import ListProperty from './ListProperty';
import Sellerhomecard from './Sellerhomecard';
import SellerDashboardSidebar from './SellerDashboardSidebar';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import '../../cssfile/Seller.css';
import SellerAbout from './SellerAbout.js';
import SellerContact from './SellerContact';
import Updatesingledet from './Updatesingledet';
import Requests from './Requests';
import Avgcost from './Avgcost';

const SellerHome = () => {
    const [data,setData] = useState();
    const childtoparent=(childata)=>{
        setData(childata);
    }

   

    var comp = <Sellerhomecard/>;
    const {id,id2}=useParams();
    console.log(id2)
   
     if(id2=="Updatesingledet")
    {
       
         comp = <Updatesingledet/>;
    }



    if(id=="Addproperty")
    {
        comp = <Addproperty/>;
    }
    else if(id=="Requests")
    {
        comp = <Requests/>
    }
    
    else if(id=="UpdateProperty" && id2==undefined)
    {
        console.log('In Update')
        comp = <UpdateProperty/>;
    }
    else if(id=="DeleteProperty")
    {
        comp = <DeleteProperty/>;
    }
    else if(id=="ListProperty")
    {
        comp = <ListProperty childtoparent={childtoparent}/>;
    }
    else if(id=="SellerAbout")
    {
        comp = <SellerAbout/>;
    }
    else if(id=="SellerContact")
    {
        comp = <SellerContact/>;
    }
    
    else if(id=="Avgcost")
    {
        console.log("in avg")
         comp = <Avgcost/>;
    }

    console.log("id2",id);
   

  



  return (

   <>
    <Navbar/>
   { data >4?
    <div>
    
    <div className='sidebarmain'><SellerDashboardSidebar/></div>
  <div className='maincontainer3'>
    
  {comp}
     
     </div>  
     </div>
    
     :


     <div>
    
     <div className='sidebarmain'><SellerDashboardSidebar/></div>
   <div className='maincontainer2'>
     
   {comp}
      
      </div>  
      </div>
   }
  
    </>
  )
}

export default SellerHome;