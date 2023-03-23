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
				path: "/writeoffManage/writeoff_dgbj/import_writeoff_application_list",
				name: "import_writeoff_application_list",
				component: () => import("@/views/writeoffManage/writeoff_dgbj/import_writeoff_application_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseWriteoffsApplicationImp", //销账导入
					key: "import_writeoff_application_list"
				}
			},
			{
				path: "/writeoffManage/writeoff_dgbj/writeoff_verify_list",
				name: "writeoff_verify_list",
				component: () => import("@/views/writeoffManage/writeoff_dgbj/writeoff_verify_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseWriteoffsCheck", //销账审核
					key: "writeoff_verify_list"
				}
			},
			{
				path: "/writeoffManage/writeoff_dgbj/writeoff_back_list",
				name: "writeoff_back_list",
				component: () => import("@/views/writeoffManage/writeoff_dgbj/writeoff_back_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseWriteoffsBack", //销账退回
					key: "writeoff_back_list"
				}
			},
			{
				path: "/writeoffManage/retreatcrm/retreat_query_list",
				name: "retreat_query_list",
				component: () => import("@/views//writeoffManage/retreatcrm/retreat_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasedrawbackapplication", //退款申请
					key: "retreat_query_list"
				}
			}
		]
	}
];

export default writeoffManageRouter;
