// import request from "../js/dRequest";
import request from "@/assets/api/axiorequest";
// require ('@/assets/api/url')
// import host from "@/assets/api/url";
// const request = require("@/assets/js/dRequest")
// const host = require("@/assets/api/url");
const host = {
    dip: "http://localhost:8901"
}
const baseBusiness = '/hap';
//==============resource================

// export const apiHome = (p, config) => request.post('/home', p, config);
const getToken = (params: any, config: any) => request.post(host.dip + '/oauth/token', params, config);
const checkToken = (params: any, config: any) => request.post(host.dip + '/oauth/check_token', params, config);
const getResourceInfo = (params: any, config: any) => request.get(host.dip + '/user', params, config);

//==============department================
const addDepartMent = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/organize/add', params, config);
const getDepartMentList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/organize/list', params, config);
const delDepartMent = (params: any, config: any) => request.del(host.dip + baseBusiness + '/organize/' + params, null, config);
const editOrg = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/organize/editOrg', params, config);
const changeOrgStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/organize/changeOrgStatus', params, config);

//==============Role================
const addRole = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/role/addRole', params, config);
const getRoleList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/role/list', params, config);
const delRole = (params: any, config: any) => request.del(host.dip + baseBusiness + '/role/' + params, null, config);
const editRole = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/role/editRole', params, config);
const changeRoleStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/role/changeRoleStatus', params, config);

//==============menu================
const getMenuList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/menu/list', params, config);
const getMenuListByUser = (params: any, config: any) => request.post(host.dip + baseBusiness + '/menu/listByUser', params, config);
const addMenu = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/menu/add', params, config);
const editMenu = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/menu/editMenu', params, config);
const delMenu = (params: any, config: any) => request.del(host.dip + baseBusiness + '/menu/delMenu/' + params, null, config);
const changeMenuStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/menu/changeMenuStatus', params, config);

//==============dictionary================
const getDicList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/dictionary/list', params, config);
const getDicListByCode = (params: any, config: any) => request.get(host.dip + baseBusiness + '/dictionary/listByCode', params, config);
const addDic = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/dictionary/add', params, config);
const editDic = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/dictionary/edit', params, config);
const delDic = (params: any, config: any) => request.del(host.dip + baseBusiness + '/dictionary/delDic/' + params, null, config);
const changeDicStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/dictionary/changeDicStatus', params, config);

//==============resource================
const getResourceList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/resource/list', params, config);
const getResourceGroupByType = (params: any, config: any) => request.get(host.dip + baseBusiness + '/resource/getResourceGroupByType', params, config);
const addResource = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/resource/add', params, config);
const editResource = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/resource/edit', params, config);
const delResource = (params: any, config: any) => request.del(host.dip + baseBusiness + '/resource/del/' + params, null, config);
const changeResourceStatus = (params: any, config: any) => request.post(host.dip + baseBusiness + '/resource/changeResourceStatus', params, config);

//==============userManager================
const getUserManagerList = (params: any, config: any) => request.get(host.dip + baseBusiness + '/userManager/listAll', params, config);
const addUserManager = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/userManager/addUser', params, config);
const editUserManagerList = (params: any, config: any) => request.postJson(host.dip + baseBusiness + '/userManager/editUser', params, config);
const delUserManager = (params: any, config: any) => request.del(host.dip + baseBusiness + '/userManager/delUser/' + params, null, config);
const disableUserManager = (params: any, config: any) => request.post(host.dip + baseBusiness + '/userManager/disableUser', params, config);
const resetUserManagerPassword = (params: any, config: any) => request.post(host.dip + baseBusiness + '/userManager/resetPassword', params, config);


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