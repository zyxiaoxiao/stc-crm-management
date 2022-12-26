<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="客户标签审核"
				:label="$t('menubaseCustomerLabelAudit')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="success"
							icon="Check"
							plain
							:disabled="!scope.isSelected"
							@click="
								auditAction('/crm/samplepackage/samplepackage!approveSamplepackageInfo.action', 'Approve !', scope.selectList)
							"
							>{{ $t("menu_approve") }}</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="Close"
							plain
							:disabled="!scope.isSelected"
							@click="auditAction('/crm/samplepackage/samplepackage!reject.action', 'Reject !', scope.selectList)"
							>{{ $t("menu_reject") }}</el-button
						>
						<el-button size="small" type="primary" icon="User" plain @click="jobNumberLabelPrint">{{
							$t("menu_workernum")
						}}</el-button>

						<el-button size="small" type="primary" icon="CollectionTag" plain @click="batchAddressLabel"
							>{{ $t("menu_havelabels") }}
						</el-button>
						<el-button
							size="small"
							type="primary"
							icon="Ticket"
							plain
							:disabled="!scope.isSelected"
							@click="barcodeLabelPrint(scope.selectList)"
							>{{ $t("menu_clientlabel") }}
						</el-button>
						<el-button size="small" type="primary" icon="TakeawayBox" plain @click="scansampling(scope.selectList)"
							>{{ $t("menu_scansampling") }}
						</el-button>
						<el-button size="small" type="primary" icon="Upload" plain @click="importsamplerecords"
							>{{ $t("menu_importsamplerecords") }}
						</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="CollectionTag" @click="batchAddressLabelPrint(scope.row)">
							{{ $t("menu_havelabels") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="客户标签审核查询"
				:label="$t('menubaseCustomerLabelAuditQuery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="CollectionTag" plain @click="batchAddressLabel"
							>{{ $t("menu_havelabels") }}
						</el-button>
						<el-button
							size="small"
							type="primary"
							icon="Ticket"
							plain
							:disabled="!scope.isSelected"
							@click="barcodeLabelPrint(scope.selectList)"
							>{{ $t("menu_clientlabel") }}
						</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="CollectionTag" @click="batchAddressLabelPrint(scope.row)">
							{{ $t("menu_havelabels") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 工号标签弹出层 -->
		<el-dialog
			ref="jobNumberLabelDialog"
			v-model="jobNumberLabelList.dialogShow"
			width="400px"
			:fullscreen="false"
			:close-on-click-modal="false"
			:show-close="false"
			:destroy-on-close="true"
			top="25vh"
		>
			<template #header="{ close }">
				<div class="main-dialog-header">
					<span>{{ $t("Message_pleasescantheworkernum") }}</span>
					<div class="flx-align-center">
						<el-icon @click="close" class="main-dialog-icon">
							<CloseBold />
						</el-icon>
					</div>
				</div>
			</template>
			<jobNumberLabel :condobj="jobNumberLabelList" />
		</el-dialog>
		<!-- 条码标签弹出层 -->
		<el-dialog
			ref="barcodeLabelDialog"
			v-model="barcodeLabelList.dialogShow"
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
			<barcodeLabel :condobj="barcodeLabelList" />
		</el-dialog>
		<!-- 地址标签弹出层 -->
		<div v-dialogStretching>
			<ZDialog v-model="addressLabelList.dialogShow" title1="已有标签地址" :title="$t('columnexistingAddressLabel')" width="95%">
				<addressLabel :condobj="addressLabelList"></addressLabel>
			</ZDialog>
		</div>
		<!-- 导入领样记录弹出层 -->
		<el-dialog
			ref="importsamplerecordsDialog"
			v-model="importsamplerecordsList.dialogShow"
			width="500px"
			class="main-dialogHeight importsamplerecordsClass"
			:fullscreen="false"
			:close-on-click-modal="false"
			:show-close="false"
			:destroy-on-close="true"
			@close="importsamplerecordsClose"
		>
			<template #header="{ close }">
				<div class="main-dialog-header">
					<span>{{ $t("menu_importsamplerecords") }}</span>
					<div class="flx-align-center">
						<el-icon @click="close" class="main-dialog-icon">
							<CloseBold />
						</el-icon>
					</div>
				</div>
			</template>
			<uploadAttachment :condobj="importsamplerecordsList" />
		</el-dialog>
		<!-- 新增弹出 -->
		<div v-dialogStretching>
			<ZDialog v-model="newCustomerLabelList.dialogShow" width="95%" @close="newCustomerLabelClose">
				<samplepackageworkflowdetail :condobj="newCustomerLabelList"></samplepackageworkflowdetail>
			</ZDialog>
		</div>
		<!-- 地址 标签弹出层 -->
		<el-dialog
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

		<!-- 扫描领样弹出层 -->
		<el-dialog
			ref="scanningSampleForUpdateDialog"
			v-model="scanningSampleForUpdateList.dialogShow"
			width="600px"
			class="main-dialogHeight barcodeLabelClass"
			:fullscreen="false"
			:close-on-click-modal="false"
			:show-close="false"
			:destroy-on-close="true"
		>
			<template #header="{ close }">
				<div class="main-dialog-header">
					<span>{{ $t("menu_scansampling") }}</span>
					<div class="flx-align-center">
						<el-icon @click="close" class="main-dialog-icon">
							<CloseBold />
						</el-icon>
					</div>
				</div>
			</template>
			<scanningSampleForUpdate :condobj="scanningSampleForUpdateList" />
		</el-dialog>
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
import jobNumberLabel from "./jobNumberLabel.vue";
import barcodeLabel from "./barcodeLabel.vue";
import addressLabel from "./delivers_print_addresslabel.vue";
import uploadAttachment from "./uploadAttachment.vue";
import samplepackageworkflowdetail from "./samplepackage_workflow_detail.vue";
import addressLabelPrint from "./addressLabel.vue";
import scanningSampleForUpdate from "./scanningSampleForUpdate.vue";

const i18n = useI18n();
const itemtitleauditflag = getdropSownSelection("itemtitleauditflag");

//表格表头
let tableColumns1 = reactive([
	{
		type: "selection",
		width: "40"
	},
	{
		title: "状态",
		label: "itemtitlecommondesc11",
		prop: "auditflag",
		type: "Select",
		typeData: itemtitleauditflag,
		width: "70"
	},
	{
		title: "快递单号",
		label: "columnsamplepackageInfobarcode",
		prop: "barcode",
		type: "Input",
		width: "160"
	},
	{
		title: "样品包裹号",
		label: "columnsamplepackageInfopackagid",
		prop: "packagid",
		type: "Link",
		width: "200"
	},
	{
		title: "快递公司",
		label: "columnsamplepackageInfodeliverycompany",
		prop: "deliverycompany",
		type: "Input",
		width: "200"
	},
	{
		title: "客户号",
		label: "fieldcolumncustomercode",
		prop: "customerno",
		type: "Input",
		width: "160"
	},
	{
		title: "客户名称",
		label: "panelcolumncustomername",
		prop: "customername",
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
		title: "收件人",
		label: "tabtitlecalendarreceiver",
		prop: "saledesc",
		type: "Input",
		width: "160"
	},
	{
		title: "快递签收人名称",
		label: "columnsamplepackageInfousername",
		prop: "username",
		type: "Number",
		width: "208"
	},
	{
		title: "领样完成日期",
		label: "columnsamplepackageInfotolabdate",
		prop: "tolabdate",
		type: "Date",
		width: "160"
	},
	{
		title: "领样人工号",
		label: "columnsamplepackageInforeceivepersoncode",
		prop: "receivepersoncode",
		type: "Input",
		width: "160"
	},
	{
		title: "领样人名称",
		label: "columnsamplepackageInforeceivepersondesc",
		prop: "receivepersondesc",
		type: "Input",
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
		title: "操作",
		label: "itemtitleloginoperation",
		prop: "operation",
		type: "operation",
		fixed: "right",
		width: "160"
	},
	{
		title: "id",
		label: "",
		prop: "spid",
		type: "id",
		width: "60",
		isHide: true
	},
	{
		title: "标签日期",
		label: "",
		prop: "labledate",
		type: "Date",
		width: "160",
		isHide: true
	}
]);

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/customerLabelManagement/samplepackage_query_audit.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/samplepackage/samplepackage!selectSamplepackageInfosByCond.action",
		root: "samplepackageInfos",
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
	id: "/customerLabelManagement/samplepackage_query_audit.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/samplepackage/samplepackage!selectSamplepackageInfosByCond.action",
		root: "samplepackageInfos",
		baseParams: {
			"cond.auditflag": "2"
		}
	},
	//表格表头
	tableColumns: tableColumns1,
	// 表格数据
	tableData: []
});

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
			samplepackageInfos: row
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

//新增弹出 参数
const newCustomerLabelList = reactive({
	success: false,
	dialogShow: false,
	spid: "",
	workflowflag: "3",
	errormsg: "N"
});

// 新增 弹出 回调
const newCustomerLabelClose = () => {
	if (newCustomerLabelList.success) {
		zTable1.value.getTableList();
	}
};

//工号标签弹出 参数
const jobNumberLabelList = reactive({
	dialogShow: false
});

//打开工号标签弹出层
const jobNumberLabelPrint = () => {
	jobNumberLabelList.dialogShow = true;
};

//条码标签弹出 参数
const barcodeLabelList = reactive({
	dialogShow: false,
	arrayList: []
});

//打印条码标签
const barcodeLabelPrint = rows => {
	barcodeLabelList.dialogShow = true;
	barcodeLabelList.arrayList = rows;
};

//地址标签弹出 参数
const addressLabelList = reactive({
	dialogShow: false
});

//打开地址标签弹出层
const batchAddressLabel = () => {
	addressLabelList.dialogShow = true;
};

//扫码领样 弹出参数
const scanningSampleForUpdateList = reactive({
	success: false,
	dialogShow: false,
	packagids: ""
});
//扫码领样
const scansampling = rows => {
	let packagid_ = "";
	if (rows.length > 0) {
		rows.forEach(item => {
			let rp = item.packagid;
			if (rp.indexOf("(") > 0) {
				packagid_ = packagid_ + rp.substring(0, rp.indexOf("(")) + ",";
			} else {
				packagid_ = packagid_ + rp + ",";
			}
		});
		packagid_ = packagid_.substring(0, packagid_.length - 1);
	}
	scanningSampleForUpdateList.packagids = packagid_;
	scanningSampleForUpdateList.success = false;
	scanningSampleForUpdateList.dialogShow = true;
};

const importsamplerecordsList = reactive({
	uploadUrl: "/crm/samplepackage/samplepackage!importTxtSamplepackageInfoSubmitBeforeCheck.action",
	uploadParameter: { jsonString: JSON.stringify({ uploadFile: { businesscode: "samplepackage", handletype: "1" } }) }, //参数
	success: false,
	dialogShow: false
});
//导入领样记录
const importsamplerecords = () => {
	importsamplerecordsList.dialogShow = true;
	importsamplerecordsList.success = false;
};
const importsamplerecordsClose = () => {
	if (importsamplerecordsList.success) {
		zTable1.value.getTableList();
	}
};

//链接详细信息
const linkDetailbg = (column, row) => {
	newCustomerLabelList.spid = row.spid;
	newCustomerLabelList.workflowflag = "2";
	newCustomerLabelList.errormsg = row.errormsg;
	newCustomerLabelList.success = false;
	newCustomerLabelList.dialogShow = true;
};

const linkDetailbgQuery = (column, row) => {
	newCustomerLabelList.spid = row.spid;
	newCustomerLabelList.workflowflag = "3";
	newCustomerLabelList.errormsg = row.errormsg;
	newCustomerLabelList.success = false;
	newCustomerLabelList.dialogShow = true;
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
	addressLabelPrintList.corpdesc = row.customername;
	addressLabelPrintList.contactdesc = row.contactdesc;
	addressLabelPrintList.tel = row.phone;
	addressLabelPrintList.address = row.address;
	addressLabelPrintList.dialogShow = true;
};

const tabPaneName = ref("0");
const tabPaneSet = new Set();
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case "0":
			// 客户创建信息
			zTable1.value.getTableList();
			break;
		case "1":
			// 客户创建信息查询
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
:deep(.barcodeLabelClass) {
	display: flex;
	flex-direction: column;
	margin-bottom: 0px !important;
	margin-top: 90px !important;
}
:deep(.importsamplerecordsClass) {
	display: flex;
	flex-direction: column;
	margin-bottom: 0px !important;
	margin-top: 120px !important;
	min-height: 400px;
}
</style>
