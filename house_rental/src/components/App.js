import React from 'react';
import Login from '../forms/Login.js';
import Home from './Home.js';
import Navbar from './Navbar.js';
import Registration from '../forms/Registration.js';
import About from './About.js';
import Property from './Property.js';
import Contact from './Contact.js';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import SellerHome from './seller/SellerHome.js';
import Addproperty from './seller/Addproperty.js';
import UpdateProperty from './seller/UpdateProperty.js';
import DeleteProperty from './seller/DeleteProperty.js';
import ListProperty from './seller/ListProperty.js';
import BuyerHome from './buyer/BuyerHome.js';
import Allproperties from './buyer/Allproperties.js';
import PropertyDescription from './PropertyDescription.js';
import RealEstateNews from './buyer/RealEstateNews.js';
import SellerAbout from './seller/SellerAbout.js';
import SellerContact from './seller/SellerContact.js';
import BuyerAbout from './buyer/BuyerAbout.js';
import BuyerContact from './buyer/BuyerContact.js';
import SellerDashboardSidebar from './seller/SellerDashboardSidebar.js';
import Wishlistpage from './buyer/Wishlistpage.js';
import Requests from './seller/Requests.js';
import Updatesingledet from './seller/Updatesingledet.js';
import Propimg from './Propimg.js';
import Avgcost from './seller/Avgcost.js';
import Buyerrequests from './buyer/Buyerrequests.js';
import Buyeravgcost from './buyer/Buyeravgcost.js';
import Ownedproperty from './buyer/Ownedproperty.js';
import Searchcityprop from './buyer/Searchcityprop.js';
import EasyInvoiceSample from './buyer/EasyInvoiceSample.js'
import Gmaps from './Gmaps.js'
const App = () => {




  return (



<>

<BrowserRouter>
<Routes>

<Route exact path="/" element={<Home/>}/>
<Route path="Home"  element={<Home/>}/>
<Route path = "/Property" element={<Property/>}/>
<Route path = "/RealEstateNews" element={<RealEstateNews/>}/>
<Route path = "/About" element={<About/>}/>
<Route path = "/Contact" element={<Contact/>}/>
<Route path = "/SellerHome" element={<SellerHome/>}/>
<Route path = "/SellerHome/:id" element={<SellerHome/>}/>
<Route path = "/SellerHome/:id/:id2" element={<SellerHome/>}/>
<Route path = "/BuyerHome" element={<BuyerHome/>}/>
<Route path = "/BuyerAbout"element={<BuyerAbout/>}/>
<Route path = "/BuyerContact"element={<BuyerContact/>}/>
<Route path = "/PropertyDescription"element={<PropertyDescription/>}/>
<Route path = "/RealEstateNews"element={<RealEstateNews/>}/>
<Route path="/ListProperty" element={<ListProperty/>}/>
<Route path="/Allproperties" element={<Allproperties/>}/>
<Route path="/SellerDashboardSidebar" element={<SellerDashboardSidebar/>}/>
<Route path="/Addproperty" element={<Addproperty/>}/>
<Route path="/Wishlistpage" element={<Wishlistpage/>}/>
<Route path="/Propimg" element={<Propimg/>}/>
<Route path="/Requests" element={<Requests/>}/>
<Route path="/Avgcost" element={<Avgcost/>}/>
<Route path="/Buyerrequests" element={<Buyerrequests/>}/>
<Route path="/Buyeravgcost" element={<Buyeravgcost/>}/>
<Route path="/Ownedproperty" element={<Ownedproperty/>}/>
<Route path="/Searchcityprop" element={<Searchcityprop/>}/>
<Route path="/EasyInvoiceSample" element={<EasyInvoiceSample/>}/>
<Route path="/Gmaps" element={<Gmaps/>}/>
</Routes>
</BrowserRouter>



</>
  )
}

export default App;