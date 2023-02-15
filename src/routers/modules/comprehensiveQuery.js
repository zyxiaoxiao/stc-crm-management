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
			}
		]
	}
];

export default comprehensiveQueryRouter;
