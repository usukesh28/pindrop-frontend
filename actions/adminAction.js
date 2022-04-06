import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const Adminsignin = admin => {
    return fetch(`${API}/adminSigin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const riderList = (admin_token) => {
    return fetch(`${API}/riderList?admin_token=` + admin_token, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const unblockRider = (token, rider_id) => {
    return fetch(`${API}/unblockRider?token=` + token + "&_id=" + rider_id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const blockRider = (token, rider_id) => {
    return fetch(`${API}/blockRider?token=` + token + "&_id=" + rider_id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const ApproveRider = (token, rider_id) => {
    return fetch(`${API}/ApproveRider?token=` + token + "&_id=" + rider_id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
// set cookie
export const setCookie = (key, value) => {
    if (process.browser) {
        cookies.set(key, value)
    }
};

export const removeCookie = key => {
    if (process.browser) {
        cookies.remove(key, {
            expires: 1
        });
    }
};

// get cookie
export const getCookie = key => {
    if (process.browser) {
        cookies.get(key);
    }
};
// localstorage
export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};
// autheticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {
    setCookie('admin_token', data.admin_token);
    setCookie('admin_id', data.admin_id);
    next();
};

export const authenticateUser = (data, next) => {

    setLocalStorage('admin', data.user);
    next();
};

export const isAuth = () => {

    if (localStorage.getItem('admin')) {
        return JSON.parse(localStorage.getItem('admin'));
    } else {
        return false;
    }


};