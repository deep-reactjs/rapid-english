import axios from 'axios';

export function Post(url, payload, config) {
    console.log(url, payload, config);
    return new Promise((resolve, reject) => {
        axios.post(url, payload, config)
            .then((response) => {
                console.log('response',response);
                resolve(response.data);
            })
            .catch((e) => {
                console.log(e);
                resolve(e)
            });
    });
}

export function Put(url, payload, config) {
    return new Promise((resolve, reject) => {
        axios.put(url, payload, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((e) => {
                reject(e)
            });
    });
}

export function Get(url, config) {
    return new Promise((resolve, reject) => {
        axios.get(url, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((e) => {
                reject(e)
            });
    });
}

export function Delete(url, config) {
    return new Promise((resolve, reject) => {
        axios.delete(url, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((e) => {
                reject(e)
            });
    });
}
