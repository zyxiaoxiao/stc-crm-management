<template>
	<div class="all-height flex-column">
		<div style="margin-top: 15px"></div>
		<zTable ref="zTable1" :tableList="tableList"> </zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";

import zTable from "/src/components/ZTable/index.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const zTable1 = ref();
//表格对象
const tableList = reactive({
	id: "/customerManage/customerApplication/selectFoldersForCustomerlist.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFoldersInfoForLimsFolders.action",
		root: "foldersInfos",
		baseParams: {
			"cond.ischeckstatus": "Y",
			"cond.rasclientid": props.condobj.corpno
		}
	},
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
			title: "报价单号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
			width: "300"
		},
		{
			title: "入单日期",
			label: "panelcolumnLoginDate",
			prop: "drawdate",
			type: "Date"
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

<style lang="scss"></style>
