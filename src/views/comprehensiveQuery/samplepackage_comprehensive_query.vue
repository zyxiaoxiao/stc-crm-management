<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbgQuery">
			<!-- 表格操作 -->
			<template #operation="scope">
				<el-button type="primary" link icon="CollectionTag" @click="batchAddressLabelPrint(scope.row)">
					{{ $t("menu_havelabels") }}
				</el-button>
			</template>
		</zTable>
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
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import samplepackageworkflowdetail from "../customerLabelManagement/samplepackage_workflow_detail.vue";
import addressLabelPrint from "../customerLabelManagement/addressLabel.vue";

const itemtitleauditflag = getdropSownSelection("itemtitleauditflag");

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/comprehensiveQuery/samplepackage_comprehensive_query.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/samplepackage/samplepackage!selectSamplepackageInfosByCond.action",
		root: "samplepackageInfos",
		baseParams: { "cond.auditflag": "2", "cond.corprightoruser": "Y" }
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
