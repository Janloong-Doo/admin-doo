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
    username: string;
    aliaName: string;
    trueName: string;
    sex: number;
    tel: string;
    email: string;
    lastLogin: string;
}