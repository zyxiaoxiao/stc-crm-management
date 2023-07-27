<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('menubasewriteoffhistoryquery')"
				title1="销账历史查询"
				name="querywriteoffInfos"
			>
				<zTable
					ref="grid_writeoffInfosquery"
					:tableList="qtableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
				</zTable>
			</el-tab-pane>
		</el-tabs>

		<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>
		<ZDialog v-model="condobj.dialogShow_writeoffbatchdetailReadOnly" width="95%">
			<writeoffbatchdetailReadOnly :condobj="condobj"></writeoffbatchdetailReadOnly>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import writeoffbatchdetailReadOnly from "@/views/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue";
const i18n = useI18n();
const grid_writeoffInfosquery = ref(); //销账查询页面
const tableTabsValue = ref("querywriteoffInfos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_WRITEOFF",
	columnid: "writeoffid"
});

const condobj = reactive({
	cond: {},
	objlist: {}
});

//页面初始化渲染完成执行
onMounted(() => {
	grid_writeoffInfosquery.value.getTableList();
});

//表格对象销账查询
const qtableList = reactive({
	id: "/comprehensiveQuery/writeoff_history_query_list.vue_grid_writeoffInfosquery",
	//请求属性设置
	httpAttribute: {
		url: "/crm/writeoff/writeoff!selectWriteoffInfoByCond.action",
		root: "writeoffInfos",
		baseParams: {
			"cond.auditflag": "2"
		}
	},
	//快捷查询
	tablePropSearch: {},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "状态",
			label: "itemtitlecommondesc11",
			prop: "processflag",
			type: "workflowStatus",
			width: "60"
		},
		{
			title: "销账单号",
			label: "columnwriteoff_application_listwriteoffNo",
			prop: "writeoffcode",
			type: "Link",
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
			title: "本次外币可冲销金额",
			label: "columncurrencywriteoff_application_listCanWriteOffsdetail",
			prop: "currencywriteoffmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "本次外币冲销总金额",
			label: "columncurrencywriteoff_application_listTotalAmountdetail",
			prop: "currencytotalmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "本次冲销总金额",
			label: "columnwriteoff_application_listTotalAmount",
			prop: "totalmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "本次可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffs",
			prop: "writeoffmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "客户号",
			label: "itemtitleinvoicecorpno",
			prop: "corpno",
			type: "Input",
			width: "140"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "corpdesc",
			type: "Input",
			width: "150"
		},
		{
			title: "分公司+批次",
			label: "brachbatchno",
			prop: "brachbatchno",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "140"
		},
		{
			title: "创建人名称",
			label: "columnCreatehumandescription",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "Input",
			width: "160"
		},
		{
			title: "主键",
			label: "corpid",
			prop: "corpid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "主键",
			label: "writeoffid",
			prop: "writeoffid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "i18ncrmcontractReportedToTheUnit",
			prop: "submitcorp",
			type: "Input",
			width: "160"
		},
		{
			title: "审核人编码",
			label: "auditcommoncode",
			prop: "auditorcode",
			type: "Input",
			width: "140"
		},
		{
			title: "审核人名称",
			label: "auditcommonauditorname",
			prop: "auditordesc",
			type: "Input",
			width: "160"
		},
		{
			title: "审核时间",
			label: "auditcommontime",
			prop: "audittime",
			type: "Date",
			format: "YYYY-MM-DD",
			width: "160"
		},
		{
			title: "审核级别",
			label: "itemtitlecommonauditlevel",
			prop: "auditlevel",
			type: "Input",
			width: "150"
		},
		{
			title: "是否已退回",
			label: "i18ncrmcontractOrNotReturned",
			prop: "retrieveflag",
			type: "Input",
			width: "160"
		},
		{
			title: "退回人编码",
			label: "i18ncrmcontractReturnedPeopleCode",
			prop: "retrievercode",
			type: "Input",
			width: "160"
		},
		{
			title: "退回人名称",
			label: "i18ncrmcontractReturnedPeopleName",
			prop: "retrieverdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "退回时间",
			label: "i18ncrmcontractReturnedTime",
			prop: "retrievetime",
			type: "Date",
			format: "YYYY-MM-DD",
			width: "160"
		},
		{
			title: "制单人单位",
			label: "i18ncrmcontractMakePeopleUnit",
			prop: "recordercorp",
			type: "Input",
			width: "150"
		},
		{
			title: "审核节点名称",
			label: "auditcommonnodename",
			prop: "auditlevelname",
			type: "Input",
			width: "160"
		},
		{
			title: "错误信息",
			label: "errormsg",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "i18ncrmcontractSubmitTime",
			prop: "submittime",
			type: "Date",
			format: "YYYY-MM-DD",
			width: "150"
		},
		{
			title: "工作流ID",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

// 显示
const dialogShow = data => {};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "writeoffcode" && row.writeoffid) {
		if (row.writeoffid) {
			condobj.cond = {
				writeoffid: row.writeoffid,
				corpid: row.corpid
			};
			condobj.dialogShow_writeoffbatchdetailReadOnly = true;
		}
	}
};

//切换tab时触发
const tabChange = targetName => {};
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
