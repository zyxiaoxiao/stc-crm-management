<template>
	<div class="all-height flex-column main-card">
		<zTable ref="grid_automaticOrderQuery" :tableList="automatictableList"> </zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";
import { GlobalStore } from "/src/store/globalStore.js";
const grid_automaticOrderQuery = ref();
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;

const condobj = reactive({
	cond: {},
	objlist: {}
});

//页面初始化渲染完成执行
onMounted(() => {
	grid_automaticOrderQuery.value.getTableList();
});

//表格对象自动提佣查询
const automatictableList = reactive({
	id: "/comprehensiveQuery/my_commission_query_automatic.vue_grid_automaticOrderQuery",
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFoldersInfoByBrokerage.action",
		root: "foldersInfos",
		baseParams: {
			"cond.salesmancode": userInfo.usercode,
			"cond.automatic": "Y",
			"cond.rightFlag": "1",
			"cond.autobrokerageflag": "1"
		}
	},
	//快捷查询
	tablePropSearch: {},
	//表格表头
	tableColumns: [
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
			width: "180"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "rasclientid",
			type: "Input",
			width: "150"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "compname",
			type: "Input",
			width: "200"
		},
		{
			title: "代理商编码",
			label: "corpinfopaneldlsbmtitle",
			prop: "agentno",
			type: "Input",
			width: "140"
		},
		{
			title: "代理商名称",
			label: "corpinfopaneldlsmctitle",
			prop: "agentname",
			type: "Input",
			width: "160"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "labduedate",
			type: "Input",
			width: "160"
		},
		{
			title: "invoice打印日期",
			label: "columnwriteoff_invoiceprintdate",
			prop: "realdate",
			type: "Input",
			width: "160"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "totalprice",
			type: "Input",
			width: "140"
		},
		{
			title: "提佣点(%)",
			label: "itemtitlefoldersbrokerage",
			prop: "brokerage",
			type: "Input",
			width: "140"
		},
		{
			title: "未销账金额",
			label: "crmcolumnnotwriteoffmoney_hkd",
			prop: "writeoffmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "销账确认日期",
			label: "crmcolumnapplyacceptdateconfirms",
			prop: "logdate",
			type: "Input",
			width: "160"
		},
		{
			title: "审核时间",
			label: "itemtitlestatusaudittime",
			prop: "audittime",
			type: "Input",
			width: "160"
		},
		{
			title: "部门编码",
			label: "personaluserpanel2bmbmtitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "退款金额",
			label: "columncurrency1drawbackrefundmoney",
			prop: "refundnum",
			type: "Input",
			width: "160"
		},
		{
			title: "实际完成日期",
			label: "实际完成日期",
			prop: "actualfinishdate",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "佣金基点",
			label: "佣金基点",
			prop: "brokerage",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "成本费",
			label: "成本费",
			prop: "costnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "增值税",
			label: "增值税",
			prop: "taxmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "坏账金额",
			label: "坏账金额",
			prop: "badmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "检测进度",
			label: "检测进度",
			prop: "checkstatus",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
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
