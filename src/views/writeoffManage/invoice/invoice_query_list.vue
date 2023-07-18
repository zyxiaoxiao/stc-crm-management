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
					ref="grid_invoiceInfos"
					:tableList="invoicetableList"
					@link-detailbg="linkDetail"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="dialogShow('dialogShow_invoicedetailNew')">{{
							$t("SRM_add")
						}}</el-button>
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
				:label="$t('itemtitleinvoicequery')"
				title1="开票查询"
				name="queryinvoiceinfo"
			>
				<zTable
					ref="grid_invoiceInfosquery"
					:tableList="htableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow_audit" :title="$t('menu_base_AuditRecords')" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_invoicedetailNew" @close="closeinvoicedetail" width="95%">
				<invoicedetailNew :condobj="condobj"></invoicedetailNew>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_invoicedetailReadOnly" @close="closeinvoicedetailReadOnly" width="95%">
				<invoicedetailReadOnly :condobj="condobj"></invoicedetailReadOnly>
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
import invoicedetailNew from "@/views/writeoffManage/invoice/invoice_detail.vue";
import invoicedetailReadOnly from "@/views/writeoffManage/invoice/invoice_detail_readonly.vue";
const i18n = useI18n();
const grid_invoiceInfos = ref();
const grid_invoiceInfosquery = ref();
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

//删除税票申请
const invoiceInfosDelete = async selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("Workflow_SelectRecordToDelete"));
		return false;
	}
	let jsonString = {
		invoiceInfos: selectList
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};

	const res = await http.post("/crm/invoice/invoice!deleteInvoiceInfo.action", qs.stringify(params));
	if (res) {
		grid_invoiceInfos.value.getTableList();
	}
};

//提交税票单信息
const submitInvoiceInfos = selectList => {
	if(selectList.length < 1){
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
			grid_invoiceInfos.value.getTableList();
		}
	});
};


//税票页面关闭
const closeinvoicedetail = () => {
	grid_invoiceInfos.value.getTableList();
};
//税票查询页面关闭
const closeinvoicedetailReadOnly = () => {
	grid_invoiceInfosquery.value.getTableList();
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_invoiceInfos.value.getTableList();
});

//表格对象税票
const invoicetableList = reactive({
	id: "/writeoffManage/invoice/invoice_query_list.vue_grid_invoiceInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoice/invoice!selectInvoiceInfoByCond.action",
		root: "invoiceInfos",
		baseParams: {
			"cond.auditflag": "0"
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
const htableList = reactive({
	id: "/writeoffManage/invoice/invoice_query_list.vue_grid_invoiceInfosquery",
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoice/invoice!selectInvoiceInfoByCond.action",
		root: "invoiceInfos",
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
	}
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//链接详细信息
const linkDetail = (column, row) => {
	if (column == "taxinvoicecode" && row.invoiceid) {
		if (row.invoiceid) {
			condobj.cond = {
				invoiceid: row.invoiceid,
				rasclientid: row.corpno,
				workflowflag: "1"
			};
			condobj.dialogShow_invoicedetailNew = true;
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
		grid_invoiceInfos.value.getTableList();
	} else if (targetName == "queryinvoiceinfo") {
		//税票信息查询页面
		grid_invoiceInfosquery.value.getTableList();
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
