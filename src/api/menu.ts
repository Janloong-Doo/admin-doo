import {defAxios} from "/@/utils/http/index.ts"

import { getMenuListByUserParams, getMenuListByUserParamsResultModel } from '/@/api/model/menuModel';
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    GetMenuListByUser = '/menu/listByUser',
}

/**
 * @description: Get user menu based on id
 */
export function GetMenuListByUser(params: getMenuListByUserParams) {
  return defAxios.request<getMenuListByUserParamsResultModel>({
    url: Api.GetMenuListByUser,
    method: 'GET',
    params,
  },{
      serviceName: ServiceEnum.AUTH,
      }
  );
}
