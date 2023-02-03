<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="销售开支信息"
				:label="$t('titleExpenditureInformation')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="newDeliverysworkflowdetail">{{
							$t("menu_new")
						}}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="batchDelete(scope.ids)"
							>{{ $t("menu_delete") }}
						</el-button>
						<el-button
							size="small"
							type="success"
							icon="Check"
							plain
							:disabled="!scope.isSelected"
							@click="Submit(scope.selectList)"
							>{{ $t("menu_submit") }}
						</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Download" @click="downloadSalesExpenses(scope.row)">
							{{ $t("panelcolumnSalependdingtodownload") }}
						</el-button>
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
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Download" @click="downloadSalesExpenses(scope.row)">
							{{ $t("panelcolumnSalependdingtodownload") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 新增弹出 -->
		<div v-dialogStretching>
			<ZDialog v-model="expendituredetailList.dialogShow" width="95%" @close="expendituredetailClose">
				<expendituredetail :condobj="expendituredetailList"></expendituredetail>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";

import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
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
		title: "操作",
		label: "itemtitleloginoperation",
		prop: "operation",
		type: "operation",
		width: "160",
		fixed: "right"
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
	id: "/applicationFormManagement/expenditure_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/expenditure/expenditure!selectExpenditureInfoByCond.action",
		root: "expenditureInfos",
		baseParams: { "cond.auditflag": "0" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/applicationFormManagement/expenditure_query_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/expenditure/expenditure!selectExpenditureInfoByCond.action",
		root: "expenditureInfos",
		baseParams: { "cond.auditflag": "1,2" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//销售开支下载
const downloadSalesExpenses = row => {
	downloadFile("/crm/expenditure/expenditure!downloadExcel.action", row.folderno + ".doc", {
		"cond.crm": "crm",
		id: row.id
	});
};

//新增弹出 参数
const expendituredetailList = reactive({
	success: false,
	dialogShow: false,
	id: "",
	workflowflag: "3"
});
//新增
const newDeliverysworkflowdetail = () => {
	expendituredetailList.id = "";
	expendituredetailList.workflowflag = "1";
	expendituredetailList.success = false;
	expendituredetailList.dialogShow = true;
};
// 新增 弹出 回调
const expendituredetailClose = () => {
	if (expendituredetailList.success) {
		zTable1.value.getTableList();
	}
};

//批量删除数据
const batchDelete = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			expenditureInfos: []
		};
		ids.forEach(item => {
			jsonString.expenditureInfos.push({
				id: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/expenditure/expenditure!deleteExpenditureInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//提交
const Submit = row => {
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let params = {
			jsonString: JSON.stringify({ expenditureInfos: row })
		};
		const res = await http.post("/crm/expenditure/expenditure!submitExpenditureInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailbg = (column, row) => {
	expendituredetailList.id = row.id;
	expendituredetailList.workflowflag = "1";
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
