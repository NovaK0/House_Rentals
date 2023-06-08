import React from 'react'

const SellerContact = () => {
  return (
 <>
 <main id="main">
    <section className="intro-single">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <div className="title-single-box">
              <h1 className="title-single">Contact US </h1>
              <span className="color-text-a">Aut voluptas consequatur unde sed omnis ex placeat quis eos. Aut natus officia corrupti qui autem fugit consectetur quo. Et ipsum eveniet laboriosam voluptas beatae possimus qui ducimus. Et voluptatem deleniti. Voluptatum voluptatibus amet. Et esse sed omnis inventore hic culpa.</span>
            </div>
          </div>
         
        </div>
      </div>
    </section>

    <section className="contact">
      <div className="container">
        <div className="row">
         
          <div className="col-sm-12 section-t8">
            <div className="row">
              <div className="col-md-7">
                <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control form-control-lg form-control-a" placeholder="Your Name" required/>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input name="email" type="email" className="form-control form-control-lg form-control-a" placeholder="Your Email" required/>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" name="subject" className="form-control form-control-lg form-control-a" placeholder="Subject" required/>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea name="message" className="form-control" cols="45" rows="8" placeholder="Message" required></textarea>
                      </div>
                    </div>
                    <div className="col-md-12 my-3">
                      <div className="mb-3">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>
                      </div>
                    </div>

                    <div className="col-md-12 text-center">
                      <button type="submit" className="btn btn-a">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-5 section-md-t3">
                <div className="icon-box section-b2">
                  <div className="icon-box-icon">
                    <span className="bi bi-envelope"></span>
                  </div>
                  <div className="icon-box-content table-cell">
                    <div className="icon-box-title">
                      <h4 className="icon-title">Say Hello</h4>
                    </div>
                    <div className="icon-box-content">
                      <p className="mb-1">Email.
                        <span className="color-a">contact@example.com</span>
                      </p>
                      <p className="mb-1">Phone.
                        <span className="color-a">+54 356 945234</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="icon-box section-b2">
                  <div className="icon-box-icon">
                    <span className="bi bi-geo-alt"></span>
                  </div>
                  <div className="icon-box-content table-cell">
                    <div className="icon-box-title">
                      <h4 className="icon-title">Find us in</h4>
                    </div>
                    <div className="icon-box-content">
                      <p className="mb-1">
                        Manhattan, Nueva York 10036,
                        <br/> EE. UU.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="icon-box">
                  <div className="icon-box-icon">
                    <span className="bi bi-share"></span>
                  </div>
                  <div className="icon-box-content table-cell">
                    <div className="icon-box-title">
                      <h4 className="icon-title">Social networks</h4>
                    </div>
                    <div className="icon-box-content">
                      <div className="socials-footer">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a href="#" className="link-one">
                              <i className="bi bi-facebook" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#" className="link-one">
                              <i className="bi bi-twitter" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#" className="link-one">
                              <i className="bi bi-instagram" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="#" className="link-one">
                              <i className="bi bi-linkedin" aria-hidden="true"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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


  {/* <section classNameName="section-footer">
    <div classNameName="container">
      <div classNameName="row">
        <div classNameName="col-sm-12 col-md-4">
          <div classNameName="widget-a">
            <div classNameName="w-header-a">
              <h3 classNameName="w-title-a text-brand">House Rentals</h3>
            </div>
            <div classNameName="w-body-a">
              <p classNameName="w-text-a color-text-a">
                Enim minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat duis
                sed aute irure.
              </p>
            </div>
            <div classNameName="w-footer-a">
              <ul classNameName="list-unstyled">
                <li classNameName="color-a">
                  <span classNameName="color-text-a">Phone .</span> 0123456789
                </li>
                <li classNameName="color-a">
                  <span classNameName="color-text-a">Email .</span>  contact@example.com
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div classNameName="col-sm-12 col-md-4 section-md-t3">
          <div classNameName="widget-a">
            <div classNameName="w-header-a">
              <h3 classNameName="w-title-a text-brand">The Company</h3>
            </div>
            <div classNameName="w-body-a">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores tempore aut deleniti, est ullam fugit nisi iusto eligendi sint voluptatum unde tenetur nostrum nobis excepturi perferendis iste quibusdam molestiae ab?
            </div>
          </div>
        </div>
        <div classNameName="col-sm-12 col-md-4 section-md-t3">
          <div classNameName="widget-a">
            <div classNameName="w-header-a">
              <h3 classNameName="w-title-a text-brand">International sites</h3>
            </div>
            <div classNameName="w-body-a">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde rerum commodi debitis illo incidunt fuga ducimus, natus, facilis sint dignissimos, ab delectus corporis vel in impedit quod? Molestiae, recusandae?
                </div>
           
          </div>
        </div>
      </div>
    </div>
  </section> */}
 
 
 </>
  )
}

export default SellerContact;