import { Layout } from "/src/routers/constant";

// 首页模块
const homeRouter = [
	{
		path: "/home",
		component: Layout,
		redirect: "/home/index",
		children: [
			{
				path: "/home/index",
				name: "home",
				component: () => import("/src/views/home/index.vue"),
				meta: {
					keepAlive: true, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "itemtitleloginpage", //"首页",
					key: "home"
				}
			}
		]
	}
];

export default homeRouter;
