import React from 'react';
import rentimg from '../../images/house.png';
import Navbar from '../Navbar';
import '../../cssfile/Buyer.css';
import searchicon from '../../images/searchicon.png';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import {useEffect } from 'react';
import FourProperties from '../FourProperties';

const BuyerHome = () => {

  const navigate = useNavigate();
  const [city,setcity] = useState();
const gotoAllprops =()=>
{
  navigate('../Property');
}

const gotonews =()=>
{
  navigate('../RealEstateNews');
}

const handleChange=(e)=>{
  setcity(e.target.value);
}
const searchbycity=()=>{
  navigate('../Searchcityprop',{state:{city}});
}
console.log(city);
  return (
   <>
  <Navbar/>
<div className="intro intro-carousel swiper position-relative">

<div className="swiper-wrapper">

  <div className="swiper-slide carousel-item-a intro-item bg-image" style={{backgroundImage:`url('../assets/img/buyerhomepagevilla.jpg')`}}>
    <div className="overlay overlay-a"></div>
    <div className="intro-content display-table">
    <div style={{marginTop:"20rem"}}>
    <div class="container d-flex justify-content-center">
  
	<div class="card mt-5 p-4">
  <h4 style={{marginTop:"-.5rem",fontFamily:"initial",fontWeight:"600"}}>Find Your Dream Home Here</h4>
		<div class="input-group mb-3">
    
			<input type="text" class="form-control" placeholder='Enter city name' name="city" onChange={handleChange} value={city}/>&nbsp;&nbsp;
			<div class="input-group-append"><button style={{backgroundColor:"#2eca6a"}} onClick={()=>{searchbycity(city)}} class="btn btn-success"><img src={searchicon} alt="icon"/>
</button></div>
		</div>
	</div>	
</div>
    </div>
    </div>
  </div>     
</div>

</div>



<main id="main">

  
<section className="section-services section-t8">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="title-wrap d-flex justify-content-between">
          <div className="title-box">
            <h2 className="title-a">Our Services</h2>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-4">
        <div className="card-box-c foo">
          <div className="card-header-c d-flex">
            <div className="card-box-ico">
              <span className="bi bi-cart"></span>
            </div>
            <div className="card-title-c align-self-center">
              <h2 className="title-c">Buy</h2>
            </div>
          </div>
          <div className="card-body-c">
            <p className="content-c">
              Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa,
              convallis a pellentesque
              nec, egestas non nisi.
            </p>
          </div>
          <div className="card-footer-c">
            {/* Button */}
            <button type="button" className="btn btn-light" >Read More</button>

          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card-box-c foo">
          <div className="card-header-c d-flex">
            <div className="card-box-ico">
              <span><img src={rentimg} alt = "Rent"/></span>
            </div>
            <div className="card-title-c align-self-center">
              <h2 className="title-c">Rent</h2>
            </div>
          </div>
          <div className="card-body-c">
            <p className="content-c">
              Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Mauris blandit
              aliquet elit, eget tincidunt
              nibh pulvinar a.
            </p>
          </div>
          <div className="card-footer-c">
          <button type="button" className="btn btn-light">Read More</button>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card-box-c foo">
          <div className="card-header-c d-flex">
            <div className="card-box-ico">
              <span className="bi bi-card-checklist"></span>
            </div>
            <div className="card-title-c align-self-center">
              <h2 className="title-c">Sell</h2>
            </div>
          </div>
          <div className="card-body-c">
            <p className="content-c">
              Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa,
              convallis a pellentesque
              nec, egestas non nisi.
            </p>
          </div>
          <div className="card-footer-c">
          <button type="button" className="btn btn-light" >Read More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="section-property section-t8" style={{marginTop:"-2rem"}}>
  <h2 className='title-a title-n'>All Properties</h2>
<div className='btnprop'>
  <button type="button" className="btn btn-outline-secondary" onClick={gotoAllprops}>All Properties</button>
  </div>    

<FourProperties/>
</section>




{/* <section className="section-news section-t8">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="title-wrap d-flex justify-content-between">
          <div className="title-box">
            <h2 className="title-a">Latest News</h2>
          </div>
          <div className="title-link">
          <button type="button" className="btn btn-outline-secondary" onClick={gotonews}>All News</button>
          </div>
        </div>
      </div>
    </div>

    <div id="news-carousel" className="swiper">
      <div className="swiper-wrapper">

        <div className="carousel-item-c swiper-slide">
          <div className="card-box-b card-shadow news-box">
            <div className="img-box-b">
              <img src="assets/img/post-2.jpg" alt="" className="img-b img-fluid"/>
            </div>
            <div className="card-overlay">
              <div className="card-header-b">
               
                <div className="card-title-b">
                  <h2 className="title-2" style={{color:"white"}}>
                   House is comming
                      <br></br> 
                  </h2>
                </div>
                <div className="card-date">
                  <span className="date-b">18 Sep. 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div className="news-carousel-pagination carousel-pagination"></div>
  </div>
</section> */}



{/* <section className="section-testimonials section-t8 nav-arrow-a">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="title-wrap d-flex justify-content-between">
          <div className="title-box">
            <h2 className="title-a">Testimonials</h2>
          </div>
        </div>
      </div>
    </div>

    <div id="testimonial-carousel" className="swiper">
      <div className="swiper-wrapper">

        <div className="carousel-item-a swiper-slide">
          <div className="testimonials-box">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <div className="testimonial-img">
                  <img src="assets/img/testimonial-1.jpg" alt="" className="img-fluid"/>
                </div>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="testimonial-ico">
                  <i className="bi bi-chat-quote-fill"></i>
                </div>
                <div className="testimonials-content">
                  <p className="testimonial-text">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, cupiditate ea nam praesentium
                    debitis hic ber quibusdam
                    voluptatibus officia expedita corpori.
                  </p>
                </div>
                <div className="testimonial-author-box">
                  <img src="assets/img/mini-testimonial-1.jpg" alt="" className="testimonial-avatar"/>
                  <h5 className="testimonial-author">Albert & Erika</h5>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    <div className="testimonial-carousel-pagination carousel-pagination"></div>

  </div>
</section> */}

</main>



<section className="section-footer">
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

export default BuyerHome;