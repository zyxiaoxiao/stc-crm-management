<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="月结客户申请"
				:label="$t('menubasemcsh')"
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
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="月结客户申请查询"
				:label="$t('contractdgapplyquery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery" @workflow-status="workflowStatus">
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
		<!-- 新增弹出 -->
		<ZDialog v-model="contractdetailList.dialogShow" width="95%" @close="contractdetailClose">
			<contractdetail :condobj="contractdetailList"></contractdetail>
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
import contractdetail from "./contract_detail.vue";
import audit from "@/views/audit/index.vue";

const i18n = useI18n();
const dgbj_paydeadline = getdropSownSelection("dgbj_paydeadline");

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
		width: "200"
	},
	{
		title: "付款信用期",
		label: "i18ncrmcontractCreditPeriodForPay",
		prop: "paydeadline",
		type: "Select",
		typeData: dgbj_paydeadline,
		width: "160"
	},
	{
		title: "每年期望与本公司交易额",
		label: "i18ncrmcontractExpectTransactions",
		prop: "yearlydeal",
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
		title: "客户主键",
		label: "",
		prop: "corpid",
		type: "Input",
		width: "60",
		isHide: true
	},
	{
		title: "id",
		label: "",
		prop: "contractid",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "协议类型",
		label: "",
		prop: "contracttype",
		type: "Input",
		width: "60",
		isHide: true
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/agreementManagement/monthlySettlementCustomer/contract_application_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/contract/contract.action",
		root: "contractInfos",
		baseParams: { "cond.auditflag": "0", "cond.contracttype": "0", "cond.rightFlag": "1" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/agreementManagement/monthlySettlementCustomer/contract_application_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/contract/contract!selectApplicationContractInfoByCondRight.action",
		root: "contractInfos",
		baseParams: { "cond.auditflag": "0", "cond.contracttype": "0" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//新增弹出 参数
const contractdetailList = reactive({
	success: false,
	dialogShow: false,
	contractid: "",
	workflowflag: "3"
});
//新增
const newDeliverysworkflowdetail = () => {
	contractdetailList.contractid = "";
	contractdetailList.workflowflag = "1";
	contractdetailList.success = false;
	contractdetailList.dialogShow = true;
};
// 新增 弹出 回调
const contractdetailClose = () => {
	if (contractdetailList.success) {
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
			contractInfos: []
		};
		ids.forEach(item => {
			jsonString.contractInfos.push({
				contractid: item
			});
		});
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/contract/contract!deleteContractInfo.action", qs.stringify(params));
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
			jsonString: JSON.stringify({ contractInfos: row })
		};
		const res = await http.post("/crm/contract/contract!submit.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_OperationSuccess"));
			zTable1.value.getTableList();
		}
	});
};

//撤销
const backHandler = row => {
	for (let item of row) {
		if (item.auditflag == "2" && item.contracttype == "0") {
			ElMessage.warning(i18n.t("Message_BackAllow"));
			return;
		}
	}
	ElMessageBox.confirm(i18n.t("alertConfirmrevocation"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			contractInfos: row
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};

		const res = await http.post("/crm/contract/contract!backContractsInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("alertRevocationofsuccess"));
			zTable2.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailbg = (column, row) => {
	contractdetailList.contractid = row.contractid;
	contractdetailList.workflowflag = "1";
	contractdetailList.success = false;
	contractdetailList.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	contractdetailList.contractid = row.contractid;
	contractdetailList.workflowflag = "3";
	contractdetailList.success = false;
	contractdetailList.dialogShow = true;
};

//审核记录
const auditList = reactive({
	dialogShow: false,
	codeid: "",
	tablename: "MLS_CONTRACT",
	columnid: "contractid"
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
