import {userStore} from '/@/store/modules/user';

/**
 * 获取token
 */
export function getToken(): string {
    return userStore.getTokenState;
}
