<template>
	<div class="all-height flex-column main-card" style="padding: 10px; padding-top: 0px">
		<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbgQuery" @workflow-status="workflowStatus"> </zTable>

		<!-- 地址标签弹出层 -->
		<div v-dialogStretching>
			<ZDialog v-model="addressLabelList.dialogShow" title1="已有标签地址" :title="$t('columnexistingAddressLabel')" width="95%">
				<addressLabel :condobj="addressLabelList"></addressLabel>
			</ZDialog>
		</div>

		<!-- 新增弹出 -->
		<div v-dialogStretching>
			<ZDialog v-model="deliverysworkflowdetailList.dialogShow" width="95%" @close="deliverysworkflowdetailClose">
				<deliverysworkflowdetail :condobj="deliverysworkflowdetailList"></deliverysworkflowdetail>
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

		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted, h } from "vue";
import { GlobalStore } from "@/store/globalStore.js";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import { getdropSownSelection } from "@/utils/util.js";
import audit from "@/views/audit/index.vue";
import { downloadFile } from "/src/utils/fileUtil.js";
import addressLabel from "../customerLabelManagement/delivers_print_addresslabel.vue";
import addressLabelPrint from "../customerLabelManagement/addressLabel.vue";
import deliverysworkflowdetail from "../expressServiceManagement/deliverys_workflow_detail.vue";

const globalStore = GlobalStore();

const addresstypeAr = getdropSownSelection("crm_addresstype");
const crm_kdfwlx = getdropSownSelection("crm_kdfwlx");
//是否
const whetherAr = getdropSownSelection("whether");

const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/comprehensiveQuery/deliverys_query_list.vue_zTable1",
	//请求属性设置
	httpAttribute: {
		url: "/crm/deliverys/deliverys!selectDeliverysInfosByCond.action",
		root: "deliverysInfos",
		baseParams: {
			"cond.recordercodequery": globalStore.userInfo.usercode,
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
		}
	],
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
