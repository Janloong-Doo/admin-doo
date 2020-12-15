import {RouteMeta} from '/@/router/types';

export interface RouteItem {
    id: string
    pid: string
    level: string
    path: string;
    component: any;
    meta: RouteMeta;
    name?: string;
    alias?: string | string[];
    redirect?: string;
    caseSensitive?: boolean;
    children?: RouteItem[];
}

/**
 * @description: Get menu interface
 */
export interface getMenuListByUserParams {
    id: string;
}

/**
 * @description: Get menu return value
 */
export type getMenuListByUserParamsResultModel = RouteItem[];
