import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "/@/store";
import type {GetUserInfoByUserIdParams, UserBaseInfo, UserLoginParams,} from '/@/api/model/userModel';
import {CacheTypeEnum, ROLES_KEY, SCOPE_KEY, TOKEN_KEY, USER_INFO_KEY} from '/@/enums/cacheEnum';
import {clearLocal, clearSession, getLocal, getSession, setLocal} from "/@/utils/helper/persistent";
import {hotModuleUnregisterModule} from "/@/utils/helper/vuexHelper";
import router, {resetRouter} from '/@/router';
import {PageEnum} from "/@/enums/pageEnum";
import {loginApi, logoutApi} from "/@/api/User";
import {useMessage} from "/@/hooks/web/useMessage";
import {RoleEnum} from "/@/enums/roleEnum";
import {useProjectSetting} from "/@/hooks/setting";
import {useI18n} from "/@/hooks/web/useI18n.ts";
// app全局类
const NAME = 'user';

hotModuleUnregisterModule(NAME);

const {permissionCacheType} = useProjectSetting();


function getCache<T>(key: string) {
    const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
    return fn(key) as T;
}

@Module({dynamic: true, namespaced: true, store, name: NAME})
class User extends VuexModule {
    //用户基础信息
    private userInfoState: UserBaseInfo | null = null;

    // token
    private tokenState = '';

    // 角色列表
    private roleListState: RoleEnum[] = [];

    // 操作域列表
    private scopeListState: string[] = [];

    get getUserInfoState(): UserBaseInfo {
        // get getUserInfoState() {
        return this.userInfoState || (getLocal(USER_INFO_KEY) as UserBaseInfo) || {};
        // return <UserBaseInfo>this.userInfoState || {};
    }

    get getTokenState(): string {
        return this.tokenState || (getLocal(TOKEN_KEY) as string);
    }

    get getRoleListState(): RoleEnum[] {
        return this.roleListState.length > 0 ? this.roleListState : getCache<RoleEnum[]>(ROLES_KEY);
    }

    @Mutation
    commitResetState(): void {
        this.userInfoState = null;
        this.tokenState = '';
        this.roleListState = [];
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

    @Mutation
    commitRoleListState(roleList: RoleEnum[]): void {
        this.roleListState = roleList;
        if (roleList) {
            setLocal(ROLES_KEY, roleList, true);
        }
    }

    @Mutation
    commitScopeListState(scopeList: string[]): void {
        this.scopeListState = scopeList;
        if (scopeList) {
            setLocal(SCOPE_KEY, scopeList, true);
        }
    }

    @Action
    async getUserInfoAction({userId}: GetUserInfoByUserIdParams) {
        // const userInfo = await getUserInfoById({userId});
        //TODO 【简化】 角色部分处理  by Janloong_Doo
        // const { role } = userInfo;
        // const roleList = [role.value] as RoleEnum[];
        // this.commitUserInfoState(userInfo);
        // this.commitRoleListState(roleList);
        // return userInfo;
        return null;
    }

    /**
     * @description: 登录
     */
    @Action
    async login(params: UserLoginParams, goHome = true): Promise<UserBaseInfo | null> {
        try {
            // const data = await loginApi(params);
            const data = await loginApi(params);
            const {token, tokenType, id, username, authorities, scope} = data;
            const roles = authorities as RoleEnum[]
            // get user info
            // const userInfo = await this.getUserInfoAction({id});
            //处理角色用户信息
            // const { role } = userInfo;
            // const roleList = [role.value] as RoleEnum[];
            let userBaseInfo = {id, username} as UserBaseInfo;
            this.commitUserInfoState(userBaseInfo);
            this.commitRoleListState(roles);
            this.commitScopeListState(scope);
            // save token
            this.commitTokenState(tokenType + " " + token);

            // const name = FULL_PAGE_NOT_FOUND_ROUTE.name;
            // name && router.removeRoute(name);
            //TODO 【登录刷新】 取消使用router by Janloong_Doo
            goHome &&
            // location.replace(PageEnum.BASE_HOME)
            await router.push(PageEnum.BASE_HOME).then(() => {
                // (await router.replace(PageEnum.BASE_HOME).then(() => {
                setTimeout(() => {
                    // appStore.commitPageLoadingState(false);
                    // location.reload()
                }, 30);
            });
            return userBaseInfo;
        } catch (error) {
            return null;
        }
    }

    /**
     * 注销登录
     */
    @Action
    async loginOut(goLogin = false) {
        let loginResultModel = await logoutApi();
        console.log("注销登录",loginResultModel)
        goLogin && router.push(PageEnum.BASE_LOGIN);
    }


    @Action
    async resumeAllState() {
        //重置路由
        resetRouter();
        //清除session会话
        clearSession();
        //清除本地缓存
        clearLocal();

        // permissionStore.commitResetState();

        // tabStore.commitResetState();

        this.commitResetState();
    }

    /**
     * 退出登录前的确认
     */
    @Action
    async confirmLoginOut() {
        const {createConfirm} = useMessage();
        const {t} = useI18n();
        createConfirm({
            iconType: 'warning',
            // title: t('local.lang.admin.app.loginOutTip'),
            title: t('admin.app.loginOutTip'),
            content: t('admin.app.loginOutMessage'),
            onOk: async () => {
                await this.loginOut(true);
            },
        });
    }
}

export {User};
export const userStore = getModule<User>(User);