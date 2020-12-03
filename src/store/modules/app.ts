import {getModule, Module, VuexModule} from "vuex-module-decorators";
import store from "/@/store"
import {hotModuleUnregisterModule} from "/@/utils/helper/vuexHelper";

// app全局类
const NAME = 'app';
hotModuleUnregisterModule(NAME);
@Module({dynamic: true, namespaced: true, store, name: NAME})
class App extends VuexModule {

}
export { App };
export const appStore = getModule<App>(App);