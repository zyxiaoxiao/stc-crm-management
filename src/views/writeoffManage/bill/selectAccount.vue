<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="editGrid_codeInfos" :tableList="corpAccounttableList">
			<template #tableHeaderLleft="scope">
				<el-button size="small" type="primary" icon="Finished" @click="selectCorpAccountApplintment(scope.selectList)" plain>
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
const selectCorpAccountApplintment = list => {
	if (list != null && list.length == 1) {
		props.condobj.objlist = list[0]; //传参
		props.condobj.dialogShow_accountQuery = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
    if (props.condobj) {
        let v_corpcode = props.condobj.cond.corpcode; //客户编码
		props.condobj.objlist = [];//清空数据
        console.log(v_corpcode);
		if (v_corpcode) {
			//传参后会自动调用接口刷新
			corpAccounttableList.httpAttribute.baseParams["cond.corpcode"] = v_corpcode;
			editGrid_codeInfos.value.reuseTableList();
		}
	}
});
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "账户ID",
		label: "accountid",
		prop: "accountid",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "开户行",
		label: "crmcolumndesc85",
		prop: "accountbank",
		type: "Input",
		width: "260"
	},
	{
		title: "账户名称",
		label: "i18ncrmcontractAccountName",
		prop: "accountcode",
		type: "Input",
		width: "260"
	},
	{
		title: "账户号",
		label: "i18ncrmcontractAccountNumber",
		prop: "accountno",
		type: "Input",
		width: "260"
	}
];

//表格对象账户信息
const corpAccounttableList = reactive({
	id: "/writeoffManage/bill/selectAccount.vue_editGrid_codeInfos",
	//设置 为单选
	isRadio: true,
	isPaging: false, //是否显示分页
	//请求属性设置
	httpAttribute: {
		url: "/crm/account/crmaccount!selectCrmaccountInfoByCond.action",
		root: "crmaccountInfos",
		baseParams: {}
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
