<template>
	<div class="all-height flex-column">
		<zTable ref="zTable1" :tableList="tableList1">
			<template #tableHeaderLleft="scope">
				<el-button
					size="small"
					type="primary"
					icon="Finished"
					plain
					:disabled="!scope.isSelected"
					@click="confirmClick(scope.selectList)"
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

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

//申请单查询
const zTable1 = ref();
const tableList1 = reactive({
	id: "/customerLabelManagement/selectForders.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFoldersInfoOnlyByCond.action",
		root: "foldersInfos",
		baseParams: { "cond.islocal": "1", "cond.rasclientid": props?.condobj?.corpno }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "id",
			width: "160"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "itemtitleinvoicecorpno",
			prop: "rasclientid",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "总价",
			label: "columnappointmentCurrencyTotalPrice",
			prop: "currencytotalprice",
			type: "Input",
			width: "160"
		},
		{
			title: "未销账金额",
			label: "crmcolumnnotwriteoffmoney",
			prop: "currencycanwriteoffsnum",
			type: "Input",
			width: "160"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "currencyname",
			type: "Input",
			width: "160"
		},
		{
			title: "汇率",
			label: "itemtitleinvoiceexchangerate",
			prop: "currencyrate",
			type: "Input",
			width: "160"
		},
		{
			title: "SE编码",
			label: "tablesecodetitle",
			prop: "secode",
			type: "Input",
			width: "160"
		},
		{
			title: "SE名称",
			label: "tablesenametitle",
			prop: "sename",
			type: "Input",
			width: "160"
		},
		{
			title: "样品描述",
			label: "columnSampleInformation",
			prop: "sampleinformation",
			type: "Input",
			width: "160"
		},
		{
			title: "报告发送人",
			label: "folderitemtitlereportsendperson",
			prop: "reportsendperson",
			type: "Input",
			width: "160"
		},
		{
			title: "申请受理日期",
			label: "crmcolumnapplyacceptdate",
			prop: "logdate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "预计完成时间",
			label: "itemtitlefoldersduedate",
			prop: "duedate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "实际完成日期",
			label: "crmcolumnactualfinishdate",
			prop: "actualfinishdate",
			type: "DateTime",
			width: "160"
		},
		{
			title: "报告发送时间",
			label: "folderitemtitlereportsendtime",
			prop: "reportsendtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "结案时间",
			label: "folderitemtitleclosedate",
			prop: "closedate",
			type: "DateTime",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

const confirmClick = selectList => {
	props.condobj.arrayList = selectList;
	props.condobj.dialogShow = false;
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>
