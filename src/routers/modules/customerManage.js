import { Layout } from "/src/routers/constant";

// 客户管理模块 (多级路由全部设置为二级路由，为了缓存页面)
const customerManageRouter = [
	{
		path: "/customerManage",
		component: Layout,
		redirect: "/customerManage/customerApplication/newCustomer",
		meta: {
			title: "menubaseCustomermanagement" //客户管理
		},
		children: [
			{
				path: "/customerManage/customerApplication/newCustomer",
				name: "newCustomer",
				component: () => import("@/views/customerManage/customerApplication/newCustomer.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomercreateapply", //"客户创建申请"
					key: "newCustomer"
				}
			},
			{
				path: "/customerManage/customerApplication/companyInfo_list_bg",
				name: "companyInfo_list_bg",
				component: () => import("@/views/customerManage/customerApplication/companyInfo_list_bg.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerchangeapply", //"客户变更申请"
					key: "companyInfo_list_bg"
				}
			},
			{
				path: "/customerManage/customerAudit/companyInfo_auditlist_create",
				name: "companyInfo_auditlist_create",
				component: () => import("@/views/customerManage/customerAudit/companyInfo_auditlist_create.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomercreateaudit", //"客户创建审核"
					key: "companyInfo_auditlist_create"
				}
			},
			{
				path: "/customerManage/customerAudit/companyInfo_auditlist_bg",
				name: "companyInfo_auditlist_bg",
				component: () => import("@/views/customerManage/customerAudit/companyInfo_auditlist_bg.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerchangeaudit", //"客户变更审核"
					key: "companyInfo_auditlist_bg"
				}
			},
			{
				path: "/customerManage/customerManagement/myCustomers",
				name: "myCustomers",
				component: () => import("@/views/customerManage/customerManagement/myCustomers.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseMyCustomer", //我的客户
					key: "myCustomers"
				}
			},
			{
				path: "/customerManage/customerManagement/customer_list_public",
				name: "customer_list_public",
				component: () => import("@/views/customerManage/customerManagement/customer_list_public.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasePublicCustomer", //公共客户
					key: "customer_list_public"
				}
			},
			{
				path: "/customerManage/customerManagement/track_list",
				name: "track_list",
				component: () => import("@/views/customerManage/customerManagement/track_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseTrackrecord", //追踪记录
					key: "track_list"
				}
			},
			{
				path: "/customerManage/customerManagement/companyInfo_list_company",
				name: "companyInfo_list_company",
				component: () => import("@/views/customerManage/customerManagement/companyInfo_list_company.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCorporateclient", //部门客户
					key: "companyInfo_list_company"
				}
			},
			{
				path: "/customerManage/customerManagement/companyInfo_list_distribution",
				name: "companyInfo_list_distribution",
				component: () => import("@/views/customerManage/customerManagement/companyInfo_list_distribution.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseapplicationDistributionOfCustomers", //客户分配申请
					key: "companyInfo_list_distribution"
				}
			},
			{
				path: "/customerManage/customerAudit/companyInfo_audit_list_distribution",
				name: "companyInfo_audit_list_distribution",
				component: () => import("@/views/customerManage/customerAudit/companyInfo_audit_list_distribution.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseauditDistributionOfCustomers", //客户分配审核
					key: "companyInfo_audit_list_distribution"
				}
			},
			{
				path: "/customerManage/customerUnlockManagement/enterpriselock_application_query_list",
				name: "enterpriselock_application_query_list",
				component: () => import("@/views/customerManage/customerUnlockManagement/enterpriselock_application_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerreleaseapplication", //客户解锁申请
					key: "enterpriselock_application_query_list"
				}
			},
			{
				path: "/customerManage/customerUnlockManagement/enterpriselock_verify_query_list",
				name: "enterpriselock_verify_query_list",
				component: () => import("@/views/customerManage/customerUnlockManagement/enterpriselock_verify_query_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerunlockaudit", //客户解锁审核
					key: "enterpriselock_verify_query_list"
				}
			},
			{
				path: "/customerManage/potentialCustomer/potentialclient_list",
				name: "potentialclient_list",
				component: () => import("@/views/customerManage/potentialCustomer/potentialclient_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseMyPotentialCustomer", //我的潜在客户
					key: "potentialclient_list"
				}
			},
			{
				path: "/customerManage/potentialCustomer/potential_track_list",
				name: "potential_track_list",
				component: () => import("@/views/customerManage/potentialCustomer/potential_track_list.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubasePotentailcustomertrackrecord", //潜在客户跟踪記錄
					key: "potential_track_list"
				}
			},
			{
				path: "/customerManage/customerQuery/customer_list_query",
				name: "customer_list_query",
				component: () => import("@/views/customerManage/customerQuery/customer_list_query.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerlist", //客户信息列表
					key: "customer_list_query"
				}
			},
			{
				path: "/customerManage/customerQuery/customer_details_information",
				name: "customer_details_information",
				component: () => import("@/views/customerManage/customerQuery/customer_details_information.vue"),
				meta: {
					keepAlive: false, //是否缓存页面
					requiresAuth: true, //true需要登录才能访问
					title: "menubaseCustomerlist", //客户信息列表
					key: "customer_details_information"
				}
			}
		]
	}
];

export default customerManageRouter;
