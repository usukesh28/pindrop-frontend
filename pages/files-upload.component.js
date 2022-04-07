import React, { Component } from 'react';
import axios from 'axios';
import { updateAdminProfileImage } from '../actions/profileAction';
export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            profileImg: ''
        }
    }
    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }
    onSubmit(e) {
        e.preventDefault()
        console.log(this.state.profileImg);
        const formData = new FormData()
        formData.append('profileImg', this.state.profileImg);

        updateAdminProfileImage(formData).then(data => {
            if (data.error) {
                // setValues({ ...values, error: data.error, loading: false });
            } else {
                console.log(data);
            }
        });
        // axios.post("http://localhost:5243/api/upload-admin-profile-image", formData, {
        // }).then(res => {
        //     console.log(res)
        // })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}