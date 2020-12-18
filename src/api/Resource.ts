import {defAxios} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    getResourceList = '/resource/list',
    getResourceGroupByType = '/resource/getResourceGroupByType',
    addResource = '/resource/add',
    editResource = '/resource/edit',
    delResource = '/resource/del/',
    changeResourceStatus = '/resource/changeResourceStatus',
}

/**
 * 获取所有菜单信息
 * @param params
 * @constructor
 */
export function getResourceList(params: any) {
    return defAxios.get<any>({
            url: Api.getResourceList,
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
export function getResourceGroupByType(params: any) {
    return defAxios.get<any>({
            url: Api.getResourceGroupByType,
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
export function addResource(params: any) {
    return defAxios.postJson<any>({
            url: Api.addResource,
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
export function editResource(params: any) {
    return defAxios.postJson<any>({
            url: Api.editResource,
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
export function delResource(params: any) {
    return defAxios.delete<any>({
            url: Api.delResource + params,
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
export function changeResourceStatus(params: any) {
    return defAxios.post<any>({
            url: Api.changeResourceStatus,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}
