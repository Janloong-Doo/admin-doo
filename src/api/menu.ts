import {defAxios} from "/@/utils/http/index.ts"

import {getMenuListByUserParams, getMenuListByUserParamsResultModel} from '/@/api/model/menuModel';
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    GetRouteInfoByUser = '/menu/routeInfo',
    getMenuList = '/menu/list',
    getMenuListByUser = '/menu/listByUser',
    addMenu = '/menu/add',
    editMenu = '/menu/editMenu',
    delMenu = '/menu/delMenu/',
    changeMenuStatus = '/menu/changeMenuStatus',
}

/**
 * @description: Get user routeinfo based on id
 */
export function GetRouteInfoByUser(params: getMenuListByUserParams) {
    return defAxios.get<getMenuListByUserParamsResultModel>({
            url: Api.GetRouteInfoByUser,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
        }
    );
}

/**
 * 获取所有菜单信息
 * @param params
 * @constructor
 */
export function getMenuList(params: any) {
    return defAxios.get<any>({
            url: Api.getMenuList,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}


/**
 * 分配菜单时 获取菜单信息
 * @param params
 * @constructor
 */
export function getMenuListByUser(params: any) {
    return defAxios.post<any>({
            url: Api.getMenuListByUser,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}

/**
 * 添加菜单信息
 * @param params
 * @constructor
 */
export function addMenu(params: any) {
    return defAxios.postJson<any>({
            url: Api.addMenu,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}

/**
 * 编辑菜单信息
 * @param params
 * @constructor
 */
export function editMenu(params: any) {
    return defAxios.postJson<any>({
            url: Api.editMenu,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}

/**
 * 删除菜单信息
 * @param params
 * @constructor
 */
export function delMenu(params: any) {
    return defAxios.delete<any>({
            url: Api.delMenu + params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}

/**
 * 改变菜单状态
 * @param params
 * @constructor
 */
export function changeMenuStatus(params: any) {
    return defAxios.post<any>({
            url: Api.changeMenuStatus,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}
