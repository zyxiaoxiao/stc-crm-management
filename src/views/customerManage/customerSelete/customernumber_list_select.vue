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

// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const zTable1 = ref();

//表格对象
const tableList = reactive({
	id: "/customerManage/customerSelete/customernumber_list_select.vue_zTable1",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectEnterpriseInfoSimplifyQueryByCond.action",
		root: "enterpriseInfos",
		baseParams: {
			"cond.lockflag": "1",
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
			title: "id",
			label: "",
			prop: "corpid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "corpdesc",
			type: "Input"
		},
		{
			title: "企业ID",
			label: "",
			prop: "corpbgid",
			type: "Input",
			width: "260",
			isHide: true
		},
		{
			title: "客户类型",
			label: "",
			prop: "customtype",
			type: "Input",
			width: "260",
			isHide: true
		},
		{
			title: "分公司",
			label: "",
			prop: "branchcorpdesc",
			type: "Input",
			width: "260",
			isHide: true
		},
		{
			title: "电话",
			label: "",
			prop: "corpphone",
			type: "Input",
			width: "260",
			isHide: true
		},
		{
			title: "电子邮件",
			label: "",
			prop: "corpemail",
			type: "Input",
			width: "260",
			isHide: true
		},
		{
			title: "地址",
			label: "",
			prop: "corplocation",
			type: "Input",
			width: "260",
			isHide: true
		},
		{
			title: "归属部门",
			label: "",
			prop: "departmentdesc",
			type: "Input",
			width: "260",
			isHide: true
		},
		{
			title: "branchcorpcode",
			label: "",
			prop: "branchcorpcode",
			type: "Input",
			width: "260",
			isHide: true
		},
		{
			title: "xz",
			label: "",
			prop: "xz",
			type: "Input",
			width: "260",
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
	props.condobj.arrayList = list;
	props.condobj.dialogShow = false;
};
</script>

<style></style>
