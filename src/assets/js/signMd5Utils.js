import md5 from 'js-md5'
import sha256 from 'js-sha256'

export default class signMd5Utils {
  /**
   * json参数升序
   * @param jsonObj 发送参数
   */

  static sortAsc(jsonObj) {
    let arr = new Array();
    let num = 0;
    for (let i in jsonObj) {
      arr[num] = i;
      num++;
    }
    let sortArr = arr.sort();
    let sortObj = {};
    for (let i in sortArr) {
      sortObj[sortArr[i]] = jsonObj[sortArr[i]];
    }
    return sortObj;
  }


  /**
   * @param url 请求的url,应该包含请求参数(url的?后面的参数)
   * @param requestParams 请求参数(POST的JSON参数)
   * @returns {string} 获取签名
   */
  static getSign(url, requestParams) {
    let urlParams = this.parseQueryString(url);
    let jsonObj = this.mergeObject(urlParams, requestParams);
    let requestBody = this.sortAsc(jsonObj);
    // let message = md5(JSON.stringify(requestBody)).toUpperCase();
    // let s = message+"janloong";
    // return md5(s).toUpperCase();
    console.log("signparam");
    console.log(requestBody);
    let message = sha256(JSON.stringify(requestBody)).toUpperCase();
    console.log(message);
    return message;

  }

  /**
   * @param url 请求的url
   * @returns {{}} 将url中请求参数组装成json对象(url的?后面的参数)
   */
  static parseQueryString(url) {
    let urlReg = /^[^\?]+\?([\w\W]+)$/,
      paramReg = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
      urlArray = urlReg.exec(url),
      result = {};
    if (urlArray && urlArray[1]) {
      let paramString = urlArray[1], paramResult;
      while ((paramResult = paramReg.exec(paramString)) != null) {
        result[paramResult[1]] = paramResult[2];
      }
    }
    return result;
  }

  /**
   * @returns {*} 将两个对象合并成一个
   */
  static mergeObject(objectOne, objectTwo) {
    if (Object.keys(objectTwo).length > 0) {
      for (let key in objectTwo) {
        if (objectTwo.hasOwnProperty(key) === true) {
          objectOne[key] = objectTwo[key];
        }
      }
    }
    return objectOne;
  }

  static urlEncode(param, key, encode) {
    if (param == null) return '';
    let paramStr = '';
    let t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
      for (let i in param) {
        let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
        paramStr += this.urlEncode(param[i], k, encode);
      }
    }
    return paramStr;
  };

  static getNonce(timestamp) {
    let num = Math.random() * (2 << 16);
    let preNonce = timestamp + ':' + num;
    let md = md5(preNonce);
    console.log(num);
    console.log(preNonce);
    console.log(md);
    return md;
  }
}