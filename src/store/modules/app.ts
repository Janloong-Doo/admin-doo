import {getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "/@/store"
import {hotModuleUnregisterModule} from "/@/utils/helper/vuexHelper";

// app全局类
const NAME = 'app';
hotModuleUnregisterModule(NAME);

@Module({dynamic: true, namespaced: true, store, name: NAME})
class App extends VuexModule {

    // Page loading status
    private pageLoadingState = false;

    @Mutation
    commitPageLoadingState(loading: boolean): void {
        this.pageLoadingState = loading;
    }
}

export {App};
export const appStore = getModule<App>(App);