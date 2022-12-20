import dropDownSelection from "/src/config/dropDownSelection.js";
import qs from "qs";
import http from "@/api/index.js";
import dropDownInChina from "/src/config/dropDownInChina.js";

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
}

/**
 * @description 获取浏览器类型
 * @return Array
 */
export function getBrowserInfo() {
	var agent = navigator.userAgent.toLowerCase();
	var arr = [];
	var system = agent.split(" ")[1].split(" ")[0].split("(")[1];
	arr.push(system);
	var regStr_edge = /edge\/[\d.]+/gi;
	var regStr_ie = /trident\/[\d.]+/gi;
	var regStr_ff = /firefox\/[\d.]+/gi;
	var regStr_chrome = /chrome\/[\d.]+/gi;
	var regStr_saf = /safari\/[\d.]+/gi;
	var regStr_opera = /opr\/[\d.]+/gi;
	//IE
	if (agent.indexOf("trident") > 0) {
		arr.push(agent.match(regStr_ie)[0].split("/")[0]);
		arr.push(agent.match(regStr_ie)[0].split("/")[1]);
		return arr;
	}
	//Edge
	if (agent.indexOf("edge") > 0) {
		arr.push(agent.match(regStr_edge)[0].split("/")[0]);
		arr.push(agent.match(regStr_edge)[0].split("/")[1]);
		return arr;
	}
	//firefox
	if (agent.indexOf("firefox") > 0) {
		arr.push(agent.match(regStr_ff)[0].split("/")[0]);
		arr.push(agent.match(regStr_ff)[0].split("/")[1]);
		return arr;
	}
	//Opera
	if (agent.indexOf("opr") > 0) {
		arr.push(agent.match(regStr_opera)[0].split("/")[0]);
		arr.push(agent.match(regStr_opera)[0].split("/")[1]);
		return arr;
	}
	//Safari
	if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
		arr.push(agent.match(regStr_saf)[0].split("/")[0]);
		arr.push(agent.match(regStr_saf)[0].split("/")[1]);
		return arr;
	}
	//Chrome
	if (agent.indexOf("chrome") > 0) {
		arr.push(agent.match(regStr_chrome)[0].split("/")[0]);
		arr.push(agent.match(regStr_chrome)[0].split("/")[1]);
		return arr;
	}
}

/**
 * @description 使用递归处理路由菜单，生成一维数组
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList, newArr = []) {
	routerList.forEach(item => {
		typeof item === "object" && item.path && newArr.push(item.path);
		item.children && item.children.length && handleRouter(item.children, newArr);
	});
	return newArr;
}

/**
 * @description 获取 国家，区域，省，市
 * @return []
 */
export function getdropDownInChina(classfication) {
	return dropDownInChina[classfication];
}

/**
 * @description 获取下拉选项的值
 * @return []
 */
export function getdropSownSelection(classfication) {
	let value = dropDownSelection[classfication];
	let code = [];
	if (value != null && value.length > 1) {
		let str = value.split(";");
		if (str != null && str.length > 0) {
			for (let i = 0; i < str.length; i++) {
				let s = str[i];
				let obj = {};
				obj.value = s;
				let key = dropDownSelection[classfication + s];
				if (key != null && key.length > 0) {
					obj.label = key;
				} else {
					obj.label = classfication + s.replace(".", "");
				}
				code.push(obj);
			}
			return code;
		}
	}
	return code;
}

//货币类型下拉数据源
// export const getCurrency = async v => {
// 	const res = await http.post("/crm/currency/currency!selectCurrencyInfoByCond.action", qs.stringify({}), {
// 		headers: {
// 			noLoading: true //不显示加载--
// 		}
// 	}); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
// 	if (res) {
// 		res.currencyInfos.forEach(item => {
// 			v.push({
// 				label: item.currencyname,
// 				value: item.currencyname
// 			});
// 		});
// 	}
// 	return v;
// };

export const getCurrency = v => {
	v.push(
		{
			label: "AUD",
			value: "AUD"
		},
		{
			label: "CHF",
			value: "CHF"
		},
		{
			label: "EUR",
			value: "EUR"
		},
		{
			label: "GBP",
			value: "GBP"
		},
		{
			label: "HKD",
			value: "HKD"
		},
		{
			label: "JPY",
			value: "JPY"
		},
		{
			label: "RMB",
			value: "RMB"
		},
		{
			label: "SGD",
			value: "SGD"
		},
		{
			label: "USD",
			value: "USD"
		},
		{
			label: "VND",
			value: "VND"
		}
	);

	return v;
};

//国家下拉数据源
export const getCountry = async () => {
	let t = [];
	const res = await http.post(
		"/crm/addresscombo/addresscombo!selectAddresscomboInfoForCombo.action",
		qs.stringify({
			"cond.parentid": "0"
		}),
		{
			headers: {
				noLoading: true //不显示加载--
			}
		}
	); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	if (res) {
		res.addresscomboInfos.forEach(item => {
			t.push({
				label: "crm_country" + item.addrcode,
				value: item.addrcode,
				id: item.addrid
			});
		});
	}
	return t;
};
/**
 * @description 区、省、市对应的下拉数据源
 * @param  v   传入区、省、市对应的类型
 * @param  w   传入区、省、市对应的value值
 * @param  p  传入区、省、市对应的下拉数据源
 * @return t  返回出去的数据源
 */
export const getAddress = async (v, w, p) => {
	let t = [];
	//获取区域对应的id
	let parentid = "-100";
	if (w) {
		for (let item of p) {
			if (item.value == w) {
				parentid = item.id;
				break; //跳出循环
			}
		}
	}
	const res = await http.post(
		"/crm/addresscombo/addresscombo!selectAddresscomboInfoForCombo.action",
		qs.stringify({
			"cond.addrlevel": v,
			"cond.parentid": parentid
		}),
		{
			headers: {
				noLoading: true //不显示加载--
			}
		}
	); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	if (res) {
		res.addresscomboInfos.forEach(item => {
			t.push({
				label: item.addrdesc,
				value: item.addrcode,
				id: item.addrid
			});
		});
	}
	return t;
};
/**
 * @description 区、省、市对应的下拉数据源
 * @param  v   传入区、省、市对应的类型
 * @return t  返回出去的数据源
 */
export const getAddressAll = async v => {
	let t = [];
	const res = await http.post(
		"/crm/addresscombo/addresscombo!selectAddresscomboInfoForCombo.action",
		qs.stringify({
			"cond.addrlevel": v
		}),
		{
			headers: {
				noLoading: true //不显示加载--
			}
		}
	); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	if (res) {
		res.addresscomboInfos.forEach(item => {
			t.push({
				label: item.addrdesc,
				value: item.addrcode,
				id: item.addrid
			});
		});
	}
	return t;
};

/**
 * @description 唯一的id
 * @return id  返回出去的数据源
 */
export const uuid = () => {
	let s = [];
	let hexDigits = "0123456789abcdef";
	for (let i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	let uuid = s.join("");
	return uuid;
};
