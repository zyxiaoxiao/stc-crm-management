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
	id: "/customerManage/customerSelete/company_list_select.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCorpListChoose.action",
		root: "enterpriseInfos",
		baseParams: {
			"cond.discardflag": "0"
		}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "corpdesc",
			type: "Input",
			width: "230"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "旧客户号",
			label: "fieldcolumncustomercodeold",
			prop: "corpnoold",
			type: "Input",
			width: "160"
		},
		{
			title: "客户类别",
			label: "corpinfopanelkhlbtitle",
			prop: "corptype",
			type: "Select",
			width: "185",
			typeData: customerCustomertype
		},
		{
			title: "分公司",
			label: "itemtitlebase_userbranch",
			prop: "branchcorpdesc",
			type: "Input",
			width: "230"
		},
		{
			title: "电话",
			label: "itemtitlebase_usertel",
			prop: "corpphone",
			type: "Input",
			width: "160"
		},
		{
			title: "电子邮件",
			label: "corpinfopanelemailtitle",
			prop: "corpemail",
			type: "Input",
			width: "200"
		},
		{
			title: "地址",
			label: "columnAddress",
			prop: "corplocation",
			type: "Input"
		},
		{
			title: "id",
			label: "id",
			prop: "corpid",
			type: "id",
			width: "60",
			isHide: true
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
	props.condobj.arrayList = ids;
	props.condobj.dialogShow = false;
};
</script>

<style></style>
