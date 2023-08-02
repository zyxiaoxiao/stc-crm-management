import { Layout } from "/src/routers/constant";

// 系统设置模块
const systemSettingsRouter = [
    {
        path: "/systemSettings",
        component: Layout,
        redirect: "/systemSettings/index",
        children: [
            {
                path: "/systemSettings/index",
                name: "systemSettings",
                component: () => import("/src/views/systemSettings/index.vue"),
                meta: {
                    keepAlive: false, //是否缓存页面
                    requiresAuth: true, //true需要登录才能访问
                    title: "systemSettings", //"系统设置",
                    key: "systemSettings"
                }
            },
            {
                path: "/systemSettings/basicConfiguration/config_query_list",
                name: "config_query_list",
                component: () => import("/src/views/systemSettings/basicConfiguration/config_query_list.vue"),
                meta: {
                    keepAlive: false, //是否缓存页面
                    requiresAuth: true, //true需要登录才能访问
                    title: "menubasestandardmanagement", //"达标奖管理",
                    key: "config_query_list"
                }
            },
            {
                path: "/systemSettings/basicConfiguration/labmanage_query_list",
                name: "labmanage_query_list",
                component: () => import("/src/views/systemSettings/basicConfiguration/labmanage_query_list.vue"),
                meta: {
                    keepAlive: false, //是否缓存页面
                    requiresAuth: true, //true需要登录才能访问
                    title: "menubaselabmanage", //"实验室预算管理",
                    key: "labmanage_query_list"
                }
            },
            {
                path: "/systemSettings/basicConfiguration/salesteam_annual_query_list",
                name: "salesteam_annual_query_list",
                component: () => import("/src/views/systemSettings/basicConfiguration/salesteam_annual_query_list.vue"),
                meta: {
                    keepAlive: false, //是否缓存页面
                    requiresAuth: true, //true需要登录才能访问
                    title: "menubasesalesteamannualtask", //"销售小组年度任务额",
                    key: "salesteam_annual_query_list"
                }
            },
            {
                path: "/systemSettings/basicConfiguration/salestask_query_list",
                name: "salestask_query_list",
                component: () => import("/src/views/systemSettings/basicConfiguration/salestask_query_list.vue"),
                meta: {
                    keepAlive: false, //是否缓存页面
                    requiresAuth: true, //true需要登录才能访问
                    title: "menubasesalestaskmanage", //"销售任务管理",
                    key: "salestask_query_list"
                }
            },
            {
                path: "/systemSettings/basicConfiguration/otherstatic_query_list",
                name: "otherstatic_query_list",
                component: () => import("/src/views/systemSettings/basicConfiguration/otherstatic_query_list.vue"),
                meta: {
                    keepAlive: false, //是否缓存页面
                    requiresAuth: true, //true需要登录才能访问
                    title: "menubaseotherstaticcompanymanager", //"快递公司管理",
                    key: "otherstatic_query_list"
                }
            },
            {
                path: "/systemSettings/basicConfiguration/areamanagement_query_list",
                name: "areamanagement_query_list",
                component: () => import("/src/views/systemSettings/basicConfiguration/areamanagement_query_list.vue"),
                meta: {
                    keepAlive: false, //是否缓存页面
                    requiresAuth: true, //true需要登录才能访问
                    title: "menubaseareamanagement", //"区域管理",
                    key: "areamanagement_query_list"
                }
            },
        ]
    }
];

export default systemSettingsRouter;
