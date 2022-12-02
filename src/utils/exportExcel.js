import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
	ElNotification
} from "element-plus";
import i18n from "@/language/index.js";

/**
 * @description  将数据源导出到Excel
 * @param  jsonData 需要导出的数据，json对象数组
 * @param  jsonFields 表头  json对象数组
 * @param  filename excel文件名称
 * @return xlsx excel文件
 */
export function exportDataSourceToExcel(jsonData, jsonFields, filename) { //导出xlsx

	ElNotification({
		title: i18n.global.t('reminder'),
		message: i18n.global.t('reminderMessage'),
		type: "info"
	});
	try {
		let jsonData1 = JSON.parse(JSON.stringify(jsonData));
		jsonData1.forEach(item => {
			for (let i in item) {
				if (jsonFields.hasOwnProperty(i)) {
					item[jsonFields[i]] = item[i];
				}
				delete item[i]; //删除原先的对象属性
			}
		});

		let sheetName = filename //excel的文件名称
		let wb = XLSX.utils.book_new() //工作簿对象包含一SheetNames数组，以及一个表对象映射表名称到表对象。XLSX.utils.book_new实用函数创建一个新的工作簿对象。
		let ws = XLSX.utils.json_to_sheet(jsonData1, {
			header: Object.values(jsonFields)
		}) //将JS对象数组转换为工作表。
		wb.SheetNames.push(sheetName)
		wb.Sheets[sheetName] = ws
		const defaultCellStyle = {
			font: {
				name: "Verdana",
				sz: 13,
				color: "FF00FF88"
			},
			fill: {
				fgColor: {
					rgb: "FFFFAA00"
				}
			}
		}; //设置表格的样式
		let wopts = {
			bookType: 'xlsx',
			bookSST: false,
			type: 'binary',
			cellStyles: true,
			defaultCellStyle: defaultCellStyle,
			showGridLines: false
		} //写入的样式
		let wbout = XLSX.write(wb, wopts)
		let blob = new Blob([s2ab(wbout)], {
			type: 'application/octet-stream'
		})
		FileSaver.saveAs(blob, filename + '.xlsx')
	} catch (e) {
		ElNotification({
			title: i18n.global.t("Message_ExportFailure"),
			message: e,
			type: "error"
		});
	}
}

const s2ab = s => {
	var buf;
	if (typeof ArrayBuffer !== 'undefined') {
		buf = new ArrayBuffer(s.length)
		var view = new Uint8Array(buf)
		for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
		return buf
	} else {
		buf = new Array(s.length);
		for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
}


/**
 * @description  通过tableID获取 table元素对象，导出数据
 * @param  tableID 表格id
 * @param  filename excel文件名称
 * @return xlsx excel文件
 */
export function exportTableObjectToExcel(tableID, filename) { //导出xlsx
	ElNotification({
		title: i18n.global.t('reminder'),
		message: i18n.global.t('reminderMessage'),
		type: "info"
	});
	try {
		var wb = XLSX.utils.table_to_book(document.querySelector('#' + tableID)); //关联don节点
		/* get binary string as output */
		var wbout = XLSX.write(wb, {
			bookType: 'xlsx',
			bookSST: true,
			type: 'array'
		})
		FileSaver.saveAs(new Blob([wbout], {
			type: 'application/octet-stream'
		}), filename + '.xlsx') //自定义文件名
	} catch (e) {
		ElNotification({
			title: i18n.global.t("Message_ExportFailure"),
			message: e,
			type: "error"
		});
	}
}
