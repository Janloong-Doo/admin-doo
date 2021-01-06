import type {AppRouteModule} from '/@/router/types';
import BaseView from "/@/views/BaseView.vue";
// import { t } from '/@/hooks/web/useI18n';

const spring: AppRouteModule = {
    path: '/spring',
    name: 'Spring',
    component: BaseView,
    meta: {
        icon: 'bx:bx-home',
        // title: t('routes.dashboard.welcome'),
        title: 'spring',
    },
    children: [
        {
            name: "Oauth2",
            path: "oauth2",
            // props: true,
            component: () =>
                import(/* webpackChunkName: "about" */ "/@/views/spring/Oauth2.vue"),
            meta: {
                // title: t('routes.dashboard.welcome'),
                title: 'oauth2认证',
                affix: true,
                icon: 'bx:bx-home',
            },
        },
        {
            name: "Activiti",
            path: "activiti",
            component: () =>
                import(/* webpackChunkName: "about" */ "/@/views/spring/Activiti.vue"),
            meta: {
                // title: t('routes.dashboard.welcome'),
                title: 'oauth2认证',
                affix: true,
                icon: 'bx:bx-home',
            },
        },
    ],
};

export default spring;
