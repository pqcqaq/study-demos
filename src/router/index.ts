import {
	RouteLocation,
	RouteRecordRaw,
	createRouter,
	createWebHashHistory,
} from "vue-router";

export const routes: Array<RouteRecordRaw> = [
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
			},
			{
				path: "drag",
				name: "拖拽课表",
				component: () => import("../pages/draggable/index.vue"),
				meta: { requiresAuth: false, breadcrumb: "拖拽Demo" },
			},
			{
				path: "table",
				name: "表格",
				component: () => import("../pages/table/index.vue"),
				meta: { requiresAuth: false, breadcrumb: "表格Demo" },
			},
			{
				path: "layout",
				redirect: "demo",
				component: () => import("../pages/layout/index.vue"),
				children: [
					{
						path: "demo",
						name: "布局测试",
						component: () =>
							import("../pages/layout/demo/index.vue"),
						meta: { requiresAuth: false, breadcrumb: "布局1" },
					},
				],
			},
			{
				path: "animation",
				name: "动画展示",
				component: () => import("../pages/animation/index.vue"),
				meta: { requiresAuth: false, breadcrumb: "动画展示" },
			},
			{
				path: "showaudio",
				name: "音频可视化",
				component: () => import("../pages/showaudio/index.vue"),
				meta: { requiresAuth: false, breadcrumb: "音频可视化" },
			},
			{
				path: "dynamic-form",
				name: "动态表单",
				component: () => import("../pages/dynamic-form/index.vue"),
				meta: { requiresAuth: false, breadcrumb: "动态表单" },
			},
			{
				path: "v-slidein",
				name: "自定义滑入指令",
				component: () => import("../pages/v-slidein/index.vue"),
				meta: { requiresAuth: false, breadcrumb: "自定义滑入指令" },
			},
			{
				path: "buttons",
				name: "不同组件库的按钮",
				component: () => import("../pages/buttons/index.vue"),
				meta: { requiresAuth: false, breadcrumb: "不同组件库的按钮" },
			},
			{
				path: "upload-image",
				name: "选择图片展示并上传",
				component: () => import("../pages/upload-image/index.vue"),
				meta: { requiresAuth: false, breadcrumb: "选择图片展示并上传" },
			},
			{
				path: "gemini-chat",
				name: "Gemini-chat测试",
				component: () => import("../pages/gemini-chat/index.vue"),
				meta: { requiresAuth: false, breadcrumb: "Gemini-chat测试" },
			},
		],
	},
	// {
	//   path: "/login",
	//   name: "登录",
	//   component: () => import("../views/Login/index.vue"),
	//   meta: { requiresAuth: false },
	// },
	{
		path: "/:pathMatch(.*)*",
		redirect: (_to: RouteLocation) => {
			// const role = sessionStorage.getItem("role");
			// // Check if the requested path is in the excluded paths
			// if (role === "ADMIN") {
			//   return "/orders";
			// } else if (role === "SERVER") {
			//   return "/query";
			// } else {
			//   return "/query"; // 默认情况下重定向到首页
			// }
			return "/home";
		},
	},
	// 添加其他路由配置...
];

// TODO: 自动注入路由Demo

const routes2: any = [];

const views: any = import.meta.glob("/src/pages/**/index.vue", { eager: true });

Object.keys(views).forEach((path) => {
	routes2.push({
		path: path.replace(/^\/src\/pages(\/\w+)?\/index\.\w+$/, "$1")
			? path.replace(/^\/src\/views(\/\w+)?\/index\.\w+$/, "$1")
			: "/",
		name: path
			.replace(/^\/src\/pages(\/\w+)?\/index\.\w+$/, "$1")
			.replace("/", ""),
		component: views[path].default,
	});
});

console.log("自动生成的路由：", routes2);

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
