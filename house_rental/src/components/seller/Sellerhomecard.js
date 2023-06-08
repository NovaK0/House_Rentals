import React, { useEffect } from 'react';
import { useState } from 'react';
import '../../cssfile/Seller.css';
import CardApi from './CardApi.js';
import { Link } from 'react-router-dom';
const Sellerhomecard = () => {

  
  const [carddata,setcardata] = useState(CardApi);
  
  

 

  return (
   <>
   <div className='updateleftmargin'>
   {carddata.map((element)=>{
      const {id,image,title,Description} = element;
      return(
        <> 
      <div className='sellerdashboardhomescreen'  key={id}>
        <div className='imgg'>
        <img src={image} alt = "Image"/>
        </div>
        <div style={{fontFamily:"initial", fontSize:"1.2rem",fontWeight:"400",color:"black"}}>
        {title}
        </div>
        <div style={{fontSize:"1rem",fontFamily:"initial",marginLeft:".5rem"}}>
        {Description}
        </div>
        <div><br/></div>
        {title==="Requests"?
        <Link to='/SellerHome/Requests'>
        <div>
          
        <button type="button" className="btn btn-success" >Read More</button>
        </div>
        </Link>
        
        :
        title==="Average Cost"?
        <Link to='/SellerHome/Avgcost'>
        <div>
          
        <button type="button" className="btn btn-success" >Read More</button>
        </div>
        </Link>
        :
  <div>
 <button type="button" className="btn btn-success" >Read More</button>
 </div>
        }
       
      </div>
        </>
      )
    })
    }
    
   </div>
   </>
  )
}

export default Sellerhomecard;