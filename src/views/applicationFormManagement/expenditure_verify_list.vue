<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="销售开支审核"
				:label="$t('menubaseExpenditureAudit')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="success"
							icon="Check"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/expenditure/expenditure!approveExpenditureInfo.action', 'Approve !', scope.selectList)"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/expenditure/expenditure!reject.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/expenditure/expenditure!reject2Submitor.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="销售开支查询"
				:label="$t('titleExpenditureQuery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery" @workflow-status="workflowStatus">
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 新增弹出 -->
		<ZDialog v-model="expendituredetailList.dialogShow" width="95%" @close="expendituredetailClose">
			<expendituredetail :condobj="expendituredetailList"></expendituredetail>
		</ZDialog>
		<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
			<audit :auditList="auditList"></audit>
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
import { getdropSownSelection } from "@/utils/util.js";
import expendituredetail from "./expenditure_detail.vue";
import audit from "@/views/audit/index.vue";

const i18n = useI18n();
const sales_type = getdropSownSelection("sales_type");

//表格表头
let tableColumns1 = reactive([
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
		title: "申请单号",
		label: "columnwriteoff_application_listApplicationNo",
		prop: "folderno",
		type: "Link",
		width: "160"
	},
	{
		title: "业务员名称",
		label: "columnexpendituresalesmandesc",
		prop: "salesmandesc",
		type: "Input",
		width: "160"
	},
	{
		title: "部门",
		label: "corpinfopaneldepartmentcodetitle",
		prop: "deptdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "客户号",
		label: "corpinfoCustomerNumbertitle",
		prop: "corpno",
		type: "Input",
		width: "160"
	},
	{
		title: "客户名称",
		label: "columnCustomerName",
		prop: "corpdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "金额",
		label: "columnappointmentothercostmoney_hkd",
		prop: "amount",
		type: "Input",
		width: "160"
	},
	{
		title: "开支类型",
		label: "columnexpendituretype",
		prop: "expendituretype",
		type: "Select",
		typeData: sales_type,
		width: "160"
	},
	{
		title: "备注",
		label: "panelcolumnRemark",
		prop: "remark",
		type: "Input"
	},
	{
		title: "创建人编码",
		label: "columnCreatehumancoding",
		prop: "recordercode",
		type: "Input",
		width: "160"
	},
	{
		title: "创建人名称",
		label: "testiteminforecordernamepanel",
		prop: "recorderdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "创建日期",
		label: "testiteminforecordtimepanel",
		prop: "recordtime",
		type: "DateTime",
		width: "180"
	},
	{
		title: "申请人编码",
		label: "columnApplicantcode",
		prop: "applicantcode",
		type: "Input",
		width: "160"
	},
	{
		title: "申请人名称",
		label: "columnApplicantdesc",
		prop: "applicantdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "申请日期",
		label: "i18ncrmcontractApplicationDate",
		prop: "applicanttime",
		type: "DateTime",
		width: "180"
	},
	{
		title: "id",
		label: "",
		prop: "id",
		type: "id",
		width: "60",
		isHide: true
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/applicationFormManagement/expenditure_verify_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/expenditure/expenditure!selectExpenditureInfoByCorpRight.action",
		root: "expenditureInfos",
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
	id: "/applicationFormManagement/expenditure_verify_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/expenditure/expenditure!selectExpenditureInfoAlreadyAudit.action",
		root: "expenditureInfos",
		baseParams: { "cond.auditflag": "1,2" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//新增弹出 参数
const expendituredetailList = reactive({
	success: false,
	dialogShow: false,
	id: "",
	workflowflag: "3"
});
// 新增 弹出 回调
const expendituredetailClose = () => {
	if (expendituredetailList.success) {
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
			expenditureInfos: row
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

//链接详细信息
const linkDetailbg = (column, row) => {
	expendituredetailList.id = row.id;
	expendituredetailList.workflowflag = "2";
	expendituredetailList.success = false;
	expendituredetailList.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	expendituredetailList.id = row.id;
	expendituredetailList.workflowflag = "3";
	expendituredetailList.success = false;
	expendituredetailList.dialogShow = true;
};

//审核记录
const auditList = reactive({
	dialogShow: false,
	codeid: "",
	tablename: "MLS_EXPENDITURE",
	columnid: "id"
});
//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow = true;
};

const tabPaneName = ref("0");
const tabPaneSet = new Set();
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
	tabPaneSet.add(TabPaneName);
};

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
