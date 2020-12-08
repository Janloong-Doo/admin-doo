import {createRouter, createWebHistory} from "vue-router";

const router =createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "manager"
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../views/login/Login.vue"),
        },
        {
            // path: "/business",
            path: "/manager",
            name: "Manager",
            // name: "business",
            component: () => import("../views/BaseView.vue"),
            children: [
                {
                    name: "Department",
                    path: "department",
                    component: () =>
                        import(
                            /* webpackChunkName: "about" */ "../views/business/Department.vue"
                            ),
                },
                {
                    name: "Role",
                    path: "role",
                    component: () =>
                        import(/* webpackChunkName: "about" */ "../views/business/Role.vue"),
                },
                {
                    name: "Menu",
                    path: "menu",
                    component: () =>
                        import(
                            /* webpackChunkName: "about" */ "../views/business/MenuManager.vue"
                            ),
                },
                {
                    name: "Resource",
                    path: "resource",
                    component: () =>
                        import(
                            /* webpackChunkName: "about" */ "../views/business/ResourceManager.vue"
                            ),
                },
                {
                    name: "Dictionary",
                    path: "dictionary",
                    component: () =>
                        import("../views/business/DictionaryManager.vue" ),
                }, {
                    name: "User",
                    path: "user",
                    component: () =>
                        import( "../views/business/UserManager.vue" )
                },
            ],
        },
        //spring 相关
        {
            path: "/spring",
            name: "Spring",
            // redirect: "/spring/oauth2",
            component: () => import("../views/BaseView.vue"),
            children: [
                {
                    name: "Oauth2",
                    path: "oauth2",
                    // props: true,
                    component: () =>
                        import(/* webpackChunkName: "about" */ "../views/spring/Oauth2.vue"),
                },
                {
                    name: "Activiti",
                    path: "activiti",
                    // props: true,
                    component: () =>
                        import(
                            /* webpackChunkName: "about" */ "../views/spring/Activiti.vue"
                            ),
                },
            ]
        },
        //study相关
        {
            path: "/study",
            name: "Study",
            props: true,
            component: () => import("../views/BaseView.vue"),
            children: [
                {
                    name: "Base",
                    path: "base",
                    // props: true,
                    component: () =>
                        import(
                            /* webpackChunkName: "about" */ "../layout/study/Study.vue"
                            ),
                },
            ]
        },
    ]
})

// reset router
export function resetRouter() {
    const resetWhiteNameList = [
        'Login',
        'Root',
        // 'FullErrorPage'
    ];
    router.getRoutes().forEach((route) => {
        const { name } = route;
        if (name && !resetWhiteNameList.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
}

export default router;