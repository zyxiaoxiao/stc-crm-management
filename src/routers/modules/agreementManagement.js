import { Layout } from "/src/routers/constant";

// 协议管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const agreementManagementRouter = [
	{
		path: "/agreementManagement",
		component: Layout,
		redirect: "/agreementManagement/monthlySettlementCustomer/contract_application_list",
		meta: {
			title: "menucontractagreementmanagement" //协议管理
		},
		children: [
			{
				path: "/agreementManagement/monthlySettlementCustomer/contract_application_list",
				name: "contract_application_list",
				component: () => import("@/views/agreementManagement/monthlySettlementCustomer/contract_application_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasemcsh", //"月结客户申请"
					key: "contract_application_list"
				}
			},
			{
				path: "/agreementManagement/monthlySettlementCustomer/contract_verify_query_list",
				name: "contract_verify_query_list",
				component: () => import("@/views/agreementManagement/monthlySettlementCustomer/contract_verify_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasemcaudit", //"月结客户审核"
					key: "contract_verify_query_list"
				}
			},
			{
				path: "/agreementManagement/agreementPriceManagement/agreement_price_maintenance",
				name: "agreement_price_maintenance",
				component: () => import("@/views/agreementManagement/agreementPriceManagement/agreement_price_maintenance.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menucontractagreementpriceapply", //"协议价格维护"
					key: "agreement_price_maintenance"
				}
			},
			{
				path: "/agreementManagement/agreementPriceManagement/agreement_price_audit",
				name: "agreement_price_audit",
				component: () => import("@/views/agreementManagement/agreementPriceManagement/agreement_price_audit.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menucontractagreementpriceaudit", //"协议价格审核"
					key: "agreement_price_audit"
				}
			}
		]
	}
];

export default agreementManagementRouter;
