<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="invoiceinfos"
				:label="$t('itemtitleinvoiceapprove')"
				title1="开票审核"
			>
				<zTable
					ref="grid_invoiceInfos2"
					:tableList="invoicetableList2"
					@link-detailbg="linkDetailapprove"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="success" icon="Check" plain @click="approveInvoiceInfos('0', scope.selectList)">{{
							$t("menu_approve")
						}}</el-button>
						<el-button size="small" type="danger" icon="Close" plain @click="approveInvoiceInfos('-2', scope.selectList)">{{
							$t("menu_reject2Submitor")
						}}</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('itemtitleinvoicerevoke')"
				title1="开票撤销"
				name="revokeinvoiceinfo"
			>
				<zTable
					ref="grid_invoiceInfos3"
					:tableList="revoketableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="revokeInvoiceInfos(scope.selectList)"
							>{{ $t("menu_back") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('itemtitleinvoicequery')"
				title1="开票查询"
				name="queryinvoiceinfo"
			>
				<zTable
					ref="grid_invoiceInfos4"
					:tableList="htableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_invoicedetailApprove" width="95%">
				<invoicedetailApprove :condobj="condobj"></invoicedetailApprove>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_invoicedetailReadOnly" width="95%">
				<invoicedetailReadOnly :condobj="condobj"></invoicedetailReadOnly>
			</ZDialog>
		</div>
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
import invoicedetailApprove from "@/views/writeoffManage/invoice/invoice_detail_readonly.vue";
import invoicedetailReadOnly from "@/views/writeoffManage/invoice/invoice_detail_readonly.vue";
const i18n = useI18n();
const grid_invoiceInfos2 = ref(); //税票审核
const grid_invoiceInfos3 = ref(); //撤销税票
const grid_invoiceInfos4 = ref(); //税票查询
const tableTabsValue = ref("invoiceinfos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_INVOICE",
	columnid: "invoiceid"
});

const condobj = reactive({
	cond: {},
	objlist: {}
});

//下载弹出对话框
let dialogExcelRadio = ref(false);

//撤销审核
const revokeInvoiceInfos = async (selectList) => {
    if (selectList != null && selectList.length < 1) {
		ElMessage.warning(i18n.t("alertChooseanappointmenttocancel"));
		return;
	}
    let params = {
		jsonString: JSON.stringify({ invoiceInfos: selectList })
	};
	const res = await http.post("/crm/invoice/invoice!backInvoiceInfos.action", qs.stringify(params));
	if (res) {
        grid_invoiceInfos3.value.getTableList();
	}
};    

//审核税票信息
const approveInvoiceInfos = (code, selectList) => {
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
			invoiceInfos: selectList,
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if (code == "-1") {
			url = "/crm/invoice/invoice!reject.action";
		} else if (code == "-2") {
			url = "/crm/invoice/invoice!reject2Submitor.action";
		} else {
			url = "/crm/invoice/invoice!approveInvoiceInfo.action";
		}
		const res = await http.post(url, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			grid_invoiceInfos2.value.getTableList();
		}
	});
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_invoiceInfos2.value.getTableList();
});

//表格对象税票
const invoicetableList2 = reactive({
	id: "/writeoffManage/invoice/invoice_edit_list2.vue_grid_invoiceInfos2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoice/invoice!selectInvoiceInfoByCond.action",
		root: "invoiceInfos",
		baseParams: {
			"cond.auditflag": "1"
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
			title: "开票编号",
			label: "itemtitleinvoicetax",
			prop: "taxinvoicecode",
			type: "Link",
			width: "160"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencies",
			type: "Input",
			width: "140"
		},
		{
			title: "汇率",
			label: "itemtitleinvoiceexchangerate",
			prop: "exchangerate",
			type: "Input",
			width: "140"
		},
		{
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamount",
			prop: "currencyamount",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "发票金额",
			label: "itemtitleinvoiceinvoicemoney",
			prop: "invoicemoney",
			type: "Input",
			width: "140"
		},
		{
			title: "客户号",
			label: "itemtitleinvoicecorpno",
			prop: "corpno",
			type: "Input",
			width: "150"
		},
		{
			title: "客户姓名",
			label: "itemtitleinvoicecorpdesc",
			prop: "corpname",
			type: "Input",
			width: "210"
		},
		{
			title: "发票日期",
			label: "itemtitleinvoiceinvoicedate",
			prop: "invoicedate",
			type: "Input",
			width: "150"
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "foldernos",
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
			title: "备注",
			label: "columnappointment_desc42",
			prop: "remark",
			type: "Input",
			width: "160"
		},
		{
			title: "主键",
			label: "invoiceid",
			prop: "invoiceid",
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

//表格对象撤销发布
const revoketableList = reactive({
	id: "/writeoffManage/invoice/invoice_edit_list2.vue_grid_invoiceInfos3",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoice/invoice!selectInvoiceInfoByCond.action",
		root: "invoiceInfos",
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
			title: "开票编号",
			label: "itemtitleinvoicetax",
			prop: "taxinvoicecode",
			type: "Link",
			width: "160"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencies",
			type: "Input",
			width: "140"
		},
		{
			title: "汇率",
			label: "itemtitleinvoiceexchangerate",
			prop: "exchangerate",
			type: "Input",
			width: "140"
		},
		{
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamount",
			prop: "currencyamount",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "发票金额",
			label: "itemtitleinvoiceinvoicemoney",
			prop: "invoicemoney",
			type: "Input",
			width: "140"
		},
		{
			title: "客户号",
			label: "itemtitleinvoicecorpno",
			prop: "corpno",
			type: "Input",
			width: "150"
		},
		{
			title: "客户姓名",
			label: "itemtitleinvoicecorpdesc",
			prop: "corpname",
			type: "Input",
			width: "210"
		},
		{
			title: "发票日期",
			label: "itemtitleinvoiceinvoicedate",
			prop: "invoicedate",
			type: "Input",
			width: "150"
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "foldernos",
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
			title: "备注",
			label: "columnappointment_desc42",
			prop: "remark",
			type: "Input",
			width: "160"
		},
		{
			title: "主键",
			label: "invoiceid",
			prop: "invoiceid",
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

//表格对象税票查询
const htableList = reactive({
	id: "/writeoffManage/invoice/invoice_edit_list2.vue_grid_invoiceInfos4",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoice/invoice!selectInvoiceInfoByCond.action",
		root: "invoiceInfos",
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
			title: "开票编号",
			label: "itemtitleinvoicetax",
			prop: "taxinvoicecode",
			type: "Link",
			width: "160"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencies",
			type: "Input",
			width: "140"
		},
		{
			title: "汇率",
			label: "itemtitleinvoiceexchangerate",
			prop: "exchangerate",
			type: "Input",
			width: "140"
		},
		{
			title: "外币金额",
			label: "itemtitleinvoicecurrencyamount",
			prop: "currencyamount",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "发票金额",
			label: "itemtitleinvoiceinvoicemoney",
			prop: "invoicemoney",
			type: "Input",
			width: "140"
		},
		{
			title: "客户号",
			label: "itemtitleinvoicecorpno",
			prop: "corpno",
			type: "Input",
			width: "150"
		},
		{
			title: "客户姓名",
			label: "itemtitleinvoicecorpdesc",
			prop: "corpname",
			type: "Input",
			width: "210"
		},
		{
			title: "发票日期",
			label: "itemtitleinvoiceinvoicedate",
			prop: "invoicedate",
			type: "Input",
			width: "150"
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "foldernos",
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
			title: "备注",
			label: "columnappointment_desc42",
			prop: "remark",
			type: "Input",
			width: "160"
		},
		{
			title: "主键",
			label: "invoiceid",
			prop: "invoiceid",
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
	} else if (data == "dialogShow_ExcelRadioNew") {
		//Excel模板下载
		dialogExcelRadio.value = true;
	}
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//链接详细信息
const linkDetailapprove = (column, row) => {
	if (column == "taxinvoicecode" && row.invoiceid) {
		if (row.invoiceid) {
			condobj.cond = {
				invoiceid: row.invoiceid,
				rasclientid: row.corpno,
				workflowflag: "5"
			};
			condobj.dialogShow_invoicedetailApprove = true;
		}
	}
};
//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "taxinvoicecode" && row.invoiceid) {
		if (row.invoiceid) {
			condobj.cond = {
				invoiceid: row.invoiceid,
				rasclientid: row.corpno,
				workflowflag: "3"
			};
			condobj.dialogShow_invoicedetailReadOnly = true;
		}
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "invoiceinfos") {
		//税票申请信息页面
		grid_invoiceInfos2.value.getTableList();
	} else if (targetName == "revokeinvoiceinfo") {
		//税票撤回信息页面
		grid_invoiceInfos3.value.getTableList();
	} else if (targetName == "queryinvoiceinfo") {
		//税票信息查询页面
		grid_invoiceInfos4.value.getTableList();
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
