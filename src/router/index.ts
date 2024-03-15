import { RouteLocation, RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("../layouts/index.vue"),
        redirect: "/home",
        children: [
          {
            path: "home",
            name: "主页",
            component: () => import("../pages/home/index.vue"),
            meta: { requiresAuth: false, breadcrumb: "用户管理" },
            },
            {
                path: "ws",
                name: "websocket",
                component: () => import("../pages/ws/index.vue"),
                meta: { requiresAuth: false, breadcrumb: "用户管理" },
            }
        ],
      },
    //   {
    //     path: "/login",
    //     name: "登录",
    //     component: () => import("../views/Login/index.vue"),
    //     meta: { requiresAuth: false },
    //   },
      {
        path: "/:pathMatch(.*)*",
        redirect: (_to: RouteLocation) => {
          const role = sessionStorage.getItem("role");
          // Check if the requested path is in the excluded paths
          if (role === "ADMIN") {
            return "/orders";
          } else if (role === "SERVER") {
            return "/query";
          } else {
            return "/query"; // 默认情况下重定向到首页
          }
        },
      },
      // 添加其他路由配置...
]

// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
  // const pathsWithoutAuth = [""];
  // 路由前置守卫
//   router.beforeEach((to, _from, next) => {
//     // 检查路由是否需要认证
//     if (pathsWithoutAuth.some((path) => to.path.startsWith(path))) {
//       next(); // Allow access without token guard
//     } else if (to.matched.some((record) => record.meta.requiresAuth)) {
//       const token = sessionStorage.getItem("token");
//       const role = sessionStorage.getItem("role");
  
//       if (token == null) {
//         // 如果没有 token，重定向到登录页面
//         next({
//           path: "/login",
//           query: { redirect: to.fullPath },
//         });
//       } else if (role === "ADMIN") {
//         const allowedPathsForRole0 = [
//           "/role",
//           "/package",
//           "/products",
//           "/photos",
//           "/query",
//           "/orders",
//           "/role",
//           "/suitPhotos"
//         ];
//         if (allowedPathsForRole0.includes(to.path)) {
//           next(); // 如果用户试图访问的页面在允许的页面列表中，则允许访问
//         } else {
//           next({ path: "/orders" }); // 否则，重定向到首页
//         }
//       } else if (role === "SERVER") {
//         const allowedPathsForRole2 = ["/query", "/orders"];
//         if (allowedPathsForRole2.includes(to.path)) {
//           next(); // 如果用户试图访问的页面在允许的页面列表中，则允许访问
//         } else {
//           next({ path: "/query" }); // 否则，重定向到首页
//         }
//       } else {
//         // 如果有 token，正常跳转
//         next();
//       }
//     } else {
//       // 如果路由不需要认证，正常跳转
//       next();
//     }
//   });

export default router;