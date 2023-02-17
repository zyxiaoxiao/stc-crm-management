<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbgQuery" @workflow-status="workflowStatus"> </zTable>

		<!-- 新增弹出 -->
		<div v-dialogStretching>
			<ZDialog v-model="invoicehedgingdetailList.dialogShow" width="95%" @close="invoicehedgingdetailClose">
				<invoicehedgingdetail :condobj="invoicehedgingdetailList"></invoicehedgingdetail>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import { GlobalStore } from "@/store/globalStore.js";
import invoicehedgingdetail from "../invoiceHedgingManagement/invoicehedging_detail.vue";
import audit from "@/views/audit/index.vue";

const globalStore = GlobalStore();

//表格表头
let tableColumns1 = reactive([
	{
		type: "selection",
		width: "40"
	},
	{
		title: "状态",
		label: "itemtitlecommondesc11",
		prop: "processflag",
		type: "workflowStatus",
		width: "70"
	},
	{
		title: "Invoice号码",
		label: "itemtitleinvoiceinvoicecode",
		prop: "invoiceno",
		type: "Link",
		width: "160"
	},
	{
		title: "账单日期",
		label: "columnwriteoff_invoicedate",
		prop: "invoicedate",
		type: "Date",
		width: "160"
	},
	{
		title: "账单对冲日期",
		label: "columnwriteoff_invoiceheddate",
		prop: "invoiceheddate",
		type: "Date",
		width: "160"
	},
	{
		title: "币种",
		label: "itemtitleinvoicecurrencies",
		prop: "currencytype",
		type: "Input",
		width: "160"
	},
	{
		title: "账单合计",
		label: "columnwriteoff_invoicetotal",
		prop: "invoicetotal",
		type: "Input",
		width: "160"
	},
	{
		title: "付款条件",
		label: "columnwriteoff_paycondition",
		prop: "paycondition",
		type: "Input",
		width: "160"
	},
	{
		title: "客户号",
		label: "columnwriteoff_sendclientno",
		prop: "sendclientno",
		type: "Input",
		width: "160"
	},
	{
		title: "客户名称",
		label: "columnwriteoff_sendclientname",
		prop: "sendclientname",
		type: "Input",
		width: "160"
	},
	{
		title: "发往地址",
		label: "columnwriteoff_sendclientaddr",
		prop: "sendclientaddr",
		type: "Input",
		width: "160"
	},
	{
		title: "联系人",
		label: "columnwriteoff_sendclientcontactor",
		prop: "sendclientcontactor",
		type: "Input",
		width: "160"
	},
	{
		title: "备注",
		label: "panelcolumnRemark",
		prop: "remark",
		type: "Input"
	},
	{
		title: "创建人编码",
		label: "columnCreatehumancoding",
		prop: "recordercode",
		type: "Input",
		width: "160"
	},
	{
		title: "创建人名称",
		label: "testiteminforecordernamepanel",
		prop: "recorderdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "创建日期",
		label: "testiteminforecordtimepanel",
		prop: "recordtime",
		type: "DateTime",
		width: "180"
	},
	{
		title: "id",
		label: "",
		prop: "hedgingid",
		type: "id",
		width: "60",
		isHide: true
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/comprehensiveQuery/invoicehedging_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoicehedging/invoicehedging!selectInvoicehedgingInfoForQuery.action",
		root: "invoicehedgingInfos",
		baseParams: { "cond.auditflag": "2", "cond.recordercode": globalStore.userInfo.usercode }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//新增弹出 参数
const invoicehedgingdetailList = reactive({
	success: false,
	dialogShow: false,
	hedgingid: "",
	workflowflag: "3"
});

// 新增 弹出 回调
const invoicehedgingdetailClose = () => {
	if (invoicehedgingdetailList.success) {
		zTable1.value.getTableList();
	}
};

const linkDetailbgQuery = (column, row) => {
	invoicehedgingdetailList.hedgingid = row.hedgingid;
	invoicehedgingdetailList.workflowflag = "3";
	invoicehedgingdetailList.success = false;
	invoicehedgingdetailList.dialogShow = true;
};

//审核记录
const auditList = reactive({
	dialogShow: false,
	codeid: "",
	tablename: "MLS_INVOICEHEDGING",
	columnid: "hedgingid"
});
//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow = true;
};

//页面初始化渲染完成执行
onMounted(() => {
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
