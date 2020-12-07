//接口地址
import {GetUserInfoByUserIdParams, LoginResultModel, UserBaseInfo, UserLoginParams} from "/@/api/model/UserModel";
import {defAxios} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum"

enum Api {
    Login = '/login',
    GetUserInfoById = '/getUserInfoById',
    GetPermCodeByUserId = '/getPermCodeByUserId',
}


/**
 * 登录接口
 */
export function loginApi(params: UserLoginParams) {
    return defAxios.post<LoginResultModel>(
        {
            url: Api.Login,
            params,
        },
        {
            serviceName: ServiceEnum.AUTH,
            errorMessageMode: 'modal',
        }
    );
}


/**
 * @description: getUserInfoById
 */
export function getUserInfoById(params: GetUserInfoByUserIdParams) {
    return defAxios.request<UserBaseInfo>({
        url: Api.GetUserInfoById,
        method: 'GET',
        params,
    });
}