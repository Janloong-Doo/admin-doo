import type {AppRouteRecordRaw, Menu} from '/@/router/types';
import store from '/@/store/index';
import {hotModuleUnregisterModule} from '/@/utils/helper/vuexHelper';

import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';

import {PermissionModeEnum} from '/@/enums/appEnum';

import {appStore} from '/@/store/modules/app';
import {userStore} from '/@/store/modules/user';

import {asyncRoutes} from '/@/router/routes';
import {filter} from '/@/utils/helper/treeHelper';
import {toRaw} from 'vue';
import {GetMenuListByUser} from '/@/api/menu.ts';

import {transformObjToRoute} from '/@/router/helper/routeHelper.ts';
import {transformRouteToMenu} from '/@/router/helper/menuHelper.ts';

import {useMessage} from '/@/hooks/web/useMessage';
// import { warn } from '/@/utils/log';
import {useI18n} from '/@/hooks/web/useI18n';

const {createMessage} = useMessage();
const NAME = 'permission';
hotModuleUnregisterModule(NAME);

@Module({dynamic: true, namespaced: true, store, name: NAME})
class Permission extends VuexModule {
    // Permission code list
    private permCodeListState: string[] = [];

    // Whether the route has been dynamically added
    private isDynamicAddedRouteState = false;

    // To trigger a menu update
    private lastBuildMenuTimeState = 0;

    // Backstage menu list
    private backMenuListState: Menu[] = [];

    get getPermCodeListState() {
        return this.permCodeListState;
    }

    get getBackMenuListState() {
        return this.backMenuListState;
    }

    get getLastBuildMenuTimeState() {
        return this.lastBuildMenuTimeState;
    }

    get getIsDynamicAddedRouteState() {
        console.log("this.isDynamicAddedRouteState", this.isDynamicAddedRouteState)
        return this.isDynamicAddedRouteState;
    }

    @Mutation
    commitPermCodeListState(codeList: string[]): void {
        this.permCodeListState = codeList;
    }

    @Mutation
    commitBackMenuListState(list: Menu[]): void {
        this.backMenuListState = list;
    }

    @Mutation
    commitLastBuildMenuTimeState(): void {
        this.lastBuildMenuTimeState = new Date().getTime();
    }

    @Mutation
    commitDynamicAddedRouteState(added: boolean): void {
        this.isDynamicAddedRouteState = added;
    }

    @Mutation
    commitResetState(): void {
        this.isDynamicAddedRouteState = false;
        this.permCodeListState = [];
        this.backMenuListState = [];
        this.lastBuildMenuTimeState = 0;
    }

    @Action
    async buildRoutesAction(id?: string): Promise<AppRouteRecordRaw[]> {
        const {t} = useI18n();
        let routes: AppRouteRecordRaw[] = [];
        const roleList = toRaw(userStore.getRoleListState);

        const {permissionMode} = appStore.getProjectConfig;
        console.log("权限模式", permissionMode)

        // role permissions
        if (permissionMode === PermissionModeEnum.ROLE) {
            console.log("角色模式", asyncRoutes)
            routes = filter(asyncRoutes, (route) => {
                console.log("角色模式2", route);
                const {meta} = route as AppRouteRecordRaw;
                const {roles} = meta || {};
                //TODO 【权限过滤】 放开角色权限 by Janloong_Doo
                if (!roles) return true;
                return roleList.some((role) => roles.includes(role));
                // return true;
            });
            //  如果确定不需要做后台动态权限,请将下面整个判断注释
        } else if (permissionMode === PermissionModeEnum.BACK) {
            createMessage.loading({
                content: t('sys.app.menuLoading'),
                duration: 1,
            });
            // 这里获取后台路由菜单逻辑自行修改
            const paramId = id || userStore.getUserInfoState.id;
            if (!paramId) {
                throw new Error('paramId is undefined!');
            }
            //获取用户对应的菜单信息
            let routeList: any[] = await GetMenuListByUser({id: paramId});
            // 动态引入组件
            routeList = transformObjToRoute(routeList);
            //  后台路由转菜单结构
            const backMenuList = transformRouteToMenu(routeList);

            //保存菜单信息
            this.commitBackMenuListState(backMenuList);
            //路由信息
            routes = routeList;
        }
        console.log("初始化的路由信息为:", routes)
        return routes;
    }
}

export const permissionStore = getModule<Permission>(Permission);
