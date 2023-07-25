<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="INVOICE对冲审核"
				:label="$t('menubaseInvoicehedgingAudit')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="success"
							icon="Check"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/deliverys/deliverys!approveDeliverysInfo.action', 'Approve !', scope.selectList)"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/deliverys/deliverys!reject.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/deliverys/deliverys!reject2Submitor.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="INVOICE对冲审核查询"
				:label="$t('menubaseInvoicehedgingAuditQuery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery" @workflow-status="workflowStatus">
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 新增弹出 -->
		<ZDialog v-model="invoicehedgingdetailList.dialogShow" width="95%" @close="invoicehedgingdetailClose">
			<invoicehedgingdetail :condobj="invoicehedgingdetailList"></invoicehedgingdetail>
		</ZDialog>

		<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { GlobalStore } from "@/store/globalStore.js";
import invoicehedgingdetail from "./invoicehedging_detail.vue";
import audit from "@/views/audit/index.vue";

const globalStore = GlobalStore();
const i18n = useI18n();

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
	id: "/invoiceHedgingManagement/invoicehedging_audit_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoicehedging/invoicehedging!selectInvoicehedgingInfoByCond.action",
		root: "invoicehedgingInfos",
		baseParams: { "cond.auditflag": "1", "cond.workflow_usercode": globalStore.userInfo.usercode }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/invoiceHedgingManagement/invoicehedging_audit_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoicehedging/invoicehedging!selectInvoicehedgingInfoByCond.action",
		root: "invoicehedgingInfos",
		baseParams: { "cond.audit_usercode": globalStore.userInfo.usercode }
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

//链接详细信息
const linkDetailbg = (column, row) => {
	invoicehedgingdetailList.hedgingid = row.hedgingid;
	invoicehedgingdetailList.workflowflag = "2";
	invoicehedgingdetailList.success = false;
	invoicehedgingdetailList.dialogShow = true;
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

const tabPaneName = ref("0");
const tabPaneSet = new Set();
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case "0":
			//
			zTable1.value.getTableList();
			break;
		case "1":
			//
			zTable2.value.getTableList();
			break;
	}
	tabPaneSet.add(TabPaneName);
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
