import {otherHttp} from "/@/utils/http/index.ts"
import {ServiceEnum} from "/@/enums/httpEnum";

enum Api {
    getMdFileByUrl = '/',
}

/**
 * 获取所有菜单信息
 * @param url
 * @constructor
 */
export function getMdFileByUrl(url: any) {
    return otherHttp.get<any>({
            url: url,
            responseType: 'arraybuffer'
        }, {
            isTransformRequestResult: false
        }
    );
}

