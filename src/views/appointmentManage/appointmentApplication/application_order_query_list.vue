<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="selectapplicationOrderQuery" :tableList="foldertableList" >
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectFolderApplintment(scope.selectList)" plain>
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
let selectapplicationOrderQuery = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});

const brokerage = [
	{
		value: "1",
		label: i18n.t("crmcolumnwsp1")
	},
	{
		value: "0",
		label: i18n.t("crmcolumnwsp0")
	}
];

//检验类型
//let CRM_businessCategory = getdropSownSelection("CRM_businessCategory");
//默认需要传入的参数
const params = {};


//选择完数据后给父页面传值
const selectFolderApplintment = list => {
	if (list != null && list.length == 1) {
		props.condobj.objlist = list[0]; //传参
		props.condobj.deptFolderApplintmentDialogShow = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	props.condobj.objlist = null;//清空数据
	selectapplicationOrderQuery.value.getTableList();
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
		width: "140"
	},
	{
		title: "发票编号",
		label: "itemtitleinvoiceinvoicecode",
		prop: "invoiceno",
		type: "Input",
		width: "140"
	},
	{
		title: "报价单编号",
		label: "crmcolumnreservnum",
		prop: "quotationno",
		type: "Input",
		width: "140"
	},
	{
		title: "申请人员全名",
		label: "createdbyfullname",
		prop: "createdbyfullname",
		type: "Input",
		width: "10",
		isHide: true
	},
	{
		title: "业务人员",
		label: "tablesenametitle",
		prop: "sename",
		type: "Input",
		width: "140"
	},
	{
		title: "部门",
		label: "corpinfopaneldepartmentcodetitle",
		prop: "dept",
		type: "Input",
		width: "150"
	},
	{
		title: "客户号",
		label: "fieldcolumncustomercode",
		prop: "rasclientid",
		type: "Input",
		width: "140"
	},
	{
		title: "客户名称",
		label: "columnCustomerName",
		prop: "compname",
		type: "Input",
		width: "200"
	},
	{
		title: "金额",
		label: "columnappointmentothercostcostprice",
		prop: "currency",
		type: "Input",
		width: "140"
	},
	{
		title: "可销账金额",
		label: "columnwriteoff_application_listCanWriteOffsdetail",
		prop: "currencycanwriteoffsnum",
		type: "Input",
		width: "200"
	},
	{
		title: "成本费",
		label: "columncurrencywriteoff_application_listCost",
		prop: "currencycostnum",
		type: "Input",
		width: "140"
	},
	{
		title: "币种",
		label: "columnappointmentdesc53",
		prop: "currencyname",
		type: "Input",
		width: "140"
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
		width: "140"
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
		width: "140"
	},
	{
		title: "是否已提佣",
		label: "itemtitleWhetherToRaiseCommissionOrNot",
		prop: "brokerageflag",
		type: "Input",
		width: "140",
		typeData: brokerage,
	},
	{
		title: "销售代理编号",
		label: "corpinfopanelqydlsbmtitle",
		prop: "agentno",
		type: "Input",
		width: "140"
	},
	{
		title: "打印日期",
		label: "columnwriteoff_invoiceprintdate",
		prop: "invoice_printdate",
		type: "Input",
		width: "160"
	}
];

//表格对象
const foldertableList = reactive({
	id: "/appointmentManage/appointmentApplication/application_order_query_list.vue_selectapplicationOrderQuery",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFolderInfoByCondWithCorpCode.action",
		root: "foldersInfos",
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


