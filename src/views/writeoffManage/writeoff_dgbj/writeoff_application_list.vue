<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="invoiceinfos"
				:label="$t('itemtitleinvoiceinvoiceinfo')"
				title1="开票信息"
			>
				<zTable
					ref="grid_appointmentInfos"
					:tableList="invoicetableList"
					@link-detailbg="invoicelinkDetail"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="newWriteoffInfos(scope.selectList)">{{
							$t("SRM_add")
						}}</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('itemtitlewriteoffsapplication')"
				title1="销账申请"
				name="writeoffInfos"
			>
				<zTable ref="grid_writeoffInfos" :tableList="wtableList" @link-detailbg="linkDetail" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="invoiceInfosDelete(scope.selectList)"
							>{{ $t("SRM_delete") }}</el-button
						>
						<el-button size="small" type="success" icon="Check" plain @click="submitInvoiceInfos(scope.selectList)">{{
							$t("SRM_submit")
						}}</el-button>
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
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_invoicedetailNew" width="95%">
				<invoiceDetailReadOnly :condobj="condobj"></invoiceDetailReadOnly>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_writeoffbatchdetail" @close="closeinvoicedetailReadOnly" width="95%">
				<writeoffbatchdetail :condobj="condobj"></writeoffbatchdetail>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
//弹出报错或者提示框
import { ElMessage, ElMessageBox } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import invoiceDetailReadOnly from "@/views/writeoffManage/writeoff_dgbj/invoice_detail_readonly.vue";
import writeoffbatchdetail from "@/views/writeoffManage/writeoff_dgbj/writeoff_batch_detail.vue";
const i18n = useI18n();
const grid_appointmentInfos = ref(); //invoice页面
const grid_writeoffInfos = ref(); //销账申请页面
const grid_writeoffInfosquery = ref(); //销账查询页面
const tableTabsValue = ref("invoiceinfos");

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

let write_off = [
	{
		value: "1",
		label: "销账中"
	},
	{
		value: "0",
		label: "正常"
	}
];

//下载弹出对话框
let dialogExcelRadio = ref(false);

//新增销账申请
const newWriteoffInfos = async selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return false;
	}
	let jsonString = {
		invoiceInfos: selectList
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};

	const res = await http.post("/crm/writeoff/writeoff!insertWriteoffInfoByInvoiceInfos.action", qs.stringify(params));
	if (res) {
		let writeoffInfo = res.writeoffInfo;
		let writeoffid = writeoffInfo[0].writeoffid;
		if (writeoffid) {
		}
	}
};

//提交税票单信息
const submitInvoiceInfos = selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("menu_chooseFolder"));
		return;
	}
	ElMessageBox.confirm(i18n.t("alertConfirmsubmission"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			invoiceInfos: selectList
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/invoice/invoice!submitInvoiceInfos.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			grid_appointmentInfos.value.getTableList();
		}
	});
};

//税票查询页面关闭
const closeinvoicedetailReadOnly = () => {
	grid_writeoffInfosquery.value.getTableList();
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_appointmentInfos.value.getTableList();
});

const formData1 = reactive({});

//表格对象invoice
const invoicetableList = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_application_list.vue_grid_appointmentInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoiceinfo/invoiceinfo!selectInvoceInfoByCond.action",
		root: "invoicemap",
		baseParams: {
			"cond.currencycanwriteoffsnum": "0",
			"cond.invoicetype": "INVOICE",
			"cond.orderby": "invoicedate",
			"cond.asc": "desc"
		}
	},
	//快捷查询
	tablePropSearch: formData1,
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "发票编号",
			label: "columnwriteoff_invoiceno",
			prop: "INVOICENO",
			type: "Link",
			width: "160"
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "FOLDERNOS",
			type: "Input",
			width: "140"
		},
		{
			title: "销账状态",
			label: "columnwriteoff_status",
			prop: "ISUSED",
			type: "Select",
			width: "140",
			typeData: write_off
		},
		{
			title: "发票类别",
			label: "columnwriteoff_invoicetype",
			prop: "INVOICETYPE",
			type: "Input",
			width: "140"
		},
		{
			title: "账单日期",
			label: "columnwriteoff_invoicedate",
			prop: "INVOICEDATE",
			type: "Input",
			width: "150"
		},
		{
			title: "打印日期",
			label: "columnwriteoff_invoiceprintdate",
			prop: "PRINTDATE",
			type: "Input",
			width: "160"
		},
		{
			title: "发往客户号",
			label: "columnwriteoff_sendclientno",
			prop: "SENDCLIENTNO",
			type: "Input",
			width: "150"
		},
		{
			title: "发往客户名称",
			label: "columnwriteoff_sendclientname",
			prop: "SENDCLIENTNAME",
			type: "Input",
			width: "240"
		},
		{
			title: "发往地址联络人",
			label: "columnwriteoff_sendclientcontactor",
			prop: "SENDCLIENTCONTACTOR",
			type: "Input",
			width: "160"
		},
		{
			title: "送往客户号",
			label: "columnwriteoff_payclientno",
			prop: "PAYCLIENTNO",
			type: "Input",
			width: "160"
		},
		{
			title: "送往客户名称",
			label: "columnwriteoff_payclientname",
			prop: "PAYCLIENTNAME",
			type: "Input",
			width: "260"
		},
		{
			title: "送往地址",
			label: "columnwriteoff_payclientaddr",
			prop: "PAYCLIENTADDR",
			type: "Input",
			width: "240"
		},
		{
			title: "发往地址",
			label: "columnwriteoff_sendclientaddr",
			prop: "SENDCLIENTADDR",
			type: "Input",
			width: "240"
		},
		{
			title: "送往地址联络人",
			label: "columnwriteoff_payclientcontactor",
			prop: "PAYCLIENTCONTACTOR",
			type: "Input",
			width: "160"
		},
		{
			title: "区域",
			label: "columnwriteoff_region",
			prop: "REGION",
			type: "Input",
			width: "140"
		},
		{
			title: "SECODE",
			label: "tablesecodetitle",
			prop: "SECODE",
			type: "Input",
			width: "140"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "DEPT",
			type: "Input",
			width: "140"
		},
		{
			title: "付款条件",
			label: "columnwriteoff_paycondition",
			prop: "PAYCONDITION",
			type: "Input",
			width: "160"
		},
		{
			title: "货币类型",
			label: "itemtitleinvoicecurrencies",
			prop: "CURRENCYTYPE",
			type: "Input",
			width: "160"
		},
		{
			title: "账单合计",
			label: "columnwriteoff_invoicetotal",
			prop: "INVOICETOTAL",
			type: "Input",
			width: "160"
		},
		{
			title: "港币总额",
			label: "columnwriteoff_hktotalmoney",
			prop: "HKTOTALMONEY",
			type: "Input",
			width: "160"
		},
		{
			title: "已冲销金额",
			label: "columnbillcurrency1havawriteoffs",
			prop: "currencywriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffsbill",
			prop: "currencycanwriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "已冲销金额",
			label: "columnbillhavawriteoffs",
			prop: "TOTALMONEY",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "可冲销金额",
			label: "columnwriteoff_application_listCanWriteOffs",
			prop: "WRITEOFFMONEY",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格对象销账申请
const wtableList = reactive({
	id: "/writeoffManage/writeoff_dgbj/writeoff_application_list.vue_grid_writeoffInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/writeoff/writeoff!selectWriteoffInfoByCond.action",
		root: "writeoffInfos",
		baseParams: {
			"cond.auditflag": "0"
		}
	},
	//快捷查询
	tablePropSearch: formData1,
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
	id: "/writeoffManage/writeoff_dgbj/writeoff_application_list.vue_grid_writeoffInfosquery",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoice/invoice!selectInvoiceInfoByCond.action",
		root: "invoiceInfos",
		baseParams: {
			"cond.auditflag": "1,2"
		}
	},
	//快捷查询
	tablePropSearch: formData1,
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
const invoicelinkDetail = (column, row) => {
	if (column == "INVOICENO" && row.INVOICENO) {
		if (row.INVOICENO) {
			condobj.cond = {
				invoiceno: row.INVOICENO
			};
			condobj.dialogShow_invoicedetailNew = true;
		}
	}
};

//链接详细信息
const linkDetail = (column, row) => {
	if (column == "writeoffcode" && row.writeoffid) {
		if (row.writeoffid) {
			condobj.cond = {
				writeoffid: row.writeoffid
			};
			condobj.dialogShow_writeoffbatchdetail = true;
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
		//invoice信息页面
		grid_appointmentInfos.value.getTableList();
	} else if (targetName == "writeoffInfos") {
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
