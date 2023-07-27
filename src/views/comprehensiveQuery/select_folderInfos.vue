<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="editGrid_codeInfos" :tableList="customertableList"> </zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
const i18n = useI18n();
let editGrid_codeInfos = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});

let foldertype = [
	{
		value: "1",
		label: i18n.t("itemtitleMainAccountOrNot1")
	},
	{
		value: "0",
		label: i18n.t("itemtitleMainAccountOrNot0")
	}
];

//页面初始化渲染完成执行
onMounted(() => {
	editGrid_codeInfos.value.getTableList();
});
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "申请单号",
		label: "columntolockapplynum",
		prop: "folderno",
		type: "Input",
		width: "160"
	},
	{
		title: "发票编号",
		label: "itemtitleinvoiceinvoicecode",
		prop: "invoiceno",
		type: "Input",
		width: "160"
	},
	{
		title: "报价单编号",
		label: "crmcolumnreservnum",
		prop: "quotationno",
		type: "Input",
		width: "160"
	},
	{
		title: "业务人员",
		label: "tablesenametitle",
		prop: "sename",
		type: "Input",
		width: "160"
	},
	{
		title: "部门",
		label: "corpinfopaneldepartmentcodetitle",
		prop: "dept",
		type: "Input",
		width: "160"
	},
	{
		title: "客户号",
		label: "fieldcolumncustomercode",
		prop: "rasclientid",
		type: "Input",
		width: "150"
	},
	{
		title: "客户名称",
		label: "columnCustomerName",
		prop: "compname",
		type: "Input",
		width: "260"
	},
	{
		title: "金额",
		label: "columnappointmentothercostcostprice",
		prop: "currency",
		type: "Input",
		width: "160"
	},
	{
		title: "可销账金额",
		label: "columncurrencywriteoff_application_listCanWriteOffsdetail",
		prop: "currencycanwriteoffsnum",
		type: "Input",
		width: "160"
	},
	{
		title: "成本费",
		label: "columncurrencywriteoff_application_listCost",
		prop: "currencycostnum",
		type: "Input",
		width: "160"
	},
	{
		title: "币种",
		label: "columnappointmentdesc53",
		prop: "currencyname",
		type: "Input",
		width: "160"
	},
	{
		title: "中文样本名",
		label: "columnbaseappointmentChineseForSample",
		prop: "samplename",
		type: "Input",
		width: "160"
	},
	{
		title: "英文样本名",
		label: "columnbaseappointmentEnglishSampleName",
		prop: "samplename_en",
		type: "Input",
		width: "160"
	},
	{
		title: "样品描述",
		label: "columnSampleInformation",
		prop: "sampleinformation",
		type: "Input",
		width: "160"
	},
	{
		title: "申请人编码",
		label: "columnApplicantcode",
		prop: "cscode",
		type: "Input",
		width: "160"
	},
	{
		title: "申请人名称",
		label: "columnApplicantdesc",
		prop: "csname",
		type: "Input",
		width: "160"
	},
	{
		title: "申请时间",
		label: "i18ncrmcontractApplicationDate",
		prop: "drawdate",
		type: "Input",
		width: "160"
	},
	{
		title: "销账状态",
		label: "columnwriteoff_status",
		prop: "writeoffstatus",
		type: "Input",
		width: "160"
	},
	{
		title: "是否已提佣",
		label: "itemtitleWhetherToRaiseCommissionOrNot",
		prop: "brokerageflag",
		type: "Select",
		width: "140",
		typeData: foldertype
	},
	{
		title: "销售代理编号",
		label: "corpinfopanelqydlsbmtitle",
		prop: "agentno",
		type: "Input",
		width: "160"
	},
	{
		title: "打印日期",
		label: "columnwriteoff_invoiceprintdate",
		prop: "invoice_printdate",
		type: "Input",
		width: "160"
	}
];

//表格对象申请单
const customertableList = reactive({
	id: "/comprehensiveQuery/select_folderInfos.vue_editGrid_codeInfos",
	//设置 为单选
	isRadio: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFolderInfoByCondWithCorpCode.action",
		root: "foldersInfos",
		baseParams: { "cond.rightFlag": "1" }
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
