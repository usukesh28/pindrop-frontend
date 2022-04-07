import React from 'react';
import Link from 'next/link'
import { useEffect, useState } from 'react';

import Image from 'next/image';
import $ from 'jquery';
import { adminProfile } from '../actions/profileAction';
import Router from 'next/router';

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

  const [adminName, setAdminName] = useState();

  useEffect(() => {
    loadAdminProfile()
  }, []);

  const loadAdminProfile = () => {
    adminProfile().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAdminName(data.name);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem('id');
    Router.push(`/login`);
  }

  const signupForm = () => {
    return (

      <div id="wrapper">
        <div className="navbar-custom" >
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="dropdown notification-list">
              <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1">{adminName}</span>
              </a>
            </li>
            <li className="dropdown notification-list">
              <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <Link href='/admin-profile'><span className="ml-1">Profile <i class="fe-user"></i></span></Link>
              </a>
            </li>
            <li className="dropdown notification-list">
              <a className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <span className="ml-1" onClick={logout}>Logout  <i class="fe-log-out"></i></span>
              </a>
            </li>
          </ul>

          <div className="logo-box" style={{ marginLeft: '-20px', marginTop: '15px' }} >
            <a href="index.html" className="logo text-center">
              <span className="logo-lg">
                {/* <Image src="/icons/app_logo.jpeg" width="181" height="50" alt=""/>                            <!-- <span className="logo-lg-text-light">UBold</span> --> */}
              </span>
              <span className="logo-sm">
                {/* <!-- <span className="logo-sm-text-dark">U</span> --> */}
                {/* <img src="assets/images/logo-sm.png" alt="" height="28"> */}
                <Image src="/icons/app_logo.jpeg" width="28" height="28" alt="" />                            {/* <!-- <span className="logo-lg-text-light">UBold</span> --> */}

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

