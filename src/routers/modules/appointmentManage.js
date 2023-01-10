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
				path: "/appointmentManage/appointmentApplication/appointment_customer_list_query",
				name: "appointment_customer_list_query",
				component: () => import("@/views/appointmentManage/appointmentApplication/appointment_customer_list_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasequotationaudit", //报价审核
					key: "appointment_customer_list_query"
				}
			},
			{
				path: "/appointmentManage/appointmentApplication/appointment_query_template",
				name: "appointment_query_template",
				component: () => import("@/views/appointmentManage/appointmentApplication/appointment_query_template.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasequotationtemplate", //报价模板
					key: "appointment_query_template"
				}
			},
			{
				path: "/appointmentManage/appointmentApplication/confirm_list_query",
				name: "confirm_list_query",
				component: () => import("@/views/appointmentManage/appointmentApplication/confirm_list_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasequotationconfirm", //报价确认
					key: "confirm_list_query"
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
			},
			{
				path: "/appointmentManage/attained/my_commission_query_list",
				name: "my_commission_query_list",
				component: () => import("@/views/appointmentManage/attained/my_commission_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasemycommissionapplication", //提佣申请
					key: "my_commission_query_list"
				}
			},
			{
				path: "/appointmentManage/attained/my_commission_audit_list",
				name: "my_commission_audit_list",
				component: () => import("@/views/appointmentManage/attained/my_commission_audit_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasemycommissionaudit", //提佣审核
					key: "my_commission_audit_list"
				}
			},
			{
				path: "/appointmentManage/attained/sales_agent_commission_query_list",
				name: "sales_agent_commission_query_list",
				component: () => import("@/views/appointmentManage/attained/sales_agent_commission_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasesalesagentcommissionapplication", //销售代理提佣申请
					key: "sales_agent_commission_query_list"
				}
			},
			{
				path: "/appointmentManage/attained/sales_agent_commission_audit_list",
				name: "sales_agent_commission_audit_list",
				component: () => import("@/views/appointmentManage/attained/sales_agent_commission_audit_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasesalesagentcommissionaudit", //销售代理提佣审核
					key: "sales_agent_commission_audit_list"
				}
			},
			{
				path: "/appointmentManage/commission/sales_commission_query_list",
				name: "sales_commission_query_list",
				component: () => import("@/views/appointmentManage/commission/sales_commission_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "basepanelsales_commission_application", //销售提佣申请
					key: "sales_commission_query_list"
				}
			},
			{
				path: "/appointmentManage/commission/sales_commission_audit_list",
				name: "sales_commission_audit_list",
				component: () => import("@/views/appointmentManage/commission/sales_commission_audit_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "basepanelsales_commission_audit", //销售提佣审核
					key: "sales_commission_audit_list"
				}
			}
		]
	}
];

export default appointmentManageRouter;
