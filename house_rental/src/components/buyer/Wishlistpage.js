import React from 'react'
import { useState} from 'react';
import {useEffect } from 'react';
import Navbar from '../Navbar';
import '../../cssfile/App.css';
import { useNavigate } from 'react-router-dom';
const Wishlistpage = () => {

  const [userid,setUserid]=useState(sessionStorage.getItem("Useridhouserental"));
  const [propdata,setPropdata] = useState();
  const [isprop,setisprop] = useState();
  const[vari,setVari] = useState(0);
  const navigate = useNavigate();
  const [usertype,setType] = useState();
 
  useEffect(()=>{
    const fetchtype =async() =>{
      if(userid==null)
    {
    
    }
    else{
     
      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"userid":userid})
    
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

  
useEffect(()=>{
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({"userid":userid})
    };
    const fetchprop=async () =>{
  
    let req = await fetch("/Property/listwishlist",options)
    .then(res=>
      res.json()).then(data=>{
        if(data.Status)
        {
          alert(data.Status)
          setisprop(false);
        }
        else{
          console.log(data);
          setPropdata(data);
          setisprop(true);
        }
      })
    }
    fetchprop();
  },[vari]);
 

  const openpropdetails=async(prop_id)=>{
    if(!userid)
    {
     alert("You need to login first");
    }
    else{
      navigate('../PropertyDescription', {state:{"id":prop_id}}); 
    }
   }
//remove from wishlist
const removewishlist=async(prop_id)=>{
  if (!userid) {
    alert("You need to login first");
}
else {
   const data = {
    "prop_id":prop_id
   }
   let options = {
    method:'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
   }
    let req = await fetch("/Property/removewishlist",options)
    .then(res =>
        res.json().then(
            d=>{
               setVari(vari+1);
                alert(d.Status);
            }
        ))
}
}


  return (
    <>
  <Navbar/>


    <main id="main">
   
<section className="intro-single">
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <div className="title-single-box">
          <h1 className="title-single">Your favorite House is here...</h1>
           
           
          </div>
        </div>
        <div className="col-md-12 col-lg-4">

        </div>
      </div>
    </div>
  </section>

 
  <section className="property-grid grid">
    <div className="container">
      <div className="row">
      
        {!isprop ?
<div className="spinner-border" style={{marginLeft:"40%"}} role="status">
</div>
:
propdata.map((e)=>
{
return(
 
  <div class="col-md-3" style={{ padding: "1rem" }} key={e.prop_id}>
  <div class="card-box-a card-shadow" style={{ height: "25rem" }}>
      <div class="img-box-a">
          <img src={e.logo} alt="" class="img-a img-fluid" style={{ height: "30rem" }} />
      </div>
      <div class="card-overlay">
        {usertype=="Seller"?
        <div></div>:
        <div className='btnzindex'>
          <button  type='button'class="btn btn-outline-danger" onClick={() => { removewishlist(e.prop_id) }} style={{marginTop:"2px"}}>Remove</button>
       
    </div>
        
        }
     
          <div class="card-overlay-a-content">
         
              <div class="card-header-a">
                  <h2 class="card-title-a">
                      <a >{e.pname}
                      </a>
                  </h2>
              </div>
              <div class="card-body-a">
                  <div class="price-box d-flex">
                      <span class="price-a">$ {e.rent}</span>
                  </div>
                  <div> <button type="button" className="btn btn-outline-primary" onClick={() => { openpropdetails(e.prop_id) }}>Explore</button></div>

              </div>
              <div class="card-footer-a">
                  <ul class="card-info d-flex justify-content-around">

                      <li>
                          <h4 class="card-info-title">Beds</h4>
                          <span>{e.ptype}</span>
                      </li>
                      <li>
                          <h4 class="card-info-title">Baths</h4>
                          <span>{e.nobathroom}</span>
                      </li>
                      <li>
                          <h4 class="card-info-title">Furnishing</h4>
                          <span>{e.furnishing}</span>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</div>
)
})

}
       
       </div>
    </div>
  </section>

</main>
<section className="section-footer"  style={{width:"100vw"}}>
  <div className="container">
    <div className="row">
      <div className="col-sm-12 col-md-4">
        <div className="widget-a">
          <div className="w-header-a">
            <h3 className="w-title-a text-brand">House Rentals</h3>
          </div>
          <div className="w-body-a">
            <p className="w-text-a color-text-a">
              Enim minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat duis
              sed aute irure.
            </p>
          </div>
          <div className="w-footer-a">
            <ul className="list-unstyled">
              <li className="color-a">
                <span className="color-text-a">Phone .</span> 0123456789
              </li>
              <li className="color-a">
                <span className="color-text-a">Email .</span>  contact@example.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-4 section-md-t3">
        <div className="widget-a">
          <div className="w-header-a">
            <h3 className="w-title-a text-brand">The Company</h3>
          </div>
          <div className="w-body-a">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tempore aut deleniti, est ullam fugit nisi iusto eligendi sint voluptatum unde tenetur nostrum nobis excepturi perferendis iste quibusdam molestiae ab?
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md-4 section-md-t3">
        <div className="widget-a">
          <div className="w-header-a">
            <h3 className="w-title-a text-brand">International sites</h3>
          </div>
          <div className="w-body-a">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde rerum commodi debitis illo incidunt fuga ducimus, natus, facilis sint dignissimos, ab delectus corporis vel in impedit quod? Molestiae, recusandae?
              </div>
         
        </div>
      </div>
    </div>
  </div>
</section>
    
    </>
  )
}

export default Wishlistpage;