<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="editGrid_billInfos" :tableList="billtableList" @link-detailbg="linkDetailquey" @workflow-status="workflowStatus">
		</zTable>
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_billdetailNew" width="95%">
				<billdetailNew :condobj="condobj"></billdetailNew>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import zTable from "/src/components/ZTable/index.vue";
import billdetailNew from "@/views/writeoffManage/bill/bill_detail.vue";
const i18n = useI18n();
let editGrid_billInfos = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});

//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "billcode" && row.billid) {
		if (row.billid) {
			condobj.cond = {
				billid: row.billid,
				v_corpcode: row.corpcode,
				readOnly: "true",
				addbill: "true"
			};
			condobj.dialogShow_billdetailNew = true;
		}
	}
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_BILL",
	columnid: "billid"
});

//页面初始化渲染完成执行
onMounted(() => {
	editGrid_billInfos.value.getTableList();
});
//表格表头
let tableColumns = [
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
		title: "到账信息编号",
		label: "billinfoaccountcodepanel",
		prop: "billcode",
		type: "Link",
		width: "160"
	},
	{
		title: "客户名称",
		label: "columnCustomerName",
		prop: "corpdesc",
		type: "Input",
		width: "180"
	},
	{
		title: "客户编码",
		label: "itemtitleinvoicecorpno",
		prop: "corpcode",
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
		title: "币种",
		label: "itemtitleinvoicecurrencies",
		prop: "currencies",
		type: "Input",
		width: "130"
	},
	{
		title: "外币金额",
		label: "itemtitleinvoicecurrencyamount",
		prop: "currencyamount",
		type: "Number",
		precision: 2,
		width: "140"
	},
	{
		title: "外币已冲销金额",
		label: "columnbillsscurrencyhavawriteoffs",
		prop: "currencywritesum",
		type: "Number",
		precision: 2,
		width: "140"
	},
	{
		title: "外币退款金额",
		label: "columnbillcurrencycurrencyretreatmoney",
		prop: "currencybalance",
		type: "Number",
		precision: 2,
		width: "140"
	},
	{
		title: "外币未冲销金额",
		label: "columnwriteoff_application_listcurrencyCanWriteOffs",
		prop: "currencybalance",
		type: "Number",
		precision: 2,
		width: "140"
	},
	{
		title: "金额",
		label: "billinfoamountofmoneypanel",
		prop: "money",
		type: "Number",
		precision: 2,
		width: "140"
	},
	{
		title: "已冲销金额",
		label: "columnbillhavawriteoffs",
		prop: "writesum",
		type: "Number",
		precision: 2,
		width: "140"
	},
	{
		title: "退款金额",
		label: "columndrawbackrefundmoney",
		prop: "retreatmoney",
		type: "Number",
		precision: 2,
		width: "140"
	},
	{
		title: "未冲销金额",
		label: "columnwriteoff_application_listCanWriteOffs",
		prop: "balance",
		type: "Input",
		width: "140"
	},
	{
		title: "收款方式",
		label: "columnbillpaymentmethod",
		prop: "paymentmethod",
		type: "Input",
		width: "140"
	},
	{
		title: "已开票金额",
		label: "billinfoinvoicedamountpanel",
		prop: "receivedinvoice",
		type: "Input",
		width: "140"
	},
	{
		title: "未开票金额",
		label: "billinfounbilledamountpanel",
		prop: "inputmoney",
		type: "Input",
		width: "140"
	},
	{
		title: "到账日期",
		label: "billinfoaccountdatepanel",
		prop: "billdate",
		type: "Input",
		width: "140"
	},
	{
		title: "付款人",
		label: "billinfopayerpanel",
		prop: "payer",
		type: "Input",
		width: "140"
	},
	{
		title: "付款人账号",
		label: "billinfopayeraccountpanel",
		prop: "payaccount",
		type: "Input",
		width: "140"
	},
	{
		title: "收款人",
		label: "billinfopayeepanel",
		prop: "payee",
		type: "Input",
		width: "140"
	},
	{
		title: "是否坏账",
		label: "billinfoisbaddebtpanel",
		prop: "isbadbill",
		type: "Input",
		width: "140"
	},
	{
		title: "创建人编码",
		label: "testiteminforecordercodepanel",
		prop: "recordercode",
		type: "Input",
		width: "140"
	},
	{
		title: "创建人名称",
		label: "testiteminforecordernamepanel",
		prop: "recorderdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "创建时间",
		label: "basecolumncombined_minimum_guarantee_rate",
		prop: "recordtime",
		type: "Input",
		width: "160"
	},
	{
		title: "备注",
		label: "itemtitlecommonremark",
		prop: "remark",
		type: "Input",
		width: "160"
	},
	{
		title: "本次可冲销总金额",
		label: "billappointbalance",
		prop: "billappointbalance",
		width: "10",
		isHide: true
	},
	{
		title: "主键",
		label: "billid",
		prop: "billid",
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
	},
	{
		title: "收款方式",
		label: "paymentmethod",
		prop: "paymentmethod",
		type: "Input",
		width: "10",
		isHide: true
	}
];

//表格对象到账单信息
const billtableList = reactive({
	id: "/comprehensiveQuery/bill_accountinfo_query_list.vue_editGrid_billInfos",
	//设置 为单选
	isRadio: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectBillInfoforwriteoffByCond.action",
		root: "billInfos",
		baseParams: { "cond.auditflag": "2" }
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
