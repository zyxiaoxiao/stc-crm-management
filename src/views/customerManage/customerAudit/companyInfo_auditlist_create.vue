<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="客户创建审核"
				:label="$t('menubaseCustomercreateaudit')"
				class="main-tab-pane-content all-height flex-column"
				:name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Search" plain @click="dialogShow('dialogShow_customerListQuery')">{{
							$t("menu_select")
						}}</el-button>
						<el-button
							size="small"
							type="success"
							icon="Check"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/mylims/enterpriseinfo/enterpriseinfo!approve.action', 'Approve !', scope.selectList)"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/mylims/enterpriseinfo/enterpriseinfo!reject.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/mylims/enterpriseinfo/enterpriseinfo!reject2Submitor.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
					</template>
					<!-- 自定义 -->
					<template #Custom="scope">
						<span v-if="scope.column == 'addcontact'" v-html="scope.row[scope.column]" />
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="客户创建审核查询"
				:label="$t('corpinfopanelCustomersCreateAudittitle')"
				class="main-tab-pane-content all-height flex-column"
				:name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery" @workflow-status="workflowStatus" />
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
			<companydetailnewauditreadonly :condobj="customerNewReadonly"></companydetailnewauditreadonly>
		</ZDialog>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage, ElInput } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import audit from "@/views/audit/index.vue";
import customerListQuery from "../customerQuery/customer_list_query.vue";
import companyDetailNew from "../customerAudit/company_detail_new_audit.vue";
import companydetailnewauditreadonly from "../customerReadonly/company_detail_new_audit_readonly.vue";
import { getdropSownSelection } from "@/utils/util.js";

const i18n = useI18n();

const customerCustomertype = getdropSownSelection("customer_customertype");

//审核记录
const auditList = reactive({
	dialogShow: false,
	codeid: "",
	tablename: "MLS_ENTERPRISE",
	columnid: "corpid"
});

//审核详细基本信息
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
		title: "变更提醒",
		label: "menucolumnChangeReminder",
		prop: "addcontact",
		type: "Custom",
		width: "160"
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
		title: "联系人",
		label: "companypanelcontactdesctitle",
		prop: "contactname",
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
	id: "/customerManage/customerAudit/companyInfo_auditlist_create.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectEnterpriseInfosByCorpRight.action",
		root: "enterpriseInfos",
		baseParams: {
			"cond.auditflag": "1",
			"cond.addcontactflag": "Y"
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
	id: "/customerManage/customerAudit/companyInfo_auditlist_create.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/enterpriseinfo/enterpriseinfo!selectEnterpriseInfoCreateQueryByCond.action",
		root: "enterpriseInfos",
		baseParams: {}
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
			label: "id",
			prop: "corpid",
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
			title: "联系人",
			label: "companypanelcontactdesctitle",
			prop: "contactname",
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
		}
	],
	// 表格数据
	tableData: []
});

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
	}
};

//关闭基本信息层的回调
const customerNewClose = async () => {
	if (customerNew.success) {
		await zTable1.value.getTableList();
		await zTable2.value.getTableList();
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
			enterpriseInfos: row
		};
		let params = {
			jsonString: JSON.stringify(jsonString),
			"cond.opinion": srtOpinion.value
		};
		const res = await http.post(auditurl, qs.stringify(params));

		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			await zTable1.value.getTableList();
			await zTable2.value.getTableList();
		}
	});
};

//tabs 切换， 审核界面设置只要切换就调请求,因为随时会有提交到审核的数据。
const tabPaneName = ref(0);
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case 0:
			// 客户创建信息查询
			zTable1.value.getTableList();
			break;
		case 1:
			// 客户创建信息查询
			zTable2.value.getTableList();
			break;
	}
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
