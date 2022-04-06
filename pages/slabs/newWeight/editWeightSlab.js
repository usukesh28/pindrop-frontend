import Topbar from '../../topbar';
import Link from 'next/link';
import Sidebar from '../../sidebar';
import React,{Fragment} from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head  from 'next/head';
import { useState, useEffect } from 'react';
import Router,{useRouter} from 'next/router';
import Cookies from 'universal-cookie';
import {editWeight,getWeightById,cityList} from '../../../actions/weightAction'
const cookies = new Cookies();

const EditWeight = () => {
    const router = useRouter()
    console.log(router.query._id);
    const [values, setValues] = useState({
        name: '',
        error: '',
        success: false,
        weight:'',
        rate:'',
        gst:'',
        total:0,
        city:[],
        city_id:'',
        _id:router.query._id,
       
      
        message: '',
        removed: false
    });
    const [total,setTotal]=useState(0);
    const { _id,name, error, success,weight,city,city_id,rate,gst,message, removed } = values;
    const token = cookies.get('admin_token');


    useEffect(() => {
        loadCities();
    }, [success, removed]);

    const loadCities = () => {
        cityList(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

                getWeightById(token,_id).then(weight => {
                    if (weight.error) {
                        console.log(weight.error);
                    } else {
                        setValues({ ...values, 
                            city: data.cities,
                            weight:weight.weight,
                           
                            rate:weight.rate,
                            gst:weight.gst,
                           
                            city_id:weight.city_id});

                            setTotal(weight.total);

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
        const chapter = { weight,rate,gst,total,city_id};

        editWeight(chapter,token,_id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                Router.push(`/slabs/newWeight/weightSlab`);
            }
        });

    }
    

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
   
  

    const calc_total = (newValues) => {
        const { rate ,gst} = newValues;
    
        var result = parseFloat(rate)  + parseFloat(gst);
       // const newTotal = parseInt(price) + parseInt(discount) 
        
        setTotal(result)
    
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
            <title>Edit Weight</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Edit Weight' />
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
                <h4 className="page-title float-left">Edit Weight</h4>

                <ol className="breadcrumb float-right">
                    <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                    <li className="breadcrumb-item active">Edit Weight</li>
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
        <label>Weight in KG</label>
            <input type="text" className="form-control" value={weight} placeholder="Weight in Kg" id="name" name="name" onChange={handleChange('weight')} required />
               
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

export default EditWeight;