<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="客户信息变更"
				:label="$t('corpinfopanelCustomerInformationChangestitle')"
				class="main-tab-pane-content all-height flex-column"
				:name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Search" plain @click="dialogShow('dialogShow_customerListQuery')">{{
							$t("menu_select")
						}}</el-button>
						<el-button size="small" type="primary" icon="ZoomIn" plain @click="dialogShow('companyListselect')">{{
							$t("menu_choosebgdata")
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
							type="success"
							icon="Check"
							plain
							:disabled="!scope.isSelected"
							@click="Submit(scope.selectList)"
							>{{ $t("menu_submit") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="客户信息变更查询"
				:label="$t('corpinfopanelCustomerInformationChangesQuerytitle')"
				class="main-tab-pane-content all-height flex-column"
				:name="1"
			>
				<zTable
					ref="zTable2"
					:tableList="tableList2"
					@link-detailbg="linkDetailbgQuery"
					@workflow-status="workflowStatus"
					@advanced-search="advancedSearch"
				>
				</zTable>
			</el-tab-pane>
		</el-tabs>

		<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>

		<ZDialog v-model="customerList.dialogShow" :title="$t('corpinfopanelckxxcxtitle')" width="95%">
			<customerListQuery :condobj="customerList"></customerListQuery>
		</ZDialog>

		<!-- 新增变更数据 -->

		<ZDialog v-model="companyList.dialogShow" :title="$t('corpinfopanelckxxcxtitle')" width="95%" @close="companyListClose">
			<companylistselect :condobj="companyList" />
		</ZDialog>

		<!-- 编辑变更客户信息 -->

		<ZDialog v-model="customerbgList.dialogShow" title="" width="95%" @close="customerbgListClose">
			<companydetailbg :condobj="customerbgList" />
		</ZDialog>

		<ZDialog v-model="customerbgReadonly.dialogShow" title="" width="95%">
			<companyDetailbgReadonly :condobj="customerbgReadonly" />
		</ZDialog>

		<!-- 高级查询 -->
		<el-dialog
			v-if="advanceSearch_dialogVisible"
			v-model="advanceSearch_dialogVisible"
			:title="$t('Search_AdvanceSearch')"
			width="40%"
			draggable
		>
			<div style="padding: 20px">
				<el-row :gutter="15" class="main-align-items-center">
					<el-col :span="12">
						<el-form-item title1="创建开始时间" :label="$t('itemtitlebaserecordtimestart')">
							<el-date-picker
								v-model.trim="advanceSearchFormData.recordtime_start"
								type="date"
								format="YYYY-MM-DD"
								value-format="YYYY-MM-DD"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item title1="创建结束时间" :label="$t('itemtitlebaserecordtimeend')">
							<el-date-picker
								v-model.trim="advanceSearchFormData.recordtime_end"
								type="date"
								format="YYYY-MM-DD"
								value-format="YYYY-MM-DD"
							/>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="advanceSearchQuery"> {{ $t("Search_Query") }} </el-button>
				</span>
			</template>
		</el-dialog>
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
import customerListQuery from "../customerQuery/customer_list_query.vue";
import companylistselect from "../customerSelete/company_list_select.vue";
import companydetailbg from "./company_detail_bg.vue";
import companyDetailbgReadonly from "../customerReadonly/company_detail_bg_readonly.vue";
import { getdropSownSelection } from "@/utils/util.js";

const i18n = useI18n();

const customerCustomertype = getdropSownSelection("customer_customertype");

const advanceSearch_dialogVisible = ref(false);
const advanceSearchFormData = reactive({
	recordtime_start: "",
	recordtime_end: ""
});

//审核记录
const auditList = reactive({
	dialogShow: false,
	codeid: "",
	tablename: "MLS_ENTERPRISEBG",
	columnid: "corpbgid"
});

//客户查询
const customerList = reactive({
	dialogShow: false
});

//新增变更数据
const companyList = reactive({
	dialogShow: false,
	arrayList: []
});

//编辑变更客户信息
const customerbgList = reactive({
	dialogShow: false,
	corpbgid: "",
	corpid: "",
	success: false
});
//查看
const customerbgReadonly = reactive({
	dialogShow: false,
	corpid: "",
	corpbgid: "",
	filterStatus: ""
});

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
		width: "160"
	},
	{
		title: "客户类别",
		label: "corpinfopanelkhlbtitle",
		prop: "corptype",
		type: "Select",
		width: "185",
		typeData: customerCustomertype
	},
	{
		title: "代理商名称",
		label: "corpinfopaneldlsmctitle",
		prop: "agentdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "电话",
		label: "itemtitlebase_usertel",
		prop: "corpphone",
		type: "Input",
		width: "160"
	},
	{
		title: "地址",
		label: "columnAddress",
		prop: "corplocation",
		type: "Input",
		width: "160"
	},
	{
		title: "销售代理提佣点(%)",
		label: "itemtitlefoldersagentbrokerage",
		prop: "agentbrokerage",
		type: "Number",
		width: "208"
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
		title: "备注",
		label: "panelcolumnRemark",
		prop: "remark",
		type: "Input",
		width: "160"
	},
	{
		title: "id",
		label: "",
		prop: "corpbgid",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "corpid",
		label: "",
		prop: "corpid",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "创建人工号",
		label: "",
		prop: "recordercode",
		type: "Input",
		width: "160",
		isHide: true
	},
	{
		title: "是否打包价客户",
		label: "itemtitlebase_userisPackage",
		prop: "ispackage",
		type: "Input",
		width: "160",
		isHide: true
	},
	{
		title: "country",
		label: "",
		prop: "country",
		type: "Input",
		width: "160",
		isHide: true
	},
	{
		title: "agentcode",
		label: "",
		prop: "agentcode",
		type: "Input",
		width: "160",
		isHide: true
	},
	{
		title: "addcontact",
		label: "",
		prop: "addcontact",
		type: "Input",
		width: "160",
		isHide: true
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/customerApplication/companyInfo_list_bg.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectAudit.action",
		root: "enterprisebglist",
		baseParams: {
			"cond.auditflag": "0,-1"
		}
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/customerManage/customerApplication/companyInfo_list_bg.vue_zTable2",
	tableToolbar: {
		//高级查询
		right_advanceSearch: true
	},
	//查询
	tablePropSearch: advanceSearchFormData,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectAudit.action",
		root: "enterprisebglist",
		baseParams: {
			"cond.auditflag": "1,2"
		}
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//高级查询
const advancedSearch = () => {
	advanceSearch_dialogVisible.value = true;
};
const advanceSearchQuery = () => {
	zTable2.value.reuseTableList();
	advanceSearch_dialogVisible.value = false;
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow = true;
};

//链接详细信息
const linkDetailbg = (column, row) => {
	customerbgList.success = false;
	customerbgList.corpbgid = row.corpbgid;
	customerbgList.corpid = row.corpid;
	customerbgList.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	customerbgReadonly.corpid = row.corpid;
	customerbgReadonly.corpbgid = row.corpbgid;
	customerbgReadonly.dialogShow = true;
};

// 显示dialog
const dialogShow = data => {
	if (data == "dialogShow_customerListQuery") {
		customerList.dialogShow = true;
	} else if (data == "companyListselect") {
		companyList.arrayList = [];
		companyList.dialogShow = true;
	}
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
			const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!saveEnterprisebgInfosE.action", qs.stringify(params));
			if (res) {
				ElMessage.success(i18n.t("Message_OperationSuccess"));
				zTable1.value.getTableList();
			}
		} catch (error) {
			if (error.response.data.indexOf("There is a change in the data") >= 0) {
				ElMessage.warning(i18n.t("msg_bgfailure")); //'操作提示','存在正在变更的数据!'
			} else if (error.response.data.indexOf("There is a distrubution in the data") >= 0) {
				ElMessage.warning(i18n.t("msg_bgfailurefordistrubution")); //'操作提示','存在正在分配的数据!'
			} else if (error.response.data.indexOf("There are data in the application level") >= 0) {
				ElMessage.warning(i18n.t("msg_bgfailureforlevel")); //'操作提示','存在正在申请等级的数据!'
			}
		}
	}
};

//编辑变更客户信息回调
const customerbgListClose = async () => {
	if (customerbgList.success) {
		await zTable1.value.getTableList();
		await zTable2.value.getTableList();
	}
};

//提交
const Submit = row => {
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			enterprisebgInfos: row,
			auflag: "1"
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!submitbg.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			await zTable1.value.getTableList();
			await zTable2.value.getTableList();
		}
	});
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
			enterprisebgInfos: []
		};
		ids.forEach(item => {
			jsonString.enterprisebgInfos.push({
				corpbgid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!deleteEnterprisebgInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

const tabPaneName = ref(0);
const tabPaneSet = new Set();
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case 1:
			// 客户信息变更查询
			if (!tabPaneSet.has(TabPaneName)) zTable2.value.getTableList();
			break;
	}
	tabPaneSet.add(TabPaneName);
};

//页面初始化渲染完成执行
onMounted(async () => {
	await zTable1.value.getTableList();
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
<style lang="scss"></style>
