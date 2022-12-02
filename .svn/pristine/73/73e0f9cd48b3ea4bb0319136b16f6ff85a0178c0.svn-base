import {
	ElMessage
} from "element-plus";
import i18n from "@/language/index.js";


/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */

export const checkStatus = (status) => {
	switch (status) {
		case 400:
			ElMessage.error(i18n.global.t('httpStatus400'));
			break;
		case 401:
			ElMessage.error(i18n.global.t('httpStatus401'));
			break;
		case 403:
			ElMessage.error(i18n.global.t('httpStatus403'));
			break;
		case 404:
			ElMessage.error(i18n.global.t('httpStatus404'));
			break;
		case 405:
			ElMessage.error(i18n.global.t('httpStatus405'));
			break;
		case 408:
			ElMessage.error(i18n.global.t('httpStatus408'));
			break;
		case 500:
			ElMessage.error(i18n.global.t('httpStatus500'));
			break;
		case 502:
			ElMessage.error(i18n.global.t('httpStatus502'));
			break;
		case 503:
			ElMessage.error(i18n.global.t('httpStatus503'));
			break;
		case 504:
			ElMessage.error(i18n.global.t('httpStatus504'));
			break;
		default:
			ElMessage.error(i18n.global.t('httpStatus0'));
	}
};
