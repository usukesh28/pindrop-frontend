import Topbar from '../../topbar';
import Link from 'next/link';
import Sidebar from '../../sidebar';
import React,{Fragment} from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head  from 'next/head';
import { useState, useEffect } from 'react';
import Router,{useRouter} from 'next/router';
import Cookies from 'universal-cookie';
import {editDimension,getDimensionById,cityList} from '../../../actions/dimensionAction'
const cookies = new Cookies();

const EditDimension = () => {
    const router = useRouter()
    console.log(router.query._id);
    const [values, setValues] = useState({
        name: '',
        error: '',
        success: false,
        from:'',
        to:'',
        rate:'',
        gst:'',
        total:0,
        city:[],
        city_id:'',
        _id:router.query._id,
        above :false,
        additional_rate:'',
        additional_gst:'',
      
        message: '',
        removed: false
    });
    const [total,setTotal]=useState(0);
    const [additional_total,setAdditionTotal]=useState(0);
    const { _id,name, error, success,from,to,city,city_id,rate,gst,above,additional_gst,additional_rate,message, removed } = values;
    const token = cookies.get('admin_token');


    useEffect(() => {
        loadCities();
    }, [success, removed]);

    const loadCities = () => {
        cityList(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

                getDimensionById(token,_id).then(dimension => {
                    if (dimension.error) {
                        console.log(data.error);
                    } else {
                        setValues({ ...values, 
                            city: data.cities,
                            from:dimension.from,
                            to:dimension.to,
                            rate:dimension.rate,
                            gst:dimension.gst,
                            additional_gst:dimension.additional_gst,
                            additional_rate:dimension.additional_rate,
                            above:dimension.above,
                            city_id:dimension.city_id});

                            setTotal(dimension.total);
                            setAdditionTotal(dimension.additional_total);

                    }
                });
       
      
   }
    }); 
        
      };

     
   
    const showError = () => (error ? alert(error) : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

   function edit(cell, row){
    


    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const chapter = { from,to,rate,gst,total,city_id,additional_gst,additional_rate,additional_total,above};

        editDimension(chapter,token,_id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                Router.push(`/slabs/dimension/dimensionSlab`);
            }
        });

    }
    const handleCheckBoxChange = name => e => {
        if(e.target.checked){
            setValues({ ...values, error: false, [name]: e.target.checked , to:'',rate:'',gst:'' });
            setTotal(0)

        }else {
            setValues({ ...values, error: false, [name]: e.target.checked , additional_rate:'',additional_gst:'',additional_total:0 });
            setAdditionTotal(0)
        }

    };

    const handleCityChange = name => e => {
        console.log(e.target.value)
        setValues({ ...values, error: false, [name]: e.target.value });

    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });

        const newValues = {
            ...values,
            [name]: e.target.value
        } 
        calc_total(newValues) 
    };
   
    const handleAboveChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });

        const newValues = {
            ...values,
            [name]: e.target.value
        } 
        calc_above_total(newValues) 
    };

    const calc_total = (newValues) => {
        const { rate ,gst} = newValues;
    
        var result = parseFloat(rate)  + parseFloat(gst);
       // const newTotal = parseInt(price) + parseInt(discount) 
        
        setTotal(result)
        setAdditionTotal(0)
    
        //setValues({ ...values, finalPrice: final_price.toString(), error: '' });
    
    } 

    const calc_above_total = (newValues) => {
        const { additional_rate ,additional_gst} = newValues;
    
        var result = parseFloat(additional_rate)  + parseFloat(additional_gst);
       // const newTotal = parseInt(price) + parseInt(discount) 
        
        setAdditionTotal(result)
        setTotal(0)
        //setValues({ ...values, finalPrice: final_price.toString(), error: '' });
    
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
            <title>Edit Dimension</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Edit Dimension' />
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
                <h4 className="page-title float-left">Edit Dimension</h4>

                <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                    <li className="breadcrumb-item active">Edit Dimension</li>
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
                                        

</div>


<form role="form" onSubmit={handleSubmit}  >
    <div className="form-group">
        <label>From</label>
            <input type="text" className="form-control" value={from} placeholder="Length * Breadth * Height" id="name" name="name" onChange={handleChange('from')} required />
                <div className="form-group mt-1 ml-1 row justify-content-start">
                <div className=" col-9">
                <div className="checkbox checkbox-primary">
                <input id="checkbox2" type="checkbox" value={above} onChange={handleCheckBoxChange('above')}/>
                        <label for="checkbox2"> Above </label>
                        </div>
                 </div> 
                </div>
                   </div>

            
                  {above ?
                  <div>
                               <div className="form-group ">
        <select id='single' className="form-control" value={city_id} name="city_id" required id="sel1" onChange={handleCityChange('city_id')} >
                    <option value="">Assign City</option>
                    {city.map((person, i) =>
                        <option key={i} value={person._id} > {person.name}</option>
                    )}
        
                </select>
        
        </div>
                    <div className="form-group">
                    <label>Additional Rate / Dimension</label>
                   <input type="text" className="form-control" value={additional_rate} placeholder="Additional Rate / Kg" id="name" name="name" onChange={handleAboveChange('additional_rate')}  />
                    </div>

                    <div className="form-group">
                    <label>GST / Dimension</label>
                    <input type="text" className="form-control" value={additional_gst} placeholder="GST / kg" id="name" name="name" onChange={handleAboveChange('additional_gst')}  />
                    </div>

                    <div className="form-group">
                    <label>Total</label>
                    <input type="text" className="form-control" value={additional_total} placeholder="0" id="name" name="name" onChange={handleAboveChange('additional_total')} readOnly  />
                    </div>
                </div>
                   
                   :
                   <div>

                   <div className="form-group">
                   <label>To</label>
                   <input type="text" className="form-control" value={to} placeholder="Length * Breadth * Height" id="name" name="name" onChange={handleChange('to')} required />
                    </div>
                    <div className="form-group mt-3">
        <select id='single' className="form-control" value={city_id} name="city_id" required id="sel1" onChange={handleCityChange('city_id')} >
                    <option value="">Assign City</option>
                    {city.map((person, i) =>
                        <option key={i} value={person._id} > {person.name}</option>
                    )}
        
                </select>
        
        </div>

                    <div className="form-group">
                   <label>Rate</label>
                   <input type="text" className="form-control" value={rate} placeholder="Rate" id="name" name="name" onChange={handleChange('rate')} required />
                    </div>

                    <div className="form-group">
                   <label>GST</label>
                   <input type="text" className="form-control" value={gst} placeholder="GST" id="name" name="name" onChange={handleChange('gst')} required />
                    </div>

                    <div className="form-group">
                   <label>Total</label>
                   <input type="text" className="form-control" value={total} placeholder="Total" id="name" name="name" onChange={handleChange('total')} required readOnly />
                    </div>
                    
                    </div>
              }
                                           
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
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


// EditDistance.getInitialProps = async (ctx) => {
//     const pid  = ctx.query._id
//         console.log(pid)
//     return pid
//   }

export default EditDimension;