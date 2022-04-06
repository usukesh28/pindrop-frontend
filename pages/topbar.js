import React from 'react';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import $ from 'jquery';
const Topbar = () => {
  const [values, setValues] = useState({
    admin: [],
    name: '',
    dname: '',
    dimage: '',
    image: '',
    error: '',
    loading: false,
    message: '',
    showForm: true
  });

  const { name, dname, dimage, image, admin, error, loading, message, showForm } = values;

  useEffect(() => {
    $('.button-menu-mobile').on('click', function (event) {
      event.preventDefault();
      $('body').toggleClass('sidebar-enable');
      if ($(window).width() >= 768) {
        console.log("enlarge")

        $('body').toggleClass('enlarged');
        //  $('body').removeClass('enlarged');

      } else {
        $('body').removeClass('enlarged');
      }
    });
    // Topbar - main menu
    $('.navbar-toggle').on('click', function (event) {
      console.log("mobile")
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
    });

  }, []);


  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
  const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

  const signupForm = () => {
    return (

      <div id="wrapper">
        <div className="navbar-custom" >
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="dropdown notification-list">
              <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <span class="ml-1">Samuel <i className="mdi mdi-chevron-down"></i> </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome !</h6>
                </div>
              </div>

              <a className="navbar-toggle nav-link">
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
            </li>

            {/* <li className="dropdown">
                      <a className="nav-link   waves-effect waves-light nav-user mr-0" data-toggle="dropdown" href="#" role="button"
                         aria-haspopup="false" aria-expanded="false">
                          <img src="assets/images//agritech.png" alt="user-image" className="rounded-circle"/>
                           <span className="ml-1">{this.state.dname}<i className="mdi mdi-chevron-down"></i> </span>
                      </a>
                      <div className="dropdown-menu">
                         
                          <div className="dropdown-item noti-title">
                              <h6 className="text-overflow m-0">Welcome </h6>
                          </div>
      
                         
                         <Link href="/editprofile" >
                           <a className="dropdown-item notify-item">
                              <i className="fi-head"></i>My Account
                              </a>
                              </Link>
      
      
                        
                              <Link href="/" >
                              <a className="dropdown-item notify-item">
                              <i className="fi-power" onClick={this.logout}></i> Logout
                              </a>
                              </Link>
                         
      
                      </div>
                  </li> */}

          </ul>

          <div className="logo-box" style={{ marginLeft: '-20px', marginTop: '15px' }} >
            <a href="index.html" className="logo text-center">
              <span className="logo-lg">
                {/* <Image src="/icons/app_logo.jpeg" width="181" height="50" alt=""/>                            <!-- <span class="logo-lg-text-light">UBold</span> --> */}
              </span>
              <span className="logo-sm">
                {/* <!-- <span class="logo-sm-text-dark">U</span> --> */}
                {/* <img src="assets/images/logo-sm.png" alt="" height="28"> */}
                <Image src="/icons/app_logo.jpeg" width="28" height="28" alt="" />                            {/* <!-- <span class="logo-lg-text-light">UBold</span> --> */}

              </span>
            </a>
          </div>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>

              <button className="button-menu-mobile waves-effect waves-light">
                <i className="fe-menu"></i>
              </button>
            </li>

          </ul>

        </div>
      </div>
    );

  };

  return <React.Fragment>

    {signupForm()}
  </React.Fragment>
};





export default Topbar;

