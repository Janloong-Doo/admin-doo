import type {Router} from 'vue-router';

import {useTransitionSetting} from '/@/hooks/setting/useTransitionSetting.ts';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {unref} from 'vue';

const {getOpenNProgress} = useTransitionSetting();

export function createProgressGuard(router: Router) {
    router.beforeEach(async (to) => {
        //TODO 【设置】 取消页面动态进度条设置 by Janloong_Doo
        if (to.meta.loaded) return true;
        unref(getOpenNProgress) && NProgress.start();
        return true;
    });

    router.afterEach(async (to) => {
        if (to.meta.loaded) return true;
        unref(getOpenNProgress) && NProgress.done();
        return true;
    });
}
