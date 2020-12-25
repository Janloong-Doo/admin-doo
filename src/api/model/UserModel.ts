/**
 * 用户类相关模型
 */

/**
 * 用户基础信息
 */
export interface UserLoginParams {
    username: string;
    password: string;
}

/**
 * 用户基础信息
 */
export interface UserBaseInfo {
    id:string;
    username: string;
    sex: number;
    tel: string;
    lastLogin: string;
}

/**
 * 用户相信信息
 */
export interface UserDetailInfo {
    id:string;
    username: string;
    aliaName: string;
    trueName: string;
    sex: number;
    tel: string;
    email: string;
    lastLogin: string;
}

/**
 *  Login interface return value
 */
export interface LoginResultModel {
    id: string;
    username: string;
    tokenType: string;
    token: string
    jti: string
    refreshToken: string
    authorities: string[]
    scope: string[]
}

export interface RoleInfo {
    roleName: string;
    roleValue: string;
}

/**
 * @description: Get user information
 */
export interface GetUserInfoByUserIdParams {
    id: string ;
}