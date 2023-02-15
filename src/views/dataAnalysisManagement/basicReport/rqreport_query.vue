<template>
	<div class="all-height flex-column main-card" style="padding: 10px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg"> </zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getdropSownSelection } from "@/utils/util.js";
import { GlobalStore } from "@/store/globalStore.js";

const globalStore = GlobalStore();
const i18n = useI18n();
const route = useRoute();
let classification = route?.meta?.query?.classification;

const menu_rqreport_classfication = getdropSownSelection("menu_rqreport_classfication");
//是否
const whetherAr = getdropSownSelection("whether");
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/dataAnalysisManagement/basicReport/rqreport_query.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/core/report/rqreport!selectRqreportInfoListByCond.action",
		root: "rqreportInfoList",
		baseParams: { "cond.xz": "true", "cond.usercode": globalStore.userInfo.usercode, "cond.classification": classification }
	},

	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "报表名称",
			label: "itemtitlerqreportreportname",
			prop: "reportname",
			type: "Link",
			width: "160"
		},
		{
			title: "英文名称",
			label: "hotlinkpanelywmctitle",
			prop: "remark",
			type: "Link",
			width: "160"
		},
		{
			title: "报表分类名称",
			label: "itemtitlerqreportclassification",
			prop: "classification",
			type: "Select",
			typeData: menu_rqreport_classfication,
			width: "185"
		},
		{
			title: "申请单位",
			label: "itemtitlerqreportcorpdesc",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "制单人编码",
			label: "itemtitleworkflowdefrecordercode",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "制单人名称",
			label: "itemtitlecommonMakeListPeopleName",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "制单时间",
			label: "itemtitlecommonrecordtime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "id",
			label: "",
			prop: "rid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "报表文件",
			label: "itemtitlerqreportreportfile",
			prop: "reportfile",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "报表参数",
			label: "itemtitlerqreportreportargs",
			prop: "reportargs",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "数据集",
			label: "itemtitlecommonurl",
			prop: "sqlcount",
			type: "Input",
			width: "160",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//打开报表
const linkDetailbg = (column, row) => {
	let url =
		"/report/report.jsp?reportencoding=gbk&gotoFlag=1&report=" +
		row.reportfile +
		"&reportparameter=" +
		row.reportargs +
		"&sqlcount=" +
		row.sqlcount;
	window.open(globalStore.serverUrl + url);
};

//页面初始化渲染完成执行
onMounted(() => {
	// if (classification) {
	// 	tableList1.httpAttribute.baseParams[""];
	// }
	zTable1.value.getTableList();
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
<style lang="scss"></style>
