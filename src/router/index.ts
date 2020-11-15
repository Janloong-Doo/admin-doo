import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
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
      // {
      //   name: 'login',
      //   path: "/business/spring/login",
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "./views/spring/oauth2/Login.vue")
      // },
      // {
      //   name: 'user',
      //   path: "/business/spring/user",
      //   props: (route) => ({name: 'doo', age: '25', id: route.params.id}),
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "./views/spring/oauth2/User.vue")
      // },
      // {
      //   name: 'index',
      //   path: "/business/spring/index",
      //   props: true,
      //   // props: {signStatus: 'index'},
      //   // props: (route) => ({signStatus:'index'}),
      //   component: () =>
      //     import(/* webpackChunkName: "about" */ "./views/spring/oauth2/Index.vue")
      // },
      //study相关
      {
        path: "/business/study",
        name: "study",
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import("../views/Study.vue"),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
})