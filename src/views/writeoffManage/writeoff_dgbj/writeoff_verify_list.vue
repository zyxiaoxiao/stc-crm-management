<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('itemtitlewriteoffaudit')"
				title1="销账审核"
				name="writeoffInfos"
			>
				<zTable ref="grid_writeoffInfos" :tableList="wtableList" @link-detailbg="linkDetail" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="success"
							icon="Check"
							:disabled="!scope.isSelected"
							plain
							@click="approveWriteoffInfos('1', scope.selectList)"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							:disabled="!scope.isSelected"
							plain
							@click="approveWriteoffInfos('-1', scope.selectList)"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							:disabled="!scope.isSelected"
							plain
							@click="approveWriteoffInfos('-2', scope.selectList)"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('itemtitlewriteoffsquery')"
				title1="销账查询"
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

		<ZDialog v-model="condobj.dialogShow_invoicedetailNew" width="95%">
			<invoiceDetailReadOnly :condobj="condobj"></invoiceDetailReadOnly>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_writeoffbatchdetailReadOnly" @close="closewiteoffdetailReadOnly" width="95%">
			<writeoffbatchdetailReadOnly :condobj="condobj"></writeoffbatchdetailReadOnly>
		</ZDialog>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
//弹出报错或者提示框
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import invoiceDetailReadOnly from "@/views/writeoffManage/writeoff_dgbj/invoice_detail_readonly.vue";
import writeoffbatchdetailReadOnly from "@/views/writeoffManage/writeoff_dgbj/writeoff_batch_detail_readOnly.vue";
const i18n = useI18n();
const grid_writeoffInfos = ref(); //销账申请页面
const grid_writeoffInfosquery = ref(); //销账查询页面
const tableTabsValue = ref("writeoffInfos");

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

//审核销账单信息
const approveWriteoffInfos = (code, selectList) => {
	if (selectList != null && selectList.length < 1) {
		ElMessage.warning(i18n.t("alertselectYourFirstToOperateOnline"));
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
			writeoffInfos: selectList,
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if (code == "-1") {
			url = "/crm/writeoff/writeoff!reject.action";
		} else if (code == "-2") {
			url = "/crm/writeoff/writeoff!reject2Submitor.action";
		} else {
			url = "/crm/writeoff/writeoff!approve.action";
		}
		const res = await http.post(url, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			grid_writeoffInfos.value.getTableList();
		}
	});
};

//销账信息页面关闭
const closewiteoffdetailReadOnly = () => {
	if (condobj.cond && condobj.cond.auditflag == "Y") {
		grid_writeoffInfos.value.getTableList();
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_writeoffInfos.value.getTableList();
});

//表格对象销账申请
const wtableList = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_verify_list.vue_grid_writeoffInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/writeoff/writeoff!selectWriteoffInfoByRight.action",
		root: "writeoffInfos",
		baseParams: {
			"cond.auditflag": "1",
			"cond.corpright": "true"
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
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "auditorcode",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "auditordesc",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "audittime",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "auditlevel",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "retrieveflag",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "retrievercode",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "retrieverdesc",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "retrievetime",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "recordercorp",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "auditlevelname",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
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
			label: "submittime",
			prop: "submittime",
			type: "Input",
			width: "10",
			isHide: true
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

//表格对象销账查询
const qtableList = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_verify_list.vue_grid_writeoffInfosquery",
	//请求属性设置
	httpAttribute: {
		url: "/crm/writeoff/writeoff!selectWriteoffInfoCreateQueryByCond.action",
		root: "writeoffInfos",
		baseParams: {
			"cond.auditflag": "1,2"
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
			label: "submitcorp",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "auditorcode",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "auditordesc",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "audittime",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "auditlevel",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "retrieveflag",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "retrievercode",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "retrieverdesc",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "retrievetime",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "recordercorp",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "auditlevelname",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
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
			label: "submittime",
			prop: "submittime",
			type: "Input",
			width: "10",
			isHide: true
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

// 显示dialogdialogShow_FormVisibleNew
const dialogShow = data => {
	if (data == "dialogShow_invoicedetailNew") {
		condobj.cond = {
			newInvoice: "Y"
		};
		condobj.dialogShow_invoicedetailNew = true;
	}
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//链接详细信息
const linkDetail = (column, row) => {
	if (column == "writeoffcode" && row.writeoffid) {
		if (row.writeoffid) {
			condobj.cond = {
				writeoffid: row.writeoffid,
				auditflag: "Y",
				corpid: row.corpid
			};
			condobj.dialogShow_writeoffbatchdetailReadOnly = true;
		}
	}
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
const tabChange = targetName => {
	if (targetName == "writeoffInfos") {
		//销账申请信息查询页面
		grid_writeoffInfos.value.getTableList();
	} else if (targetName == "querywriteoffInfos") {
		//税票信息查询页面
		grid_writeoffInfosquery.value.getTableList();
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
