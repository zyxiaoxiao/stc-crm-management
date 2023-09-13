<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="cinfos"
				:label="$t('menubasequotationconfirm')"
				title1="报价确认"
			>
				<zTable
					ref="grid_confirmappointmentInfos"
					:tableList="atableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="success" icon="Check" plain @click="passAppointmentInfo('0', scope.selectList)">{{
							$t("menu_passconfirm")
						}}</el-button>
						<el-button size="small" type="danger" icon="Close" plain @click="passAppointmentInfo('1', scope.selectList)">{{
							$t("menu_refuseconfirm")
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
				:label="$t('crmcolumnconfirmquery')"
				title1="报价确认查询"
				name="cquery"
			>
				<zTable
					ref="grid_queryAppointmentInfos"
					:tableList="htableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
					<!-- 自定义 -->
					<template #Custom="scope">
						<span v-if="scope.column == 'download'" style="color: red; font-weight: bold; font-size: medium">
							<el-button type="primary" link icon="Download" @click="editAddress(scope.row)">
								{{ $t("menubasequotationorderdownload") }}
							</el-button></span
						>
						<span v-if="scope.column == 'payment'" style="color: red; font-weight: bold; font-size: medium">
							<el-button type="primary" link icon="Download" @click="editPaymentAdvice(scope.row)">
								{{ $t("menubasePayment_Advice") }}
							</el-button></span
						>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>

		<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_appointmentNew" width="95%">
			<appointmentNew :condobj="condobj"></appointmentNew>
		</ZDialog>

		<el-dialog v-model="dialogFormVisible" :title="$t('DOWNLOAD_download')">
			<el-form :model="dform" style="margin: 25px 15px">
				<el-form-item :label="$t('columntitleOrdinarycustomers') + ':'" title1="普通客户" label-width="140px">
					<el-radio-group v-model="plain">
						<el-radio label="CN">{{ $t("SRM_LANG_CN") }}</el-radio>
						<el-radio label="CN2">{{ $t("SRM_LANG_CN2") }}</el-radio>
						<el-radio label="EN">{{ $t("SRM_LANG_EN") }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label="$t('panelcolumncontractcustomer') + ':'" title1="协议客户" label-width="140px">
					<el-radio-group v-model="plain">
						<el-radio label="CONTRACT_CN">{{ $t("SRM_LANG_CN") }}</el-radio>
						<el-radio label="CONTRACT_CN2">{{ $t("SRM_LANG_CN2") }}</el-radio>
						<el-radio label="CONTRACT_EN">{{ $t("SRM_LANG_EN") }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item
					:label="$t('menubaseCertificationType') + ':'"
					v-if="certificationshow"
					title1="认证类型"
					prop="attestation"
					label-width="140px"
				>
					<el-select v-model="attestation" filterable placeholder="Select">
						<el-option v-for="item in attestationData" :key="item.value" :label="item.label" :value="item.value" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">{{ $t("SRM_cancel") }}</el-button>
					<el-button type="primary" @click="downloadAppointment()"> {{ $t("SRM_ok") }}</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog v-model="dialogFormPaymentVisible" :title="$t('DOWNLOAD_download')">
			<el-form :model="dform" style="margin: 25px 15px">
				<el-form-item label="Can Display :" title1="Can Display" label-width="140px">
					<el-checkbox-group v-model="paymenttype">
						<el-checkbox :label="$t('columnappointmentCurrencyUnitPrice')" name="price" />
						<el-checkbox :label="$t('columnappointmentdiscount')" name="payment" />
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormPaymentVisible = false">{{ $t("SRM_cancel") }}</el-button>
					<el-button type="primary" @click="downloadFormPayment()"> {{ $t("SRM_ok") }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage, ElDatePicker } from "element-plus";
import { downloadFile } from "/src/utils/fileUtil.js";
import { GlobalStore } from "/src/store/globalStore.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import moment from "moment";
import appointmentNew from "@/views/appointmentManage/appointmentApplication/appointment_detail.vue";

const i18n = useI18n();
const grid_confirmappointmentInfos = ref();
const grid_queryAppointmentInfos = ref();

let v_reservnum = ""; //报价单号
let businesstype = "10"; //报价类型

const tableTabsValue = ref("cinfos");
const globalStore = GlobalStore();
let attestation = ref("01"); //下载报价单认证类型默认值
let certificationshow = ref(false); //认证类型默认不显示
const plain = ref("CN"); //下载默认选中
const paymenttype = ref([i18n.t("columnappointmentCurrencyUnitPrice"), i18n.t("columnappointmentdiscount")]); //下载默认选中
//认证类型下拉值
const attestationData = [
	{
		value: "01",
		label: "General"
	},
	{
		value: "02",
		label: "STC Tested Mark"
	},
	{
		value: "03",
		label: "Made in HK"
	},
	{
		value: "04",
		label: "CB Mark"
	},
	{
		value: "05",
		label: "Excellence Service"
	},
	{
		value: "06",
		label: "Safety Mark"
	}
];

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_APPOINTMENT",
	columnid: "reservnum"
});

//下载弹出对话框
let dialogFormVisible = ref(false);
//下载弹出对话框
let dialogFormPaymentVisible = ref(false);

let v_row = null;
const editAddress = row => {
	v_row = row;
	if (row.submitcorp == "031101") {
		certificationshow.value = true;
	}
	dialogFormVisible.value = true;
};

let p_row = null;
const editPaymentAdvice = row => {
	p_row = row;
	dialogFormPaymentVisible.value = true;
};

const downloadFormPayment = () => {
	let pList = paymenttype.value;
	let price = i18n.t("columnappointmentCurrencyUnitPrice");
	let discount = i18n.t("columnappointmentdiscount");
	let defaulttax = "N";
	let isdefaulttax = "N";
	for (let p of pList) {
		if (p == price) {
			//外币单价
			defaulttax = "Y";
		}
		if (p == discount) {
			//折扣率
			isdefaulttax = "Y";
		}
	}
	downloadFile("/mylims/order/appointment!downloadPaymentaDvice.action", "WTDL-" + p_row.reservnum + ".doc", {
		defaulttax: defaulttax,
		reservnum: p_row.reservnum,
		isdefaulttax: isdefaulttax
	});

	// window.location.href =
	// 			serverUrl +
	// 			"/mylims/order/appointment!downloadPaymentaDvice.action?reservnum=" +
	// 			p_row.reservnum +
	// 			"&defaulttax=" +
	// 			defaulttax +
	// 			"&isdefaulttax=" +
	// 			isdefaulttax;
	//paymenttype.value = [i18n.t("columnappointmentCurrencyUnitPrice"),i18n.t("columnappointmentdiscount")];
};

//下载报价文件
const downloadAppointment = () => {
	if (!v_row.reservnum) {
		//没保存报价单
		ElMessage.warning(i18n.t("alert_saveclient"));
		return false;
	}
	if (true) {
		let serverUrl = globalStore.serverUrl;
		if (v_row.submitcorp == "031101") {
			window.location.href =
				serverUrl +
				"/mylims/order/appointment!downloadExcel.action?reservnum=" +
				v_row.reservnum +
				"&businesstype=" +
				plain.value +
				"&certificationtype=" +
				attestation.value;
		} else {
			window.location.href =
				serverUrl +
				"/mylims/order/appointment!downloadExcel.action?reservnum=" +
				v_row.reservnum +
				"&businesstype=" +
				plain.value;
		}
		dialogFormVisible.value = false;
	}
};

const condobj = reactive({
	cond: {},
	objlist: {}
});
//dialog的是否显示
const dialogShow_customerListQuery = ref(false);
const dialogShow_appointmentNew = ref(false);

//页面初始化渲染完成执行
onMounted(() => {
	grid_confirmappointmentInfos.value.getTableList();
});

//表格对象报价审核
const atableList = reactive({
	id: "/appointmentManage/appointmentApplication/confirm_list_query.vue_grid_confirmappointmentInfos",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoConfirmByconfirmedflag.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.condition": "0"
		}
	},
	//快捷查询
	tablePropSearch: {},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "reservnum",
			type: "id",
			width: "60",
			isHide: true
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
			prop: "folderno",
			type: "Input",
			width: "140"
		},
		{
			title: "报价单下载",
			label: "menubasequotationorderdownload",
			prop: "operation",
			type: "operation",
			width: "130"
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

//表格对象审核报价单查询
const htableList = reactive({
	id: "/appointmentManage/appointmentApplication/confirm_list_query.vue_grid_queryAppointmentInfos",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectAppointmentInfoConfirmByConfirmynflag.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.confirmynflag": "(1,2)",
			"cond.condition": "0"
		}
	},
	//快捷查询
	tablePropSearch: {},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "reservnum",
			type: "id",
			width: "60",
			isHide: true
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
			prop: "folderno",
			type: "Input",
			width: "140"
		},
		{
			title: "报价单下载",
			label: "menubasequotationorderdownload",
			prop: "download",
			type: "Custom",
			width: "130"
		},
		{
			title: "付款通知单",
			label: "menubasePayment_Advice",
			prop: "payment",
			type: "Custom",
			width: "130"
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

let returnValue = {};
let getappointmentNow = async (workflowflag, reservnums) => {
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
		//报价信息
		condobj.cond = {
			workflowflag: workflowflag,
			reservnum: reservnums,
			defaulttax: returnValue.defaulttax,
			isdefaulttax: returnValue.isdefaulttax
		};
		condobj.dialogShow_appointmentNew = true;
	}
};

//确认报价单信息
const passAppointmentInfo = (code, selectList) => {
	if (selectList != null && selectList.length < 1) {
		ElMessage.warning(i18n.t("alertselectYourFirstToOperateOnline"));
		return;
	}
	let d = moment(new Date()).format("YYYY-MM-DD");
	let approveValue = ref(d);
	ElMessageBox({
		title: i18n.t("Consign_chooseTime"),
		message: () =>
			h(ElDatePicker, {
				modelValue: approveValue.value,
				type: "date",
				valueFormat: "YYYY-MM-DD",
				autosize: { minRows: 4 },
				"onUpdate:modelValue": val => {
					approveValue.value = val;
				}
			}),
		showCancelButton: true,
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel")
	}).then(async () => {
		let cond = {
			date_confirm: approveValue.value
		};
		let jsonString = {
			appointmentInfos: selectList,
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if (code == "1") {
			url = "/mylims/order/appointment!refuseAppointmentInfos.action";
		} else {
			url = "/mylims/order/appointment!passAppointmentInfos.action";
		}
		const res = await http.post(url, qs.stringify(params));
		if (res) {
			grid_confirmappointmentInfos.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "reservnum" && row.reservnum) {
		getappointmentNow("3", row.reservnum);
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "cinfos") {
		//报价单审核子页面
		grid_confirmappointmentInfos.value.getTableList();
	} else if (targetName == "cquery") {
		//审核历史报价单查询子页面
		grid_queryAppointmentInfos.value.getTableList();
	}
};
</script>

<style scoped lang="scss">
:deep(.el-tabs__content) {
	flex: 1;
	display: flex;
	flex-direction: column;
}
</style>
