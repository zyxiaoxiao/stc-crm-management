import i18n from "@/language/index.js";
import qs from "qs";
import http from "@/api/index.js";
import {
	ElNotification,
	ElMessage
} from "element-plus";

/**
 * @description 接收数据流生成blob，创建链接，下载文件
 * @param {String} url 路径(必传)
 * @param {String} tempName 导出的文件名+后缀(必传)
 * @param {Object} params 导出的参数(默认为空对象)
 * @param {Boolean} isNotify 是否有导出消息提示(默认为 true)
 * @return void
 * */
export const downloadFile = async (url, tempName, params = {}, isNotify = true) => {
	if (isNotify) {
		ElNotification({
			title: i18n.global.t('reminder'),
			message: i18n.global.t('reminderMessage'),
			type: "info"
		});
	}
	try {
		const res = await http.post(url, qs.stringify(params), {
			responseType: "blob"
		});
		const blob = new Blob([res]);
		// 兼容edge不支持createObjectURL方法
		if ("msSaveOrOpenBlob" in navigator) return window.navigator.msSaveOrOpenBlob(blob, tempName);
		const blobUrl = window.URL.createObjectURL(blob);
		const exportFile = document.createElement("a");
		exportFile.style.display = "none";
		exportFile.download = tempName;
		exportFile.href = blobUrl;
		document.body.appendChild(exportFile);
		exportFile.click();
		// 去除下载对url的影响
		document.body.removeChild(exportFile);
		window.URL.revokeObjectURL(blobUrl);
	} catch (error) {
		if (error && error.response && error.response.data) {
			let data = error.response.data;
			//判断Bolb格式并输出报错信息
			if (toString.call(data) === '[object Blob]') {
				const blob = new Blob([data]);
				let reader = new FileReader();
				reader.readAsText(blob, 'utf-8');
				let messsage = "";
				reader.onload = function (e) {
					messsage = reader.result;
				    ElMessage.error(messsage);
				}				
			}
		} else {
			ElMessage.error(error);
		}

	}
};
