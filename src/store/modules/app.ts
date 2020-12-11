import {getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "/@/store"
import {hotModuleUnregisterModule} from "/@/utils/helper/vuexHelper";
import {ProjectConfig} from "/@/types/config";
import {getLocal, setLocal} from "/@/utils/helper/persistent";
import {PROJ_CFG_KEY} from "/@/enums/cacheEnum";
import {deepMerge} from "/@/utils";

// app全局类
const NAME = 'app';
hotModuleUnregisterModule(NAME);

@Module({dynamic: true, namespaced: true, store, name: NAME})
class App extends VuexModule {

    // Page loading status
    private pageLoadingState = false;


    // project config
    private projectConfigState: ProjectConfig | null = getLocal(PROJ_CFG_KEY);


    get getProjectConfig(): ProjectConfig {
        return this.projectConfigState || ({} as ProjectConfig);
    }

    /**
     * 设置页面加载状态
     * @param loading
     */
    @Mutation
    commitPageLoadingState(loading: boolean): void {
        this.pageLoadingState = loading;
    }


    @Mutation
    commitProjectConfigState(proCfg: DeepPartial<ProjectConfig>): void {
        this.projectConfigState = deepMerge(this.projectConfigState || {}, proCfg);
        setLocal(PROJ_CFG_KEY, this.projectConfigState);
    }
}

export {App};
export const appStore = getModule<App>(App);