<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="客户创建信息"
				:label="$t('i18nCustomerapplicationCustomerCreateInformation')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Search" plain @click="dialogShow('dialogShow_customerListQuery')">{{
							$t("menu_select")
						}}</el-button>
						<el-button size="small" type="primary" icon="Edit" plain @click="dialogShow('dialogShow_companyDetailNew')">{{
							$t("menu_new")
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
				title1="客户创建信息查询"
				:label="$t('i18nCustomerapplicationCustomerCreateInformationQuery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable
					ref="zTable2"
					:tableList="tableList2"
					@link-detailbg="linkDetailbgQuery"
					@workflow-status="workflowStatus"
					@advanced-search="advancedSearch"
				>
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="warning"
							icon="Back"
							plain
							:disabled="!scope.isSelected"
							@click="backHandler(scope.selectList)"
							>{{ $t("menu_back") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>
		<ZDialog v-model="customerList.dialogShow" :title="$t('corpinfopanelckxxcxtitle')" width="95%">
			<customerListQuery :condobj="customerList"></customerListQuery>
		</ZDialog>
		<ZDialog v-model="customerNew.dialogShow" title="" width="95%" @close="customerNewClose">
			<companyDetailNew :condobj="customerNew"></companyDetailNew>
		</ZDialog>
		<ZDialog v-model="customerNewReadonly.dialogShow" title="" width="95%">
			<companyDetailNewReadonly :condobj="customerNewReadonly"></companyDetailNewReadonly>
		</ZDialog>
		<!-- 高级查询 -->
		<el-dialog
			v-if="advanceSearch_dialogVisible"
			v-model="advanceSearch_dialogVisible"
			:title="$t('Search_AdvanceSearch')"
			width="40%"
			draggable
			:append-to-body="true"
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
import companyDetailNew from "./company_detail_new.vue";
import companyDetailNewReadonly from "../customerReadonly/company_detail_new_readonly.vue";
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
	tablename: "MLS_ENTERPRISE",
	columnid: "corpid"
});

//新增
const customerNew = reactive({
	dialogShow: false,
	corpid: "",
	success: false
});
//查看
const customerNewReadonly = reactive({
	dialogShow: false,
	corpid: ""
});

//客户查询
const customerList = reactive({
	dialogShow: false
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
		title: "id",
		label: "id",
		prop: "corpid",
		type: "id",
		width: "60",
		isHide: true
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
		title: "GR Regional",
		label: "customerapplicationinvoice_format",
		prop: "invoiceformat",
		type: "Input",
		width: "160"
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
		title: "电子邮件",
		label: "corpinfopanelemailtitle",
		prop: "corpemail",
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
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerManage/customerApplication/newCustomer.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCorpListByCond.action",
		root: "enterpriseInfos",
		baseParams: {
			"cond.auditflag": "0"
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
	id: "/customerManage/customerApplication/newCustomer.vue_zTable2",
	tableToolbar: {
		//高级查询
		right_advanceSearch: true
	},
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectCorpListByCond.action",
		root: "enterpriseInfos",
		baseParams: {
			"cond.auditflag": "1,2"
		}
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: [],
	//查询
	tablePropSearch: advanceSearchFormData
});

//高级查询
const advancedSearch = () => {
	advanceSearch_dialogVisible.value = true;
};
const advanceSearchQuery = () => {
	zTable2.value.reuseTableList();
	advanceSearch_dialogVisible.value = false;
};

//当表格的当前行发生变化的时候会触发该事件
// const tableCurrentChange1 = (currentRow, oldCurrentRow) => {};

//批量删除数据
const batchDelete = ids => {
	ElMessageBox.confirm(i18n.t("Message_Confirmdelete"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			enterpriseInfos: []
		};
		ids.forEach(item => {
			jsonString.enterpriseInfos.push({
				corpid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!deleteEnterpriseInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage.success(i18n.t("Message_deleteSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailbg = (column, row) => {
	customerNew.success = false;
	customerNew.corpid = row.corpid;
	customerNew.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	customerNewReadonly.corpid = row.corpid;
	customerNewReadonly.dialogShow = true;
};

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow = true;
};

// 显示dialog
const dialogShow = data => {
	if (data == "dialogShow_customerListQuery") {
		customerList.dialogShow = true;
	} else if (data == "dialogShow_companyDetailNew") {
		customerNew.success = false;
		customerNew.corpid = "";
		customerNew.dialogShow = true;
	}
};

//关闭导出层的回调
const customerNewClose = async () => {
	if (customerNew.success) {
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
			enterpriseInfos: row
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!submit.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			await zTable1.value.getTableList();
			await zTable2.value.getTableList();
		}
	});
};

//撤销
const backHandler = row => {
	for (let item of row) {
		if (item.auditflag == "2") {
			ElMessage.warning(i18n.t("Message_BackAllow"));
			return;
		}
	}
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("alertConfirmrevocation"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			enterpriseInfos: row
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};

		const res = await http.post("/mylims/enterpriseinfo/enterpriseinfo!backEnterpriseInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("alertRevocationofsuccess"));
			await zTable1.value.getTableList();
			await zTable2.value.getTableList();
		}
	});
};

const tabPaneName = ref("0");
const tabPaneSet = new Set();
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case "1":
			// 客户创建信息查询
			if (!tabPaneSet.has("1")) zTable2.value.getTableList();
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
<style lang="scss"></style>
