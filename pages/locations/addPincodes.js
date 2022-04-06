import Topbar from '../topbar';
import Link from 'next/link';
import Sidebar from '../sidebar';
import React,{Fragment} from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'react-tagsinput/react-tagsinput.css' 
import TagsInput from 'react-tagsinput'
import Head  from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import {countryList,stateList,cityList,pincodesList,addPincodes,editPincodes,deleteLocation} from '../../actions/locationsActions'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import cityModel from '../../../backend/models/cityModel';
import Cities from './addCity';
const cookies = new Cookies();

const Pincodes = () => {
    const [values, setValues] = useState({
        name: '',
        error: '',
        header:'Add Pincodes',
        success: false,
        states: [],
        cities: [],
        countries: [],
        pincodes: [],
        pincodeValue:[],
        message: '',
        country_id:'',
        state_id:'',
        city_id:'',
        pincodes_id:'',
        type:"add",
        removed: false
    });
    const { name, error, success,type,country_id,city_id,pincodes,pincodeValue,pincodes_id, cities,state_id,header,states,countries,message, removed } = values;
    const token = cookies.get('admin_token');


    useEffect(() => {
        loadCountries();
    }, [success, removed]);

    const loadCountries = () => {
        countryList(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

                stateList(token).then(stateData => {
                    if (data.error) {
                        console.log(stateData.error);
                    } else {

                        cityList(token).then(cityData => {
                            if (data.error) {
                                console.log(cityData.error);
                            } else {

                                pincodesList(token).then(pincodesData => {
                                    if (data.error) {
                                        console.log(pincodesData.error);
                                    } else {
                                        setValues({ ...values, 
                                            countries: data.countries,
                                            states:stateData.states,
                                            cities:cityData.cities,
                                            pincodeValue:[],
                                            pincodes:pincodesData.pincodes,
                                            name:'',header:"Add Pincodes",
                                            type:"add",country_id:'',state_id:'',city_id:'',pincodes_id:''});
                                        
                                    }
                                }); 

                                

                            }
                        }); 
               
              
           }
            });  
        }
        });
        
      };
      // onSubmit={e => this.showData(e, id1)}

      const handleSubmit = e => {
        e.preventDefault();
        //console.table({ username, mobile,chapter_id,role, error, loading, message, showForm });

        console.log(pincodeValue)
        setValues({ ...values, loading: true, error: false });
        const chapter = { pincodeValue,country_id,state_id ,city_id};

        if(type === "add"){
            addPincodes(chapter,token).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    loadCountries();
                }
            });
        }else if(type === "edit"){
            const pins = { pincodeValue,country_id ,state_id,city_id,pincodes_id};
            editPincodes(pins,token).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    loadCountries();
                }
            });

        }


        
    };
    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };
    const handlePincodesChange  = e => {
        console.log(e)
       setValues({ ...values, error: false, pincodeValue: e });
    };
    const showError = () => (error ? alert(error) : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

   function edit(cell, row){
    const handleClick = e => {
        setValues({ ...values, error: false, pincodeValue : row.pincodes,header:"Edit Pincodes",type:"edit",country_id:row.country_id,city_id:row.city_id,state_id:row.state_id,pincodes_id:row._id});
    };



        return (
            <span>
                    <button type="submit" class="btn btn-icon waves-effect waves-light btn-info" onClick={handleClick}> <i class="fe-edit"></i> </button>
            </span>
        )
    }
    
           

    function deleteChap(cell, row){
        const handleClick = e => {
          //  setValues({ ...values, error: false,type:"delete",chapter_id:row._id})

            Swal.fire({
                title: 'Are you sure?',
                text: '',
                icon: 'question',
                allowOutsideClick:false,
                confirmButtonText: 'Ok',
                showCancelButton: true,

              }).then((result) => {
                if (result.isConfirmed) {

                    deleteLocation('City',token,row._id).then(data => {
                        if (data.error) {   
                            setValues({ ...values, error: data.error, loading: false });
                        } else {
                            
                            loadCountries();
                        }
                    });
                }
              })
         
            
        };
    
    
    
            return (
                <span>
                        <button type="submit" class="btn btn-icon waves-effect waves-light btn-danger" onClick={handleClick}> <i class="fa fa-times"></i> </button>
                </span>
            )
        }
    const signupForm = () => {

      function updateCell(row,cellName,cellValue,props){
        console.log("value"+cellValue)

       
           
      
            
       }
        const cellEditProp = {
            mode: 'click',
            afterSaveCell:updateCell
          
          };
    return (
        <div id="wrapper">

            <Head>
            <title>City</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='City' />
        <meta property="og:image" content="/icons/app_logo.jpeg" />
        <meta itemprop="image" content="/icons/app_logo.jpeg"></meta>
        <meta property="og:image:width" content="200" />
<meta property="og:image:height" content="200" />
            </Head>
        <Topbar/>
        <Sidebar/>
        <div className="content-page">
<div className="content">
<div className="container-fluid">

    <div className="row">
        <div className="col-12">
            <div className="page-title-box">
                <h4 className="page-title float-left">PinCodes</h4>

                <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                    <li className="breadcrumb-item active">PinCodes</li>
                </ol>

                <div className="clearfix"></div>
            </div>
        </div>
    </div>
    <div className="row">
    <div className="col-md-6">
    <div className="card-box" style={{paddingBottom: "50px"}}>
                                        <h4 className="m-t-0 m-b-30 header-title"></h4>
                                        <div className="form-group form-inline">
                                        <label >{header}</label>

    {/* <h4 className="m-t-0 m-b-30 header-title"></h4> */}
</div>
                                            {/* <form role="form" method="post" enctype="multipart/form-data" action={'/updateGoldPrice/'onChange={this.handlePriceChange}+this.state._id+'/?token=' + cookies.get("jwelre_admin_token")}> */}
                                            <form role="form" onSubmit={handleSubmit}  >

                                            <div className="form-group ">
    <select id='single' className="form-control" value={country_id} name="country_id" required id="sel1" onChange={handleChange('country_id')} >
                <option value="all">Select Country</option>
                {countries.map((person, i) =>
                    <option key={i} value={person._id} > {person.name}</option>
                )}
    
            </select>
    
      </div>
      <div className="form-group ">
    <select id='single' className="form-control" value={state_id} name="state_id" required id="sel1" onChange={handleChange('state_id')} >
                <option value="all">Select State</option>
                {states.map((person, i) =>
                    <option key={i} value={person._id} > {person.name}</option>
                )}
    
            </select>
    
      </div>
      <div className="form-group ">
    <select id='single' className="form-control" value={city_id} name="city_id" required id="sel1" onChange={handleChange('city_id')} >
                <option value="all">Select City</option>
                {cities.map((person, i) =>
                    <option key={i} value={person._id} > {person.name}</option>
                )}
    
            </select>
    
      </div>
                                        <div className="form-group">
                                        <TagsInput value={pincodeValue} className="form-control" placeholder="Add Pincodes" name="pincodes"  required id="pincodes" onChange={handlePincodesChange}  required/>
                                        </div>

                                        
                                           
                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                        </form>
                                    </div>
                                    </div>
                                    
<div className="col-md-12">
    <div className="card-box">



            <div   style={{
               
                width: '98%'}}>
              {/* <Link to='/add_category' class="btn btn-primary" style={{float:'left',backgroundColor:'#11abff'}}>Add Chapter</Link> */}
            
              
                    <BootstrapTable data={pincodes} cellEdit={cellEditProp } pagination search dataSort striped hover>
                    <TableHeaderColumn width='80px' dataField='sno' dataAlign="center" dataSort isKey>S.No</TableHeaderColumn>
                    <TableHeaderColumn width='180px' dataField='pincodes' dataAlign="center" dataSort >Pincodes</TableHeaderColumn>
                    <TableHeaderColumn width='180px'  dataField='city_name' dataAlign="center" editable={false} dataSort> City </TableHeaderColumn>
                    <TableHeaderColumn width='180px'  dataField='state_name' dataAlign="center" editable={false} dataSort> State </TableHeaderColumn>
                    <TableHeaderColumn width='180px'  dataField='country_name' dataAlign="center" editable={false} dataSort> Country</TableHeaderColumn>
                    
                    <TableHeaderColumn width='80px' dataField='_id' dataAlign="center" editable={false} dataFormat={edit} >Edit</TableHeaderColumn> 
                    {/* <TableHeaderColumn width='80px' dataField='_id' dataAlign="center" editable={false} dataFormat={deleteChap} >Delete</TableHeaderColumn> */}

                  
              </BootstrapTable>
              </div>
</div>
</div>

              </div>
                    </div>
                    </div>
                            </div>
          
        </div>
        
    );
}
return <React.Fragment>
    {showError()}
    {showMessage()}
    { signupForm()}
</React.Fragment>

};

export default Pincodes;