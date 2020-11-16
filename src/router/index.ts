import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    redirect:"business"
    // name: "Home",
    // component: () => import("../views/Home.vue"),
  },
  {
    path: "/business2",
    name: "Home2",
    // redirect:"/business"
    component: () => import("../views/Home2.vue"),
    children: [
      {
        path: "/business2/study",
        name: "Home3",
        component: () => import("../views/Home3.vue")

      }
    ]
  },
  {
    path: "/business",
    name: "business",
    component: () => import("../views/Business.vue"),
    children: [
      //权限管理相关
      {
        name: "department",
        path: "/business/department",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/business/Department.vue"
            ),
      },
      {
        name: "role",
        path: "/business/role",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/business/Role.vue"),
      },
      {
        name: "menuManager",
        path: "/business/menuManager",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/business/MenuManager.vue"
            ),
      },
      {
        name: "resourceManager",
        path: "/business/resourceManager",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/business/ResourceManager.vue"
            ),
      },
      {
        name: "dictionary",
        path: "/business/dictionary",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/business/DictionaryManager.vue"
            ),
      },{
        name: "userManager",
        path: "/business/userManager",
        component: () =>
            import(
                /* webpackChunkName: "about" */ "../views/business/UserManager.vue"
                ),
      },

      //spring 相关
      {
        name: "Oauth2",
        path: "/business/spring/oauth2",
        // props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/spring/Oauth2.vue"),
      },
      {
        name: "Activiti",
        path: "/business/spring/activiti",
        // props: true,
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/spring/Activiti.vue"
            ),
      },

      //study相关
      {
        path: "/business/study",
        name: "study",
        props: true,
        component: () =>
          import("../views/Study.vue"),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes
})