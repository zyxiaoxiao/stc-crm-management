<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="grid_testitemView" :tableList="historyapplicationitmetableList">
		</zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessage } from "element-plus";
const i18n = useI18n();
let grid_testitemView = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});
//检验类型
//let CRM_businessCategory = getdropSownSelection("CRM_businessCategory");
//默认需要传入的参数
const params = {};
//页面传入的值判断还需要添加的参数
if (props.condobj && props.condobj.cond) {
	let v_corpno = props.condobj.cond.corpno;
    let v_testid = props.condobj.cond.testid;
	if (v_corpno) {
		params["cond.corpno"] = v_corpno;
        params["cond.testid"] = v_testid;
	}
}


//页面初始化渲染完成执行
onMounted(() => {
	grid_testitemView.value.getTableList();
});
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "id",
		label: "id",
		prop: "SERIALNO",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "报价单编号",
		label: "crmcolumnreservnum",
		prop: "RESERVNUM",
		type: "Input",
		width: "160"
	},
	{
		title: "流水码",
		label: "columnappointmenttesthistoryserialno",
		prop: "SERIALNO",
		type: "Input",
		width: "200"
	},
	{
		title: "测试名称",
		label: "columnappointmenttesthistorytestdesc",
		prop: "TESTDESC",
		type: "Input",
		width: "240"
	},
	{
		title: "测试标准",
		label: "testiteminfoteststandardpanel",
		prop: "TESTSTANDARD",
		type: "Input",
		width: "120"
	},
	{
		title: "单价",
		label: "testiteminfoUnitPricepanel_hkd",
		prop: "TESTPRICE",
		type: "Input",
		width: "140"
	},
	{
		title: "折扣率(%)",
		label: "columnappointmentdiscount",
		prop: "DISCOUNTRATE",
		type: "Number",
		precision: 2,
		width: "150"
	},
	{
		title: "数量",
		label: "tabletitlemdm_tasklistpromt_taskcount",
		prop: "COUNT",
		type: "Input",
		width: "140"
	},
	{
		title: "币种",
		label: "columnappointmentdesc53",
		prop: "currencyname",
		type: "Input",
		width: "150"
	},
	{
		title: "历史报价",
		label: "itemtitleappointmenthisprice",
		prop: "PRICE_FN",
		type: "Input",
		width: "160"
	},
	{
		title: "测试计划费用",
		label: "columnappointmenttesthistoryrasprofileprices_hkd",
		prop: "RASPROFILEPRICES",
		type: "Input",
		width: "160"
	},
	{
		title: "备注",
		label: "panelcolumnRemark",
		prop: "REMARK",
		type: "Input",
		width: "160"
	},
	{
		title: "创建时间",
		label: "testiteminforecordtimepanel",
		prop: "CREATEDATE",
		type: "Input",
		width: "160"
	}
];

//表格对象
const historyapplicationitmetableList = reactive({
    id: "/appointmentManage/appointmentApplication/appointment_his.vue_grid_testitemView",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectHisdiscount.action",
		root: "vmaps",
		baseParams: params
	},
	//表格表头
	tableColumns: tableColumns,
	// 表格数据
	tableData: []
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
