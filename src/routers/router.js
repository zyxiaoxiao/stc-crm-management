import {
	createRouter,
	createWebHashHistory
} from "vue-router";
// * 导入所有router
const metaRouters =
	import.meta.globEager("./modules/*.js");

// * 处理路由表
export const routerArray = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

const routes = [
	{
		path: "/",
		redirect: {
			name: "login"
		}
	},
	{
		path: "/login",
		name: "login",
		component: () => import("./../views/login/index.vue"),
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	...routerArray,
	{
		// 找不到路由重定向到404页面
		path: "/:pathMatch(.*)",
		redirect: {
			name: "404"
		}
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({
		left: 0,
		top: 0
	})
});

export default router;
