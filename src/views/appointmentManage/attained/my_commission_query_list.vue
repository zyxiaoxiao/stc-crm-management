<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" type="border-card" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="cinfos"
				:label="$t('panelcolumnnotsubmit')"
				title1="未提交提佣"
			>
				<zTable
					ref="grid_brokerageInfos"
					:tableList="atableList"
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
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('crmcolumnconfirmquery')"
				title1="已提交提佣"
				name="cquery"
			>
				<zTable
					ref="grid_brokerageInfos_submit"
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
			<ZDialog v-model="condobj.dialogShow_commissionreadOnly" width="95%">
				<commissionreadOnly :condobj="condobj"></commissionreadOnly>
			</ZDialog>
		</div>		
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import qs from "qs";
import http from "@/api/index.js";
import zTable from "/src/components/ZTable/index.vue";
import { ElMessageBox, ElMessage, ElDatePicker } from "element-plus";
import { GlobalStore } from "/src/store/globalStore.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import moment from "moment";
import commissionreadOnly from "@/views/appointmentManage/attained/my_commission_detail.vue";

const i18n = useI18n();
const grid_brokerageInfos = ref();
const grid_brokerageInfos_submit = ref();
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;
const tableTabsValue = ref("cinfos");


//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_BROKERAGE",
	columnid: "brokerageid"
});

//下载弹出对话框
let dialogFormVisible = ref(false);


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
	grid_brokerageInfos.value.getTableList();
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

//表格对象报价审核
const atableList = reactive({
	id: "/appointmentManage/attained/my_commission_query_list.vue_grid_brokerageInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/brokerage/brokerage!selectBrokerageInfoByCond.action",
		root: "brokerageInfos",
		baseParams: {
			'cond.auditflag':'0',
			'cond.recordercode':userInfo.usercode
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
			title: "提佣申请单号",
			label: "panelcolumnbrokerageno",
			prop: "brokerageid",
			type: "Link",
			width: "160"
		},
		{
			title: "总金额",
			label: "appointmentTotalprice_hkd",
			prop: "totalmoney",
			type: "Number",
			precision: 2,
			width: "130"
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "销售开支",
			label: "columnbasesalesexpenses_hkd",
			prop: "salesexpenses",
			type: "Number",
			precision: 2,
			width: "120"
		},
		{
			title: "退款金额",
			label: "columndrawbackrefundmoney",
			prop: "refundnum",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "增值税",
			label: "appointmentValueaddedtax_hkd",
			prop: "taxmoney",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "坏账金额",
			label: "panelcolumnbaddebt",
			prop: "badmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "120"
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
			title: "提佣月份",
			label: "brokeragemonth",
			prop: "brokeragemonth",
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
		}
	],
	// 表格数据
	tableData: []
});

//表格对象审核报价单查询
const htableList = reactive({
	id: "/appointmentManage/attained/my_commission_query_list.vue_grid_brokerageInfos_submit",
	//请求属性设置
	httpAttribute: {
		url: "/crm/brokerage/brokerage!selectBrokerageInfoByCond.action",
		root: "brokerageInfos",
		baseParams: {
			"cond.auditflag": "1,2",
            'cond.recordercode':userInfo.usercode
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
			title: "提佣申请单号",
			label: "panelcolumnbrokerageno",
			prop: "brokerageid",
			type: "Link",
			width: "160"
		},
		{
			title: "总金额",
			label: "appointmentTotalprice_hkd",
			prop: "totalmoney",
			type: "Number",
			precision: 2,
			width: "130"
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "销售开支",
			label: "columnbasesalesexpenses_hkd",
			prop: "salesexpenses",
			type: "Number",
			precision: 2,
			width: "120"
		},
		{
			title: "退款金额",
			label: "columndrawbackrefundmoney",
			prop: "refundnum",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "增值税",
			label: "appointmentValueaddedtax_hkd",
			prop: "taxmoney",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "坏账金额",
			label: "panelcolumnbaddebt",
			prop: "badmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "备注",
			label: "panelcolumnRemark",
			prop: "remark",
			type: "Input",
			width: "120"
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
			title: "提佣月份",
			label: "brokeragemonth",
			prop: "brokeragemonth",
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
		title: i18n.t("Message_PleaeEnterAuditOpinion"),
		message: () =>
			h(ElDatePicker, {
				modelValue: approveValue.value,
				type: "date",
                valueFormat:"YYYY-MM-DD",
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
			"date_confirm": approveValue.value
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
			grid_brokerageInfos.value.getTableList();
		}
	});
};

//链接详细信息
const linkDetailquey = (column, row) => {
	console.log(column, row);
	if (column == "brokerageid" && row.brokerageid) {
		let brokerageid = row.brokerageid;
		if (brokerageid) {
			condobj.cond = {
				brokerageid: brokerageid
			};
			condobj.dialogShow_commissionreadOnly = true;
		} 
		
		
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "cinfos") {
		//报价单审核子页面
		grid_brokerageInfos.value.getTableList();
	} else if (targetName == "cquery") {
		//审核历史报价单查询子页面
		grid_brokerageInfos_submit.value.getTableList();
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
