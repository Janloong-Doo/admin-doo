//接口地址
import {GetUserInfoByUserIdParams, LoginResultModel, UserBaseInfo, UserLoginParams} from "/@/api/model/UserModel";
import {defAxios} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum"
import {ErrorMessageMode} from "/@/utils/http/types";

enum Api {
    Login = '/login',
    // GetUserInfoById = '/getUserInfoById',
    GetPermCodeByUserId = '/getPermCodeByUserId',
    GetUserInfoById = '/user/',
}


/**
 * 登录接口
 */
export function loginApi(params: UserLoginParams, mode: ErrorMessageMode = 'modal') {
    return defAxios.post<LoginResultModel>(
        {
            url: Api.Login,
            params,
        },
        {
            serviceName: ServiceEnum.AUTH,
            errorMessageMode: mode,
        }
    );
}


/**
 * @description: getUserInfoById
 */
export function getUserInfoById(params: GetUserInfoByUserIdParams) {
    return defAxios.get<UserBaseInfo>({
        url: Api.GetUserInfoById + params.userId
    }, {
        serviceName: ServiceEnum.AUTH
    })
}