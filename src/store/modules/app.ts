import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "/@/store"
import {hotModuleUnregisterModule} from "/@/utils/helper/vuexHelper";
import {ProjectConfig} from "/@/types/config";
import {clearLocal, clearSession, getLocal, setLocal} from "/@/utils/helper/persistent";
import {PROJ_CFG_KEY} from "/@/enums/cacheEnum";
import {deepMerge} from "/@/utils";
import {resetRouter} from "/@/router";
import {permissionStore} from "/@/store/modules/permission";
import {tabStore} from "/@/store/modules/tab";
import {userStore} from "/@/store/modules/User";

// app全局类
let timeId: TimeoutHandle;
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


    @Action
    async resumeAllState() {
        resetRouter();
        clearSession();
        clearLocal();

        permissionStore.commitResetState();
        tabStore.commitResetState();
        userStore.commitResetState();
    }

    @Action
    public async setPageLoadingAction(loading: boolean): Promise<void> {
        if (loading) {
            clearTimeout(timeId);
            // Prevent flicker
            timeId = setTimeout(() => {
                this.commitPageLoadingState(loading);
            }, 50);
        } else {
            this.commitPageLoadingState(loading);
            clearTimeout(timeId);
        }
    }
}

export {App};
export const appStore = getModule<App>(App);