// import request from "../js/dRequest";
import request from "./axiorequest";
// import request from "@/assets/api/axiorequest";
// require ('@/assets/api/url')
// import host from "@/assets/api/url";
// const request = require("@/assets/js/dRequest")
// const host = require("@/assets/api/url");
const host = {
    dip: "http://localhost:8901"
}
// const baseBusiness = '/hap';
const baseBusiness = '/hap';
//==============base================

//==============resource================
// export const apiHome = (p, config) => request.post('/home', p, config);
const getToken = (params: any) => request.post(host.dip + '/oauth/token', params);
const checkToken = (params: any, config: any) => request.post(host.dip + '/oauth/check_token', params);
const getResourceInfo = (params: any, config: any) => request.get(host.dip + '/user', params);

//==============department================
const addDepartMent = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/organize/add', params);
const getDepartMentList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/organize/list', params);
const delDepartMent = (params: any, config: any) => request.del(host.dip + baseBusiness + '/organize/' + params, null);
const editOrg = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/organize/editOrg', params);
const changeOrgStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/organize/changeOrgStatus', params);

//==============Role================
const addRole = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/role/addRole', params);
const getRoleList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/role/list', params);
const delRole = (params: any, config: any) => request.del(host.dip + baseBusiness + '/role/' + params, null);
const editRole = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/role/editRole', params);
const changeRoleStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/role/changeRoleStatus', params);

//==============menu================
const getMenuList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/menu/list', params);
const getMenuListByUser = (params: any, config: any) => request.post(host.dip + baseBusiness + '/menu/listByUser', params);
const addMenu = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/menu/add', params);
const editMenu = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/menu/editMenu', params);
const delMenu = (params: any, config: any) => request.del(host.dip + baseBusiness + '/menu/delMenu/' + params, null);
const changeMenuStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/menu/changeMenuStatus', params);

//==============dictionary================
const getDicList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/dictionary/list', params);
const getDicListByCode = (params: any, config: any) => request.get(host.dip + baseBusiness + '/dictionary/listByCode', params);
const addDic = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/dictionary/add', params);
const editDic = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/dictionary/edit', params);
const delDic = (params: any, config: any) => request.del(host.dip + baseBusiness + '/dictionary/delDic/' + params, null);
const changeDicStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/dictionary/changeDicStatus', params);

//==============resource================
const getResourceList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/resource/list', params);
const getResourceGroupByType = (params: any, config: any) => request.get(host.dip + baseBusiness + '/resource/getResourceGroupByType', params);
const addResource = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/resource/add', params);
const editResource = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/resource/edit', params);
const delResource = (params: any, config: any) => request.del(host.dip + baseBusiness + '/resource/del/' + params, null);
const changeResourceStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/resource/changeResourceStatus', params);

//==============userManager================
const getUserManagerList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/userManager/listAll', params);
const addUserManager = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/userManager/addUser', params);
const editUserManagerList = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/userManager/editUser', params);
const delUserManager = (params: any, config: any) => request.del(host.dip + baseBusiness + '/userManager/delUser/' + params, null);
const disableUserManager = (params: any, config: any) => request.post(host.dip + baseBusiness + '/userManager/disableUser', params);
const resetUserManagerPassword = (params: any, config: any) => request.post(host.dip + baseBusiness + '/userManager/resetPassword', params);


export default {
    getToken
    , checkToken
    , getResourceInfo
    , addDepartMent
    , getDepartMentList
    , delDepartMent
    , editOrg
    , changeOrgStatus
    , getRoleList
    , addRole
    , delRole
    , editRole
    , changeRoleStatus
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
    , getResourceGroupByType
    , addResource
    , editResource
    , delResource
    , changeResourceStatus
    , getUserManagerList
    , addUserManager
    , editUserManagerList
    , delUserManager
    , disableUserManager
    , resetUserManagerPassword
}