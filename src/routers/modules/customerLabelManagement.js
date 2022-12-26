import { Layout } from "/src/routers/constant";

// 客户标签管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const customerLabelManagementRouter = [
	{
		path: "/customerLabelManagement",
		component: Layout,
		redirect: "/customerLabelManagement/samplepackage_query_create",
		meta: {
			title: "menubaseCustomerLabelManagement" //客户标签管理
		},
		children: [
			{
				path: "/customerLabelManagement/samplepackage_query_create",
				name: "samplepackage_query_create",
				component: () => import("@/views/customerLabelManagement/samplepackage_query_create.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerLabelApplication", //"客户标签申请"
					key: "samplepackage_query_create"
				}
			},
			{
				path: "/customerLabelManagement/samplepackage_query_audit",
				name: "samplepackage_query_audit",
				component: () => import("@/views/customerLabelManagement/samplepackage_query_audit.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerLabelAudit", //"客户标签审核"
					key: "samplepackage_query_audit"
				}
			}
		]
	}
];

export default customerLabelManagementRouter;
