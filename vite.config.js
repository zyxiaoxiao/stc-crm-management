import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(mode => {
	return {
		base: "/", // 开发或生产环境服务的公共基础路径 配置引入相对路径
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
				"vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "./src/styles/var.scss";`
				}
			}
		},
		server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: "0.0.0.0",
			open: true, //启动项目自动弹出浏览器
			port: 3000, //启动端口
			proxy: {
				// 跨域代理http://192.168.3.33:8086
				"/apis": {
					target: "http://192.168.3.33:8086",
					changeOrigin: true,
					rewrite: path => path.replace(/^\/apis/, "")
				}
			}
		},
		plugins: [
			vue(),
			// * name 可以写在 script 标签上
			vueSetupExtend(),
			//使用jsx语法
			vueJsx()
		],
		// * 打包去除 console.log && debugger
		esbuild: {
			pure: false ? ["console.log", "debugger"] : []
		},
		build: {
			outDir: "dist",
			minify: "esbuild",
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
