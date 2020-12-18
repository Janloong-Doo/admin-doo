import axios from 'axios'
// import {defAxios} from "/@/utils/http"
import qs from 'qs';

// require ('@/assets/api/url')

// const service = axios.create({
//     baseURL: process.env.NODE_ENV === 'development' ? url.devUrl : url.proUrl,
//     timeout: 10000,
// })

const post = (url: string, param: any) => {
    param = param == null ? {} : param;
    let contentType = 'application/x-www-form-urlencoded';
    let config = {
        headers: {
            'Content-Type': contentType
        },
        // withCredentials: true
    };
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(param), config)
            // axios.post(url, param, config)
            .then(res => {
                resolve(res)
            }).catch(res => {
            reject(res)
        })
    });
};

const postJson = (url: string, param: any) => {
        param = param == null ? {} : param;
        let config = {
            headers: {
                'Content-Type': 'application/json'
            },
            // withCredentials: true
        };
        return new Promise((resolve, reject) => {
            axios.post(url, param, config)
                .then(res => {
                    resolve(res)
                }).catch(res => {
                reject(res)
            })
        });
    }
;


const get = (url: string, param: any) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(res => {
                resolve(res)
            }).catch(res => {
            reject(res)
        })
    });
};


const del = (url: string, param: any) => {
    param = param == null ? {} : param;
    // let config2 = {
    //   headers: {
    //     'Content-Type': contentType
    //   },
    // withCredentials: true
    // };
    return new Promise((resolve, reject) => {
        axios.delete(url)
            .then(res => {
                resolve(res)
            }).catch(res => {
            reject(res)
        })
    });
};
export default {
    post
    , postJson
    , del
    , get
};