import { pa } from "element-plus/es/locales.mjs";

/**
 * 常量路由，固定不变
 */
export const constantRouters = [
    {
      path: "/403",
      name: "403",
      hidden: true,
      component: () => import("@/views/error/403.vue"),
      meta: { hidden: true },
    },
    {
      path: "/404",
      name: "404",
      hidden: true,
      component: () => import("@/views/error/404.vue"),
      meta: { hidden: true },
    },
    // {
    //   path: "/oauth/authorization_code_callback",
    //   name: "oauth-authorization_code_callback",
    //   hidden: true,
    //   component: () => import("@/views/oauth/callback.vue"),
    //   meta: { hidden: true },
    // },
  ];

  // 动态路由，用于和菜单匹配，过滤有权限的路由
  export const dynamicRouters = [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      name: "index",
      component: () => import("@/layout/index.vue"),
      meta: { title: "首页", icon: "home" },
    }
  ]