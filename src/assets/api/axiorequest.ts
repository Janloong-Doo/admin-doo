import axios, {AxiosRequestConfig} from 'axios'
import qs from "qs";
// require ('@/assets/api/url')

// const service = axios.create({
//     baseURL: process.env.NODE_ENV === 'development' ? url.devUrl : url.proUrl,
//     timeout: 10000,
// })

const post = (url: string, param: any, config: AxiosRequestConfig) => {
    param = param == null ? {} : param;
    let contentType = 'application/x-www-form-urlencoded';
    let config2 = {
        headers: {
            'Content-Type': contentType
        },
        // withCredentials: true
    };
    config = config == null ? {} : config2;
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(param), config)
            .then(res => {
                resolve(res)
            }).catch(res => {
            reject(res)
        })
    });
};

const postJson = (url: string, param: any, config: AxiosRequestConfig) => {
        param = param == null ? {} : param;
        let config2 = {
            headers: {
                'Content-Type': 'application/json'
            },
            // withCredentials: true
        };
        config = config == null ? {} : config2;
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


const get = (url: string, param: any, config: AxiosRequestConfig) => {
    param = param == null ? {} : param;
    let config2 = {
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // },
        // withCredentials: true
    };
    // param = param == null ? {} : qs.stringify(param)
    param = param == null ? {} : param;
    config = config == null ? {} : config;
    config.params = param;
    return new Promise((resolve, reject) => {
        axios.get(url, config)
            .then(res => {
                resolve(res)
            }).catch(res => {
            reject(res)
        })
    });
};


const del = (url: string, param: any, config: AxiosRequestConfig) => {
    param = param == null ? {} : param;
    // let config2 = {
    //   headers: {
    //     'Content-Type': contentType
    //   },
    // withCredentials: true
    // };
    config = config == null ? {} : config;
    return new Promise((resolve, reject) => {
        axios.delete(url, config)
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