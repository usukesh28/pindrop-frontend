import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const weightList = (admin_token) => {
    return fetch(`${API}/weightList1?admin_token=`+admin_token,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const addWeight = (weight,admin_token) => {
    return fetch(`${API}/addWeight1?admin_token=`+admin_token,  {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(weight)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getWeightById = (admin_token,_id) => {
    return fetch(`${API}/getWeightById1?admin_token=`+admin_token+`&_id=`+_id,  {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getWeightByCity = (admin_token,_id) => {
    return fetch(`${API}/getWeightByCity1?admin_token=`+admin_token+`&_id=`+_id,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const editWeight = (weight,admin_token,_id) => {
    return fetch(`${API}/editWeight1?admin_token=`+admin_token+`&_id=`+_id,  {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(weight)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteWeight = (admin_token,_id) => {
    return fetch(`${API}/deleteWeight1?admin_token=`+admin_token+`&_id=`+_id,  {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const cityList = (admin_token) => {
    return fetch(`${API}/cityList?admin_token=`+admin_token,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};