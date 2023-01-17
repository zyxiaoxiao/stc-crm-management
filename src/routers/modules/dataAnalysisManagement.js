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
			},
			{
				path: "/dataAnalysisManagement/basicReport/rqreport_query",
				name: "rqreport_query",
				component: () => import("@/views/dataAnalysisManagement/basicReport/rqreport_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasereportquery", //"报表查询"
					key: "rqreport_query"
				}
			},
			{
				path: "/dataAnalysisManagement/basicReport/rqreport_query1",
				name: "rqreport_query1",
				component: () => import("@/views/dataAnalysisManagement/basicReport/rqreport_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menu_rqreport_classfication1", //"财务状况"
					key: "rqreport_query1",
					//传给界面的默认写死参数
					query: { classification: "1" }
				}
			},
			{
				path: "/dataAnalysisManagement/basicReport/rqreport_query2",
				name: "rqreport_query2",
				component: () => import("@/views/dataAnalysisManagement/basicReport/rqreport_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menu_rqreport_classfication2", //"交易往来"
					key: "rqreport_query2",
					//传给界面的默认写死参数
					query: { classification: "2" }
				}
			},
			{
				path: "/dataAnalysisManagement/basicReport/rqreport_query3",
				name: "rqreport_query3",
				component: () => import("@/views/dataAnalysisManagement/basicReport/rqreport_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menu_rqreport_classfication3", //"统计分析"
					key: "rqreport_query3",
					//传给界面的默认写死参数
					query: { classification: "3" }
				}
			},
			{
				path: "/dataAnalysisManagement/basicReport/rqreport_query4",
				name: "rqreport_query4",
				component: () => import("@/views/dataAnalysisManagement/basicReport/rqreport_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menu_rqreport_classfication4", //"通用项目"
					key: "rqreport_query4",
					//传给界面的默认写死参数
					query: { classification: "4" }
				}
			},
			{
				path: "/dataAnalysisManagement/basicReport/rqreport_query0",
				name: "rqreport_query0",
				component: () => import("@/views/dataAnalysisManagement/basicReport/rqreport_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menu_rqreport_classfication0", //"综合类型"
					key: "rqreport_query0",
					//传给界面的默认写死参数
					query: { classification: "0" }
				}
			}
		]
	}
];

export default dataAnalysisManagementRouter;
