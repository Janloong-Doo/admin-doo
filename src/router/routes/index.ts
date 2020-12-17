import type {AppRouteModule, AppRouteRecordRaw} from '/@/router/types';

import modules from 'globby!/@/router/routes/modules/**/*.@(ts)';

import {t} from '/@/hooks/web/useI18n';
import {PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE} from "/@/router/constant";

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
    const mod = Array.isArray(modules[key]) ? [...modules[key]] : [modules[key]];
    routeModuleList.push(...mod);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];
// export const asyncRoutes = [...routeModuleList];

export const LoginRoute: AppRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/Login.vue'),
    meta: {
        title: t('admin.login.loginTitle'),
        // title: "登录"
    },
};

// 基础路由 不用权限
// export const basicRoutes = [LoginRoute, REDIRECT_ROUTE,...routeModuleList];
export const basicRoutes = [LoginRoute, REDIRECT_ROUTE];
// export const basicRoutes = [LoginRoute];
