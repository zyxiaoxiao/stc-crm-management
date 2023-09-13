<template>
	<zTable ref="zTable1" :tableList="tableList1"></zTable>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const zTable1 = ref();
//表格对象申请单
const tableList1 = reactive({
	id: "/home/onHandUnderTesting.vue_zTable1",
	tableToolbar: {
		right_filter: false,
		right_query: false,
		right_empty: false
	},
	isPaging: false,
	//请求属性设置
	httpAttribute: {
		url: "/crm/onhandsummary/onhandsummary!selectUnderTestingDetail.action",
		root: "onhandsummaryInfos",
		baseParams: {
			"cond.dept": props.condobj.dept,
			"cond.startdate": props.condobj.startdate,
			"cond.enddate": props.condobj.enddate + " 23:59:59"
		}
	},
	//表格表头
	tableColumns: [
		{
			title: "Job No.",
			label: "Job No.",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "Cert no.",
			label: "Cert no.",
			prop: "certno",
			type: "Input",
			width: "160"
		},
		{
			title: "Customer name",
			label: "Customer name",
			prop: "compname",
			type: "Input",
			width: "160"
		},
		{
			title: "Type of Service",
			label: "Type of Service",
			prop: "servtypeen",
			type: "Input",
			width: "160"
		},
		{
			title: "Application Create Date",
			label: "Application Create Date",
			prop: "drawdate",
			type: "Input",
			width: "160"
		},
		{
			title: "Submit Date",
			label: "Submit Date",
			prop: "logdate",
			type: "Input",
			width: "160"
		},
		{
			title: "Lab Receive Date",
			label: "Lab Receive Date",
			prop: "daterecv",
			type: "Input",
			width: "160"
		},
		{
			title: "Due Date",
			label: "Due Date",
			prop: "duedate",
			type: "Input",
			width: "160"
		},
		{
			title: "Over Due",
			label: "Over Due",
			prop: "overdue",
			type: "Input",
			width: "160"
		},
		{
			title: "Sample Descriptions",
			label: "Sample Descriptions",
			prop: "samplename",
			type: "Input",
			width: "160"
		},
		{
			title: "Supervised By",
			label: "Supervised By",
			prop: "checkername",
			type: "Input",
			width: "160"
		},
		{
			title: "ApplicationNo(WIN)",
			label: "ApplicationNo(WIN)",
			prop: "folderno_win",
			type: "Input",
			width: "160"
		},
		{
			title: "Remarks",
			label: "Remarks",
			prop: "comments",
			type: "Input",
			width: "160"
		},
		{
			title: "Status",
			label: "Status",
			prop: "checkstatusen",
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
</script>

<style scoped lang="scss"></style>
