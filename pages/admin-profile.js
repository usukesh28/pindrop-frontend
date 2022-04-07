import Topbar from './topbar';
import Link from 'next/link';
import Sidebar from './sidebar';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { API } from '../config';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { adminProfile, updateAdminProfile, updateAdminProfileImage } from '../actions/profileAction';
import FilesUploadComponent from './files-upload.component';

const AdminProfile = () => {

    const [loading, setLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileImage, setProfileImage] = useState();

    const [values, setValues] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        image: ''
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
                setValues({ ...values, name: data.name, email: data.email, username: data.username, password: data.password, image: data.image });
            }
        });
    };

    const onFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    }
    const onSubmit = (e) => {
        e.preventDefault()
        let id = localStorage.getItem('id');
        const formData = new FormData()
        formData.append('profileImg', profileImage);
        formData.append('_id', id);
        axios.post(`${API}/upload-admin-profile-image`, formData, {
        }).then(res => {
            setProfileLoading(true);
            loadAdminProfile();
            setTimeout(() => {
                setProfileLoading(false);
            }, 2000)
        })
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
                    setProfileLoading(false);
                }, 2000)
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
                            <div className="col-md-3">
                                <div className="card-box" style={{ paddingBottom: "50px" }}>
                                    <h4 className="m-t-0 m-b-30 header-title">Profile Image</h4>
                                    <form role="form" onSubmit={onSubmit}>
                                        <div className="form-group">
                                            <img src={image} alt="" height="150px" width="200px"></img>
                                            <input type="file" onChange={onFileChange} class="margin-top-10" required />
                                        </div>
                                        <button type="submit" className="btn btn-primary" >Upload</button>
                                        {profileLoading ? <div class="alert alert-success margin-top-10">Image uploaded successfully</div> : null}
                                    </form>
                                </div>
                            </div>
                            <div className="offset-1 col-md-6">
                                <div className="card-box" style={{ paddingBottom: "50px" }}>
                                    <h4 className="m-t-0 m-b-30 header-title">Profile Update</h4>
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