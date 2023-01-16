import { Layout } from "/src/routers/constant";

// 数据分析管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const dataAnalysisManagementRouter = [
	{
		path: "/dataAnalysisManagement",
		component: Layout,
		redirect: "/dataAnalysisManagement/basicReport/rqreport_edit_list",
		meta: {
			title: "menubaseDA" //数据分析管理
		},
		children: [
			{
				path: "/dataAnalysisManagement/basicReport/rqreport_edit_list",
				name: "rqreport_edit_list",
				component: () => import("@/views/dataAnalysisManagement/basicReport/rqreport_edit_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseUploadTable", //"报表上载"
					key: "rqreport_edit_list"
				}
			}
		]
	}
];

export default dataAnalysisManagementRouter;
