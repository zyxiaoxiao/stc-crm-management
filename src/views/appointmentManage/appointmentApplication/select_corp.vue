<template>
	<div class="all-height flex-column">
		<div style="margin-top: 10px"></div>
		<zTable ref="selectCorpAccountInfos" :tableList="corpAccounttableList">
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
let selectCorpAccountInfos = ref();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});
//是否为主账户
let crm_ismanager = [
	{
		value: "1",
		label: i18n.t("crmcolumnwsp1")
	},
	{
		value: "0",
		label: i18n.t("crmcolumnwsp0")
	}
];
//默认需要传入的参数
const params = {};
//页面传入的值判断还需要添加的参数
if (props.condobj && props.condobj.cond) {
	let reservnum = props.condobj.cond.reservnum;
	if (reservnum) {
		params["cond.reservnum"] = reservnum;
	} 
}

//选择完数据后给父页面传值
const selectCorpAccountApplintment = list => {
	if (list != null && list.length == 1) {
		props.condobj.objlist = list[0]; //传参
		props.condobj.corpaccountApplintmentDialogShow = false; //关闭窗口
	} else {
		ElMessage({
			type: i18n.t("Message_OperationTip"),
			message: i18n.t("Workflow_SelectRecord")
		});
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	selectCorpAccountInfos.value.getTableList();
});
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
    {
		title: "编码",
		label: "",
		prop: "origrec",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "账户名称",
		label: "i18ncrmcontractAccountName",
		prop: "accountdesc",
		type: "Input",
		width: "260"
	},
	{
		title: "账户号",
		label: "i18ncrmcontractAccountNumber",
		prop: "accountcode",
		type: "Input",
		width: "160"
	},
	{
		title: "开户行",
		label: "crmcolumndesc85",
		prop: "accountbank",
		type: "Input",
		width: "160"
	},
	{
		title: "SWIFT",
		label: "companypanelswifttitle",
		prop: "swift",
		type: "Input",
		width: "200"
	},
	{
		title: "银行地址",
		label: "companypanelbankadresstitle",
		prop: "bankadress",
		type: "Input",
		width: "340"
	},
	{
		title: "备注",
		label: "itemtitlecommonremark",
		prop: "remark",
		type: "Input",
		width: "150"
	},
	{
		title: "是否为主账户",
		label: "itemtitlegroupmainaccount",
		prop: "ismanager",
		type: "Select",
		width: "140",
		typeData: crm_ismanager
	},
	{
		title: "制单人编码",
		label: "itemtitleworkflowdefrecordercode",
		prop: "recordercode",
		type: "Input",
		width: "150"
	},
	{
		title: "制单人名称",
		label: "itemtitlecommonMakeListPeopleName",
		prop: "recorderdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "制单时间",
		label: "itemtitlecommonrecordtime",
		prop: "recordertime",
		type: "Input",
		width: "200"
	}
];

//表格对象
const corpAccounttableList = reactive({
	//设置 为单选
	isRadio: true,
    isPaging: false, //是否显示分页
	//请求属性设置
	httpAttribute: {
		url: "/core/corpaccount/corpaccount!selectCorpaccountInfoByCondRight.action",
		root: "corpaccountInfos",
		baseParams: params
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


