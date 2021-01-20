import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from "vue-router";
import {App} from "vue";
import {basicRoutes} from "/@/router/routes";
import {createGuard} from '/@/router/guard/index.ts';

let baseView = import("../views/BaseView.vue");

const router = createRouter({
    history: createWebHistory(),
    // history: createWebHashHistory(),
    routes: basicRoutes as RouteRecordRaw[],
    // routes: _router,
    strict: true,
    // scrollBehavior: scrollBehavior,
})

// reset router
export function resetRouter() {
    const resetWhiteNameList = ['Login'];
    router.getRoutes().forEach((route) => {
        const {name} = route;
        if (name && !resetWhiteNameList.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}

// config router
export function setupRouter(app: App<Element>) {
    app.use(router);
    //创建导航卫士
    createGuard(router);
}

export default router;