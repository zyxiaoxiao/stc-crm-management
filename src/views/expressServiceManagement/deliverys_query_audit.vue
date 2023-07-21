<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="快递服务审核"
				:label="$t('menubaseExpressServiceAudit')"
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
							@click="auditAction('/crm/deliverys/deliverys!approveDeliverysInfo.action', 'Approve !', scope.selectList)"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/deliverys/deliverys!reject.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/deliverys/deliverys!reject2Submitor.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject2Submitor") }}</el-button
						>
						<el-button size="small" type="primary" icon="CollectionTag" plain @click="batchAddressLabel"
							>{{ $t("menu_havelabels") }}
						</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="CollectionTag" @click="batchAddressLabelPrint(scope.row)">
							{{ $t("menu_havelabels") }}
						</el-button>
						<el-button type="primary" link icon="Document" @click="batchApplicationPrint(scope.row)">
							{{ $t("menu_printapplication") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="快递服务审核查询"
				:label="$t('menubaseExpressServiceAuditQuery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button
							v-if="deliverysworkflowdetailList.iscsd == '1'"
							size="small"
							type="warning"
							icon="Back"
							plain
							:disabled="!scope.isSelected"
							@click="back_handler(scope.selectList)"
							>{{ $t("menu_goback") }}
						</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="CollectionTag" @click="batchAddressLabelPrint(scope.row)">
							{{ $t("menu_havelabels") }}
						</el-button>
						<el-button type="primary" link icon="Document" @click="batchApplicationPrint(scope.row)">
							{{ $t("menu_printapplication") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>

		<!-- 地址标签弹出层 -->
		<ZDialog
			v-if="addressLabelList.dialogShow"
			v-model="addressLabelList.dialogShow"
			title1="已有标签地址"
			:title="$t('columnexistingAddressLabel')"
			width="95%"
		>
			<addressLabel :condobj="addressLabelList"></addressLabel>
		</ZDialog>

		<!-- 新增弹出 -->
		<ZDialog
			v-if="deliverysworkflowdetailList.dialogShow"
			v-model="deliverysworkflowdetailList.dialogShow"
			width="95%"
			@close="deliverysworkflowdetailClose"
		>
			<deliverysworkflowdetail :condobj="deliverysworkflowdetailList"></deliverysworkflowdetail>
		</ZDialog>

		<!-- 地址 标签弹出层 -->
		<el-dialog
			v-if="addressLabelPrintList.dialogShow"
			ref="addressLabelDialog"
			v-model="addressLabelPrintList.dialogShow"
			width="500px"
			class="main-dialogHeight barcodeLabelClass"
			:fullscreen="false"
			:close-on-click-modal="false"
			:show-close="false"
			:destroy-on-close="true"
		>
			<template #header="{ close }">
				<div class="main-dialog-header">
					<span>{{ $t("menu_clientlabel") }}</span>
					<div class="flx-align-center">
						<el-icon @click="close" class="main-dialog-icon">
							<CloseBold />
						</el-icon>
					</div>
				</div>
			</template>
			<addressLabelPrint :condobj="addressLabelPrintList" />
		</el-dialog>

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
import { ElMessageBox, ElMessage, ElInput } from "element-plus";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import addressLabel from "../customerLabelManagement/delivers_print_addresslabel.vue";
import addressLabelPrint from "../customerLabelManagement/addressLabel.vue";
import deliverysworkflowdetail from "./deliverys_workflow_detail.vue";
import audit from "@/views/audit/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";

const i18n = useI18n();
const addresstypeAr = getdropSownSelection("crm_addresstype");
const crm_kdfwlx = getdropSownSelection("crm_kdfwlx");
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
		title: "申请单号",
		label: "columnwriteoff_application_listApplicationNo",
		prop: "applicationno",
		type: "Link",
		width: "160"
	},
	{
		title: "客户号",
		label: "fieldcolumncustomercode",
		prop: "clientno",
		type: "Input",
		width: "200"
	},
	{
		title: "客户名称",
		label: "panelcolumncustomername",
		prop: "clientname",
		type: "Input",
		width: "200"
	},
	{
		title: "地址类型",
		label: "titlebaseAddresstype",
		prop: "addresstype",
		type: "Select",
		typeData: addresstypeAr,
		width: "160"
	},
	{
		title: "联系人",
		label: "columnContactPerson",
		prop: "contactperson",
		type: "Input",
		width: "160"
	},
	{
		title: "联系地址",
		label: "columnAddress",
		prop: "addres",
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
		title: "服务类别",
		label: "columnappointmentdesc46",
		prop: "servicetype",
		type: "Select",
		typeData: crm_kdfwlx,
		width: "160"
	},
	{
		title: "是否客务部复核",
		label: "columndeliverysInfoisauditbycsd",
		prop: "isauditbycsd",
		type: "Select",
		typeData: whetherAr,
		width: "160"
	},
	{
		title: "CSD接收人名称",
		label: "columndeliverysInfocsdcollectdesc",
		prop: "csdcollectdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "CSD样品接收时间",
		label: "columndeliverysInfocsdcollecttimes",
		prop: "csdcollecttimes",
		type: "Date",
		width: "160"
	},
	{
		title: "部门接收人名称",
		label: "columndeliverysInfodeptcollectdesc",
		prop: "deptcollectdesc",
		type: "Input",
		width: "160"
	},
	{
		title: "部门样品接收时间",
		label: "columndeliverysInfodeptcollecttimes",
		prop: "deptcollecttimes",
		type: "Date",
		width: "160"
	},
	{
		title: "创建人编码",
		label: "testiteminforecordercodepanel",
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
		width: "160"
	},
	{
		title: "id",
		label: "",
		prop: "dmid",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "电话",
		label: "",
		prop: "telephone",
		type: "Input",
		width: "60",
		isHide: true
	},

	{
		title: "操作",
		label: "itemtitleloginoperation",
		prop: "operation",
		type: "operation",
		fixed: "right",
		width: "240"
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/expressServiceManagement/deliverys_query_audit.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/deliverys/deliverys!selectDeliverysInfosByCond.action",
		root: "deliverysInfos",
		baseParams: {
			"cond.auditflag": "1"
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
	id: "/expressServiceManagement/deliverys_query_audit.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/deliverys/deliverys!selectDeliverysInfosByCond.action",
		root: "deliverysInfos",
		baseParams: {
			"cond.auditflag": "2"
		}
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

//新增弹出 参数
const deliverysworkflowdetailList = reactive({
	success: false,
	dialogShow: false,
	dmid: "",
	workflowflag: "3",
	iscsd: ""
});

// 新增 弹出 回调
const deliverysworkflowdetailClose = () => {
	if (deliverysworkflowdetailList.success) {
		zTable1.value.getTableList();
	}
};

//地址标签弹出 参数
const addressLabelList = reactive({
	dialogShow: false
});

//打开地址标签弹出层
const batchAddressLabel = () => {
	addressLabelList.dialogShow = true;
};

//链接详细信息
const linkDetailbg = (column, row) => {
	deliverysworkflowdetailList.dmid = row.dmid;
	deliverysworkflowdetailList.workflowflag = "2";
	deliverysworkflowdetailList.success = false;
	deliverysworkflowdetailList.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	deliverysworkflowdetailList.dmid = row.dmid;
	deliverysworkflowdetailList.workflowflag = "3";
	deliverysworkflowdetailList.success = false;
	deliverysworkflowdetailList.dialogShow = true;
};

// 地址标签参数
const addressLabelPrintList = reactive({
	dialogShow: false,
	corpdesc: "",
	contactdesc: "",
	tel: "",
	address: ""
});

//打印地址标签
const batchAddressLabelPrint = row => {
	addressLabelPrintList.corpdesc = row.clientname;
	addressLabelPrintList.contactdesc = row.contactperson;
	addressLabelPrintList.tel = row.telephone;
	addressLabelPrintList.address = row.addres;
	addressLabelPrintList.dialogShow = true;
};

//打印申请单
const batchApplicationPrint = row => {
	downloadFile("/crm/deliverys/deliverys!downloadPrintFolders.action", row.applicationno + `.doc`, {
		applicationno: row.applicationno
	});
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
			deliverysInfos: row
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

//退回
const back_handler = rows => {
	ElMessageBox.confirm(i18n.t("Message_BackYesNo"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			deliverysInfos: rows
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/deliverys/deliverys!backDeliverysInfos.action", qs.stringify(params));
		if (res) {
			ElMessage.success(i18n.t("Message_BackSuccess"));
			zTable2.value.getTableList();
		}
	});
};

//审核记录
const auditList = reactive({
	dialogShow: false,
	codeid: "",
	tablename: "MLS_MAIN_DELIVERYS",
	columnid: "dmid"
});
//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow = true;
};

//是否是CSD人员
const isErrormsg = async () => {
	const res = await http.post("/crm/deliverys/deliverys!checkCurrentUserIsCSD.action", qs.stringify({}));
	if (res?.iscsd == "1") {
		deliverysworkflowdetailList.iscsd = res?.iscsd;
	}
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
	isErrormsg();
	zTable1.value.getTableList();
});
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
:deep(.barcodeLabelClass) {
	display: flex;
	flex-direction: column;
	margin-bottom: 0px !important;
	margin-top: 90px !important;
}
</style>
