<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="客户分配申请"
				:label="$t('panelbaseapplicationDistributionOfCustomers')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="ZoomIn" plain @click="choosebgcustomer">{{
							$t("menu_choosebgcustomer")
						}}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="batchDelete(scope.ids)"
							>{{ $t("menu_delete") }}</el-button
						>
						<el-button
							size="small"
							type="primary"
							icon="Edit"
							plain
							:disabled="!scope.isSelected"
							@click="batchbg_handler(scope.ids)"
							>{{ $t("menu_batchbg") }}</el-button
						>
						<el-button size="small" type="primary" icon="Edit" plain @click="salesattributionreplacement_handler(scope.ids)">{{
							$t("menu_revise")
						}}</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Edit" @click="editInformation(scope.row)">
							{{ $t("menu_edit") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="客户分配申请查询"
				:label="$t('paneltitleapplicationDistributionOfCustomersQuery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @workflow-status="workflowStatus" @link-detailbg="linkDetailbgQuery">
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 审核记录 -->
		<ZDialog v-if="auditList.dialogShow" v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>

		<!-- 新增变更数据 -->
		<ZDialog
			v-if="companyList.dialogShow"
			v-model="companyList.dialogShow"
			:title="$t('corpinfopanelckxxcxtitle')"
			width="95%"
			@close="companyListClose"
		>
			<companylistselect :condobj="companyList" />
		</ZDialog>

		<!-- 编辑 批量修改 -->
		<ZDialog
			v-if="batchDeptanduserList.dialogShow"
			v-model="batchDeptanduserList.dialogShow"
			width="85%"
			@close="batchDeptanduserClose"
			customclass="selectbatchdeptanduserClass"
		>
			<selectbatchdeptanduser :condobj="batchDeptanduserList" />
		</ZDialog>

		<!-- 编辑信息 -->
		<ZDialog
			v-if="customerdistributiondetailList.dialogShow"
			v-model="customerdistributiondetailList.dialogShow"
			width="95%"
			@close="customerdistributiondetailClose"
		>
			<customerdistributiondetail :condobj="customerdistributiondetailList" />
		</ZDialog>

		<!-- 销售归属批量替换 -->
		<ZDialog
			v-if="selectattributivesubstitutionList.dialogShow"
			v-model="selectattributivesubstitutionList.dialogShow"
			width="95%"
			@close="selectattributivesubstitutionClose"
		>
			<selectattributivesubstitution :condobj="selectattributivesubstitutionList" />
		</ZDialog>
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

import audit from "@/views/audit/index.vue";
import companylistselect from "../customerSelete/company_list_select.vue";
import selectbatchdeptanduser from "./select_batch_deptanduser.vue";
import customerdistributiondetail from "./customer_distribution_detail.vue";
import selectattributivesubstitution from "./select_attributive_substitution.vue";

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
		type: "Input",
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
		title: "操作",
		label: "itemtitleloginoperation",
		prop: "operation",
		type: "operation",
		fixed: "right",
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
	id: "/customerManage/customerManagement/companyInfo_list_distribution.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/distribution/distribution!selectDistributionInfoByCond.action",
		root: "distributionInfos",
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
	id: "/customerManage/customerManagement/companyInfo_list_distribution.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/distribution/distribution!selectDistributionInfoByCond.action",
		root: "distributionInfos",
		baseParams: { "cond.auditflag": "1,2" }
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
	],
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

//新增变更数据
const companyList = reactive({
	dialogShow: false,
	arrayList: []
});
//弹出选择变更客户
const choosebgcustomer = () => {
	companyList.arrayList = [];
	companyList.dialogShow = true;
};

//选择变更数据回调
const companyListClose = async () => {
	if (companyList.arrayList.length > 0) {
		let jsonString = {
			corpids: companyList.arrayList
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		try {
			const res = await http.post("/crm/distribution/distribution!saveDistributionInfos.action", qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_OperationSuccess"));
				zTable1.value.getTableList();
			}
		} catch (error) {
			let usercodes = error.response.data.split("-");
			if (error.response.data.indexOf("There is a change in the data") >= 0) {
				ElMessage.warning(i18n.t("msg_bgfailure") + `变更人：` + usercodes[0]); //'操作提示','存在正在变更的数据!'
			} else if (error.response.data.indexOf("There is a distrubution in the data") >= 0) {
				ElMessage.warning(i18n.t("msg_bgfailurefordistrubution") + `分配人：` + usercodes[0]); //'操作提示','存在正在分配的数据!'
			} else if (error.response.data.indexOf("There are data in the application level") >= 0) {
				ElMessage.warning(i18n.t("msg_bgfailureforlevel") + `申请人：` + usercodes[0]); //'操作提示','存在正在申请等级的数据!'
			}
		}
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
			distributionInfos: []
		};
		ids.forEach(item => {
			jsonString.distributionInfos.push({
				id: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/distribution/distribution!deleteCrmaccountInfos.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//批量变更编辑 弹出层 参数
const batchDeptanduserList = reactive({
	dialogShow: false,
	ids: [],
	vShow: true,
	success: false
});

//编辑 批量变更
const batchbg_handler = ids => {
	batchDeptanduserList.dialogShow = true;
	batchDeptanduserList.ids = ids;
	batchDeptanduserList.success = false;
};

//编辑 批量变更 成功回调
const batchDeptanduserClose = () => {
	if (batchDeptanduserList.success) {
		zTable1.value.getTableList();
	}
};

//编辑信息 弹出层 参数
const customerdistributiondetailList = reactive({
	dialogShow: false,
	success: false,
	readonly: false,
	id: ""
});

// 编辑信息
const editInformation = row => {
	customerdistributiondetailList.dialogShow = true;
	customerdistributiondetailList.success = false;
	customerdistributiondetailList.id = row.id;
	customerdistributiondetailList.readonly = false;
};
// 编辑信息 成功回调
const customerdistributiondetailClose = () => {
	if (customerdistributiondetailList.success) {
		zTable1.value.getTableList();
	}
};

const linkDetailbgQuery = (column, row) => {
	customerdistributiondetailList.dialogShow = true;
	customerdistributiondetailList.success = false;
	customerdistributiondetailList.id = row.id;
	customerdistributiondetailList.readonly = true;
};

//销售归属批量替换
const selectattributivesubstitutionList = reactive({
	dialogShow: false,
	success: false
});

const salesattributionreplacement_handler = () => {
	selectattributivesubstitutionList.dialogShow = true;
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

//页面初始化渲染完成执行
onMounted(() => {
	zTable1.value.getTableList();
});
</script>

<style lang="scss">
.selectbatchdeptanduserClass {
	.dialogContent-class {
		background: #f0f2f5;
	}
}
</style>
