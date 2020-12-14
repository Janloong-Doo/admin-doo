import {RouteLocationNormalized, Router} from 'vue-router';

import {Modal, notification} from 'ant-design-vue';

import {createProgressGuard} from '/@/router/guard/progressGuard';
import {createPermissionGuard} from '/@/router/guard/permissionGuard';
import {createPageLoadingGuard} from '/@/router/guard/pageLoadingGuard';

import {useGlobSetting, useProjectSetting} from '/@/hooks/setting';
import {setTitle} from '/@/utils/browser';
import {AxiosCanceler} from '/@/utils/http/axiosCancel';
import {useI18n} from '/@/hooks/web/useI18n';
import {REDIRECT_NAME} from '/@/router/constant';

const {closeMessageOnSwitch, removeAllHttpPending} = useProjectSetting();
const globSetting = useGlobSetting();

const body = document.body;

const isHash = (href: string) => {
    return /^#/.test(href);
};

/**
 * 创建路由导航卫士
 * @param router
 */
export function createGuard(router: Router) {
    let axiosCanceler: Nullable<AxiosCanceler>;
    if (removeAllHttpPending) {
        axiosCanceler = new AxiosCanceler();
    }
    const loadedPageMap = new Map<string, boolean>();

    //全局前置守卫
    router.beforeEach(async (to) => {
        //页面是否被加载过
        to.meta.loaded = !!loadedPageMap.get(to.path);

        //TODO 【待定】 路由改变，tab标签变化 by Janloong_Doo

        // Notify routing changes
        // tabStore.commitLastChangeRouteState(getRoute(to));

        try {
            if (closeMessageOnSwitch) {
                Modal.destroyAll();
                notification.destroy();
            }
            // Switching the route will delete the previous request
            removeAllHttpPending && axiosCanceler!.removeAllPending();
        } catch (error) {
            console.warn('basic guard error:' + error);
        }
        return true;
    });

    //后置导航卫士
    router.afterEach((to) => {
        // scroll top
        isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);

        loadedPageMap.set(to.path, true);

        const {t} = useI18n();

        //改变html标题
        to.name !== REDIRECT_NAME && setTitle(t(to.meta.title), globSetting.title);
    });
    //页面加载状态
    createPageLoadingGuard(router);

    //导航条
    createProgressGuard(router);

    //路有权限守卫
    createPermissionGuard(router);
}
