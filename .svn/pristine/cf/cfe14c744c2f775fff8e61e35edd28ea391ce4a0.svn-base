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
	id: "/customerManage/customerApplication/customer_change_detail.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCustomerChanges.action",
		root: "enterpriseInfos",
		baseParams: {
			"cond.corpid": props.condobj.corpid
		}
	},
	//表格表头
	tableColumns: [
		{
			title: "状态",
			label: "itemtitlecommondesc11",
			prop: "testdemand",
			type: "Input",
			width: "120"
		},
		{
			title: "客户编号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "情况说明",
			label: "columnappointmentdescription",
			prop: "remark",
			type: "Input",
			width: "350"
		},
		{
			title: "修改人编码",
			label: "itemtitlebase_flowrecordercode",
			prop: "recordercode",
			type: "Input",
			width: "140"
		},
		{
			title: "修改人名称",
			label: "testiteminfomodifiernamepanel",
			prop: "recorderdesc",
			type: "Input",
			width: "150"
		},
		{
			title: "操作时间",
			label: "itemtitlebase_useroperationtime",
			prop: "auditordesc",
			type: "DateTime",
			width: "160"
		},
		{
			title: "操作类型",
			label: "itemtitlelog_messageoperationtype",
			prop: "submitcorp",
			type: "Input",
			width: "150"
		},
		{
			title: "销售编码",
			label: "columnbasesalescode",
			prop: "salesmancode",
			type: "Input",
			width: "150"
		},
		{
			title: "销售名称",
			label: "columnbasesalesdescus",
			prop: "salesmandesc",
			type: "Input",
			width: "150"
		},
		{
			title: "归属部门",
			label: "corpinfopaneldepartmentdesctitle",
			prop: "departmentdesc",
			type: "Input",
			width: "150"
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
