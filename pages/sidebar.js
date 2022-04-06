import React, { Component } from 'react';
import axios from 'axios';
import Link from 'next/link'
import $ from 'jquery';
import { FaFlask } from "react-icons/fa";
import { FiSettings, FiMapPin, FiPackage } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { FaRegFileAlt, FaSearchLocation } from "react-icons/fa";
import { RiEBike2Fill } from "react-icons/ri";

import { HiOutlineReceiptTax } from "react-icons/hi";
class Sidebar extends Component {
  componentDidMount() {
    //   $('.slimscroll-menu').slimscroll({
    //     height: 'auto',
    //     position: 'right',
    //     size: "6px",
    //     color: '#9ea5ab',
    //     wheelStep: 5,
    //     touchScrollStep: 20
    // });

    // sidebar - main menu
    //   $("#side-menu").metisMenu();


    // activate the menu in left side bar based on url
    $("#side-menu a").each(function () {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if (this.href == window.location.href) {
        $(this).addClass("active");
        $(this).parent().addClass("mm-active"); // add active to li of the current link
        $(this).parent().parent().addClass("mm-show");
        $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
        $(this).parent().parent().parent().addClass("mm-active");
        $(this).parent().parent().parent().parent().addClass("mm-show"); // add active to li of the current link
        $(this).parent().parent().parent().parent().parent().addClass("mm-active");
      }
    });
  }
  constructor() {
    super();
    //  window.postMessage('renderTable','*');
    this.state = {
      data: "",

    };
  }


  render() {
    const handleClick = (path) => {
      if (path === "/admin/login") {
        console.log("I clicked on the Login Page");
      }
      if (path === "/posts") {
        console.log("I clicked on the Posts Page");
      }
    };
    return (



      // //className="fe-airplay">
      <div className="left-side-menu" >

        {/* <Scrollbars style={{ width: '100%', height: '100%' }}> */}
        <div className="slimscroll-menu">

          <div id="sidebar-menu">

            <ul className="metismenu" id="side-menu">
              <li><Link href='/dashboard'><a><i className="fe-grid"></i><span>Dashboard</span></a></Link> </li>
              <li><Link href='/users'><a><i><BiUser /></i><span>Users</span></a></Link> </li>

              <li><Link href='/rider/rider'><a><i><RiEBike2Fill /></i><span>Riders</span></a></Link> </li>
              <li><Link href='/reports'><a><i><FaRegFileAlt /></i><span>Reports</span></a></Link> </li>
              <li><Link href='/tracking'><a><i><FaSearchLocation /></i><span>Track</span></a></Link> </li>
              {/* <li><Link href='/settings'><a><i><FiSettings/></i><span>Settings</span></a></Link> </li>  */}
              <li><a ><i><FiMapPin /></i><span>Locations</span><span className="menu-arrow"></span></a>
                <ul className="nav-second-level" aria-expanded="false">
                  <li ><Link href="/locations/addCountry">Add Country</Link>   </li>
                  <li><Link href="/locations/addState">Add State</Link>   </li>
                  <li><Link href="/locations/addCity">Add City/Town</Link>   </li>
                  <li><Link href="/locations/addPincodes">Add Pincodes</Link>   </li>

                </ul>
              </li>
              <li><a ><i><HiOutlineReceiptTax /></i><span>Slabs</span><span className="menu-arrow"></span></a>
                <ul className="nav-second-level " aria-expanded="false">
                  <li><Link href="/slabs/distanceSlab">Distance</Link>   </li>
                  <li><Link href="/slabs/newWeight/weightSlab">Weight</Link>   </li>
                  <li><Link href="/slabs/dimension/dimensionSlab">Dimension</Link>   </li>


                </ul>
              </li>

              <li><Link href='/package'><a><i><FiPackage /></i><span>Package</span></a></Link> </li>


              {/*  <li><Link href='/admin/tests/testslist'><a><i><FaVials/></i><span>Tests</span></a></Link> </li> 
               <li><Link href='/admin/tests/testslive'><a><i><FaVials/></i><span>Tests Live</span></a></Link> </li> 
                <br></br>
                <li><Link href='/'><a ><i className="fe-power"></i><span>Logout</span></a></Link></li>  */}


            </ul>

          </div>

          <div className="clearfix"></div>

          {/* </Scrollbars> */}
        </div>


      </div>

    );
  }
}

export default Sidebar;

