import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "/@/store";
import type {GetUserInfoByUserIdParams, UserBaseInfo, UserLoginParams,} from '/@/api/model/userModel';
import {TOKEN_KEY, USER_INFO_KEY} from '/@/enums/cacheEnum';
import {setLocal} from "/@/utils/helper/persistent";
import {hotModuleUnregisterModule} from "/@/utils/helper/vuexHelper";
import {appStore} from "/@/store/modules/app";
import router from '/@/router';
import {PageEnum} from "/@/enums/pageEnum";
import {getUserInfoById, loginApi} from "/@/api/User";

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

    @Action
    async getUserInfoAction({userId}: GetUserInfoByUserIdParams) {
        const userInfo = await getUserInfoById({userId});
        //TODO 【简化】 角色部分处理  by Janloong_Doo
        // const { role } = userInfo;
        // const roleList = [role.value] as RoleEnum[];
        this.commitUserInfoState(userInfo);
        // this.commitRoleListState(roleList);
        return userInfo;
    }

    /**
     * @description: 登录
     */
    @Action
    async login(params: UserLoginParams, goHome = true): Promise<UserBaseInfo | null> {
        try {
            // const data = await loginApi(params);
            const data = await loginApi(params);
            const {token, userId} = data;
            // get user info
            const userInfo = await this.getUserInfoAction({userId});

            // save token
            this.commitTokenState(token);

            // const name = FULL_PAGE_NOT_FOUND_ROUTE.name;
            // name && router.removeRoute(name);
            goHome &&
            (await router.push(PageEnum.BASE_HOME).then(() => {
                setTimeout(() => {
                    appStore.commitPageLoadingState(false);
                }, 30);
            }));
            return userInfo;
        } catch (error) {
            return null;
        }
    }

    /**
     * 注销登录
     */
    @Action
    async loginOut(goLogin = false) {
        goLogin && router.push(PageEnum.BASE_LOGIN);
    }
}

export {User};
export const userStore = getModule<User>(User);