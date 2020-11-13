import axios from 'axios'

import {Message} from 'element-ui'
import mVue from '../../main'

axios.interceptors.request.use(config => {
  if (config.method === 'POST' || config.method === 'post') {
    console.log('vue开启credentials');
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  }
  // 每次发送请求之前判断vuex中是否存在token
  // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  // const token = store.state.token;
  // token && (config.headers.Authorization = token);
  //不生效
  // axios.defaults.withCredentials = true;
  config.withCredentials = true;
  return config;
}, err => {
  Message.error({message: '请求超时!'});
  // return Promise.error(error);
});

axios.interceptors.response.use(data => {
  let newVar = data.status && data.status === 200 && data.data.success === true;
  if (!newVar) {
    // Message.error({message: "请求失败"});
    return data.data;
  }
  if (data.data.msg) {
    // Message.success({message: data.data.msg});
  }
  return data.data;
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status === 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  } else if (err.response.status === 401) {
    Message.error({message: err.response.data.msg});
    mVue.$router.push("/spring/login")
    // return;
  } else {
    if (err.response.data.msg) {
      Message.error({message: err.response.data.msg});
    } else {
      Message.error({message: '未知错误!'});
    }
  }
});