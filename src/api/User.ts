//接口地址
import {GetUserInfoByUserIdParams, LoginResultModel, UserBaseInfo, UserDetailInfo, UserLoginParams} from "/@/api/model/UserModel";
import {defAxios} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum"
import {ErrorMessageMode} from "/@/utils/http/types";

enum Api {
    Login = '/login',
    Logout = '/logout',
    GetUserInfoById = '/user/',
    GetUserCurrent = '/user/current',
    GetUserDetailInfoById = '/user/detail/',
    getUserManagerList = '/userManager/listAll',
    addUserManager = '/userManager/addUser',
    editUserManagerList = '/userManager/editUser',
    delUserManager = '/userManager/delUser/',
    disableUserManager = '/userManager/disableUser',
    resetUserManagerPassword = '/userManager/resetPassword',
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
 * 登出接口
 */
// export function logoutApi(params: UserLoginParams, mode: ErrorMessageMode = 'modal') {
export function logoutApi( mode: ErrorMessageMode = 'modal') {
    return defAxios.post<any>(
        {
            url: Api.Logout,
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


/**
 * @description: 获取用户管理界面用户列表信息
 */
export function getUserManagerList(params: any) {
    return defAxios.get<any>({
        url: Api.getUserManagerList,
        params
    }, {
        serviceName: ServiceEnum.HAP,
        isTransformRequestResult: false
    })
}

/**
 * @description: 获取用户管理界面  添加用户列表信息
 */
export function addUserManager(params: any) {
    return defAxios.postJson<any>({
        url: Api.addUserManager,
        params
    }, {
        serviceName: ServiceEnum.HAP,
        isTransformRequestResult: false
    })
}

/**
 * @description: 获取用户管理界面  修改用户信息
 */
export function editUserManagerList(params: any) {
    return defAxios.postJson<any>({
        url: Api.editUserManagerList,
        params
    }, {
        serviceName: ServiceEnum.HAP,
        isTransformRequestResult: false
    })
}

/**
 * @description: 获取用户管理界面  删除用户信息
 */
export function delUserManager(params: any) {
    return defAxios.delete<any>({
        url: Api.delUserManager+params,
    }, {
        serviceName: ServiceEnum.HAP,
        isTransformRequestResult: false
    })
}

/**
 * @description: 获取用户管理界面  修改用户状态
 */
export function disableUserManager(params: any) {
    return defAxios.post<any>({
        url: Api.disableUserManager,
        params
    }, {
        serviceName: ServiceEnum.HAP,
        isTransformRequestResult: false
    })
}


/**
 * @description: 获取用户管理界面 重置用户密码
 */
export function resetUserManagerPassword(params: any) {
    return defAxios.post<any>({
        url: Api.resetUserManagerPassword,
        params
    }, {
        serviceName: ServiceEnum.HAP,
        isTransformRequestResult: false
    })
}


/**
 * @description: 获取用户管理界面 重置用户密码
 */
export function GetUserCurrent(params: any) {
    return defAxios.get<any>({
        url: Api.GetUserCurrent,
        params
    }, {
        serviceName: ServiceEnum.AUTH,
        isTransformRequestResult: false
    })
}