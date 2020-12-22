import {otherHttp} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    customLogin = '/login',
    userCurrent = '/user/current',
    getToken = '/oauth/token',
    checkoutToken = '/oauth/token',
    logout = '/logout',
}

/**
 * 登录
 * @param params
 * @constructor
 */
export function customLogin(params: any) {
    return otherHttp.post<any>({
            url: Api.customLogin,
            params,
        }, {
            serviceName: ServiceEnum.AUTH,
        }
    );
}


/**
 * 当前认证用户信息
 * @param params
 * @constructor
 */
export function userCurrent(params: any) {
    return otherHttp.get<any>({
            url: Api.userCurrent,
            params,
        }, {
            serviceName: ServiceEnum.AUTH,
        }
    );
}

/**
 * 获取token
 * @param params
 * @constructor
 */
export function getToken(params: any) {
    return otherHttp.post<any>({
            url: Api.getToken,
            params,
        }, {
            serviceName: ServiceEnum.AUTH,
        }
    );
}

/**
 * 校验token
 * @param params
 * @constructor
 */
export function checkoutToken(params: any) {
    return otherHttp.post<any>({
            url: Api.checkoutToken,
            params,
        }, {
            serviceName: ServiceEnum.AUTH,
        }
    );
}

/**
 * 注销
 * @param params
 * @constructor
 */
export function logout(params: any) {
    return otherHttp.post<any>({
            url: Api.logout,
            params,
        }, {
            serviceName: ServiceEnum.AUTH,
        }
    );
}