import { Layout } from "/src/routers/constant";

// 发票对冲管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const invoiceHedgingManagementRouter = [
	{
		path: "/invoiceHedgingManagement",
		component: Layout,
		redirect: "/invoiceHedgingManagement/invoicehedging_create_list",
		meta: {
			title: "menubaseInvoicehedgingManagement" //发票对冲管理
		},
		children: [
			{
				path: "/invoiceHedgingManagement/invoicehedging_create_list",
				name: "invoicehedging_create_list",
				component: () => import("@/views/invoiceHedgingManagement/invoicehedging_create_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseInvoicehedgingApply", //"INVOICE对冲申请"
					key: "invoicehedging_create_list"
				}
			},
			{
				path: "/invoiceHedgingManagement/invoicehedging_audit_list",
				name: "invoicehedging_audit_list",
				component: () => import("@/views/invoiceHedgingManagement/invoicehedging_audit_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseInvoicehedgingAudit", //"INVOICE对冲审核"
					key: "invoicehedging_audit_list"
				}
			}
		]
	}
];

export default invoiceHedgingManagementRouter;
