import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {
	AntDesignVueResolver,
	ElementPlusResolver,
} from "unplugin-vue-components/resolvers";
import Inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [
				ElementPlusResolver(),
				AntDesignVueResolver({
					//对使用到的全局ant design vue组件进行类型导入
					importStyle: false, // 不动态引入css,这个不强求
				}),
			],
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/], //包含的文件类型
		}),
		vue(),
		Inspect(),
	],
	server: {
		/** 接口代理 */
		proxy: {
			"/pyapi/": {
				target: "http://localhost:5000",
				ws: true,
				/** 是否允许跨域 */
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/pyapi/, ""),
			},
		},
	},
	build: {
		minify: "terser",
		rollupOptions: {
			// 分包配置
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return id.toString().split("node_modules/")[1].split("/")[0];
					}
				},
			},
		},
	},
});

