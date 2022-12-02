<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" type="border-card" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="infos"
				:label="$t('menubasequotationapp')"
				title1="报价申请"
			>
				<zTable
					ref="grid_appointmentInfos"
					:tableList="atableList"
					@link-detailbg="linkDetailbg"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="dialogShow('dialogShow_appointmentNew')">{{
							$t("SRM_add")
						}}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="batchDelete(scope.ids)"
							>{{ $t("SRM_delete") }}</el-button
						>
						<el-button size="small" type="success" icon="Check" plain>{{ $t("SRM_submit") }}</el-button>
						<el-button size="small" type="primary" icon="Document" plain @click="dialogShow('dialogShow_customerListQuery')">{{
							$t("SRM_copy")
						}}</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Download" @click="editAddress(scope.row)">
							{{ $t("menubasequotationorderdownload") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('itemtitlequotationquotationhis')"
				title1="历史报价单查询"
				name="query"
			>
				<zTable
					ref="grid_appointmentInfosQuery"
					:tableList="htableList"
					@link-detailbg="linkDetailbg"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="warning" icon="Back" plain>{{ $t("SRM_back") }}</el-button>

						<el-button size="small" type="primary" icon="Document" plain @click="dialogShow('dialogShow_customerListQuery')">{{
							$t("SRM_copy")
						}}</el-button>

						<el-button size="small" type="danger" icon="WarnTriangleFilled" plain>{{ $t("menu_abandoned") }}</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Download" @click="editAddress(scope.row)">
							{{ $t("menubasequotationorderdownload") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('menubaseDepartmentQuotationQuery')"
				title1="部门报价单查询"
				name="dept"
			>
				<zTable
					ref="grid_appointmentInfosDeptQuery"
					:tableList="dtableList"
					@link-detailbg="linkDetailbg"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Document" plain @click="dialogShow('dialogShow_customerListQuery')">{{
							$t("SRM_copy")
						}}</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Download" @click="editAddress(scope.row)">
							{{ $t("menubasequotationorderdownload") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('crm_UnprocessedQuotationInquiry')"
				title1="过期报价单查询"
				name="unprocessed"
			>
				<zTable
					ref="grid_appointmentInfosUnprocessedQuotationInquiry"
					:tableList="utableList"
					@link-detailbg="linkDetailbg"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Document" plain @click="dialogShow('dialogShow_customerListQuery')">{{
							$t("SRM_copy")
						}}</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Download" @click="editAddress(scope.row)">
							{{ $t("menubasequotationorderdownload") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('itemtitlequotationdiscardflag')"
				title1="废弃报价单查询"
				name="discardflag"
			>
				<zTable
					ref="grid_appointmentInfosQuery_discardflag"
					:tableList="htableList"
					@link-detailbg="linkDetailbg"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="success" icon="Open" plain @click="dialogShow('dialogShow_customerListQuery')">{{
							$t("SRM_enable")
						}}</el-button>
					</template>
					<!-- 表格操作 -->
					<template #operation="scope">
						<el-button type="primary" link icon="Download" @click="editAddress(scope.row)">
							{{ $t("menubasequotationorderdownload") }}
						</el-button>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_appointmentNew" @close="appointmentNewclose" width="95%">
				<appointmentNew :condobj="condobj"></appointmentNew>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_appointmentLink" @close="appointmentLinkclose" width="85%">
				<appointmentNew :condobj="condobj"></appointmentNew>
			</ZDialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import appointmentNew from "@/views/appointmentManage/appointmentApplication/appointment_detail.vue";

const i18n = useI18n();
const grid_appointmentInfos = ref();
const grid_appointmentInfosQuery = ref();
const grid_appointmentInfosDeptQuery = ref();
const grid_appointmentInfosUnprocessedQuotationInquiry = ref();
const grid_appointmentInfosQuery_discardflag = ref();

let v_reservnum = ""; //报价单号
let businesstype = "10"; //报价类型

const tableTabsValue = ref("infos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_APPOINTMENT",
	columnid: "reservnum"
});

const condobj = reactive({
	cond: {},
	objlist: {}
});
//dialog的是否显示
const dialogShow_customerListQuery = ref(false);
const dialogShow_appointmentNew = ref(false);
const dialogShow_appointmentLink = ref(false);

//页面初始化渲染完成执行
onMounted(() => {
	grid_appointmentInfos.value.getTableList();
});

const formData1 = reactive({
	// corpno: props.condobj.corpno ?? "",
	// corpnoold: props.condobj.corpnoold ?? "",
	// corpdesc: props.condobj.corpdesc ?? "",
	// corpenglishname: props.condobj.corpenglishname ?? "",
	// corpalias: props.condobj.corpalias ?? "",
	// businesslicenseno: props.condobj.businesslicenseno ?? "",
	// branchcorpdesc: props.condobj.branchcorpdesc ?? "",
	// departmentdesc: props.condobj.departmentdesc ?? "",
	// salesmandesc: props.condobj.salesmandesc ?? "",
	// corpemail: props.condobj.corpemail ?? "",
	// agentdesc: props.condobj.agentdesc ?? "",
	// country: props.condobj.country ?? "",
	// corplocation: props.condobj.corplocation ?? ""
});

//表格对象报价申请
const atableList = reactive({
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoByCond.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.auditflag": "0",
			"cond.businesstype": businesstype,
			"cond.recordercoderun": "Y"
		}
	},
	//快捷查询
	tablePropSearch: formData1,
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
			width: "60"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "reservnum",
			type: "Link",
			width: "160"
		},
		{
			title: "报价单下载",
			label: "menubasequotationorderdownload",
			prop: "operation",
			type: "operation"
		},
		{
			title: "委托检测公司（个人）",
			label: "crmcolumndesc15",
			prop: "desc15",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测编码",
			label: "crmcolumndesc13",
			prop: "desc13",
			type: "Input",
			width: "120"
		},
		{
			title: "委托日期",
			label: "columnappointment_desc21",
			prop: "desc21",
			type: "Input",
			width: "140"
		},
		{
			title: "样品名称",
			label: "panelcolumnsamplename",
			prop: "sampledesc",
			type: "Input",
			width: "160"
		},
		{
			title: "价格百分比",
			label: "itemtitlebase_userisdiscount",
			prop: "desc49",
			type: "Input",
			width: "120",
			isHide: true
		},
		{
			title: "折扣率",
			label: "columnappointmentdiscount",
			prop: "discountrate",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目原价",
			label: "appointmenttotaltestitemprice_hkd",
			prop: "desc35",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目折后",
			label: "appointmentcrmformtdHK",
			prop: "desc36",
			type: "Input",
			width: "120"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "desc33",
			type: "Input",
			width: "120"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "desc53",
			type: "Input",
			width: "120"
		},
		{
			title: "外币价格",
			label: "columnbaseforeignCuurPeice",
			prop: "desc34",
			type: "Input",
			width: "120"
		},
		{
			title: "委托检测公司电话",
			label: "columnappointment_desc18",
			prop: "desc18",
			type: "Input",
			width: "160"
		},
		{
			title: "SE姓名",
			label: "crmcolumndesc81",
			prop: "desc81",
			type: "Input",
			width: "120"
		},
		{
			title: "SE电话",
			label: "crmcolumndesc82",
			prop: "desc82",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理编号",
			label: "corpinfopanelqydlsbmtitle",
			prop: "accountid",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理名称",
			label: "corpinfopanelqydlsmctitle",
			prop: "samplesender",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理佣金点",
			label: "itemtitlefoldersagentbrokerage",
			prop: "accounttype",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "140"
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
			title: "样品备注",
			label: "panelcolumnsampleRemarks",
			prop: "desc93",
			type: "Input",
			width: "160"
		},
		{
			title: "检验类型",
			label: "columnBusinessdesc",
			prop: "businesstype",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "提报单位",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "审核人编码",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "审核人名称",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "审核时间",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "审核级别",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "是否已退回",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "退回人编码",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "退回人名称",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "退回时间",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "制单人单位",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "审核节点名称",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "错误信息",
			label: "错误信息",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "workflowid",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "提交时间",
			prop: "submittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "所属单位",
			label: "所属单位",
			prop: "corpdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "单位编码",
			label: "单位编码",
			prop: "corpcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc65",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc80",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc63",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "desc62",
			label: "desc62",
			prop: "desc62",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格对象历史报价单查询
const htableList = reactive({
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoRightByCond.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.businesstype": businesstype,
			"cond.discardflag": "0",
			"cond.condition": "0"
		}
	},
	//快捷查询
	tablePropSearch: formData1,
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
			width: "60"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "reservnum",
			type: "Link",
			width: "160"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "desc71",
			type: "Input",
			width: "140"
		},
		{
			title: "报价单下载",
			label: "menubasequotationorderdownload",
			prop: "operation",
			type: "operation"
		},
		{
			title: "委托检测公司（个人）",
			label: "crmcolumndesc15",
			prop: "desc15",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测编码",
			label: "crmcolumndesc13",
			prop: "desc13",
			type: "Input",
			width: "120"
		},
		{
			title: "委托日期",
			label: "columnappointment_desc21",
			prop: "desc21",
			type: "Input",
			width: "140"
		},
		{
			title: "样品名称",
			label: "panelcolumnsamplename",
			prop: "sampledesc",
			type: "Input",
			width: "160"
		},
		{
			title: "价格百分比",
			label: "itemtitlebase_userisdiscount",
			prop: "desc49",
			type: "Input",
			width: "120",
			isHide: true
		},
		{
			title: "折扣率",
			label: "columnappointmentdiscount",
			prop: "discountrate",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目原价",
			label: "appointmenttotaltestitemprice_hkd",
			prop: "desc35",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目折后",
			label: "appointmentcrmformtdHK",
			prop: "desc36",
			type: "Input",
			width: "120"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "desc33",
			type: "Input",
			width: "120"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "desc53",
			type: "Input",
			width: "120"
		},
		{
			title: "外币价格",
			label: "columnbaseforeignCuurPeice",
			prop: "desc34",
			type: "Input",
			width: "120"
		},
		{
			title: "委托检测公司电话",
			label: "columnappointment_desc18",
			prop: "desc18",
			type: "Input",
			width: "160"
		},
		{
			title: "SE姓名",
			label: "crmcolumndesc81",
			prop: "desc81",
			type: "Input",
			width: "120"
		},
		{
			title: "SE电话",
			label: "crmcolumndesc82",
			prop: "desc82",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理编号",
			label: "corpinfopanelqydlsbmtitle",
			prop: "accountid",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理名称",
			label: "corpinfopanelqydlsmctitle",
			prop: "samplesender",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理佣金点",
			label: "itemtitlefoldersagentbrokerage",
			prop: "accounttype",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "140"
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
			title: "样品备注",
			label: "panelcolumnsampleRemarks",
			prop: "desc93",
			type: "Input",
			width: "160"
		},
		{
			title: "检验类型",
			label: "columnBusinessdesc",
			prop: "businesstype",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "废弃标识",
			label: "废弃标识",
			prop: "discardflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "提报单位",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "审核人编码",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "审核人名称",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "审核时间",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "审核级别",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "是否已退回",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "退回人编码",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "退回人名称",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "退回时间",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "制单人单位",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "审核节点名称",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "错误信息",
			label: "错误信息",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "workflowid",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "提交时间",
			prop: "submittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "所属单位",
			label: "所属单位",
			prop: "corpdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "单位编码",
			label: "单位编码",
			prop: "corpcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc65",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc80",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc63",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "desc62",
			label: "desc62",
			prop: "desc62",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格对象部门报价单查询
const dtableList = reactive({
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoRightByCond.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.businesstype": businesstype,
			"cond.discardflag": "0",
			"cond.condition": "0",
			"cond.queryinfo": "Y"
		}
	},
	//快捷查询
	tablePropSearch: formData1,
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
			width: "60"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "reservnum",
			type: "Link",
			width: "160"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "desc71",
			type: "Input",
			width: "140"
		},
		{
			title: "报价单下载",
			label: "menubasequotationorderdownload",
			prop: "operation",
			type: "operation"
		},
		{
			title: "委托检测公司（个人）",
			label: "crmcolumndesc15",
			prop: "desc15",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测编码",
			label: "crmcolumndesc13",
			prop: "desc13",
			type: "Input",
			width: "120"
		},
		{
			title: "委托日期",
			label: "columnappointment_desc21",
			prop: "desc21",
			type: "Input",
			width: "140"
		},
		{
			title: "样品名称",
			label: "panelcolumnsamplename",
			prop: "sampledesc",
			type: "Input",
			width: "160"
		},
		{
			title: "价格百分比",
			label: "itemtitlebase_userisdiscount",
			prop: "desc49",
			type: "Input",
			width: "120",
			isHide: true
		},
		{
			title: "折扣率",
			label: "columnappointmentdiscount",
			prop: "discountrate",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目原价",
			label: "appointmenttotaltestitemprice_hkd",
			prop: "desc35",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目折后",
			label: "appointmentcrmformtdHK",
			prop: "desc36",
			type: "Input",
			width: "120"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "desc33",
			type: "Input",
			width: "120"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "desc53",
			type: "Input",
			width: "120"
		},
		{
			title: "外币价格",
			label: "columnbaseforeignCuurPeice",
			prop: "desc34",
			type: "Input",
			width: "120"
		},
		{
			title: "委托检测公司电话",
			label: "columnappointment_desc18",
			prop: "desc18",
			type: "Input",
			width: "160"
		},
		{
			title: "SE姓名",
			label: "crmcolumndesc81",
			prop: "desc81",
			type: "Input",
			width: "120"
		},
		{
			title: "SE电话",
			label: "crmcolumndesc82",
			prop: "desc82",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理编号",
			label: "corpinfopanelqydlsbmtitle",
			prop: "accountid",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理名称",
			label: "corpinfopanelqydlsmctitle",
			prop: "samplesender",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理佣金点",
			label: "itemtitlefoldersagentbrokerage",
			prop: "accounttype",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "140"
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
			title: "样品备注",
			label: "panelcolumnsampleRemarks",
			prop: "desc93",
			type: "Input",
			width: "160"
		},
		{
			title: "检验类型",
			label: "columnBusinessdesc",
			prop: "businesstype",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "废弃标识",
			label: "废弃标识",
			prop: "discardflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "提报单位",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "审核人编码",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "审核人名称",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "审核时间",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "审核级别",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "是否已退回",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "退回人编码",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "退回人名称",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "退回时间",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "制单人单位",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "审核节点名称",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "错误信息",
			label: "错误信息",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "workflowid",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "提交时间",
			prop: "submittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "所属单位",
			label: "所属单位",
			prop: "corpdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "单位编码",
			label: "单位编码",
			prop: "corpcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc65",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc80",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc63",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "desc62",
			label: "desc62",
			prop: "desc62",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格对象过期报价单查询
const utableList = reactive({
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoRightByCond.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.businesstype": businesstype,
			"cond.discardflag": "0",
			"cond.condition": "1"
		}
	},
	//快捷查询
	tablePropSearch: formData1,
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
			width: "60"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "reservnum",
			type: "Link",
			width: "160"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "desc71",
			type: "Input",
			width: "140"
		},
		{
			title: "报价单下载",
			label: "menubasequotationorderdownload",
			prop: "operation",
			type: "operation"
		},
		{
			title: "委托检测公司（个人）",
			label: "crmcolumndesc15",
			prop: "desc15",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测编码",
			label: "crmcolumndesc13",
			prop: "desc13",
			type: "Input",
			width: "120"
		},
		{
			title: "委托日期",
			label: "columnappointment_desc21",
			prop: "desc21",
			type: "Input",
			width: "140"
		},
		{
			title: "样品名称",
			label: "panelcolumnsamplename",
			prop: "sampledesc",
			type: "Input",
			width: "160"
		},
		{
			title: "价格百分比",
			label: "itemtitlebase_userisdiscount",
			prop: "desc49",
			type: "Input",
			width: "120",
			isHide: true
		},
		{
			title: "折扣率",
			label: "columnappointmentdiscount",
			prop: "discountrate",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目原价",
			label: "appointmenttotaltestitemprice_hkd",
			prop: "desc35",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目折后",
			label: "appointmentcrmformtdHK",
			prop: "desc36",
			type: "Input",
			width: "120"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "desc33",
			type: "Input",
			width: "120"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "desc53",
			type: "Input",
			width: "120"
		},
		{
			title: "外币价格",
			label: "columnbaseforeignCuurPeice",
			prop: "desc34",
			type: "Input",
			width: "120"
		},
		{
			title: "委托检测公司电话",
			label: "columnappointment_desc18",
			prop: "desc18",
			type: "Input",
			width: "160"
		},
		{
			title: "SE姓名",
			label: "crmcolumndesc81",
			prop: "desc81",
			type: "Input",
			width: "120"
		},
		{
			title: "SE电话",
			label: "crmcolumndesc82",
			prop: "desc82",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理编号",
			label: "corpinfopanelqydlsbmtitle",
			prop: "accountid",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理名称",
			label: "corpinfopanelqydlsmctitle",
			prop: "samplesender",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理佣金点",
			label: "itemtitlefoldersagentbrokerage",
			prop: "accounttype",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "140"
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
			title: "样品备注",
			label: "panelcolumnsampleRemarks",
			prop: "desc93",
			type: "Input",
			width: "160"
		},
		{
			title: "检验类型",
			label: "columnBusinessdesc",
			prop: "businesstype",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "废弃标识",
			label: "废弃标识",
			prop: "discardflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "提报单位",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "审核人编码",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "审核人名称",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "审核时间",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "审核级别",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "是否已退回",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "退回人编码",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "退回人名称",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "退回时间",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "制单人单位",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "审核节点名称",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "错误信息",
			label: "错误信息",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "workflowid",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "提交时间",
			prop: "submittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "所属单位",
			label: "所属单位",
			prop: "corpdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "单位编码",
			label: "单位编码",
			prop: "corpcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc65",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc80",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc63",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "desc62",
			label: "desc62",
			prop: "desc62",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格对象废弃报价单查询
const discard_tableList = reactive({
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoRightByCond.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.businesstype": businesstype,
			"cond.discardflag": "0",
			"cond.condition": "1"
		}
	},
	//快捷查询
	tablePropSearch: formData1,
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
			width: "60"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "reservnum",
			type: "Link",
			width: "160"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "desc71",
			type: "Input",
			width: "140"
		},
		{
			title: "报价单下载",
			label: "menubasequotationorderdownload",
			prop: "operation",
			type: "operation"
		},
		{
			title: "委托检测公司（个人）",
			label: "crmcolumndesc15",
			prop: "desc15",
			type: "Input",
			width: "160"
		},
		{
			title: "委托检测编码",
			label: "crmcolumndesc13",
			prop: "desc13",
			type: "Input",
			width: "120"
		},
		{
			title: "委托日期",
			label: "columnappointment_desc21",
			prop: "desc21",
			type: "Input",
			width: "140"
		},
		{
			title: "样品名称",
			label: "panelcolumnsamplename",
			prop: "sampledesc",
			type: "Input",
			width: "160"
		},
		{
			title: "价格百分比",
			label: "itemtitlebase_userisdiscount",
			prop: "desc49",
			type: "Input",
			width: "120",
			isHide: true
		},
		{
			title: "折扣率",
			label: "columnappointmentdiscount",
			prop: "discountrate",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目原价",
			label: "appointmenttotaltestitemprice_hkd",
			prop: "desc35",
			type: "Input",
			width: "120"
		},
		{
			title: "检测项目折后",
			label: "appointmentcrmformtdHK",
			prop: "desc36",
			type: "Input",
			width: "120"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "desc33",
			type: "Input",
			width: "120"
		},
		{
			title: "币种",
			label: "columnappointmentdesc53",
			prop: "desc53",
			type: "Input",
			width: "120"
		},
		{
			title: "外币价格",
			label: "columnbaseforeignCuurPeice",
			prop: "desc34",
			type: "Input",
			width: "120"
		},
		{
			title: "委托检测公司电话",
			label: "columnappointment_desc18",
			prop: "desc18",
			type: "Input",
			width: "160"
		},
		{
			title: "SE姓名",
			label: "crmcolumndesc81",
			prop: "desc81",
			type: "Input",
			width: "120"
		},
		{
			title: "SE电话",
			label: "crmcolumndesc82",
			prop: "desc82",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理编号",
			label: "corpinfopanelqydlsbmtitle",
			prop: "accountid",
			type: "Input",
			width: "140"
		},
		{
			title: "销售代理名称",
			label: "corpinfopanelqydlsmctitle",
			prop: "samplesender",
			type: "Input",
			width: "160"
		},
		{
			title: "销售代理佣金点",
			label: "itemtitlefoldersagentbrokerage",
			prop: "accounttype",
			type: "Input",
			width: "160"
		},
		{
			title: "创建人编码",
			label: "columnCreatehumancoding",
			prop: "recordercode",
			type: "Input",
			width: "140"
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
			title: "样品备注",
			label: "panelcolumnsampleRemarks",
			prop: "desc93",
			type: "Input",
			width: "160"
		},
		{
			title: "检验类型",
			label: "columnBusinessdesc",
			prop: "businesstype",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "废弃标识",
			label: "废弃标识",
			prop: "discardflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提报单位",
			label: "提报单位",
			prop: "submitcorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人编码",
			label: "审核人编码",
			prop: "auditorcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核人名称",
			label: "审核人名称",
			prop: "auditordesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核时间",
			label: "审核时间",
			prop: "audittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核级别",
			label: "审核级别",
			prop: "auditlevel",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已退回",
			label: "是否已退回",
			prop: "retrieveflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "退回人编码",
			prop: "retrievercode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "退回人名称",
			prop: "retrieverdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "退回时间",
			label: "退回时间",
			prop: "retrievetime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "制单人单位",
			prop: "recordercorp",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "审核节点名称",
			prop: "auditlevelname",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "错误信息",
			label: "错误信息",
			prop: "errormsg",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "workflowid",
			label: "workflowid",
			prop: "workflowid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提交时间",
			label: "提交时间",
			prop: "submittime",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "所属单位",
			label: "所属单位",
			prop: "corpdesc",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "单位编码",
			label: "单位编码",
			prop: "corpcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc65",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc80",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "...",
			label: "...",
			prop: "desc63",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "desc62",
			label: "desc62",
			prop: "desc62",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//工作流审核历史记录
const workflowStatus = (column, row) => {
	auditList.codeid = row[auditList.columnid];
	auditList.dialogShow_audit = true;
};

//当表格的当前行发生变化的时候会触发该事件
const tableCurrentChange1 = (currentRow, oldCurrentRow) => {
	// console.log(currentRow);
	// console.log(oldCurrentRow);
};

//新增子页面关闭后的方法可以给父页面赋值等操作
const appointmentNewclose = () => {
	//选择联系人的关闭窗口后的事件
	grid_appointmentInfos.value.getTableList();
};

//从报价单号进入的页面关闭后方法
let appointmentLinkclose = () => {
	//点击报价单号后关闭窗口
	console.log("###############");
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
			ElMessage({
				type: "success",
				message: i18n.t("Message_deleteSuccess")
			});
			grid_appointmentInfos.value.getTableList();
		}
	});
};
let returnValue = {};
let getappointmentNew = async reservnums => {
	if (!reservnums) {
		reservnums = "";
	}
	let jsonString = {};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/mylims/order/appointment!setValueFordesc95.action", qs.stringify(params));
	if (res) {
		returnValue = res;
		//选择委托单位
		condobj.cond = {
			businesstype: "10",
			workflowflag: "1",
			reservnum: reservnums,
			defaulttax: returnValue.defaulttax,
			isdefaulttax: returnValue.isdefaulttax
		};
		condobj.dialogShow_appointmentNew = true;
	}
};

//链接详细信息
const linkDetailbg = (column, row) => {
	console.log(column, row);
	if (column == "reservnum" && row.reservnum) {
		getappointmentNew(row.reservnum);
	}
};

// 显示dialog
const dialogShow = data => {
	if (data == "dialogShow_customerListQuery") {
		dialogShow_customerListQuery.value = true;
	} else if (data == "dialogShow_appointmentNew") {
		getappointmentNew();
		//获取部门的增值税包括PKM字段返回 （重点）：
	} else if (data == "dialogShow_appointmentLink") {
		console.log();
		getappointmentNew();
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "infos") {
		//报价单申请子页面
		grid_appointmentInfos.value.getTableList();
	} else if (targetName == "query") {
		//历史报价单查询子页面
		grid_appointmentInfosQuery.value.getTableList();
	} else if (targetName == "dept") {
		//部门报价单查询子页面
		grid_appointmentInfosDeptQuery.value.getTableList();
	} else if (targetName == "unprocessed") {
		//过期报价单查询子页面
		grid_appointmentInfosUnprocessedQuotationInquiry.value.getTableList();
	} else if (targetName == "discardflag") {
		//废弃报价单查询子页面
		grid_appointmentInfosQuery_discardflag.value.getTableList();
	}

	// if (targetName == 5) {
	// 	setTimeout(() => {
	// 		tableTabsValue.value = 0;
	// 		ElMessage({
	// 			message: '请填写关键信息并保存企业基本信息！',
	// 			type: 'warning',
	// 			offset: 50,
	// 			showClose: true,
	// 			grouping: true,
	// 			duration: 6000,
	// 		});
	// 	}, 10);
	// }
};
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
