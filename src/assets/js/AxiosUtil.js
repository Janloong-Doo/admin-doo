import axios from "axios";
import qs from 'qs';

export default class AxiosUtil {

  static get(url, param) {

    // param = param == null ? {} : {params: param};
    // console.log(param);
    let config = {
      // withCredentials: true,
      params:param
    };
    return new Promise((resolve, reject) => {
      axios.get(url, config).then(res => {
          resolve(res);
        }
      ).catch(res => {
        reject(res);
      });
    });
  }

  static post(url, param) {
    param = param == null ? {} : param;
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // withCredentials: true
    };

    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(param), config)
        .then(res => {
          resolve(res)
        }).catch(res => {
        reject(res)
      })
    });
  }
}
