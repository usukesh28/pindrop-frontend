import Topbar from '../topbar';
import Link from 'next/link';
import Sidebar from '../sidebar';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { riderList, blockRider, unblockRider, ApproveRider } from '../../actions/adminAction'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { FaRegThumbsUp, FaLockOpen, FaLock, FaPencilAlt, FaRegThumbsDown } from "react-icons/fa";

import { FiTrash2, FiEdit, FiLock, FiUnlock } from "react-icons/fi";
const cookies = new Cookies();

const Rider = () => {
    const [values, setValues] = useState({
        name: '',
        error: '',
        success: false,
        riders: [],
        message: '',

        removed: false
    });
    const { name, error, success, riders, message, removed } = values;
    const token = cookies.get('admin_token');


    useEffect(() => {
        loadRiders();
    }, [success, removed]);

    const loadRiders = () => {
        riderList(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {


                setValues({
                    ...values,
                    riders: data.riders,

                });


            }
        });

    };


    const approvalformat = (cell, row) => {
        const handleApproveClick = e => {

            Swal.fire({
                title: `Are you sure want to Approve ` + row.name + ` ?`,
                text: "",
                icon: 'warning',
                allowOutsideClick: true,
                confirmButtonText: 'Approve',
                showCancelButton: true,

            }).then((result) => {
                if (result.isConfirmed) {
                    ApproveRider(token, row._id).then(data => {
                        if (data.error) {
                            console.log(data.error);
                        } else {
                            var selections = riders;


                            for (var i = 0; i < selections.length; i++) {

                                if (selections[i]._id === row._id) {
                                    selections[i].approvalStaus = true
                                }

                            }
                            setValues({ ...values, riders: selections, loading: false });

                        }

                    })
                }
            })
        };

        if (row.approvalStaus) {
            return (

                <span>
                    <button type="submit" className="btn btn-icon waves-effect waves-light btn-success" >Approved</button>

                </span>
            )
        } else {
            return (

                <span>

                    <button type="submit" className="btn btn-icon waves-effect waves-light btn-success" onClick={handleApproveClick}  ><FaRegThumbsUp /></button>
                </span>
            )
        }

    }

    const showError = () => (error ? alert(error) : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    function edit(cell, row) {



    }


    const iconformat = (cell, row) => {

        const handleUnBlockClick = e => {

            Swal.fire({
                title: `Are you sure want to unBlock ` + row.name + ` ?`,
                text: "",
                icon: 'warning',
                allowOutsideClick: true,
                confirmButtonText: 'Yes',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    unblockRider(token, row._id).then(data => {
                        if (data.error) {
                            console.log(data.error);
                        } else {

                            var selections = riders;


                            for (var i = 0; i < selections.length; i++) {

                                if (selections[i]._id === row._id) {
                                    selections[i].blockStaus = false

                                }

                            }
                            setValues({ ...values, riders: selections });

                        }

                    })
                }
            })
        };


        const handleBlockClick = e => {

            Swal.fire({
                title: `Are you sure want to Block ` + row.name + ` ?`,
                text: "",
                icon: 'warning',
                allowOutsideClick: true,
                confirmButtonText: 'Yes',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    blockRider(token, row._id).then(data => {
                        if (data.error) {
                            console.log(data.error);
                        } else {

                            var selections = riders;


                            for (var i = 0; i < selections.length; i++) {

                                if (selections[i]._id === row._id) {
                                    selections[i].blockStaus = true

                                }

                            }
                            setValues({ ...values, riders: selections });

                        }

                    })
                }
            })
        };



        if (row.blockStaus) {
            return (

                <span>

                    <button type="submit" className="btn btn-icon waves-effect waves-light btn-warning" onClick={handleUnBlockClick}> <FiLock /></button>
                </span>
            )
        } else {
            return (

                <span>

                    <button type="submit" className="btn btn-icon waves-effect waves-light btn-warning" onClick={handleBlockClick}> <FiUnlock /></button>
                </span>
            )
        }



    }


    const signupForm = () => {

        function updateCell(row, cellName, cellValue, props) {
            console.log("value" + cellValue)





        }
        const cellEditProp = {
            mode: 'click',
            afterSaveCell: updateCell

        };
        return (
            <div id="wrapper">

                <Head>
                    <title>Riders</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="title" content='Riders' />
                    <meta property="og:image" content="/icons/app_logo.jpeg" />
                    <meta itemProp="image" content="/icons/app_logo.jpeg"></meta>
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
                                        <h4 className="page-title float-left">Riders</h4>

                                        <ol className="breadcrumb float-right">
                                            <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                            <li className="breadcrumb-item active">Riders</li>
                                        </ol>

                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">


                                <div className="col-md-12">
                                    <div className="card-box">



                                        <div style={{

                                            width: '98%'
                                        }}>



                                            <BootstrapTable data={riders} pagination search dataSort striped hover>
                                                <TableHeaderColumn width='50px' dataField='sno' dataAlign="center" dataSort isKey>S.No</TableHeaderColumn>
                                                <TableHeaderColumn width='100px' dataField='name' dataAlign="center" dataSort> Name</TableHeaderColumn>
                                                <TableHeaderColumn width='100px' dataField='mobile' dataAlign="center"  >mobile</TableHeaderColumn>
                                                <TableHeaderColumn width='100px' dataField='email' dataAlign="center"   >email</TableHeaderColumn>

                                                <TableHeaderColumn width='100px' dataFormat={iconformat} dataAlign="center" dataSort>Actions</TableHeaderColumn>
                                                <TableHeaderColumn width='80px' dataFormat={approvalformat} dataAlign="center" dataSort>Approval</TableHeaderColumn>



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
        {signupForm()}
    </React.Fragment>

};

export default Rider;