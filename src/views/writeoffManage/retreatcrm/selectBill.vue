<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="grid_billInfosquery" :tableList="billtableList" @link-detailbg="linkDetailquey">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectBillInfos(scope.selectList)" plain>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
		</zTable>
		<ZDialog v-model="condobj.dialogShow_billdetailNew" width="95%">
			<billdetailNew :condobj="condobj"></billdetailNew>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessage } from "element-plus";
import { getdropSownSelection } from "/src/utils/util.js";
import ZDialog from "/src/components/ZDialog.vue";
//到账信息
import billdetailNew from "@/views/writeoffManage/bill/bill_detail.vue";
const i18n = useI18n();
let grid_billInfosquery = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const condobj = reactive({
	cond: {},
	objlist: {}
});
let crm_skfs = getdropSownSelection("CRM_skfs"); //收款方式下拉
//选择完数据后给父页面传值
const selectBillInfos = list => {
	if (list != null && list.length > 0) {
		props.condobj.objlist = list; //传参
		props.condobj.dialogShow_billQuery = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	props.condobj.objlist = null;
	grid_billInfosquery.value.getTableList();
});
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "到账信息编号",
		label: "billinfoaccountcodepanel",
		prop: "billcode",
		type: "Input",
		width: "160"
	},
	{
		title: "到账日期",
		label: "billinfoaccountdatepanel",
		prop: "billdate",
		type: "Date",
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
		title: "客户名称",
		label: "columnCustomerName",
		prop: "corpdesc",
		type: "Input",
		width: "140"
	},
	{
		title: "付款人",
		label: "billinfopayerpanel",
		prop: "payer",
		type: "Input",
		width: "160"
	},
	{
		title: "本次到账金额(外币)",
		label: "billinfocurrencyamountofthisaccountpanel",
		prop: "currencyamount",
		type: "Input",
		width: "130"
	},
	{
		title: "已冲销金额(外币)",
		label: "columnbillcurrencyhavawriteoffs",
		prop: "currencywritesum",
		type: "Input",
		width: "140"
	},
	{
		title: "冲销余额(外币)",
		label: "columnbillcurrencycurrencybalance",
		prop: "currencybalance",
		type: "Input",
		width: "140"
	},
	{
		title: "本次到账金额",
		label: "billinfoamountofthisaccountpanel",
		prop: "money",
		type: "Input",
		width: "140"
	},
	{
		title: "已冲销金额",
		label: "columnbillhavawriteoffs",
		prop: "writesum",
		type: "Input",
		width: "140"
	},
	{
		title: "冲销余额",
		label: "columnbillwriteoffbalance",
		prop: "balance",
		type: "Input",
		width: "140"
	},
	{
		title: "收款方式",
		label: "columnbillpaymentmethod",
		prop: "paymentmethod",
		type: "Select",
		width: "140",
		typeData: crm_skfs
	},
	{
		title: "付款人账号",
		label: "billinfopayeraccountpanel",
		prop: "payaccount",
		type: "Input",
		width: "140"
	},
	{
		title: "备注",
		label: "panelcolumnRemark",
		prop: "remark",
		type: "Input",
		width: "140"
	},
	{
		title: "主键",
		label: "",
		prop: "billid",
		type: "Input",
		width: "10",
		isHide: true
	}
];

//表格对象到账信息
const billtableList = reactive({
	id: "/writeoffManage/retreatcrm/selectBill.vue_grid_billInfosquery",
	//设置 为单选
	isRadio: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/bill/bill!selectBillInfoByCond.action",
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
