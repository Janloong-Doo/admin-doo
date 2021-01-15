import {defAxios, otherHttp} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    syncMdFile = '/md/sync',
}

/**
 * 获取文件详情
 * @param url
 * @constructor
 */
export function getMdFileByUrl(url: any) {
    return otherHttp.get<any>({
            url: url,
            responseType: 'blob'
        }, {
            isTransformRequestResult: false
        }
    );
}


/**
 * 同步服务端文件信息
 * @param url
 * @constructor
 */
export function syncMdFile() {
    return defAxios.postJson<any>({
            url: Api.syncMdFile,
        }, {
            serviceName: ServiceEnum.HAP,
            isTransformRequestResult: false
        }
    );
}