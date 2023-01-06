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
					title: "menubasemccm", //"月结客户申请"
					key: "contract_application_list"
				}
			}
		]
	}
];

export default agreementManagementRouter;
