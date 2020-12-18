import {defAxios} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    addDepartMent = '/organize/add',
    getDepartMentList = '/organize/list',
    delDepartMent = '/organize/',
    editOrg = '/organize/editOrg',
    changeOrgStatus = '/organize/changeOrgStatus',
}

export function addDepartMent(params: any) {
    return defAxios.postJson<any>({
            url: Api.addDepartMent,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
        }
    );
}

export function getDepartMentList(params: any) {
    return defAxios.get<any>({
            url: Api.getDepartMentList,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
        }
    );
}

export function delDepartMent(params: any) {
    return defAxios.delete<any>({
            url: Api.delDepartMent + params,
        }, {
            serviceName: ServiceEnum.HAP,
        }
    );
}

export function editOrg(params: any) {
    return defAxios.postJson<any>({
            url: Api.editOrg,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
        }
    );
}

export function changeOrgStatus(params: any) {
    return defAxios.post<any>({
            url: Api.changeOrgStatus,
            params,
        }, {
            serviceName: ServiceEnum.HAP,
            errorMessageMode: "message"
        }
    );
}