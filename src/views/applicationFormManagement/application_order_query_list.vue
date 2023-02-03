<template>
	<div class="all-height flex-column">
		<el-tabs class="flex-column flex-1" v-model="tabPaneName" @tab-change="tabChange" type="border-card" style="overflow: auto">
			<el-tab-pane
				title1="申请单查询"
				:label="$t('menubaseapplicationorderquery')"
				name="0"
				class="all-height flex-column main-tab-pane-content"
			>
				<zTable ref="zTable1" :tableList="tableList1">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="primary"
							icon="Finished"
							plain
							:disabled="!scope.isSelected"
							@click="confirmClick1(scope.ids, scope.selectList)"
						>
							{{ $t("buttoncommonconfirm") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="外分包单查询"
				:label="$t('columnselectExternalSubpackageSingleQuery')"
				name="1"
				class="all-height flex-column main-tab-pane-content"
			>
				<zTable ref="zTable2" :tableList="tableList2">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="primary"
							icon="Finished"
							plain
							:disabled="!scope.isSelected"
							@click="confirmClick2(scope.ids, scope.selectList)"
						>
							{{ $t("buttoncommonconfirm") }}
						</el-button>
					</template>
				</zTable></el-tab-pane
			>
		</el-tabs>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";

// 父组件传入的参数
const props = defineProps({
	condobj: {
		type: Object,
		default: {
			dialogShow: {
				type: Boolean,
				default: false
			},
			arrayList: {
				type: Array,
				default: []
			}
		}
	}
});

//表格对象
const zTable1 = ref();
const zTable2 = ref();
//表格表头
let tableColumns = [
	{
		type: "selection",
		width: "40"
	},
	{
		title: "申请单号",
		label: "columntolockapplynum",
		prop: "folderno",
		type: "id",
		width: "140"
	},
	{
		title: "部门",
		label: "corpinfopaneldepartmentcodetitle",
		prop: "dept",
		type: "Input",
		width: "150"
	},
	{
		title: "客户号",
		label: "fieldcolumncustomercode",
		prop: "rasclientid",
		type: "Input",
		width: "140"
	},
	{
		title: "客户名称",
		label: "columnCustomerName",
		prop: "compname",
		type: "Input",
		width: "200"
	},
	{
		title: "样品描述",
		label: "columnSampleInformation",
		prop: "sampleinformation",
		type: "Input",
		width: "160"
	},
	{
		title: "申请时间",
		label: "i18ncrmcontractApplicationDate",
		prop: "drawdate",
		type: "Input",
		width: "160"
	},
	{
		title: "业务人员",
		label: "tablesenametitle",
		prop: "sename",
		type: "Input",
		width: "140"
	},
	{
		title: "业务员名称",
		label: "columnexpendituresalesmandesc",
		prop: "createdbyfullname",
		type: "Input",
		width: "140"
	},
	{
		title: "操作人编码",
		label: "itemtitlemdm_tasklistoperatorcode",
		prop: "secode",
		type: "Input",
		width: "140"
	},
	{
		title: "操作人",
		label: "itemtitlemdm_tasklistoperator",
		prop: "csname",
		type: "Input",
		width: "160"
	}
];
const tableList1 = reactive({
	id: "/applicationFormManagement/application_order_query_list.vue_zTable1",
	isRadio: true, //设置为单选
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFolderInfoByExpenditureSimplify.action",
		root: "foldersInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: tableColumns,
	// 表格数据
	tableData: []
});
const tableList2 = reactive({
	id: "/applicationFormManagement/application_order_query_list.vue_zTable2",
	isRadio: true, //设置为单选
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFolderInfoByDividedExpenditure.action",
		root: "foldersInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: tableColumns,
	// 表格数据
	tableData: []
});

const tabPaneName = ref("0");
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case "0":
			//
			zTable1.value.getTableList();
			break;
		case "1":
			//
			zTable2.value.getTableList();
			break;
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});

const confirmClick1 = (ids, list) => {
	props.condobj.arrayList = list;
	props.condobj.dialogShow = false;
};
const confirmClick2 = (ids, list) => {
	props.condobj.arrayList = list;
	props.condobj.dialogShow = false;
};
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	overflow: auto;
}
</style>
