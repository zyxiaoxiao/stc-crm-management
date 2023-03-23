<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" type="border-card" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="ainfos"
				:label="$t('menubaseQuotedQuery')"
				title1="报价查询"
			>
				<zTable
					ref="grid_appointmentInfosQuery"
					:tableList="atableList"
					@link-detailbg="linkDetailbg"
					@workflow-status="workflowStatus"
				>
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
				name="query"
			>
				<zTable
					ref="grid_appointmentInfosOverdueQuery"
					:tableList="htableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
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
				<appointmentReadonly :condobj="condobj"></appointmentReadonly>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<el-dialog v-model="dialogFormVisible" :title="$t('DOWNLOAD_download')">
				<el-form :model="dform" style="margin: 25px 15px">
					<el-form-item :label="$t('columntitleOrdinarycustomers') + ':'" title1="普通客户" label-width="140px">
						<el-radio-group v-model="plain">
							<el-radio label="CN">{{ $t("SRM_LANG_CN") }}</el-radio>
							<el-radio label="CN2">{{ $t("SRM_LANG_CN2") }}</el-radio>
							<el-radio label="EN">{{ $t("SRM_LANG_EN") }}</el-radio>
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
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessage } from "element-plus";
import { GlobalStore } from "/src/store/globalStore.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import appointmentReadonly from "@/views/appointmentManage/appointmentApplication/appointment_detail.vue";

const i18n = useI18n();
const grid_appointmentInfosQuery = ref();
const grid_appointmentInfosOverdueQuery = ref();

let businesstype = "10"; //报价类型

const tableTabsValue = ref("ainfos");
const globalStore = GlobalStore();
let certificationshow = ref(false); //认证类型默认不显示
let attestation = ref("01"); //下载报价单认证类型默认值
const plain = ref("CN"); //下载默认选中

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_APPOINTMENT",
	columnid: "reservnum"
});

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
//下载弹出对话框
let dialogFormVisible = ref(false);

let v_row = null;
//下载选择页面（HCC部门需要带出类型选择）
const editAddress = row => {
	v_row = row;
	if (row.submitcorp == "031101") {
		certificationshow.value = true;
	}
	dialogFormVisible.value = true;
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
	}
};

const condobj = reactive({
	cond: {},
	objlist: {}
});
//dialog的是否显示
const dialogShow_appointmentNew = ref(false);

//页面初始化渲染完成执行
onMounted(() => {
	grid_appointmentInfosQuery.value.getTableList();
});

//表格对象销售报价查询
const atableList = reactive({
	id: "/comprehensiveQuery/appointment_salsequery_list.vue_grid_appointmentInfosQuery",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectIntegratedAppointmentquery.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.businesstype": "10",
			"cond.condition": "0",
			"cond.salsequery": "Y"
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

//表格对象销售过期报价单查询
const htableList = reactive({
	id: "/comprehensiveQuery/appointment_salsequery_list.vue_grid_appointmentInfosOverdueQuery",
	//请求属性设置
	httpAttribute: {
		url: "/mylims/order/appointment!selectIntegratedAppointmentquery.action",
		root: "appointmentInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.businesstype": "10",
			"cond.condition": "1",
			"cond.salsequery": "Y"
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

//新增子页面关闭后的方法可以给父页面赋值等操作
const appointmentNewclose = () => {
	//选择联系人的关闭窗口后的事件
	grid_appointmentInfosQuery.value.getTableList();
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
			//workflowflag: workflowflag,
			v_readonly: "true",
			reservnum: reservnums,
			defaulttax: returnValue.defaulttax,
			isdefaulttax: returnValue.isdefaulttax
		};
		condobj.dialogShow_appointmentNew = true;
	}
};

//链接详细信息
const linkDetailbg = (column, row) => {
	if (column == "reservnum" && row.reservnum) {
		getappointmentNow("3", row.reservnum);
	}
};

//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "reservnum" && row.reservnum) {
		getappointmentNow("3", row.reservnum);
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "ainfos") {
		//销售报价单查询
		grid_appointmentInfosQuery.value.getTableList();
	} else if (targetName == "query") {
		//销售过期报价单查询
		grid_appointmentInfosOverdueQuery.value.getTableList();
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
