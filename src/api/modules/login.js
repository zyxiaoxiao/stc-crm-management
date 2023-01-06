import qs from "qs";
import http from "@/api/index.js";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = params => {
	// return http.post("/core/login/login!login.action", params); // 正常 post json 请求  ==>  application/json

	// return http.post("/core/login/login!login.action", {}, {
	// 	params
	// }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456

	return http.post("/core/login/login!login.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded

	// return http.post("/core/login/login!login.action", params, {
	// 	headers: {
	// 		noLoading: true
	// 	}
	// }); // 控制当前请求不显示 loading
};
