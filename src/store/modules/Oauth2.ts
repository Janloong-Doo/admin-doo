import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "/@/store";
import {hotModuleUnregisterModule} from "/@/utils/helper/vuexHelper";
import {UserBaseInfo, UserLoginParams} from "/@/api/model/UserModel";
import {customLogin} from "/@/api/Oauth2.ts"

const NAME = 'oauth2';
hotModuleUnregisterModule(NAME);

@Module({dynamic: true, namespaced: true, store, name: NAME})
class Oauth2 extends VuexModule {

    //用户基础信息
    private customOauth2UserInfo: UserBaseInfo | null = null;

    get getCustomOauth2UserInfo(): UserBaseInfo {
        return this.customOauth2UserInfo as UserBaseInfo || {};
    }

    @Mutation
    commitCustomOauth2UserInfo(info: UserBaseInfo) {
        this.customOauth2UserInfo = info;
    }

    @Action
    async customLogin(params: UserLoginParams): Promise<UserBaseInfo | null> {
        let userBaseInfo = await customLogin(params);
        const {id, username} = userBaseInfo as UserBaseInfo;
        this.commitCustomOauth2UserInfo(userBaseInfo);
        return userBaseInfo;
    }
}

export {Oauth2};
export const oauth2Store = getModule<Oauth2>(Oauth2);