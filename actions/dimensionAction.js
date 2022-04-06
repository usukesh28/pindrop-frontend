import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const dimensionList = (admin_token) => {
    return fetch(`${API}/dimensionList?admin_token=`+admin_token,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getDimensionByCity = (admin_token,_id) => {
    return fetch(`${API}/getDimensionByCity?admin_token=`+admin_token+`&_id=`+_id,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const addDimension = (dimension,admin_token) => {
    return fetch(`${API}/addDimension?admin_token=`+admin_token,  {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dimension)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getDimensionById = (admin_token,_id) => {
    return fetch(`${API}/getDimensionById?admin_token=`+admin_token+`&_id=`+_id,  {
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

export const editDimension = (dimension,admin_token,_id) => {
    return fetch(`${API}/editDimension?admin_token=`+admin_token+`&_id=`+_id,  {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dimension)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteDimension = (admin_token,_id) => {
    return fetch(`${API}/deleteDimension?admin_token=`+admin_token+`&_id=`+_id,  {
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