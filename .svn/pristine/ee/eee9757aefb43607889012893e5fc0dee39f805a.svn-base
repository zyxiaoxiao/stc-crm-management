import { defineStore } from "pinia";
import piniaPersistConfig from "/src/config/piniaPersist.js";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: () => ({
		//服务地址
		serverUrl: "http://192.168.3.33:8086",
		// token
		token: "",
		// userInfo
		userInfo: {},
		// element组件大小
		assemblySize: "default",
		// language
		language: "",
		// themeConfig
		themeConfig: {
			// 默认 primary 主题颜色
			primary: "#409EFF",
			// 深色模式
			isDark: false,
			// 灰色模式
			isGrey: false,
			// 色弱模式
			isWeak: false,
			// 面包屑导航
			breadcrumb: true,
			// 标签页
			tabs: true,
			// 页脚
			footer: false
		}
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token) {
			this.token = token;
		},
		// setUserInfo
		setUserInfo(userInfo) {
			this.userInfo = userInfo;
		},
		// setAssemblySizeSize
		setAssemblySizeSize(assemblySize) {
			this.assemblySize = assemblySize;
		},
		// updateLanguage
		updateLanguage(language) {
			this.language = language;
		},
		// setThemeConfig
		setThemeConfig(themeConfig) {
			this.themeConfig = themeConfig;
		}
	},
	persist: piniaPersistConfig("GlobalState")
});
