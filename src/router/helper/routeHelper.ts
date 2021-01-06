import type {AppRouteModule, AppRouteRecordRaw} from '/@/router/types';
import type {RouteLocationNormalized, RouteRecordNormalized} from 'vue-router';

import {getParentLayout, LAYOUT} from '/@/router/constant';
import {cloneDeep} from 'lodash-es';
import dynamicImport from "/@/router/helper/dynamicImport";

// 动态引入
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
    if (!routes) return;
    routes.forEach((item) => {
        const {component, name} = item;
        const {children} = item;
        if (component) {
            item.component = dynamicImport(component);
            // console.log("component",component,item.component)
            // item.component = () => import('/@/views'+`${component}`)
        // item.component = () => import(/* @vite-ignore */`/@/views${component}`)
        } else if (name) {
            item.component = getParentLayout(name);
            // console.log("name",name,item.component)
        }
        //TODO 【疑惑】 动态导入如何写 by Janloong_Doo
        // let component1 = item.component;
        // item.component = () => import(`${component1}`)

        children && asyncImportRoute(children);
    });
}

function getLayoutComp(comp: string) {
    return comp === 'LAYOUT' ? LAYOUT : '';
}

// Turn background objects into routing objects
export function transformObjToRoute<T = AppRouteModule>(routeList: AppRouteModule[]): T[] {
    console.log("路由初始化", JSON.parse(JSON.stringify(routeList)));
    routeList.forEach((route) => {
        if (route.component) {
            if ((route.component as string).toUpperCase() === 'LAYOUT') {
                route.component = getLayoutComp(route.component.toUpperCase());
            } else {
                route.children = [cloneDeep(route)];
                route.component = LAYOUT;
                route.name = `${route.name}Parent`;
                route.path = '';
                const meta = route.meta || {};
                meta.single = true;
                meta.affix = false;
                route.meta = meta;
            }
        }
        route.children && asyncImportRoute(route.children);
    });
    return (routeList as unknown) as T[];
}

export function getParams(data: any = {}) {
    const {params = {}} = data;
    let ret = '';
    Object.keys(params).forEach((key) => {
        const p = params[key];
        ret += `/${p}`;
    });
    return ret;
}

// Return to the new routing structure, not affected by the original example
export function getRoute(route: RouteLocationNormalized): RouteLocationNormalized {
    if (!route) return route;
    const {matched, ...opt} = route;
    return {
        ...opt,
        matched: (matched
            ? matched.map((item) => ({
                meta: item.meta,
                name: item.name,
                path: item.path,
            }))
            : undefined) as RouteRecordNormalized[],
    };
}
