import {defAxios} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    addRole = '/role/addRole',
    getRoleList = '/role/list',
    delRole = '/role/',
    editRole = '/role/editRole',
    changeRoleStatus = '/role/changeRoleStatus',
}

export function addRole(params: any) {
    return defAxios.postJson<any>({
            url: Api.addRole,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}

export function getRoleList(params: any) {
    return defAxios.get<any>({
            url: Api.getRoleList,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}

export function delRole(params: any) {
    return defAxios.delete<any>({
            url: Api.delRole + params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}

export function editRole(params: any) {
    return defAxios.postJson<any>({
            url: Api.editRole,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}

export function changeRoleStatus(params: any) {
    return defAxios.post<any>({
            url: Api.changeRoleStatus,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            errorMessageMode: "message",
            isTransformRequestResult: false
        }
    );
}