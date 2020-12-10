import type {AppRouteModule} from '/@/router/types';
import BaseView from "/@/views/BaseView.vue";
// import { t } from '/@/hooks/web/useI18n';

const study: AppRouteModule = {
    path: '/study',
    name: 'Study',
    component: BaseView,
    meta: {
        icon: 'bx:bx-home',
        // title: t('routes.dashboard.welcome'),
        title: 'spring',
    },
    children: [
        {
            name: "Base",
            path: "base",
            // props: true,
            component: () =>
                import(/* webpackChunkName: "about" */ "/@/layouts/study/Study.vue"),
            meta: {
                // title: t('routes.dashboard.welcome'),
                title: 'oauth2认证',
                affix: true,
                icon: 'bx:bx-home',
            },
        }
    ],
};

export default study;
