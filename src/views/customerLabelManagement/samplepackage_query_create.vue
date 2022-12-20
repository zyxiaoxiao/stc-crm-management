<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="客户标签申请"
				:label="$t('menubaseCustomerLabelApplication')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="dialogShow('dialogShow_companyDetailNew')">{{
							$t("menu_new")
						}}</el-button>
						<el-button
							size="small"
							type="primary"
							icon="DocumentCopy"
							plain
							:disabled="!scope.isSelected"
							@click="dialogShow('dialogShow_companyDetailNew')"
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
						<el-button size="small" type="primary" icon="Upload" plain @click="importsamplerecords"
							>{{ $t("menu_importsamplerecords") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="客户标签查询"
				:label="$t('menubaseCustomerLabelQuery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery">
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
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Edit" @click="editContact(scope.row)">
							{{ $t("editContact") }}
						</el-button>
						<el-button type="primary" link icon="CirclePlus" @click="editContactAddress(scope.row)">
							{{ $t("SRM_selectAddress") }}
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

		<!-- <div v-dialogStretching>
			<ZDialog v-model="importsamplerecordsList.dialogShow" width="50%">
				<uploadAttachment :condobj="importsamplerecordsList"></uploadAttachment>
			</ZDialog>
		</div> -->
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
import jobNumberLabel from "./jobNumberLabel.vue";
import barcodeLabel from "./barcodeLabel.vue";
import addressLabel from "./delivers_print_addresslabel.vue";
import uploadAttachment from "./uploadAttachment.vue";

const i18n = useI18n();

const customerCustomertype = getdropSownSelection("customer_customertype");
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
	id: "/customerLabelManagement/samplepackage_query_create.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/samplepackage/samplepackage!selectSamplepackageInfosByCond.action",
		root: "samplepackageInfos",
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
	id: "/customerLabelManagement/samplepackage_query_create.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/crm/samplepackage/samplepackage!selectSamplepackageInfosByCond.action",
		root: "samplepackageInfos",
		baseParams: {
			"cond.auditflag": "1,2"
		}
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
		}
	],
	// 表格数据
	tableData: []
});

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
