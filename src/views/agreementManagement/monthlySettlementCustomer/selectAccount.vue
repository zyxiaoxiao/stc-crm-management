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

let zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/agreementManagement/monthlySettlementCustomer/selectAccount.vue_zTable1",
	isRadio: true, //设置为单选
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/account/crmaccount!selectCrmaccountInfoByCond.action",
		root: "crmaccountInfos",
		baseParams: { "cond.corpid": props?.condobj?.corpid ?? "" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "35"
		},
		{
			title: "id",
			label: "",
			prop: "accountid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "开户行",
			label: "crmcolumndesc85",
			prop: "accountbank",
			type: "Input"
		},
		{
			title: "账户名称",
			label: "i18ncrmcontractAccountName",
			prop: "accountcode",
			type: "Input",
			width: "300"
		},
		{
			title: "账户号",
			label: "i18ncrmcontractAccountNumber",
			prop: "accountno",
			type: "Input",
			width: "300"
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
