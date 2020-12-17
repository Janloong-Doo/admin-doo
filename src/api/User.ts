//接口地址
import {GetUserInfoByUserIdParams, LoginResultModel, UserBaseInfo, UserDetailInfo, UserLoginParams} from "/@/api/model/UserModel";
import {defAxios} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum"
import {ErrorMessageMode} from "/@/utils/http/types";

enum Api {
    Login = '/login',
    // GetUserInfoById = '/getUserInfoById',
    GetPermCodeByUserId = '/getPermCodeByUserId',
    GetUserInfoById = '/user/',
    GetUserDetailInfoById = '/user/detail/',
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

/**
 * @description: 获取当前用户详情信息
 */
export function getUserDetailInfo(params: GetUserInfoByUserIdParams) {
    return defAxios.get<UserDetailInfo>({
        url: Api.GetUserDetailInfoById + params.userId
    }, {
        serviceName: ServiceEnum.HAP
    })
}