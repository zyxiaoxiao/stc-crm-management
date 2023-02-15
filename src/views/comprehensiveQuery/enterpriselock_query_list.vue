<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable1" :tableList="tableList1" @workflow-status="workflowStatus" @link-detailbg="linkDetailbgQuery"> </zTable>
		<!-- 审核记录 -->
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<!-- 弹出详细界面 -->
		<div v-dialogStretching>
			<ZDialog v-model="enterpriselockdetailnewList.dialogShow" width="95%" @close="enterpriselockdetailnewClose">
				<enterpriselockdetailnew :condobj="enterpriselockdetailnewList" />
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import audit from "@/views/audit/index.vue";
import enterpriselockdetailnew from "../customerManage/customerUnlockManagement/enterpriselock_detail_new.vue";

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/comprehensiveQuery/enterpriselock_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/enterpriselock/enterpriselock!selectEnterpriselockInfosByCorpRightOnlyTo.action",
		root: "enterpriselockInfos",
		baseParams: { "cond.auditflag": "2" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "状态",
			label: "itemtitlecommondesc11",
			prop: "processflag",
			type: "workflowStatus",
			width: "70"
		},
		{
			title: "id",
			label: "",
			prop: "lockid",
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
			type: "Link",
			width: "260"
		},
		{
			title: "AR金额",
			label: "enterpriselockinfoARAmounttitle_hkd",
			prop: "arcount",
			type: "Number",
			width: "160"
		},
		{
			title: "解锁原因",
			label: "enterpriselockinfoUnlockReasontitle",
			prop: "unlockreason",
			type: "Input"
		},
		{
			title: "创建人",
			label: "corpinfopanelcjrtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlestatusrecordertime",
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "corpid",
			label: "",
			prop: "corpid",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "recordercode",
			label: "",
			prop: "recordercode",
			type: "Input",
			width: "160",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//审核记录
const auditList = reactive({
	dialogShow: false,
	codeid: "",
	tablename: "MLS_ENTERPRISELOCK",
	columnid: "lockid"
});

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow = true;
};

//新增 弹出参数
const enterpriselockdetailnewList = reactive({
	dialogShow: false,
	success: false,
	lockid: "",
	readonly: true,
	workflowflag: 1
});

//选择数据回调
const enterpriselockdetailnewClose = () => {
	if (enterpriselockdetailnewList.success) {
		zTable1.value.getTableList();
	}
};

const linkDetailbgQuery = (column, row) => {
	enterpriselockdetailnewList.dialogShow = true;
	enterpriselockdetailnewList.success = false;
	enterpriselockdetailnewList.lockid = row.lockid;
	enterpriselockdetailnewList.readonly = true;
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>
