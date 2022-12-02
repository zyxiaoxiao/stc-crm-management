<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="客户分配审核"
				:label="$t('panelbaseauditDistributionOfCustomers')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @workflow-status="workflowStatus" @link-detailbg="linkDetailbgQuery">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="success"
							icon="Check"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/distribution/distribution!approvedistribution.action', 'Approve !', scope.selectList)"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/distribution/distribution!rejectdistribution.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="
								auditAction('/crm/distribution/distribution!rejectbg2Submitordistribution.action', 'Reject !', scope.selectList)
							"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="客户分配审核查询"
				:label="$t('paneltitleauditDistributionOfCustomersQuery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @workflow-status="workflowStatus" @link-detailbg="linkDetailbgQuery">
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 审核记录 -->
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<!-- 查看信息 -->
		<div v-dialogStretching>
			<ZDialog v-model="customerdistributiondetailList.dialogShow" width="95%">
				<customerdistributiondetail :condobj="customerdistributiondetailList" />
			</ZDialog>
		</div>
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
import customerdistributiondetail from "../customerManagement/customer_distribution_detail.vue";
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
		label: "companycorpidtitle",
		prop: "id",
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
		title: "旧客户号",
		label: "fieldcolumncustomercodeold",
		prop: "corpnoold",
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
		title: "销售人员/客服",
		label: "itemtitleSalesservice",
		prop: "salesmandesc",
		type: "Input",
		width: "160"
	},
	{
		title: "归属分公司",
		label: "corpinfoSubordinateToBranchtitle",
		prop: "branchcorpdesc",
		type: "Input",
		width: "260"
	},
	{
		title: "归属部门",
		label: "corpinfopaneldepartmentdesctitle",
		prop: "departmentdesc",
		type: "Input",
		width: "200"
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
		prop: "recordertime",
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
	},
	{
		title: "corpnofirst",
		label: "",
		prop: "corpnofirst",
		type: "Input",
		width: "160",
		isHide: true
	},
	{
		title: "corpnolast",
		label: "",
		prop: "corpnolast",
		type: "Input",
		width: "160",
		isHide: true
	}
];

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/customerAudit/companyInfo_audit_list_distribution.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/distribution/distribution!selectDistributionInfoByCond.action",
		root: "distributionInfos",
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
	id: "/customerManage/customerAudit/companyInfo_audit_list_distribution.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/distribution/distribution!selectDistributionInfoByCond.action",
		root: "distributionInfos",
		baseParams: { "cond.auditflag": "1,2" }
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
	tablename: "MLS_ENTERPRISE_DISTRIBUTION",
	columnid: "id"
});

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow = true;
};

//查看信息 弹出层 参数
const customerdistributiondetailList = reactive({
	dialogShow: false,
	success: false,
	readonly: true,
	id: ""
});

//弹出查看信息
const linkDetailbgQuery = (column, row) => {
	customerdistributiondetailList.dialogShow = true;
	customerdistributiondetailList.success = false;
	customerdistributiondetailList.id = row.id;
	customerdistributiondetailList.readonly = true;
};

const tabPaneName = ref("0");
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case "0":
			// 客户分配申请
			zTable1.value.getTableList();
			break;
		case "1":
			// 客户分配申请查询
			zTable2.value.getTableList();
			break;
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
			distributionInfos: row
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

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>
