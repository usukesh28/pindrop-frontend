import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// Country
export const countryList = (admin_token) => {
    return fetch(`${API}/countryList?admin_token=`+admin_token,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const addCountry = (country,admin_token) => {
    return fetch(`${API}/addCountry?admin_token=`+admin_token, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(country)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const    editCountry = (country,admin_token,_id) => {
    return fetch(`${API}/editCountry?admin_token=`+admin_token+`&_id=`+_id, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(country)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteLocation = (type,admin_token,_id) => {
    return fetch(`${API}/deleteLocation?admin_token=`+admin_token+`&type=`+type+`&_id=`+_id, {
        method: 'GET',
      
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// State
export const stateList = (admin_token) => {
    return fetch(`${API}/stateList?admin_token=`+admin_token,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const addState = (state,admin_token) => {
    return fetch(`${API}/addState?admin_token=`+admin_token, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const editState = (state,admin_token) => {
    return fetch(`${API}/editState?admin_token=`+admin_token, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
// City
export const cityList = (admin_token) => {
    return fetch(`${API}/cityList?admin_token=`+admin_token,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const addCity = (city,admin_token) => {
    return fetch(`${API}/addCity?admin_token=`+admin_token, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(city)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const editCity = (city,admin_token) => {
    return fetch(`${API}/editCity?admin_token=`+admin_token, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(city)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// Pincodes
export const pincodesList = (admin_token) => {
    return fetch(`${API}/pincodesList?admin_token=`+admin_token,  {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const addPincodes = (pincodes,admin_token) => {
    return fetch(`${API}/addPincodes?admin_token=`+admin_token, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pincodes)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const editPincodes = (pincodes,admin_token) => {
    return fetch(`${API}/editPincodes?admin_token=`+admin_token, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pincodes)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

