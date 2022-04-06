import Topbar from '../../topbar';
import Link from 'next/link';
import Sidebar from '../../sidebar';
import React,{Fragment} from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head  from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import {dimensionList,deleteDimension,cityList,getDimensionByCity} from '../../../actions/dimensionAction'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { FiTrash2,FiEdit } from "react-icons/fi";
const cookies = new Cookies();

const Dimension = () => {
    const [values, setValues] = useState({
        name: '',
        error: '',
        success: false,
        dimension: [],
        city:[],
        city_id:'',
        message: '',
        removed: false
    });
    const {city_id,city, name, error, success,dimension,message, removed } = values;
    const token = cookies.get('admin_token');


    useEffect(() => {
        loadDimension();
    }, [success, removed]);

    const loadDimension = () => {
        cityList(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
        dimensionList(token).then(dimensionData => {
            if (dimensionData.error) {
                console.log(dimensionData.error);
            } else {

                setValues({ ...values, 
                    dimension: dimensionData.dimension,
                    city: data.cities,
                            city_id:''
                });  
        }
        });
    }
});
        
      };

     
   
    const showError = () => (error ? alert(error) : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

   function edit(cell, row){
    


    }
    
    const iconformat=(cell, row)=>{ 
        
        const handleClick = e => {

            Router.push({
                pathname: '/slabs/dimension/editDimensionSlab',
                query: { _id: row._id },
            })


        }
        const handleDeleteClick = e => {
  
     Swal.fire({
         title: `Are you sure want to Delete ?`,
         text: "",
         icon: 'warning',
         allowOutsideClick:true,
         confirmButtonText: 'Yes',
         showCancelButton: true,
       }).then((result) => {
         if (result.isConfirmed) {
            deleteDimension(token,row._id).then(data => {
                 if (data.error) {
                     console.log(data.error);
                 } else {
 
                     var selections = distance;
 
                        
                           for(var i=0;i<selections.length;i++){
 
                             if(selections[i]._id === row._id){
                                selections.splice(i, 1);

                             }
 
                           }
                     setValues({ ...values, dimension:selections });
                 
             }
                 
             })
         }
       })
     };
 
           
 
          
             return (
         
                 <span>
                    <button  type="submit" className="btn btn-icon waves-effect waves-light btn-info"  onClick={handleClick}><FiEdit/></button> 

                    <button  type="submit" className="btn btn-icon waves-effect waves-light btn-danger" style={{marginLeft:"5px"}}  onClick={handleDeleteClick}> <FiTrash2/></button> 
                 </span>
             )
            
     
 }  

 const handleCityChange = name => e => {
    console.log(e.target.value)
    setValues({ ...values, error: false, [name]: e.target.value });

    getDimensionByCity(token,e.target.value ).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
 
      setValues({ ...values, dimension: data.dimension,city_id:data.city_id,loading:false});

        }
    });

};    
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
            <title>Dimension Slab</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Dimension Slab' />
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
                <h4 className="page-title float-left">Dimension Slab</h4>

                <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                    <li className="breadcrumb-item active">Dimension Slab</li>
                </ol>

                <div className="clearfix"></div>
            </div>
        </div>
    </div>
    <div className="row">
    
                                    
<div className="col-md-12">
    <div className="card-box">



            <div   style={{
               
                width: '98%'}}>
                       <div className="row">
                        <div className="col-md-2">
                        <Link href='/slabs/dimension/addDimensionSlab'><a><span  className="btn waves-effect waves-light " style={{backgroundColor:"#38AF00"}}><i className="fe-plus"></i>  Add Dimension Slab</span></a></Link>
                        </div>
                        <div className="col-md-2">
                         <div className="form-group ">
    <select id='single' className="form-control" value={city_id} name="city_id" required id="sel1" onChange={handleCityChange('city_id')} >
                <option value="all">All City</option>
                {city.map((person, i) =>
                    <option key={i} value={person._id} > {person.name}</option>
                )}
    
            </select>
    
      
      </div>
      </div>
      </div>
            
              
                    <BootstrapTable data={dimension}  pagination search dataSort striped hover>
                    <TableHeaderColumn width='50px' dataField='sno' dataAlign="center" dataSort isKey>S.No</TableHeaderColumn>
                    <TableHeaderColumn width='100px'  dataField='from' dataAlign="center"  dataSort> From (L*B*H) </TableHeaderColumn>
                    <TableHeaderColumn width='100px'  dataField='to' dataAlign="center" dataSort> To (L*B*H))</TableHeaderColumn>
                    <TableHeaderColumn width='100px' dataField='rate' dataAlign="center"  >Rate (Rs)</TableHeaderColumn> 
                    <TableHeaderColumn width='100px' dataField='gst' dataAlign="center"   >GST (Rs)</TableHeaderColumn>
                    <TableHeaderColumn width='100px' dataField='total' dataAlign="center"   >Total (Rs)</TableHeaderColumn>
                    <TableHeaderColumn width='100px' dataField='city' dataAlign="center"   >City </TableHeaderColumn>
                    <TableHeaderColumn width='100px' dataFormat={iconformat} dataAlign="center" dataSort>Actions</TableHeaderColumn>


                  
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

export default Dimension;