<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tabPaneName" @tab-change="tabChange">
			<el-tab-pane
				title1="报价拆分"
				:label="$t('menubaseQuotationsplit')"
				class="main-tab-pane-content all-height flex-column"
				name="0"
			>
				<zTable ref="zTable1" :tableList="tableList1" @link-detailbg="linkDetailbg" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button
							size="small"
							type="primary"
							icon="DocumentCopy"
							plain
							:disabled="!scope.isSelected"
							@click="split_handler(scope.selectList)"
							>{{ $t("menu_split") }}</el-button
						>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				title1="报价拆分查询"
				:label="$t('menubaseQuotationsplitquery')"
				class="main-tab-pane-content all-height flex-column"
				name="1"
			>
				<zTable ref="zTable2" :tableList="tableList2" @link-detailbg="linkDetailbgQuery" @workflow-status="workflowStatus">
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<!-- 审核历史 -->
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow" :title="$t('menu_auditOpinion')" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<!-- 拆分 -->
		<div v-dialogStretching>
			<ZDialog v-model="appointmentsplitdetailList.dialogShow" width="98%" @close="split_handlerClose">
				<appointmentsplitdetail :condobj="appointmentsplitdetailList"></appointmentsplitdetail>
			</ZDialog>
		</div>
		<!--<div v-dialogStretching>
			<ZDialog v-model="customerNew.dialogShow" title="" width="95%" @close="customerNewClose">
				<companyDetailNew :condobj="customerNew"></companyDetailNew>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="customerNewReadonly.dialogShow" title="" width="95%">
				<companyDetailNewReadonly :condobj="customerNewReadonly"></companyDetailNewReadonly>
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

import audit from "@/views/audit/index.vue";
//import customerListQuery from "../customerQuery/customer_list_query.vue";
//import companyDetailNew from "./company_detail_new.vue";
//import companyDetailNewReadonly from "../customerReadonly/company_detail_new_readonly.vue";
import appointmentsplitdetail from "./appointment_splitdetail.vue";

import { getdropSownSelection } from "@/utils/util.js";

const i18n = useI18n();

const businesstypeTypeData = getdropSownSelection("CRM_businessCategory");

//审核记录
const auditList = reactive({
	dialogShow: false,
	codeid: "",
	tablename: "MLS_APPOINTMENT",
	columnid: "reservnum"
});

//拆分弹出参数
const appointmentsplitdetailList = reactive({
	dialogShow: false,
	reservnum: "",
	success: false
});
//拆分
const split_handler = row => {
	appointmentsplitdetailList.dialogShow = true;
	appointmentsplitdetailList.reservnum = row[0].reservnum;
	appointmentsplitdetailList.success = false;
};

//拆分回调
const split_handlerClose = () => {
	if (appointmentsplitdetailList.success) {
		tabPaneName.value = "1";
	}
};

//表格
const zTable1 = ref();
//表格对象
const tableList1 = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_splitquery_list.vue_zTable1",
	//设置 为单选
	isRadio: true,
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectIntegratedAppointmentquery.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.auditflag": "2",
			"cond.parentid": "0",
			"cond.businesstype": "10",
			"cond.isFoldersFlag": "true",
			"cond.splitflag": "true",
			"cond.condition": "0"
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
			width: "120"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "reservnum",
			type: "Link",
			width: "160"
		},
		{
			title: "委托检测公司（个人）",
			label: "crmcolumndesc15",
			prop: "desc15",
			type: "Input",
			width: "160"
		},
		{
			title: "委托日期",
			label: "columnappointment_desc21",
			prop: "desc21",
			type: "Date",
			width: "160"
		},
		{
			title: "样品备注",
			label: "panelcolumnsampleRemarks",
			prop: "desc93",
			type: "Input",
			width: "160"
		},
		{
			title: "折扣率",
			label: "columnappointmentdiscount",
			prop: "discountrate",
			type: "Input",
			width: "160"
		},
		{
			title: "检测项目原价",
			label: "appointmenttotaltestitemprice_hkd",
			prop: "desc35",
			type: "Input",
			width: "160"
		},
		{
			title: "检测项目折后",
			label: "appointmentcrmformtdHK",
			prop: "desc36",
			type: "Input",
			width: "160"
		},
		{
			title: "总价",
			label: "columnappointmentdesc52",
			prop: "desc52",
			type: "Input",
			width: "160"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "desc53",
			type: "Input",
			width: "160"
		},
		{
			title: "外币价格",
			label: "columnbaseforeignCuurPeice",
			prop: "desc34",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测公司电话",
			label: "crmcolumndesc18",
			prop: "desc18",
			type: "Input",
			width: "160"
		},
		{
			title: "SE姓名",
			label: "crmcolumndesc81",
			prop: "desc81",
			type: "Input",
			width: "160"
		},
		{
			title: "SE电话",
			label: "crmcolumndesc82",
			prop: "desc82",
			type: "Input",
			width: "160"
		},
		{
			title: "样品名称",
			label: "crmcolumnsampledesc",
			prop: "sampledesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人名称",
			label: "i18ncrmcontractCreatePersonName",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "corpinfopanelqycjsjtitle",
			prop: "recordertime",
			type: "DateTime",
			width: "160"
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
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "检验类型",
			label: "columnBusinessdesc",
			prop: "businesstype",
			type: "Select",
			typeData: businesstypeTypeData,
			width: "160",
			isHide: true
		},
		{
			title: "所属单位",
			label: "itemtitlebase_usercorpdesc",
			prop: "corpdesc",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "单位编码",
			label: "",
			prop: "corpcode",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "折扣率",
			label: "",
			prop: "desc49",
			type: "Input",
			width: "160",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

const zTable2 = ref();
//表格对象
const tableList2 = reactive({
	id: "/appointmentManage/appointmentApplication/appointment_splitquery_list.vue_zTable2",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectIntegratedAppointmentquery.action",
		root: "appointmentInfos",
		baseParams: { "cond.auditflag": "2", "cond.businesstype": "10", "cond.splitquery": "ture", "cond.condition": "0" }
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
			width: "115"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "reservnum",
			type: "Link",
			width: "160"
		},
		{
			title: "拆分报价单编号",
			label: "columnQuotationsplitnumber",
			prop: "parentid",
			type: "Link",
			width: "160"
		},
		{
			title: "委托检测公司（个人）",
			label: "crmcolumndesc15",
			prop: "desc15",
			type: "Input",
			width: "160"
		},
		{
			title: "委托日期",
			label: "columnappointment_desc21",
			prop: "desc21",
			type: "Date",
			width: "160"
		},
		{
			title: "样品备注",
			label: "panelcolumnsampleRemarks",
			prop: "desc93",
			type: "Input",
			width: "160"
		},
		{
			title: "折扣率",
			label: "columnappointmentdiscount",
			prop: "discountrate",
			type: "Input",
			width: "160"
		},
		{
			title: "检测项目原价",
			label: "appointmenttotaltestitemprice_hkd",
			prop: "desc35",
			type: "Input",
			width: "160"
		},
		{
			title: "检测项目折后",
			label: "appointmentcrmformtdHK",
			prop: "desc36",
			type: "Input",
			width: "160"
		},
		{
			title: "总价",
			label: "columnappointmentdesc52",
			prop: "desc52",
			type: "Input",
			width: "160"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "desc53",
			type: "Input",
			width: "160"
		},
		{
			title: "外币价格",
			label: "columnbaseforeignCuurPeice",
			prop: "desc34",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测公司电话",
			label: "crmcolumndesc18",
			prop: "desc18",
			type: "Input",
			width: "160"
		},
		{
			title: "SE姓名",
			label: "crmcolumndesc81",
			prop: "desc81",
			type: "Input",
			width: "160"
		},
		{
			title: "SE电话",
			label: "crmcolumndesc82",
			prop: "desc82",
			type: "Input",
			width: "160"
		},
		{
			title: "样品名称",
			label: "crmcolumnsampledesc",
			prop: "sampledesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人名称",
			label: "i18ncrmcontractCreatePersonName",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "corpinfopanelqycjsjtitle",
			prop: "recordertime",
			type: "DateTime",
			width: "160"
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
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "检验类型",
			label: "columnBusinessdesc",
			prop: "businesstype",
			type: "Select",
			typeData: businesstypeTypeData,
			width: "160",
			isHide: true
		},
		{
			title: "所属单位",
			label: "itemtitlebase_usercorpdesc",
			prop: "corpdesc",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "单位编码",
			label: "",
			prop: "corpcode",
			type: "Input",
			width: "160",
			isHide: true
		},
		{
			title: "折扣率",
			label: "",
			prop: "desc49",
			type: "Input",
			width: "160",
			isHide: true
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

const tabPaneName = ref("0");
const tabPaneSet = new Set();
const tabChange = TabPaneName => {
	switch (TabPaneName) {
		case "1":
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
