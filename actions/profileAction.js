import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// profile
export const adminProfile = () => {
    let id = localStorage.getItem('id');
    let data = {
        '_id': id
    };
    return fetch(`${API}/admin-profile`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateAdminProfile = (query) => {
    let id = localStorage.getItem('id');
    let data = {
        '_id': id,
        ...query
    };
    return fetch(`${API}/update-admin-profile`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

