<template>
	<virtualizedTreeTable ref="virtualizedTreeTableRef" :treeTableList="treeTableList">
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
	</virtualizedTreeTable>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import virtualizedTreeTable from "/src/components/VirtualizedTreeTable/index.vue";
import { useI18n } from "vue-i18n";
const i18n = useI18n();

// 父组件传入的参数
const props = defineProps({
	condobj: {
		type: Object,
		default: {
			dialogShow: {
				type: Boolean,
				default: false
			},
			contractid: {
				type: String,
				default: ""
			},
			arrayList: {
				type: Array,
				default: []
			}
		}
	}
});

const virtualizedTreeTableRef = ref();

//表格对象
const treeTableList = reactive({
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectContractTestItem.action",
		root: "",
		baseParams: { "cond.contractid": props?.condobj?.contractid }
	},
	tableColumns: [
		{
			width: 460,
			title1: "检测项目类别",
			title: i18n.t("testiteminfotestitemstitle"),
			key: "TESTDESC",
			dataKey: "TESTDESC",
			checked: false,
			intermediate: false
		},
		{
			width: 100,
			title1: "测试编码",
			title: i18n.t("testiteminfotestcodepanel"),
			key: "TESTCODE",
			dataKey: "TESTCODE",
			hidden: true
		},
		{ width: 100, title1: "主键", title: "主键", key: "TESTID", dataKey: "TESTID", hidden: true },
		{
			width: 100,
			title1: "最低价格",
			title: i18n.t("panelcolumntotallowest_price_hkd"),
			key: "PRICE",
			dataKey: "PRICE",
			align: "center"
		},
		{
			width: 260,
			title1: "测试标准",
			title: i18n.t("testiteminfoteststandardpanel"),
			key: "TESTSTANDARD",
			dataKey: "TESTSTANDARD"
		},
		{
			width: 100,
			align: "center",
			title1: "测试计划费用",
			title: i18n.t("panelcolumntotalTest_plan_costs_hkd"),
			key: "RASPROFILEPRICES",
			dataKey: "RASPROFILEPRICES"
		},
		{ width: 100, title1: "NETPRICE", title: "NETPRICE", key: "NETPRICE", dataKey: "NETPRICE", align: "center" },
		{
			width: 100,
			title1: "是否有模板",
			title: i18n.t("tabtitlemdmcorecodeinfos"),
			key: "whethertemplate",
			dataKey: "whethertemplate",
			align: "center"
		},
		{ width: 260, title1: "备注", title: i18n.t("panelcolumnRemark"), key: "REMARK", dataKey: "REMARK" },
		{ width: 100, title1: "TESTFLAG", title: "TESTFLAG", key: "TESTFLAG", dataKey: "TESTFLAG", hidden: true }
	],
	expandColumnKey: "TESTDESC" //那个字段是树形结构
});

onMounted(() => {
	virtualizedTreeTableRef.value.getTableList();
});

//确定按钮
const confirmClick = selectList => {
	props.condobj.arrayList = selectList;
	props.condobj.dialogShow = false;
};
</script>
