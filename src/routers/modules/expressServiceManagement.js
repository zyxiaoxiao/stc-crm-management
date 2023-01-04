import { Layout } from "/src/routers/constant";

// 快递服务管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const expressServiceManagementRouter = [
	{
		path: "/expressServiceManagement",
		component: Layout,
		redirect: "/expressServiceManagement/deliverys_query_create",
		meta: {
			title: "menubaseExpressServiceManagement" //快递服务管理
		},
		children: [
			{
				path: "/expressServiceManagement/deliverys_query_create",
				name: "deliverys_query_create",
				component: () => import("@/views/expressServiceManagement/deliverys_query_create.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseExpressServiceApplication", //"快递服务申请"
					key: "deliverys_query_create"
				}
			}
		]
	}
];

export default expressServiceManagementRouter;
