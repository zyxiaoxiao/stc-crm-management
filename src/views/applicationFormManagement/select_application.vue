<template>
	<div class="all-height flex-column">
		<el-tabs class="flex-column flex-1" v-model="tabPaneName" @tab-change="tabChange" type="border-card" style="overflow: auto">
			<el-tab-pane
				title1="可申请认证提佣"
				:label="$t('panelCanApplyForCertificationCommission')"
				name="0"
				class="all-height flex-column main-tab-pane-content"
			>
				<zTable ref="zTable1" :tableList="tableList1">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="primary"
							icon="Finished"
							:disabled="!scope.isSelected"
							plain
							@click="confirmClick1(scope.ids, scope.selectList)"
						>
							{{ $t("buttoncommonconfirm") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="未完成认证申请单"
				:label="$t('panelIncompleteCertificationApplicationForm')"
				name="1"
				class="all-height flex-column main-tab-pane-content"
			>
				<zTable ref="zTable2" :tableList="tableList2"> </zTable
			></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";

// 父组件传入的参数
//更改对象 / 数组类型的 props
// 当对象或数组作为 props 被传入时，虽然子组件无法更改 props 绑定，但仍然可以更改对象或数组内部的值。
// 这是因为 JavaScript 的对象和数组是按引用传递，而对 Vue 来说，禁止这样的改动，虽然可能生效，但有很大的性能损耗，比较得不偿失。
// 这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响父组件的状态，可能会使数据流在将来变得更难以理解。
// 在最佳实践中，你应该尽可能避免这样的更改，除非父子组件在设计上本来就需要紧密耦合。在大多数场景下，子组件应该抛出一个事件来通知父组件做出改变。
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

const emit = defineEmits(["subFeedbackClick"]);

//表格对象
const zTable1 = ref();
const zTable2 = ref();

const tableList1 = reactive({
	id: "/applicationFormManagement/select_application.vue_zTable1",
	isRadio: true, //设置为单选
	//请求属性设置
	httpAttribute: {
		url: "/crm/authentication/authentication!selectFoldersInfoByCondAuthentication.action",
		root: "foldersInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "销售编码",
			label: "columnbasesalescode",
			prop: "secode",
			type: "Input",
			width: "160"
		},
		{
			title: "销售名称",
			label: "columnbasesalesdescus",
			prop: "sename",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "corpinfoCustomerNumbertitle",
			prop: "rasclientid",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "compname",
			type: "Input",
			width: "160"
		},
		{
			title: "操作人编码",
			label: "itemtitlemdm_tasklistoperatorcode",
			prop: "cscode",
			type: "Input",
			width: "160"
		},
		{
			title: "操作人",
			label: "itemtitlemdm_tasklistoperator",
			prop: "csname",
			type: "Input",
			width: "160"
		},
		{
			title: "申请时间",
			label: "i18ncrmcontractApplicationDate",
			prop: "drawdate",
			type: "DateTime",
			width: "180"
		},
		{
			title: "销售开支id",
			label: "",
			prop: "pricelistid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "认证佣金",
			label: "",
			prop: "rasno",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "认证类型",
			label: "",
			prop: "reportsendtype",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "关联认证号",
			label: "",
			prop: "foldername",
			type: "Input",
			width: "160",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});
const tableList2 = reactive({
	id: "/applicationFormManagement/select_application.vue_zTable2",
	isRadio: true, //设置为单选
	//请求属性设置
	httpAttribute: {
		url: "/crm/authentication/authentication!selectFoldersInfoByCondBlank.action",
		root: "foldersInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "folderno",
			type: "id",
			width: "160"
		},
		{
			title: "销售编码",
			label: "columnbasesalescode",
			prop: "secode",
			type: "Input",
			width: "160"
		},
		{
			title: "销售名称",
			label: "columnbasesalesdescus",
			prop: "sename",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "corpinfoCustomerNumbertitle",
			prop: "rasclientid",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "compname",
			type: "Input",
			width: "160"
		},
		{
			title: "销售开支",
			label: "columnbasesalesexpenses",
			prop: "reportsendtype",
			type: "Input",
			width: "160"
		},
		{
			title: "HCC关联单号",
			label: "columnbaseHCCRelatedDocNo",
			prop: "foldername",
			type: "Input",
			width: "160"
		},
		{
			title: "操作人编码",
			label: "itemtitlemdm_tasklistoperatorcode",
			prop: "cscode",
			type: "Input",
			width: "160"
		},
		{
			title: "操作人",
			label: "itemtitlemdm_tasklistoperator",
			prop: "csname",
			type: "Input",
			width: "160"
		},
		{
			title: "申请时间",
			label: "i18ncrmcontractApplicationDate",
			prop: "drawdate",
			type: "DateTime",
			width: "180"
		}
	],
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
	emit("subFeedbackClick", list);
};
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	overflow: auto;
}
</style>
