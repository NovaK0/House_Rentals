import React from 'react';
import searchicon from '../../images/searchicon.png';
import '../../cssfile/Buyer.css';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
const Allproperties = () => {
  
    const [all,setall] = useState();
    const navigate = useNavigate();

//API for houses
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.RAPIDAPIKEY_2,
		'X-RapidAPI-Host': 'zoopla.p.rapidapi.com'
	}
};


useEffect(()=>
{
   
    const fetchhouse = async () =>
    {
        const url = 'https://zoopla.p.rapidapi.com/properties/list?area=Oxford&category=residential&order_by=age&ordering=descending&page_number=1&page_size=8'
         fetch(url,options)
        .then(response => response.json())
        .then(data =>{
            
          setall(data.listing)});
         

    }
    fetchhouse();
},[]);


    const gotohome=()=>
  {
    navigate('../Home');
  }
  
  const gotoBuyerHome=()=>
  {
    navigate('../');
  }
  const gotoAbout=()=>
  {
    navigate('../About');
  }
  const gotoContact=()=>
  {
    navigate('../Contact')
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
                    <div class="input-group mb-3" style={{ width: "15rem" }}>

                        <input type="text" class="form-control" placeholder='Search...' />&nbsp;&nbsp;
                        <div class="input-group-append"><button style={{ backgroundColor: "#2eca6a" }} class="btn btn-success"><img src={searchicon} alt="icon" />
                        </button></div>
                    </div>


                    <div class="dropdown" style={{marginTop:"-1rem",marginLeft:"1rem"}}>
                        <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-mdb-toggle="dropdown" aria-expanded="false">
                            Filters
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <a class="dropdown-item" href="#">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme1" />
                                        <label class="form-check-label" for="Checkme1">2BHK</label>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme2" checked />
                                        <label class="form-check-label" for="Checkme2">3BHK</label>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="Checkme3" />
                                        <label class="form-check-label" for="Checkme3">Bachelor's</label>
                                    </div>
                                </a>
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                           
                        </ul>
                    </div>
                </div>
            </nav>

          
            <div className='grid-container'>
            {!all?<>

<div style={{marginTop:"20rem"}} class="spinner-border" role="status">
  
</div>
</>
 :


    all.map((e)=>{
       
    return(
       
        <div class="col-md-3" style={{padding:"1rem", marginTop:"8rem"}} >
    <div class="card-box-a card-shadow">
      <div class="img-box-a">
        <img src={e.image_url} alt="" class="img-a img-fluid" style={{height:"30rem"}}/>
      </div>
      <div class="card-overlay">
        <div class="card-overlay-a-content">
          <div class="card-header-a">
            <h2 class="card-title-a">
              <a >{e.county}
              </a>
            </h2>
          </div>
          <div class="card-body-a">
            <div class="price-box d-flex">
              <span class="price-a">{e.listing_status} | $ {e.rental_prices.per_month}</span>
            </div>
            <div> <button type="button" className="btn btn-outline-primary">Explore</button></div>
          
          </div>
          <div class="card-footer-a">
            <ul class="card-info d-flex justify-content-around">
             
              <li>
                <h4 class="card-info-title">Beds</h4>
                <span>{e.num_bedrooms}</span>
              </li>
              <li>
                <h4 class="card-info-title">Baths</h4>
                <span>{e.num_bathrooms}</span>
              </li>
              <li>
                <h4 class="card-info-title">Furnishing</h4>
                <span>{e.furnished_state}</span>
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

    
        </>
    )
}

export default Allproperties;