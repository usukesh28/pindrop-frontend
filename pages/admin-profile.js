import Topbar from './topbar';
import Link from 'next/link';
import Sidebar from './sidebar';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { adminProfile, updateAdminProfile, updateAdminProfileImage } from '../actions/profileAction';
import FilesUploadComponent from './files-upload.component';

const AdminProfile = () => {

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        image: '',
    });

    const { name, email, username, password, image } = values;
    useEffect(() => {
        loadAdminProfile()
    }, []);

    const loadAdminProfile = () => {
        adminProfile().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                setValues({ ...values, name: data.name, email: data.email, username: data.username, password: data.password, image: data.image });
            }
        });
    };

    const onFileChange = (e) => {
        console.log('onchange', e.target.files[0]);
        var formData = new FormData();
        formData.append('profileImg', e.target.files[0])
        var options = { content: formData };

        // updateAdminProfileImage(formData).then(data => {
        //     if (data.error) {
        //         console.log(data.error);
        //     } else {
        //         console.log(data);
        //         // setValues({ ...values, name: data.name, email: data.email, username: data.username, password: data.password, image: data.image });
        //     }
        // });

        // setValues({ image: e.target.files[0] })
    }
    const onProfilelImageSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', image)
        console.log(formData);
        // axios.post("http://localhost:4000/api/user-profile", formData, {
        // }).then(res => {
        //     console.log(res)
        // })
    }

    const handleSubmit = e => {
        e.preventDefault();
        //console.table({ username, mobile,chapter_id,role, error, loading, message, showForm });
        setValues({ ...values });
        const chapter = { name, username, email, password };

        updateAdminProfile(chapter).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                loadAdminProfile();
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                },2000)
            }
        });

    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    return (
        <div id="wrapper">
            <Head>
                <title>Profile</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Country' />
                <meta property="og:image" content="/icons/app_logo.jpeg" />
                <meta itemprop="image" content="/icons/app_logo.jpeg"></meta>
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
            </Head>
            <Topbar />
            <Sidebar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box">
                                    <h4 className="page-title float-left">Profile</h4>

                                    <ol className="breadcrumb float-right">
                                        <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                        <li className="breadcrumb-item active">Profile</li>
                                    </ol>

                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-3 col-md-6">
                                <div className="card-box" style={{ paddingBottom: "50px" }}>
                                    <h4 className="m-t-0 m-b-30 header-title"></h4>
                                    <div className="form-group form-inline">
                                        <label >Profile Update</label>
                                    </div>
                                    <form role="form" onSubmit={handleSubmit} >
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" className="form-control" value={name} placeholder="Name" id="name" name="name" onChange={handleChange('name')} required />
                                            <label class="margin-top-10">User name</label>
                                            <input type="text" className="form-control" value={username} placeholder="Username" id="username" name="username" onChange={handleChange('username')} required />
                                            <label class="margin-top-10">Email</label>
                                            <input type="text" className="form-control" value={email} placeholder="Email" id="email" name="email" onChange={handleChange('email')} required />
                                            <label class="margin-top-10">Password</label>
                                            <input type="text" className="form-control" value={password} placeholder="Password" id="password" name="password" onChange={handleChange('password')} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary" >Update</button>
                                        {loading ? <div class="alert alert-success margin-top-10">Updated successfully</div> : null}
                                    </form>
                                    {/* <FilesUploadComponent></FilesUploadComponent> */}
                                    {/* <form role="form" onSubmit={onProfilelImageSubmit}>
                                        <div className="form-group">
                                            <input type="file" onChange={onFileChange} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                    </form> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;