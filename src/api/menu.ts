import {defAxios} from "/@/utils/http/index.ts"

import {getMenuListByUserParams, getMenuListByUserParamsResultModel} from '/@/api/model/menuModel';
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    GetMenuListByUser = '/menu/routeInfo',
}

/**
 * @description: Get user menu based on id
 */
export function GetMenuListByUser(params: getMenuListByUserParams) {
    return defAxios.post<getMenuListByUserParamsResultModel>({
            url: Api.GetMenuListByUser,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
        }
    );
}
