import React from 'react';
import Login from '../forms/Login.js';
import rentimg from '../images/house.png';
import '../cssfile/App.css';
import Navbar from './Navbar.js';
import Registration from '../forms/Registration.js';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import FourProperties from './FourProperties.js';

const Home = () => {

const navigate = useNavigate();
const allrpop = () =>{
  navigate('../Property')

}


//to toggle between login and signup
const [reg,setReg] = useState(true);


//login to home passing props
const childToParent =(status)=>{  
  
  setReg(status);
}

//registration to home passing 
const childRegParent=(status1)=>
{
  setReg(status1);
}


  // Function to move to top
    const scrollToTop = () =>{
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };

  return (
    <>

<Navbar/>
<div className="intro intro-carousel swiper position-relative">

<div className="swiper-wrapper">

  <div className="swiper-slide carousel-item-a intro-item bg-image" style={{backgroundImage:`url("assets/img/slide-1.jpg")`}}>
    <div className="overlay overlay-a"></div>
    <div className="intro-content display-table">
      
 {/* Conditional rendring for login and Signup */}
{ reg?
    <div id='loginform'>
     <Login childToParent={childToParent}/>
      </div>:
      <div className="regdiv"><Registration childRegParent={childRegParent}/></div>
}   

    
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
            <button type="button" className="btn btn-light"onClick={scrollToTop} >Read More</button>

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
          <button type="button" className="btn btn-light"onClick={scrollToTop} >Read More</button>
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
          <button type="button" className="btn btn-light" onClick={scrollToTop} >Read More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="section-property section-t8" style={{marginTop:"-2rem"}}>
  <h2 className='title-a title-n'>All Properties</h2>
<div className='btnprop'>
  <button type="button" className="btn btn-outline-secondary" onClick={allrpop}>All Properties</button>
  </div>    
<FourProperties/>
</section>
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

export default Home;