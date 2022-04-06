import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const packageList = (admin_token) => {
    return fetch(`${API}/packageList?admin_token=`+admin_token,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const addPackage = (packe,admin_token) => {
    return fetch(`${API}/addPackage?admin_token=`+admin_token, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(packe)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const    editPackage = (packe,admin_token,_id) => {
    return fetch(`${API}/editPackage?admin_token=`+admin_token+`&_id=`+_id, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(packe)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deletePackage = (admin_token,_id) => {
    return fetch(`${API}/deletePackage?admin_token=`+admin_token+`&_id=`+_id, {
        method: 'GET',
      
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
