import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import axios from 'axios';
import {AxiosCanceler} from '/@/utils/http/axiosCancel';
import {isFunction} from '/@/utils/is.ts';
import {cloneDeep} from 'lodash-es';

import type {CreateAxiosOptions, RequestOptions, ResponseResult, UploadFileParams} from '/@/utils/http/types';
import {errorResult} from '/@/utils/http/const';
import {ContentTypeEnum, RequestEnum} from '/@/enums/httpEnum.ts';
import qs from "qs";

export * from '/@/utils/http/axiosTransform';

/**
 * @description:  axios模块
 */
export class VAxios {
    private axiosInstance: AxiosInstance;
    private readonly options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    /**
     * @description:  创建axios实例
     */
    private createAxios(config: CreateAxiosOptions): void {
        this.axiosInstance = axios.create(config);
    }

    private getTransform() {
        const {transform} = this.options;
        return transform;
    }

    getAxios(): AxiosInstance {
        return this.axiosInstance;
    }

    /**
     * @description: 重新配置axios
     */
    configAxios(config: CreateAxiosOptions) {
        if (!this.axiosInstance) {
            return;
        }
        this.createAxios(config);
    }

    /**
     * @description: 设置通用header
     */
    setHeader(headers: any): void {
        if (!this.axiosInstance) {
            return;
        }
        Object.assign(this.axiosInstance.defaults.headers, headers);
    }

    /**
     * @description: 拦截器配置
     */
    private setupInterceptors() {
        const transform = this.getTransform();
        if (!transform) {
            return;
        }
        const {
            requestInterceptors,
            requestInterceptorsCatch,
            responseInterceptors,
            responseInterceptorsCatch,
        } = transform;

        const axiosCanceler = new AxiosCanceler();

        // 请求拦截器配置处理
        this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            const {headers: {ignoreCancelToken} = {ignoreCancelToken: false}} = config;
            !ignoreCancelToken && axiosCanceler.addPending(config);
            if (requestInterceptors && isFunction(requestInterceptors)) {
                config = requestInterceptors(config);
            }
            return config;
        }, undefined);

        // 请求拦截器错误捕获
        requestInterceptorsCatch &&
        isFunction(requestInterceptorsCatch) &&
        this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

        // 响应结果拦截器处理
        this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
            res && axiosCanceler.removePending(res.config);
            if (responseInterceptors && isFunction(responseInterceptors)) {
                res = responseInterceptors(res);
            }
            return res;
        }, undefined);

        // 响应结果拦截器错误捕获
        responseInterceptorsCatch &&
        isFunction(responseInterceptorsCatch) &&
        this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
    }

    /**
     * @description:  文件上传
     */
    uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
        const formData = new window.FormData();

        if (params.data) {
            Object.keys(params.data).forEach((key) => {
                if (!params.data) return;
                const value = params.data[key];
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item);
                    });
                    return;
                }

                formData.append(key, params.data[key]);
            });
        }

        formData.append(params.name || 'file', params.file, params.filename);

        return this.axiosInstance.request<T>({
            ...config,
            method: 'POST',
            data: formData,
            headers: {
                'Content-type': ContentTypeEnum.FORM_DATA,
                ignoreCancelToken: true,
            },
        });
    }

    /**
     * @description:   请求方法
     * @param config axios默认的请求参数
     * @param options 自定义的请求选项
     */
    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        //axios默认配置
        let conf: AxiosRequestConfig = cloneDeep(config);
        //axios的数据处理方式
        const transform = this.getTransform();
        //自定义的请求选项
        const {requestOptions} = this.options;
        //合并请求默认的自定义参数和请求时的自定义参数
        const opt: RequestOptions = Object.assign({}, requestOptions, options);

        const {beforeRequestHook, requestCatch, transformRequestData} = transform || {};
        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt);
        }
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<ResponseResult>>(conf)
                .then((res: AxiosResponse<ResponseResult>) => {
                    if (transformRequestData && isFunction(transformRequestData)) {
                        const ret = transformRequestData(res, opt);
                        ret !== errorResult ? resolve(ret) : reject(new Error('request error!'));
                        return;
                    }
                    resolve((res as unknown) as Promise<T>);
                })
                .catch((e: Error) => {
                    if (requestCatch && isFunction(requestCatch)) {
                        reject(requestCatch(e));
                        return;
                    }
                    reject(e);
                });
        });
    }

    post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: AxiosRequestConfig = cloneDeep(config);
        conf.method = RequestEnum.POST;
        conf.headers = {'Content-Type': ContentTypeEnum.FORM_URLENCODED}
        conf.params = qs.stringify(conf.params);
        //参数序列化不生效
        conf.paramsSerializer = (params) => {
            const s = qs.stringify(params);
            console.log(params, s);
            return s;
        };
        return this.request(conf, options);
    }

    postJson<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request(config, options);
    }

    get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request(config, options);
    }

    delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request(config, options);
    }
}
