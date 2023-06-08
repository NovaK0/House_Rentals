import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import houseupdate from '../../images/home.png';
import { Link } from 'react-router-dom';
import '../../cssfile/Seller.css';
const UpdateProperty = () => {
const [userid,setUserid]=useState(sessionStorage.getItem("Useridhouserental"));
const [propdata,setPropdata] = useState();
const [isprop,setisprop] = useState();
const [data,setData] = useState();

const navigate = useNavigate();
useEffect(()=>{
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({"userid":userid})
  };
  const fetchprop=async () =>{

  let req = await fetch("/Property/checkproperty",options)
  .then(res=>
    res.json()).then(data=>{
      if(data.Status)
      {
        alert(data.Status)
       setisprop(false);
      }
      else{
        
        setPropdata(data);
        setisprop(true);
      }
    })
  }
  fetchprop();
},[]);



useEffect(()=>{
  if(!propdata)
  {
   
  }
  else{
    setData(propdata.length);
  }
},[])

// const updateprop=async(prop_id)=>{
//   navigate('../Updatesingledet', {state:{"id":prop_id}});
// }

console.log(data);
  return (
    <>
    {!isprop ?
    <div className='maincontainer2'>
   <div className="card text-white bg-warning mb-3" style={{maxWidth: "18rem", marginTop:"18%",marginLeft:"45%",}} >
   <div className="card-header">Add Property</div>
   <div className="card-body nopropcard">
     <h5 className="card-title">No Property</h5>
     <p className="card-text">You need to add properties first and then you will be able to see them here.</p>
   </div>
 </div>
 </div>
  :
  
  <div className='proptop'>
 { propdata.map((e)=>{
   return(
     <>
     <div className="col-md-3" style={{padding:"1rem"}} >
     <div className="card-box-a card-shadow"  style={{height:"25rem"}}>
       <div className="img-box-a">
         <img src={e.logo} alt="" className="img-a img-fluid" style={{height:"30rem"}}/>
       </div>
       <div className="card-overlay">
         <div className="card-overlay-a-content">
           <div className="card-header-a">
             <h2 className="card-title-a">
               <a >{e.pname}
               </a>
             </h2>
           </div>
           <div className="card-body-a">
             <div className="price-box d-flex">
             {e.adtype==="Rent"?
                     <span class="price-a">Rs {e.rent}/month</span>
                     :
                     <>
                     <span class="price-a">Buy Rs {e.rent}</span>
                     </>
             }
             </div>


             {e.statuss==="Vacant"?
             <Link to='/SellerHome/UpdateProperty/Updatesingledet'
             state={{id:e.prop_id}}
            >
             <div>
             <button type="button" className="btn btn-outline-primary">Update</button>
            </div>
              </Link>:
             
              <div>
              <button type="button" disabled className="btn btn-outline-primary">Update</button>
             </div>
            
            
            }
             
             
             
           </div>
           
           <div className="card-footer-a">
             <ul className="card-info d-flex justify-content-around">
              
               <li>
                 <h4 className="card-info-title">Beds</h4>
                 <span>{e.ptype}</span>
               </li>
               <li>
                 <h4 className="card-info-title">Baths</h4>
                 <span>{e.nobathroom}</span>
               </li>
               <li>
                 <h4 className="card-info-title">Furnishing</h4>
                 <span>{e.furnishing}</span>
               </li>
             </ul>
           </div>
         </div>
       </div>
     </div>
   </div>
 
     </>
   )
  })}
  
  </div>
    }
    
    </>
  )
}

export default UpdateProperty;