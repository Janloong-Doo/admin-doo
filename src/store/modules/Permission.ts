import {getModule, Module, VuexModule} from "vuex-module-decorators";
import store from "/@/store"

// app全局类
const NAME = 'permission';

@Module({dynamic: true, namespaced: true, store, name: NAME})
class Permission extends VuexModule {


}
export { Permission };
export const permissionStore = getModule<Permission>(Permission);