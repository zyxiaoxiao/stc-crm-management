<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="客户解锁审核"
				:label="$t('panelUnlockcustomerreview')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @workflow-status="workflowStatus" @link-detailbg="linkDetailbg">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="success"
							icon="Check"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/enterpriselock/enterpriselock!approve.action', 'Approve !', scope.selectList)"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/enterpriselock/enterpriselock!reject.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/enterpriselock/enterpriselock!reject2Submitor.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="客户解锁审核查询"
				:label="$t('panelUnlockauditclientinquiry')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @workflow-status="workflowStatus" @link-detailbg="linkDetailbgQuery">
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 审核记录 -->
		<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>

		<!-- 新增数据 -->
		<ZDialog v-model="enterpriselockdetailnewList.dialogShow" width="95%" @close="enterpriselockdetailnewClose">
			<enterpriselockdetailnew :condobj="enterpriselockdetailnewList" />
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage, ElInput } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";

import audit from "@/views/audit/index.vue";

import enterpriselockdetailnew from "./enterpriselock_detail_new.vue";

const i18n = useI18n();

const tableColumns1 = [
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
];

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/customerUnlockManagement/enterpriselock_verify_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/enterpriselock/enterpriselock!selectEnterpriselockInfosByCorpRightOnly.action",
		root: "enterpriselockInfos",
		baseParams: { "cond.auditflag": "1" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/customerManage/customerUnlockManagement/enterpriselock_verify_query_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/enterpriselock/enterpriselock!selectEnterpriselockInfoQueryByCond.action",
		root: "enterpriselockInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: tableColumns1,
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

//查看信息弹出参数
const enterpriselockdetailnewList = reactive({
	dialogShow: false,
	success: false,
	lockid: "",
	readonly: true,
	workflowflag: 2
});
// 查询信息审核
const linkDetailbg = (column, row) => {
	enterpriselockdetailnewList.dialogShow = true;
	enterpriselockdetailnewList.success = false;
	enterpriselockdetailnewList.lockid = row.lockid;
	enterpriselockdetailnewList.readonly = true;
	enterpriselockdetailnewList.workflowflag = 2;
};

//选择数据回调
const enterpriselockdetailnewClose = () => {
	if (enterpriselockdetailnewList.success) {
		zTable1.value.getTableList();
	}
};

//审核操作
const auditAction = (auditurl, opinion, row) => {
	let srtOpinion = ref(opinion);
	ElMessageBox({
		title: i18n.t("Message_PleaeEnterAuditOpinion"),
		message: () =>
			h(ElInput, {
				modelValue: srtOpinion.value,
				type: "textarea",
				autosize: { minRows: 4 },
				"onUpdate:modelValue": val => {
					srtOpinion.value = val;
				}
			}),
		showCancelButton: true,
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel")
	}).then(async () => {
		let jsonString = {
			enterpriselockInfos: row
		};
		let params = {
			jsonString: JSON.stringify(jsonString),
			"cond.opinion": srtOpinion.value
		};
		const res = await http.post(auditurl, qs.stringify(params));

		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};
//查询信息
const linkDetailbgQuery = (column, row) => {
	enterpriselockdetailnewList.dialogShow = true;
	enterpriselockdetailnewList.success = false;
	enterpriselockdetailnewList.lockid = row.lockid;
	enterpriselockdetailnewList.readonly = true;
	enterpriselockdetailnewList.workflowflag = 3;
};

const tabPaneName = ref("0");
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case "0":
			zTable1.value.getTableList();
			break;
		case "1":
			zTable2.value.getTableList();
			break;
	}
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>
