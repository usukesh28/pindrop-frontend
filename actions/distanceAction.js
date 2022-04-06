import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const distanceList = (admin_token) => {
    return fetch(`${API}/distanceList?admin_token=`+admin_token,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getDistanceByCity = (admin_token,_id) => {
    return fetch(`${API}/getDistanceByCity?admin_token=`+admin_token+`&_id=`+_id,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const addDistance = (distance,admin_token) => {
    return fetch(`${API}/addDistance?admin_token=`+admin_token,  {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(distance)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getDistanceById = (admin_token,_id) => {
    return fetch(`${API}/getDistanceById?admin_token=`+admin_token+`&_id=`+_id,  {
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

export const editDistance = (distance,admin_token,_id) => {
    return fetch(`${API}/editDistance?admin_token=`+admin_token+`&_id=`+_id,  {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(distance)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteDistance = (admin_token,_id) => {
    return fetch(`${API}/deleteDistance?admin_token=`+admin_token+`&_id=`+_id,  {
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