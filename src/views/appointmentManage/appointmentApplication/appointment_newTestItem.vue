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

const virtualizedTreeTableRef = ref();

//表格对象
const treeTableList = reactive({
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentTestItem.action",
		root: "",
		baseParams: {}
	},
	tableColumns: [
		{
			width: 460,
			title1: "检测项目类别",
			title: "检测项目类别",
			key: "TESTDESC",
			dataKey: "TESTDESC",
			checked: false,
			intermediate: false
		},
		{ width: 100, title1: "测试编码", title: "测试编码", key: "TESTCODE", dataKey: "TESTCODE", hidden: true },
		{ width: 100, title1: "主键", title: "主键", key: "TESTID", dataKey: "TESTID", hidden: true },
		{ width: 100, align: "center", title1: "最低价格", title: "最低价格", key: "PRICE", dataKey: "PRICE" },
		{ width: 260, title1: "测试标准", title: "测试标准", key: "TESTSTANDARD", dataKey: "TESTSTANDARD" },
		{
			width: 100,
			align: "center",
			title1: "测试计划费用",
			title: "测试计划费用",
			key: "RASPROFILEPRICES",
			dataKey: "RASPROFILEPRICES"
		},
		{ width: 100, align: "center", title1: "测试编码", title: "测试编码", key: "testitemcode", dataKey: "testitemcode" },
		{ width: 100, title1: "汇率", title: "汇率", key: "exchangerate", dataKey: "exchangerate", hidden: true },
		{
			width: 100,
			align: "center",
			title1: "协议价格",
			title: "协议价格",
			key: "contractprice_view",
			dataKey: "contractprice_view"
		},
		{
			width: 100,
			title1: "协议价格(外币)",
			title: "协议价格(外币)",
			key: "contractprice",
			dataKey: "contractprice",
			hidden: true
		},
		{
			width: 100,
			align: "center",
			title1: "是否有模板",
			title: "是否有模板",
			key: "whethertemplate",
			dataKey: "whethertemplate"
		},
		{ width: 100, align: "center", title1: "折扣率", title: "折扣率", key: "discountrate", dataKey: "discountrate" },
		{ width: 100, title1: "参考名称", title: "参考名称", key: "testitemdesc", dataKey: "testitemdesc", hidden: true },
		{ width: 100, align: "center", title1: "可拆分", title: "可拆分", key: "PACKMARK", dataKey: "PACKMARK" },
		{ width: 100, align: "center", title1: "项目标记", title: "项目标记", key: "TESTANOTHERNAME", dataKey: "TESTANOTHERNAME" },
		{ width: 100, align: "center", title1: "NETPRICE", title: "NETPRICE", key: "NETPRICE", dataKey: "NETPRICE" },
		{ width: 260, title1: "备注", title: "备注", key: "REMARK", dataKey: "REMARK" },
		{ width: 100, title1: "检验单位", title: "检验单位", key: "CORPDESC", dataKey: "CORPDESC", hidden: true },
		{ width: 100, title1: "TESTFLAG", title: "TESTFLAG", key: "TESTFLAG", dataKey: "TESTFLAG", hidden: true },
		{
			width: 100,
			title: "协议价格百分比",
			title: "协议价格百分比",
			key: "contractdiscount",
			dataKey: "contractdiscount",
			hidden: true
		}
	],
	expandColumnKey: "TESTDESC" //那个字段是树形结构
});

//确定按钮
const confirmClick = selectList => {
	console.log("selectList", selectList); //选中的数据
	console.log("virtualizedTreeTableRef", virtualizedTreeTableRef.value.selectList); //选中的数据
};

onMounted(() => {
	// treeTableList.httpAttribute.baseParams.jsonString = JSON.stringify({
	// 	cond: { corpno: "01320588" },
	// 	reservnum: "08110320221028001"
	// });
	virtualizedTreeTableRef.value.getTableList();
});
</script>
