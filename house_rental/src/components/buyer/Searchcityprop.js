import React from 'react'
import Navbar from '../Navbar';
import { useState} from 'react';
import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Searchcityprop = () => {
  const navigate = useNavigate();
  const [userid,setUserid]=useState(sessionStorage.getItem("Useridhouserental"));
  const [propdata,setPropdata] = useState();
  const [isprop,setisprop] = useState(false);
  const [usertype,setType] = useState();
  const location = useLocation();
  const [city,setCity]=useState(location.state);
  


  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({city:city.city})

};

  const fetchtype =async() =>{
    
    let req = await fetch('/Property/getpropbycity',options)
  .then(res =>
    res.json().
    then(data=>{
      if(data.Message)
      {
          setisprop(false);
          
      }
      else{
       setPropdata(data);
       setisprop(true);
      }
     
    }))
  }

  useEffect(()=>{
    fetchtype();
  },[])

  const addtowishlist = async (prop_id) => {
    if (!userid) {
        alert("You need to login first");
    }
    else {
       const data = {
        "prop_id":prop_id,
        "userid":userid
       }
       let options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
       }
        let req = await fetch("/Property/wishlist",options)
        .then(res =>
            res.json().then(
                d=>{
                    alert(d.Status);
                }
            ))
    }


}

const openpropdetails=async(prop_id)=>{
    if(!userid)
    {
     alert("You need to login first");
    }
    else{
      navigate('../PropertyDescription', {state:{"id":prop_id}}); 
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
              <h1 className="title-single">Our Amazing Properties</h1>
             
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
  <div  style={{marginLeft:""}}>
    <h1>Sorry currently there are no properties available in {city.city}</h1>
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
 <button class="btn btn-wishlist" onClick={() => { addtowishlist(e.prop_id) }} id="button2">
        <svg width="56px"
             height="48px"
             version="1.1"
             xmlns="https://www.w3.org/200/svg">
            <path d="M 0 0
                   L 56 0
                   L 40 48
                   L 0 48"
                   stroke="none">
            </path>
        </svg>
        <div class="icon">
            <i class="fa fa-heart"></i>
        </div>
        <div class="label">
            <span class="label-text">
                Add To Wishlist
            </span>
        </div>
        </button></div>
          
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
                    {e.adtype==="Rent"?
                     <span class="price-a">Rs {e.rent}/month</span>
                     :
                     <>
                     <span class="price-a">Buy Rs {e.rent}</span>
                     </>
                    }
                       
                    </div>
                    <div> 
                      <button type="button" className="btn btn-outline-primary" onClick={() => { openpropdetails(e.prop_id) }}>Explore</button>
                      </div>

                </div>
                <div class="card-footer-a">
                    <ul class="card-info d-flex justify-content-around">

                        <li>
                            <h4 class="card-info-title">BHK</h4>
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


  <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>


  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>

 
  <script src="assets/js/main.js"></script>
    
    </>
  )
}

export default Searchcityprop;