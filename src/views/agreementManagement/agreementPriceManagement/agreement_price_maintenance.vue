<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="协议价格维护"
				:label="$t('menucontractagreementpriceapply')"
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
							type="primary"
							icon="DocumentCopy"
							plain
							:disabled="!scope.isSelected"
							@click="copy_handler(scope.selectList)"
							>{{ $t("menu_copy") }}</el-button
						>
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
				title1="协议价格维护查询"
				:label="$t('menucontractagreementpriceapplyquery')"
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
						<el-button
							size="small"
							type="primary"
							icon="DocumentCopy"
							plain
							:disabled="!scope.isSelected"
							@click="copy_handler(scope.selectList)"
							>{{ $t("menu_copy") }}</el-button
						>
						<el-button
							size="small"
							type="primary"
							icon="Upload"
							plain
							:disabled="!scope.isSelected"
							@click="update_handler(scope.selectList)"
							>{{ $t("menu_update") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 新增弹出 -->
		<ZDialog
			v-if="contractdetailList.dialogShow"
			v-model="contractdetailList.dialogShow"
			width="95%"
			@close="contractdetailClose"
		>
			<contractdetail :condobj="contractdetailList"></contractdetail>
		</ZDialog>

		<ZDialog v-if="auditList.dialogShow" v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
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
import { ElMessageBox, ElMessage, ElInputNumber } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import contractdetail from "./agreement_price_detail.vue";
import audit from "@/views/audit/index.vue";

const i18n = useI18n();
//是否
const whetherAr = getdropSownSelection("whether");

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
		title: "部门名称",
		label: "appointmentDepartment_name",
		prop: "dept",
		type: "Input",
		width: "160"
	},
	{
		title: "版本号",
		label: "itemtitlecountryruleversion",
		prop: "version",
		type: "Input",
		width: "160"
	},
	{
		title: "总体折扣",
		label: "itemtitlebase_userisdiscount",
		prop: "isdiscount",
		type: "Select",
		typeData: whetherAr,
		width: "160"
	},
	{
		title: "折扣率",
		label: "columnappointmentdiscount",
		prop: "discounts",
		type: "Input",
		width: "160"
	},
	{
		title: "开始时间",
		label: "itemtitlelog_messagebegintime",
		prop: "begintime",
		type: "Date",
		width: "160"
	},
	{
		title: "结束时间",
		label: "itemtitlelog_messageendtime",
		prop: "endtime",
		type: "Date",
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
	id: "/agreementManagement/agreementPriceManagement/agreement_price_maintenance.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/contract/contract.action",
		root: "contractInfos",
		baseParams: { "cond.auditflag": "0", "cond.contracttype": "1", "cond.rightFlag": "1" }
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/agreementManagement/agreementPriceManagement/agreement_price_maintenance.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/contract/contract!selectApplicationContractInfoByCondRight.action",
		root: "contractInfos",
		baseParams: { "cond.auditflag": "0", "cond.contracttype": "1" }
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

//复制
const copy_handler = row => {
	if (row.length != 1) {
		ElMessage.warning(i18n.t("Message_copyappointment"));
		return;
	}
	if (row[0].isdiscount != "0") {
		ElMessage.warning(i18n.t("Message_isdiscount0forcopy"));
		return;
	}
	ElMessageBox.confirm(i18n.t("SRM_copynew"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		const res = await http.post(
			"/crm/contract/contract!copyContractInfos.action",
			qs.stringify({ "cond.contractid": row[0].contractid })
		);
		if (res?.contractid) {
			tabPaneName.value = "0";
			zTable1.value.getTableList();
			contractdetailList.contractid = res?.contractid;
			contractdetailList.workflowflag = "1";
			contractdetailList.success = false;
			contractdetailList.dialogShow = true;
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
		if (item.auditflag == "2" && item.contracttype == "1") {
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

const update_handler = async row => {
	if (row.length != 1) {
		ElMessage.warning(i18n.t("Message_copycontract"));
		return;
	}
	const res = await http.post(
		"/crm/contract/contract!copyContractInfo.action",
		qs.stringify({ "cond.contractid": row[0].contractid })
	);
	if (res?.contractid) {
		tabPaneName.value = "0";
		zTable1.value.getTableList();
		contractdetailList.contractid = res?.contractid;
		contractdetailList.workflowflag = "4";
		contractdetailList.success = false;
		contractdetailList.dialogShow = true;
	}
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
