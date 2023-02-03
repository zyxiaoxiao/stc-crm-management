import { Layout } from "/src/routers/constant";

// 申请单管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const applicationFormManagementRouter = [
	{
		path: "/applicationFormManagement",
		component: Layout,
		redirect: "/applicationFormManagement/expenditure_query_list",
		meta: {
			title: "menubaseApplicationMgnt" //申请单管理
		},
		children: [
			{
				path: "/applicationFormManagement/expenditure_query_list",
				name: "expenditure_query_list",
				component: () => import("@/views/applicationFormManagement/expenditure_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseExpenditureApplication", //"销售开支申请"
					key: "expenditure_query_list"
				}
			},
			{
				path: "/applicationFormManagement/expenditure_verify_list",
				name: "expenditure_verify_list",
				component: () => import("@/views/applicationFormManagement/expenditure_verify_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseExpenditureAudit", //"销售开支审核"
					key: "expenditure_verify_list"
				}
			},
			{
				path: "/applicationFormManagement/authentication_query_list",
				name: "authentication_query_list",
				component: () => import("@/views/applicationFormManagement/authentication_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseSalesCertificationApplication", //"销售认证申请"
					key: "authentication_query_list"
				}
			},
			{
				path: "/applicationFormManagement/document_seal_file_list",
				name: "document_seal_file_list",
				component: () => import("@/views/applicationFormManagement/document_seal_file_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasedocumentSeal", //"申请盖骑缝章"
					key: "document_seal_file_list"
				}
			},
			{
				path: "/applicationFormManagement/accountStatement",
				name: "accountStatement",
				component: () => import("@/views/applicationFormManagement/accountStatement.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseAccountStatement", //"对账单"
					key: "accountStatement"
				}
			}
		]
	}
];

export default applicationFormManagementRouter;
