import {otherHttp} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    customLogin = '/login',
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


