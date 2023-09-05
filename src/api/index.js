import axios from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { AxiosCanceler } from "./helper/axiosCancel";
import { checkStatus } from "./helper/checkStatus";
import { ElMessage } from "element-plus";
import { GlobalStore } from "@/store/globalStore";
import router from "@/routers";
import { isString } from "@/utils/is/index.js";
import i18n from "@/language/index.js";
import { authenticatedMessageBox } from "./helper/authenticatedLogin";

const axiosCanceler = new AxiosCanceler();
const globalStore = GlobalStore();
const config = {
	// 默认地址请求地址
	//baseURL: "http://192.168.3.33:8086",
	//baseURL: globalStore.serverUrl
	baseURL: "/apis", // 跨域代理

	// 设置超时时间（60s）
	timeout: 180000,
	// 跨域时候允许携带凭证
	withCredentials: true,

	retry: 3, //设置全局重试请求次数（最多重试几次请求）
	retryDelay: 1000, //设置全局请求间隔
};

class RequestHttp {
	constructor(config) {
		// 实例化axios
		this.service = axios.create(config);
		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
		 */
		this.service.interceptors.request.use(
			config => {
				// * 将当前请求添加到 pending 中
				axiosCanceler.addPending(config);
				// * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				config.headers.noLoading || showFullScreenLoading();
				const token = globalStore.token;
				return {
					...config,
					headers: {
						...config.headers,
						"x-access-token": token
					}
				};
			},
			error => {
				return Promise.reject(error);
			}
		);

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			response => {
				const { data, config } = response;
				const globalStore = GlobalStore();

				// * 在请求结束后，移除本次请求，并关闭请求 loading
				axiosCanceler.removePending(config);
				tryHideFullScreenLoading();
				// * 登陆失效（code == 599）
				if (data.code == 599) {
					ElMessage.error(data.msg);
					globalStore.setToken("");
					router.replace({
						path: "/login"
					});
					return Promise.reject(data);
				}

				// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (data.code && data.code !== 200) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}

				//登录失效 sessionisnull
				if (isString(data) && data.indexOf("sessionisnull") >= 0) {
					//清除所有的请求
					axiosCanceler.removeAllPending();
					//弹出登录窗口
					authenticatedMessageBox();
					return Promise.reject(data);
				}

				// * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data;
			},
			async error => {
				const { response } = error;

				tryHideFullScreenLoading();
				// 请求超时单独判断，因为请求超时没有 response
				if (error.message && error.message.indexOf("timeout") !== -1) {
					ElMessage.error(i18n.global.t("httpStatus408"));
				} else if (response && response.data) {
					//判断服务器是否有返回报错信息
					if (typeof (response.data) === "string") {
						ElMessage.error(i18n.global.t(response.data));
					}
				} else if (response) {
					//代理时登录失效进入
					if (response?.status == "404" && response?.request?.responseURL.indexOf("/ext2/relogin.jsp") >= 0) {
						//清除所有的请求
						axiosCanceler.removeAllPending();
						//弹出登录窗口
						authenticatedMessageBox();
					} else {
						// 根据响应的错误状态码，做不同的处理
						checkStatus(response.status);
					}

				} else if (!window.navigator.onLine) {
					// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
					router.replace({
						path: "/500"
					});
				}
				return Promise.reject(error);
			}
		);
	}
	// * 常用请求方法封装
	get(url, params, _object) {
		return this.service.get(url, {
			params,
			..._object
		});
	}
	post(url, params, _object) {
		return this.service.post(url, params, _object);
	}
	put(url, params, _object) {
		return this.service.put(url, params, _object);
	}
	delete(url, params, _object) {
		return this.service.delete(url, {
			params,
			..._object
		});
	}
}

export default new RequestHttp(config);
