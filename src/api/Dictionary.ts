import {defAxios} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    getDicList = '/dictionary/list',
    getDicListByCode = '/dictionary/listByCode',
    addDic = '/dictionary/add',
    editDic = '/dictionary/edit',
    delDic = '/dictionary/delDic/',
    changeDicStatus = '/dictionary/changeDicStatus',
}

/**
 * 获取所有菜单信息
 * @param params
 * @constructor
 */
export function getDicList(params: any) {
    return defAxios.get<any>({
            url: Api.getDicList,
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
export function getDicListByCode(params: any) {
    return defAxios.get<any>({
            url: Api.getDicListByCode,
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
export function addDic(params: any) {
    return defAxios.postJson<any>({
            url: Api.addDic,
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
export function editDic(params: any) {
    return defAxios.postJson<any>({
            url: Api.editDic,
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
export function delDic(params: any) {
    return defAxios.delete<any>({
            url: Api.delDic + params,
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
export function changeDicStatus(params: any) {
    return defAxios.post<any>({
            url: Api.changeDicStatus,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}
