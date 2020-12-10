import type {AppRouteModule} from '/@/router/types';
import BaseView from "/@/views/BaseView.vue";
// import { t } from '/@/hooks/web/useI18n';

const manager: AppRouteModule = {
    path: '/manager',
    name: 'Manager',
    component: BaseView,
    redirect: '/manager/welcome',
    meta: {
        icon: 'bx:bx-home',
        // title: t('routes.dashboard.welcome'),
        title: '权限管理',
    },
    children: [
        {
            name: "Department",
            path: "department",
            component: () =>
                import(
                    /* webpackChunkName: "about" */ "/@/views/business/Department.vue"
                    ),
            meta: {
                // title: t('routes.dashboard.welcome'),
                title: '组织管理',
                affix: true,
                icon: 'bx:bx-home',
            },
        },
        {
            name: "Role",
            path: "role",
            component: () =>
                import(/* webpackChunkName: "about" */ "/@/views/business/Role.vue"),
            meta: {
                // title: t('routes.dashboard.welcome'),
                title: '角色管理',
                affix: true,
                icon: 'bx:bx-home',
            },
        },
        {
            name: "Menu",
            path: "menu",
            component: () =>
                import(
                    /* webpackChunkName: "about" */ "/@/views/business/MenuManager.vue"
                    ),
            meta: {
                // title: t('routes.dashboard.welcome'),
                title: '菜单管理',
                affix: true,
                icon: 'bx:bx-home',
            },
        },
        {
            name: "Resource",
            path: "resource",
            meta: {
                // title: t('routes.dashboard.welcome'),
                title: '资源管理',
                affix: true,
                icon: 'bx:bx-home',
            },
            component: () =>
                import(
                    /* webpackChunkName: "about" */ "/@/views/business/ResourceManager.vue"
                    ),
        },
        {
            name: "Dictionary",
            path: "dictionary",
            meta: {
                // title: t('routes.dashboard.welcome'),
                title: '字典管理',
                affix: true,
                icon: 'bx:bx-home',
            },
            component: () =>
                import("/@/views/business/DictionaryManager.vue" ),
        },
        {
            name: "User",
            path: "user",
            meta: {
                // title: t('routes.dashboard.welcome'),
                title: '用户管理',
                affix: true,
                icon: 'bx:bx-home',
            },
            component: () =>
                import( "/@/views/business/UserManager.vue" )
        },
    ],
};

export default manager;
