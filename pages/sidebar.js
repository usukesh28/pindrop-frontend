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

import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';

// import './header.css';
import "react-pro-sidebar/dist/css/styles.css";

class Sidebar extends Component {
  componentDidMount() {

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
      <div className="left-side-menu" id="header">
        <ProSidebar>

          <Menu iconShape="square">
            <MenuItem ><i className="fe-grid"></i><Link href='/dashboard'><a><span className='margin-left-20'>Dashboard</span></a></Link> </MenuItem>
            <MenuItem ><i><BiUser /></i><Link href='/users'><a><span className='margin-left-20'>Users</span></a></Link> </MenuItem>
            <MenuItem ><i><RiEBike2Fill /></i><Link href='/rider/rider'><a><span className='margin-left-20'>Riders</span></a></Link> </MenuItem>
            <MenuItem ><i><FaRegFileAlt /></i><Link href='/reports'><a><span className='margin-left-20'>Reports</span></a></Link></MenuItem>
            <MenuItem ><i><FaSearchLocation /></i><Link href='/tracking'><a><span className='margin-left-20'>Track</span></a></Link> </MenuItem>

            <SubMenu title="Location">
              <MenuItem><Link href="/locations/addCountry">Add Country</Link> </MenuItem>
              <MenuItem><Link href="/locations/addState">Add State</Link> </MenuItem>
              <MenuItem><Link href="/locations/addCity">Add City/Town</Link></MenuItem>
              <MenuItem><Link href="/locations/addPincodes">Add Pincodes</Link> </MenuItem>
            </SubMenu>

            <SubMenu title="Slabs">
              <MenuItem><Link href="/slabs/distanceSlab">Distance</Link>  </MenuItem>
              <MenuItem><Link href="/slabs/newWeight/weightSlab">Weight</Link> </MenuItem>
              <MenuItem><Link href="/slabs/dimension/dimensionSlab">Dimension</Link></MenuItem>
            </SubMenu>
            <MenuItem ><i><FiPackage /></i><Link href='/package'><a><span className='margin-left-20'>Package</span></a></Link></MenuItem>
          </Menu>
        </ProSidebar>;

        <div className="clearfix"></div>
      </div>

    );
  }
}

export default Sidebar;

