import { Layout } from "/src/routers/constant";

// 协议管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const comprehensiveQueryRouter = [
	{
		path: "/comprehensiveQuery",
		component: Layout,
		redirect: "/comprehensiveQuery/enterpriselock_query_list",
		meta: {
			title: "menubasecomprehensiveInquiry" //综合查询
		},
		children: [
			{
				path: "/comprehensiveQuery/enterpriselock_query_list",
				name: "enterpriselock_query_list",
				component: () => import("@/views/comprehensiveQuery/enterpriselock_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerunlockquery", //"客户解锁查询"
					key: "enterpriselock_query_list"
				}
			},
			{
				path: "/comprehensiveQuery/group_query_contract_list",
				name: "group_query_contract_list",
				component: () => import("@/views/comprehensiveQuery/group_query_contract_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseGroupcustomerquery", //"小组客户查询"
					key: "group_query_contract_list",
					//传给界面的默认写死参数
					query: { workflowflag: "0" }
				}
			},
			{
				path: "/comprehensiveQuery/group_query_contract_list1",
				name: "group_query_contract_list1",
				component: () => import("@/views/comprehensiveQuery/group_query_contract_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerinformationquery", //"客户查询"
					key: "group_query_contract_list1",
					//传给界面的默认写死参数
					query: { workflowflag: "1" }
				}
			},
			{
				path: "/comprehensiveQuery/track_list_right",
				name: "track_list_right",
				component: () => import("@/views/comprehensiveQuery/track_list_right.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseTrackrecordquery", //"追踪记录查询"
					key: "track_list_right"
				}
			},
			{
				path: "/comprehensiveQuery/selectagentinfo",
				name: "selectagentinfo",
				component: () => import("@/views/comprehensiveQuery/selectagentinfo.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseAgentInformationQuery", //"代理商查询"
					key: "selectagentinfo"
				}
			},
			{
				path: "/comprehensiveQuery/contract_application_query_list",
				name: "contract_application_query_list",
				component: () => import("@/views/comprehensiveQuery/contract_application_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasecontract_application_query_list", //"协议价格查询"
					key: "contract_application_query_list"
				}
			},
			{
				path: "/comprehensiveQuery/invoicehedging_query_list",
				name: "invoicehedging_query_list",
				component: () => import("@/views/comprehensiveQuery/invoicehedging_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseInvoicehedgingApplyQuery", //"INVOICE对冲申请查询"
					key: "invoicehedging_query_list"
				}
			},
			{
				path: "/comprehensiveQuery/enterpriselock_list_query",
				name: "enterpriselock_list_query",
				component: () => import("@/views/comprehensiveQuery/enterpriselock_list_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseenterpriselockListQuery", //"已锁定客户信息查询"
					key: "enterpriselock_list_query"
				}
			},
			{
				path: "/comprehensiveQuery/samplepackage_comprehensive_query",
				name: "samplepackage_comprehensive_query",
				component: () => import("@/views/comprehensiveQuery/samplepackage_comprehensive_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerLabelQuery", //"客户标签查询"
					key: "samplepackage_comprehensive_query"
				}
			},
			{
				path: "/comprehensiveQuery/deliverys_query_list",
				name: "deliverys_query_list",
				component: () => import("@/views/comprehensiveQuery/deliverys_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseotherstaticcompany", //"快递信息查询"
					key: "deliverys_query_list"
				}
			},
			{
				path: "/comprehensiveQuery/appointment_integratedquery_list",
				name: "appointment_integratedquery_list",
				component: () => import("@/views/comprehensiveQuery/appointment_integratedquery_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseQuotedQuery", //"报价查询"
					key: "appointment_integratedquery_list"
				}
			},
			{
				path: "/comprehensiveQuery/my_commission_query_automatic",
				name: "my_commission_query_automatic",
				component: () => import("@/views/comprehensiveQuery/my_commission_query_automatic.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasemy_commission_query_automatic", //"自动提佣查询"
					key: "my_commission_query_automatic"
				}
			},
			{
				path: "/comprehensiveQuery/appointment_salsequery_list",
				name: "appointment_salsequery_list",
				component: () => import("@/views/comprehensiveQuery/appointment_salsequery_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "panelbaseSalesQuotationQuery", //"销售报价查询"
					key: "appointment_salsequery_list"
				}
			},
			{
				path: "/comprehensiveQuery/invoice_query_byright",
				name: "invoice_query_byright",
				component: () => import("@/views/comprehensiveQuery/invoice_query_byright.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseInvoiceQuery", //税票信息查询
					key: "invoice_query_byright"
				}
			},
			{
				path: "/comprehensiveQuery/select_folderInfos",
				name: "select_folderInfos",
				component: () => import("@/views/comprehensiveQuery/select_folderInfos.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseapplicationorderquery", //申请单信息
					key: "select_folderInfos"
				}
			},
			{
				path: "/comprehensiveQuery/bill_accountinfo_query_list",
				name: "bill_accountinfo_query_list",
				component: () => import("@/views/comprehensiveQuery/bill_accountinfo_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseaccountinformationquery", //到账信息查询
					key: "bill_accountinfo_query_list"
				}
			},
			{
				path: "/comprehensiveQuery/writeoff_history_query_list",
				name: "writeoff_history_query_list",
				component: () => import("@/views/comprehensiveQuery/writeoff_history_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasewriteoffhistoryquery", //销账历史查询
					key: "writeoff_history_query_list"
				}
			},
			{
				path: "/comprehensiveQuery/appointment_query_team_offer",
				name: "appointment_query_team_offer",
				component: () => import("@/views/comprehensiveQuery/appointment_query_team_offer.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseTeamofferquery", //小组报价查询
					key: "appointment_query_team_offer"
				}
			}
		]
	}
];

export default comprehensiveQueryRouter;
