import {getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "/@/store";
import type {UserBaseInfo,} from '/@/api/model/userModel';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import {setLocal} from "/@/utils/helper/persistent";
import {hotModuleUnregisterModule} from "/@/utils/helper/vuexHelper";

// app全局类
const NAME = 'user';

hotModuleUnregisterModule(NAME);
@Module({dynamic: true, namespaced: true, store, name: NAME})
class User extends VuexModule {
    //用户基础信息
    private userInfoState: UserBaseInfo | null = null;

    // token
    private tokenState = '';

    get getUserInfoState(): UserBaseInfo {
    // get getUserInfoState() {
        // return this.userInfoState || (getLocal(USER_INFO_KEY) as UserInfo) || {};
        // return this.userInfoState || {};
        return <UserBaseInfo>this.userInfoState || {};
    }

    get getTokenState(): string {
        // return this.tokenState || (getLocal(TOKEN_KEY) as string);
        return this.tokenState || "";
    }

    @Mutation
    resetState(): void {
        this.userInfoState = null;
        this.tokenState = '';
    }

    @Mutation
    commitUserInfoState(info: UserBaseInfo): void {
        this.userInfoState = info;
        if (info) {
            setLocal(USER_INFO_KEY, info, true);
        }
    }

    @Mutation
    commitTokenState(info: string): void {
        this.tokenState = info;
        if (info) {
            setLocal(TOKEN_KEY, info, true);
        }
    }
}

export {User};
export const userStore = getModule<User>(User);