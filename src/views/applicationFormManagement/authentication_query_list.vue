<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="销售认证佣金信息"
				:label="$t('panelSalesCertificationCommissionInformation')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg">
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
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="销售认证查询"
				:label="$t('panelSalesCertificationQuery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery"> </zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="未提佣认证信息"
				:label="$t('panelNoCommissionAuthenticationInformation')"
				class="main-tab-pane-content all-height flex-column"
				name="2"
			>
				<zTable ref="zTable3" :tableList="tableList3"> </zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="已提佣认证信息"
				:label="$t('panelCommissionAuthenticationInformationWithdrawn')"
				class="main-tab-pane-content all-height flex-column"
				name="3"
			>
				<zTable ref="zTable4" :tableList="tableList4"> </zTable>
			</el-tab-pane>
		</el-tabs>

		<!-- 新增弹出 -->
		<ZDialog v-model="authenticationdetailList.dialogShow" width="95%" @close="authenticationdetailClose">
			<authenticationdetail :condobj="authenticationdetailList"></authenticationdetail>
		</ZDialog>
		<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
			<audit :auditList="auditList"></audit>
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
import { getdropSownSelection } from "@/utils/util.js";
import authenticationdetail from "./authentication_detail.vue";
import audit from "@/views/audit/index.vue";

const i18n = useI18n();
const certificate = getdropSownSelection("certificate");

//表格表头
let tableColumns1 = reactive([
	{
		type: "selection",
		width: "40"
	},
	{
		title: "申请单号",
		label: "columnwriteoff_application_listApplicationNo",
		prop: "folderno",
		type: "Link",
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
		title: "金额",
		label: "columnappointmentothercostmoney_hkd",
		prop: "abrokerage",
		type: "Input",
		width: "160"
	},
	{
		title: "分包HKCC认证类型",
		label: "menubaseThe_authentication_type",
		prop: "authentication",
		type: "Select",
		typeData: certificate,
		width: "160"
	},
	{
		title: "关联认证号",
		label: "columnbaseHCCRelatedDocNo",
		prop: "preprunfolder",
		type: "Input",
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
		title: "id",
		label: "",
		prop: "aid",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "销售开支id",
		label: "",
		prop: "expenditureid",
		type: "Input",
		width: "60",
		isHide: true
	}
]);

//表格表头
let tableColumns2 = reactive([
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
		title: "佣金",
		label: "panelcolumnbrokerage_hkd",
		prop: "supplier",
		type: "Input",
		width: "160"
	},
	{
		title: "关联认证号",
		label: "columnbaseHCCRelatedDocNo",
		prop: "preprunfolder",
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
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/applicationFormManagement/authentication_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/authentication/authentication!selectAuthenticationInfoByCond.action",
		root: "authenticationInfos",
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
	id: "/applicationFormManagement/authentication_query_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/authentication/authentication!selectAuthenticationInfoByCond.action",
		root: "authenticationInfos",
		baseParams: { "cond.auditflag": "1,2" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable3 = ref();
//表格对象
const tableList3 = reactive({
	id: "/applicationFormManagement/authentication_query_list.vue_zTable3",
	//请求属性设置
	httpAttribute: {
		url: "/crm/authentication/authentication!selectFoldersInfoForCommission.action",
		root: "foldersInfos",
		baseParams: { "cond.isnotcommission": "Y" }
	},
	//表格表头
	tableColumns: tableColumns2,
	// 表格数据
	tableData: []
});

const zTable4 = ref();
//表格对象
const tableList4 = reactive({
	id: "/applicationFormManagement/authentication_query_list.vue_zTable4",
	//请求属性设置
	httpAttribute: {
		url: "/crm/authentication/authentication!selectFoldersInfoForCommission.action",
		root: "foldersInfos",
		baseParams: { "cond.iscommission": "Y" }
	},
	//表格表头
	tableColumns: tableColumns2,
	// 表格数据
	tableData: []
});

//新增弹出 参数
const authenticationdetailList = reactive({
	success: false,
	dialogShow: false,
	aid: "",
	workflowflag: "3"
});
//新增
const newDeliverysworkflowdetail = () => {
	authenticationdetailList.aid = "";
	authenticationdetailList.workflowflag = "1";
	authenticationdetailList.success = false;
	authenticationdetailList.dialogShow = true;
};
// 新增 弹出 回调
const authenticationdetailClose = () => {
	if (authenticationdetailList.success) {
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
			authenticationInfos: []
		};
		ids.forEach(item => {
			jsonString.authenticationInfos.push({
				aid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/authentication/authentication!deleteAuthenticationInfo.action", qs.stringify(params));
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
			jsonString: JSON.stringify({ authenticationInfos: row })
		};
		const res = await http.post("/crm/authentication/authentication!submitAuthenticationInfo.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailbg = (column, row) => {
	authenticationdetailList.aid = row.aid;
	authenticationdetailList.workflowflag = "1";
	authenticationdetailList.success = false;
	authenticationdetailList.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	authenticationdetailList.aid = row.aid;
	authenticationdetailList.workflowflag = "3";
	authenticationdetailList.success = false;
	authenticationdetailList.dialogShow = true;
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
		case "2":
			//
			zTable3.value.getTableList();
			break;
		case "3":
			//
			zTable4.value.getTableList();
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
