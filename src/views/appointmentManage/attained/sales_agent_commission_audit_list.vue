<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="salesinfos"
				:label="$t('panelcolumnsalesagentcommissionaudit')"
				title1="销售代理提佣审核"
			>
				<zTable
					ref="grid_salesagentbrokerageInfos_query"
					:tableList="atableList"
					@link-detailbg="linkDetail"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="success"
							icon="Check"
							plain
							@click="approveSalesAgentBrokerageInfo('0', scope.selectList)"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							@click="approveSalesAgentBrokerageInfo('-1', scope.selectList)"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							@click="approveSalesAgentBrokerageInfo('-2', scope.selectList)"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('panelcolumnsalesagentcommissionauditquery')"
				title1="提佣审核查询"
				name="salesquery"
			>
				<zTable
					ref="grid_salesagentbrokerageInfos_query_audit"
					:tableList="htableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
				</zTable>
			</el-tab-pane>
		</el-tabs>

		<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_salesagentbrokerageNew" @close="closeSalesAgentBrokerage" width="95%">
			<salesagentbrokerageNew :condobj="condobj"></salesagentbrokerageNew>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_salesagentbrokerageReadOnly" @close="closeSalesAgentBrokerageReadOnly" width="95%">
			<salesagentbrokerageNew :condobj="condobj"></salesagentbrokerageNew>
		</ZDialog>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { GlobalStore } from "/src/store/globalStore.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import salesagentbrokerageNew from "@/views/appointmentManage/attained/sales_agent_commission_detail.vue";

const i18n = useI18n();
const grid_salesagentbrokerageInfos_query = ref();
const grid_salesagentbrokerageInfos_query_audit = ref();
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;
const tableTabsValue = ref("salesinfos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_SALESAGENT_BROKERAGE",
	columnid: "salesbrokerageid"
});
const condobj = reactive({
	cond: {},
	objlist: {}
});

//审核销售代理信息
const approveSalesAgentBrokerageInfo = (code, selectList) => {
	if (selectList != null && selectList.length < 1) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return;
	}
	let str = i18n.t("audit_approve");
	if (code == "-1" || code == "-2") {
		str = i18n.t("audit_reject");
	}
	let approveValue = ref(str);
	ElMessageBox({
		title: i18n.t("Message_PleaeEnterAuditOpinion"),
		message: () =>
			h(ElInput, {
				modelValue: approveValue.value,
				type: "textarea",
				autosize: { minRows: 4 },
				"onUpdate:modelValue": val => {
					approveValue.value = val;
				}
			}),
		showCancelButton: true,
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel")
	}).then(async () => {
		let cond = {
			opinion: approveValue.value
		};
		let jsonString = {
			salesagentbrokerageInfos: selectList,
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if (code == "-1") {
			url = "/crm/salesbrokerage/salesagentbrokerage!reject.action";
		} else if (code == "-2") {
			url = "/crm/salesbrokerage/salesagentbrokerage!reject2Submitor.action";
		} else {
			url = "/crm/salesbrokerage/salesagentbrokerage!approve.action";
		}
		const res = await http.post(url, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			grid_salesagentbrokerageInfos_query.value.getTableList();
		}
	});
};

//提佣页面关闭
const closeSalesAgentBrokerage = () => {
	grid_salesagentbrokerageInfos_query.value.getTableList();
};
//提佣查询页面关闭
const closeSalesAgentBrokerageReadOnly = () => {
	grid_salesagentbrokerageInfos_query_audit.value.getTableList();
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_salesagentbrokerageInfos_query.value.getTableList();
});

//表格对象审核代理提佣
const atableList = reactive({
	id: "/appointmentManage/attained/sales_agent_commission_audit_list.vue_grid_salesagentbrokerageInfos_query",
	//请求属性设置
	httpAttribute: {
		url: "/crm/salesbrokerage/salesagentbrokerage!selectSalesagentbrokerageInfoByCond.action",
		root: "salesagentbrokerageInfos",
		baseParams: {
			"cond.auditflag": "1",
			"cond.workflow_usercode": userInfo.usercode
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
			title: "id",
			label: "id",
			prop: "salesbrokerageid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "状态",
			label: "itemtitlecommondesc11",
			prop: "processflag",
			type: "workflowStatus",
			width: "60"
		},
		{
			title: "提佣申请单号",
			label: "panelcolumnbrokerageno",
			prop: "salesbrokerageid",
			type: "Link",
			width: "160"
		},
		{
			title: "总金额",
			label: "appointmentTotalprice_hkd",
			prop: "totalmoney",
			type: "Number",
			precision: 2,
			width: "130"
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "增值税",
			label: "appointmentValueaddedtax_hkd",
			prop: "taxmoney",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "坏账金额",
			label: "panelcolumnbaddebt",
			prop: "badmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "代理名称",
			label: "corpinfopanelqydlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "所属部门",
			label: "portalcompanyregistdeptment",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "佣金",
			label: "panelcolumnbrokerage_hkd",
			prop: "brokerage",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "120"
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
			label: "i18ncrmcontractCreatePersonName",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "corpinfopanelqycjsjtitle",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "提佣月份",
			label: "brokeragemonth",
			prop: "brokeragemonth",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "提报单位",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "审核人编码",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "审核人名称",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "审核时间",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "审核级别",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "是否已退回",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "退回人编码",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "退回人名称",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "退回时间",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "制单人单位",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "审核节点名称",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "错误信息",
			label: "错误信息",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "workflowid",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "提交时间",
			prop: "submittime",
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

//表格对象审核代理提佣查询
const htableList = reactive({
	id: "/appointmentManage/attained/sales_agent_commission_audit_list.vue_grid_salesagentbrokerageInfos_query_audit",
	//请求属性设置
	httpAttribute: {
		url: "/crm/salesbrokerage/salesagentbrokerage!selectSalesagentbrokerageInfoByCond.action",
		root: "salesagentbrokerageInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.audit_usercode": userInfo.usercode
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
			title: "id",
			label: "id",
			prop: "salesbrokerageid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "状态",
			label: "itemtitlecommondesc11",
			prop: "processflag",
			type: "workflowStatus",
			width: "60"
		},
		{
			title: "提佣申请单号",
			label: "panelcolumnbrokerageno",
			prop: "salesbrokerageid",
			type: "Link",
			width: "160"
		},
		{
			title: "总金额",
			label: "appointmentTotalprice_hkd",
			prop: "totalmoney",
			type: "Number",
			precision: 2,
			width: "130"
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "增值税",
			label: "appointmentValueaddedtax_hkd",
			prop: "taxmoney",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "坏账金额",
			label: "panelcolumnbaddebt",
			prop: "badmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "代理名称",
			label: "corpinfopanelqydlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "所属部门",
			label: "portalcompanyregistdeptment",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "佣金",
			label: "panelcolumnbrokerage_hkd",
			prop: "brokerage",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "120"
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
			label: "i18ncrmcontractCreatePersonName",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "corpinfopanelqycjsjtitle",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "提佣月份",
			label: "brokeragemonth",
			prop: "brokeragemonth",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "提报单位",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "审核人编码",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "审核人名称",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "审核时间",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "审核级别",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "是否已退回",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "退回人编码",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "退回人名称",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "退回时间",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "制单人单位",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "审核节点名称",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "错误信息",
			label: "错误信息",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "workflowid",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "提交时间",
			prop: "submittime",
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

// 显示dialogdialogShow_FormVisibleNew
const dialogShow = data => {
	if (data == "dialogShow_salesagentbrokerageNew") {
		condobj.dialogShow_salesagentbrokerageNew = true;
	}
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//链接详细信息
const linkDetail = (column, row) => {
	if (column == "salesbrokerageid" && row.salesbrokerageid) {
		if (row.salesbrokerageid) {
			condobj.cond = {
				salesbrokerageid: row.salesbrokerageid,
				auditflag: "1"
			};
			condobj.dialogShow_salesagentbrokerageNew = true;
		}
	}
};
//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "salesbrokerageid" && row.salesbrokerageid) {
		if (row.salesbrokerageid) {
			condobj.cond = {
				salesbrokerageid: row.salesbrokerageid,
				readOnly: "1"
			};
			condobj.dialogShow_salesagentbrokerageReadOnly = true;
		}
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "salesinfos") {
		//销售代理提佣审核页面
		grid_salesagentbrokerageInfos_query.value.getTableList();
	} else if (targetName == "salesquery") {
		//销售代理提佣审核查询页面
		grid_salesagentbrokerageInfos_query_audit.value.getTableList();
	}
};
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
