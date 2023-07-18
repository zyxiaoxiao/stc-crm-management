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
            }
        ]
    }
];

export default systemSettingsRouter;
