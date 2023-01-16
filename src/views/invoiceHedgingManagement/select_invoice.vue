<template>
	<div class="all-height flex-column">
		<zTable ref="zTable1" :tableList="tableList">
			<template #tableHeaderLleft="scope">
				<el-button
					size="small"
					type="primary"
					icon="Finished"
					plain
					:disabled="!scope.isSelected"
					@click="confirmClick(scope.ids, scope.selectList)"
				>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
		</zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import zTable from "/src/components/ZTable/index.vue";
import { getdropSownSelection } from "@/utils/util.js";

const customerCustomertype = getdropSownSelection("customer_customertype");

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const zTable1 = ref();

//表格对象
const tableList = reactive({
	id: "/invoiceHedgingManagement/select_invoice.vue_zTable1",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/crm/invoiceinfo/invoiceinfo!selectInvoceInfoByCondHedging.action",
		root: "invoicemap",
		baseParams: {
			"cond.currencycanwriteoffsnum": "0",
			"cond.invoicetype": "INVOICE",
			"cond.orderby": "invoicedate",
			"cond.asc": "desc"
		}
	},

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
			type: "Input",
			width: "160"
		},
		{
			title: "发票类别",
			label: "columnwriteoff_invoicetype",
			prop: "INVOICETYPE",
			type: "Input",
			width: "160"
		},
		{
			title: "账单日期",
			label: "columnwriteoff_invoicedate",
			prop: "INVOICEDATE",
			type: "Date",
			width: "160"
		},
		{
			title: "发往客户号",
			label: "columnwriteoff_sendclientno",
			prop: "SENDCLIENTNO",
			type: "Input",
			width: "160"
		},
		{
			title: "发往客户名称",
			label: "columnwriteoff_sendclientname",
			prop: "SENDCLIENTNAME",
			type: "Input",
			width: "160"
		},
		{
			title: "发往地址联络人",
			label: "columnwriteoff_sendclientcontactor",
			prop: "SENDCLIENTCONTACTOR",
			type: "Input",
			width: "160"
		},
		{
			title: "发往地址",
			label: "columnwriteoff_sendclientaddr",
			prop: "SENDCLIENTADDR",
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
			width: "160"
		},
		{
			title: "送往地址联络人",
			label: "columnwriteoff_payclientcontactor",
			prop: "PAYCLIENTCONTACTOR",
			type: "Input",
			width: "160"
		},
		{
			title: "送往地址",
			label: "columnwriteoff_payclientaddr",
			prop: "PAYCLIENTADDR",
			type: "Input",
			width: "160"
		},
		{
			title: "区域",
			label: "columnwriteoff_region",
			prop: "REGION",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "DEPT",
			type: "Input",
			width: "160"
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
			label: "columnbillsscurrencyhavawriteoffs",
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
		}
	],
	// 表格数据
	tableData: []
});

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});

const confirmClick = (ids, list) => {
	props.condobj.arrayList = list;
	props.condobj.dialogShow = false;
};
</script>

<style></style>
