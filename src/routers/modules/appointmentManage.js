import { Layout } from "/src/routers/constant";

// 客户管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const appointmentManageRouter = [
	{
		path: "/appointmentManage",
		component: Layout,
		redirect: "/appointmentManage/appointmentApplication/appointment_query_list",
		meta: {
			title: "menubasequotationmanagement"
		},
		children: [
			{
				path: "/appointmentManage/appointmentApplication/appointment_query_list",
				name: "appointment_query_list",
				component: () => import("@/views/appointmentManage/appointmentApplication/appointment_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasequotationapp", //报价申请
					key: "appointment_query_list"
				}
			},
			{
				path: "/appointmentManage/appointmentApplication/appointment_splitquery_list",
				name: "appointment_splitquery_list",
				component: () => import("@/views/appointmentManage/appointmentApplication/appointment_splitquery_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseQuotationsplit", //报价拆分
					key: "appointment_splitquery_list"
				}
			}
		]
	}
];

export default appointmentManageRouter;
