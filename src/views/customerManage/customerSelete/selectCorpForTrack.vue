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
	id: "/customerManage/customerSelete/selectCorpForTrack.vue_zTable1",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCustomerForTrackCustomer.action",
		root: "enterpriseInfos",
		baseParams: { "cond.auditflag": "2", "cond.newcustomtype": "SE", "cond.discardflag": "0" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "客户ID",
			label: "companycorpidtitle",
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
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input"
		},
		{
			title: "英文名称",
			label: "hotlinkpanelywmctitle",
			prop: "corpenglishname",
			type: "Input",
			width: "180"
		},
		{
			title: "别名",
			label: "corpinfopanelbmtitle",
			prop: "corpalias",
			type: "Input",
			width: "160"
		},
		{
			title: "电子邮件",
			label: "corpinfopanelbmtitle",
			prop: "corpinfopanelemailtitle",
			type: "Input",
			width: "160"
		},
		{
			title: "地址",
			label: "columnAddress",
			prop: "corplocation",
			type: "Input"
		},
		{
			title: "newcustomtype",
			label: "",
			prop: "newcustomtype",
			type: "Input",
			width: "160",
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
