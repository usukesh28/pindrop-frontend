import Topbar from '../topbar';
import Link from 'next/link';
import Sidebar from '../sidebar';
import React,{Fragment} from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import Head  from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import {countryList,stateList,addState,editState,deleteLocation} from '../../actions/locationsActions'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
const cookies = new Cookies();

const States = () => {
    const [values, setValues] = useState({
        name: '',
        error: '',
        header:'Add State',
        success: false,
        states: [],
        countries: [],
        message: '',
        country_id:'',
        state_id:'',
        type:"add",
        removed: false
    });
    const { name, error, success,type,country_id, state_id,header,states,countries,message, removed } = values;
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
               
              setValues({ ...values, 
                countries: data.countries,
                states:stateData.states,
                name:'',header:"Add State",
                type:"add",country_id:'',state_id:''});
           }
            });  
        }
        });
        
      };
      // onSubmit={e => this.showData(e, id1)}

      const handleSubmit = e => {
        e.preventDefault();
        //console.table({ username, mobile,chapter_id,role, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const chapter = { name,country_id };

        if(type === "add"){
            addState(chapter,token).then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    loadCountries();
                }
            });
        }else if(type === "edit"){
            const states = { name,country_id ,state_id};
            editState(states,token).then(data => {
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
    const showError = () => (error ? alert(error) : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

   function edit(cell, row){
    const handleClick = e => {
        setValues({ ...values, error: false, name : row.name,header:"Edit State",type:"edit",country_id:row.country_id,state_id:row._id});
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

                    deleteLocation('State',token,row._id).then(data => {
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
            <title>State</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='State' />
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
                <h4 className="page-title float-left">State</h4>

                <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                    <li className="breadcrumb-item active">State</li>
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
                                        <div className="form-group">
                                            <input type="text" className="form-control" value={name} placeholder="State Name  " id="name" name="name" onChange={handleChange('name')} required />
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
            
              
                    <BootstrapTable data={states} cellEdit={cellEditProp } pagination search dataSort striped hover>
                    <TableHeaderColumn width='80px' dataField='sno' dataAlign="center" dataSort isKey>S.No</TableHeaderColumn>
                    <TableHeaderColumn width='180px'  dataField='name' dataAlign="center" editable={false} dataSort> State </TableHeaderColumn>
                    <TableHeaderColumn width='180px'  dataField='country_name' dataAlign="center" editable={false} dataSort> Country</TableHeaderColumn>
                    
                    <TableHeaderColumn width='80px' dataField='_id' dataAlign="center" editable={false} dataFormat={edit} >Edit</TableHeaderColumn> 
                    <TableHeaderColumn width='80px' dataField='_id' dataAlign="center" editable={false} dataFormat={deleteChap} >Delete</TableHeaderColumn>

                  
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

export default States;