<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="editGrid_codeInfos" :tableList="customertableList">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectCustomer(scope.selectList)" plain>
					{{ $t("buttoncommonconfirm") }}
				</el-button>
			</template>
		</zTable>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessage } from "element-plus";
const i18n = useI18n();
let editGrid_codeInfos = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});

//选择完数据后给父页面传值
const selectCustomer = list => {
	if (list != null && list.length == 1) {
		props.condobj.objlist = list[0]; //传参
		props.condobj.dialogShow_selectCustomerQuery = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	editGrid_codeInfos.value.getTableList();
});
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "客户ID",
		label: "corpid",
		prop: "corpid",
		type: "Input",
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
		title: "旧客户号",
		label: "fieldcolumncustomercodeold",
		prop: "corpnoold",
		type: "Input",
		width: "160"
	},
	{
		title: "客户名称",
		label: "columnCustomerName",
		prop: "corpdesc",
		type: "Input",
		width: "260"
	},
	{
		title: "工商注册号",
		label: "corpinfopanelRegistrationNumbertitle",
		prop: "businesslicenseno",
		type: "Input",
		width: "260"
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
		type: "Input",
		width: "260"
	},
	{
		title: "xz",
		label: "xz",
		prop: "xz",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "规模",
		label: "scale",
		prop: "scale",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "行业",
		label: "industry",
		prop: "industry",
		type: "Input",
		width: "60",
		isHide: true
	}
];

//表格对象账户信息
const customertableList = reactive({
	id: "/writeoffManage/invoice/selesctCustomer.vue_editGrid_codeInfos",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectEnterpriseInfoSimplifyQueryByCond.action",
		root: "enterpriseInfos",
		baseParams: { "cond.auditflag": "2", "cond.foldersno": "Y", "cond.allcorptype": "Y" }
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
