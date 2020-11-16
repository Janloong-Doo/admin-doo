import request from "../js/dRequest";
import host from "./url";

const baseBusiness = '/hap';

//==============resource================

// export const apiHome = (p, config) => request.post('/home', p, config);
const getToken = (params, config) => request.post(host.dip + '/oauth/token', params, config);
const checkToken = (params, config) => request.post(host.dip + '/oauth/check_token', params, config);
const getResourceInfo = (params, config) => request.get(host.dip + '/user', params, config);

//==============department================
const addDepartMent = (params, config) => request.postJson(host.dip + baseBusiness + '/organize/add', params, config);
const getDepartMentList = (params, config) => request.get(host.dip + baseBusiness + '/organize/list', params, config);
const delDepartMent = (params, config) => request.del(host.dip + baseBusiness + '/organize/' + params, null, config);

//==============Role================
const addRole = (params, config) => request.postJson(host.dip + baseBusiness + '/role', params, config);
const getRoleList = (params, config) => request.get(host.dip + baseBusiness + '/role/list', params, config);
const delRole = (params, config) => request.del(host.dip + baseBusiness + '/role/' + params, null, config);

//==============menu================
const getMenuList = (params, config) => request.get(host.dip + baseBusiness + '/menu/list', params, config);
const getMenuListByUser = (params, config) => request.post(host.dip + baseBusiness + '/menu/listByUser', params, config);
const addMenu = (params, config) => request.postJson(host.dip + baseBusiness + '/menu/add', params, config);
const editMenu = (params, config) => request.postJson(host.dip + baseBusiness + '/menu/editMenu', params, config);
const delMenu = (params, config) => request.del(host.dip + baseBusiness + '/menu/delMenu/' + params, null, config);
const changeMenuStatus = (params, config) => request.post(host.dip + baseBusiness + '/menu/changeMenuStatus' ,params,  config);

//==============dictionary================
const getDicList = (params, config) => request.get(host.dip + baseBusiness + '/dictionary/list', params, config);
const getDicListByCode = (params, config) => request.get(host.dip + baseBusiness + '/dictionary/listByCode', params, config);
const addDic = (params, config) => request.postJson(host.dip + baseBusiness + '/dictionary/add', params, config);
const editDic = (params, config) => request.postJson(host.dip + baseBusiness + '/dictionary/edit', params, config);
const delDic = (params, config) => request.del(host.dip + baseBusiness + '/dictionary/delDic/' + params, null, config);
const changeDicStatus = (params, config) => request.post(host.dip + baseBusiness + '/dictionary/changeDicStatus' ,params,  config);

//==============resource================
const getResourceList = (params, config) => request.get(host.dip + baseBusiness + '/resource/list', params, config);
const addResource = (params, config) => request.postJson(host.dip + baseBusiness + '/resource/add', params, config);
const editResource = (params, config) => request.postJson(host.dip + baseBusiness + '/resource/edit', params, config);
const delResource = (params, config) => request.del(host.dip + baseBusiness + '/resource/del/' + params, null, config);
const changeResourceStatus = (params, config) => request.post(host.dip + baseBusiness + '/resource/changeResourceStatus' ,params,  config);

//==============userManager================
const getUserManagerList = (params, config) => request.get(host.dip + baseBusiness + '/userManager/listAll', params, config);


export default {
  getToken
  , checkToken
  , getResourceInfo
  , addDepartMent
  , getDepartMentList
  , delDepartMent
  , getRoleList
  , addRole
  , delRole
  , getMenuList
  , getMenuListByUser
  , addMenu
  , editMenu
  , delMenu
  , changeMenuStatus
  , getDicList
  , getDicListByCode
  , addDic
  , editDic
  , delDic
  , changeDicStatus
  , getResourceList
  , addResource
  , editResource
  , delResource
  , changeResourceStatus
  , getUserManagerList
}