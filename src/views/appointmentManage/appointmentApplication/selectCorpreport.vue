<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="zTable1" :tableList="ctableList">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectReport(scope.selectList)" plain>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
		</zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessage } from "element-plus";
const i18n = useI18n();
let zTable1 = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	dialogShow: false,
	cond: {},
	objlist: {}
});

//默认需要传入的参数
let params = {};

let vdata = {};
//选择完数据后给父页面传值
const selectReport = list => {
	if (list != null && list.length == 1) {
		vdata = list[0]; //地址数据
		props.condobj.objlist = vdata; //传参
		props.condobj.reportDialogShow = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};
if (props.condobj != null) {
	let corpid = props.condobj.cond.corpid;
	if (corpid) {
		params["cond.corpid"] = corpid;
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Message_DataErrorPleaseContactITPersonnel")
		});
	}
}
//表格对象
const ctableList = reactive({
	id: "/appointmentManage/appointmentApplication/selectCorpreport.vue_zTable1",
	//设置 为单选
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/report/reportinfo!selectCrmReportInfoByCond.action",
		root: "crmReportInfos",
		baseParams: params
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "reportid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "报告中文抬头",
			label: "itemtitlereportzh",
			prop: "report_zh",
			type: "Input",
			width: "160"
		},
		{
			title: "报告英文抬头",
			label: "itemtitlereportus",
			prop: "report_us",
			type: "Input",
			width: "160"
		},
		{
			title: "报告中文地址",
			label: "itemtitlereportaddresszh",
			prop: "report_address_zh",
			type: "Input",
			width: "160"
		},
		{
			title: "报告英文地址",
			label: "itemtitlereportaddressus",
			prop: "report_address_us",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人名称",
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "120"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "reportid",
			label: "reportid",
			prop: "reportid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "corpid",
			label: "corpid",
			prop: "corpid",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//页面初始化渲染完成执行
onMounted(() => {
	//selectEnterpriseInfos.value.getTableList();
	//页面传入的值判断还需要添加的参数
    props.condobj.objlist = null;//清空数据
	zTable1.value.getTableList();
});
</script>
