import { Layout } from "/src/routers/constant";

// 客户管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const writeoffManageRouter = [
	{
		path: "/writeoffManage",
		component: Layout,
		redirect: "/writeoffManage/bill/bill_query_list",
		meta: {
			title: "menubaseWriteoffsManagement"
		},
		children: [
			{
				path: "/writeoffManage/bill/bill_query_list",
				name: "bill_query_list",
				component: () => import("@/views/writeoffManage/bill/bill_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseBillManagement", //到账管理
					key: "bill_query_list"
				}
			},
			{
				path: "/writeoffManage/invoice/invoice_query_list",
				name: "invoice_query_list",
				component: () => import("@/views/writeoffManage/invoice/invoice_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseInvoiceManagement", //税票申请
					key: "invoice_query_list"
				}
			},
			{
				path: "/writeoffManage/invoice/invoice_edit_list2",
				name: "invoice_edit_list2",
				component: () => import("@/views/writeoffManage/invoice/invoice_edit_list2.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseTaxCheck", //税票审核
					key: "invoice_edit_list2"
				}
			},
			{
				path: "/writeoffManage/writeoff_dgbj/writeoff_application_list",
				name: "writeoff_application_list",
				component: () => import("@/views/writeoffManage/writeoff_dgbj/writeoff_application_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseWriteoffsApplication", //销账申请
					key: "writeoff_application_list"
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

export default writeoffManageRouter;
