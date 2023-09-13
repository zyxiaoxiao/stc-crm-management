<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="cinfos"
				:label="$t('panelcolumnmycommissionaudit')"
				title1="提佣审核"
			>
				<zTable
					ref="grid_combinedInfos_query"
					:tableList="atableList"
					@link-detailbg="linkDetail"
					@workflow-status="workflowStatus"
				>
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="success" icon="Check" plain @click="approveCombinedInfos('0', scope.selectList)">{{
							$t("menu_approve")
						}}</el-button>
						<el-button size="small" type="danger" icon="Close" plain @click="approveCombinedInfos('-2', scope.selectList)">{{
							$t("menu_reject2Submitor")
						}}</el-button>
					</template>
					<!-- 自定义 -->
					<template #Custom="scope">
						<span
							v-if="scope.column == 'ccbase'"
							style="color: red; font-weight: bold; font-size: medium"
							v-html="scope.row[scope.column]"
						></span>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('panelcolumnmycommissionauditquery')"
				title1="提佣审核查询"
				name="cquery"
			>
				<zTable
					ref="grid_combinedInfos_query_audit"
					:tableList="htableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
					<!-- 自定义 -->
					<template #Custom="scope">
						<span
							v-if="scope.column == 'ccbase'"
							style="color: red; font-weight: bold; font-size: medium"
							v-html="scope.row[scope.column]"
						></span>
					</template>
				</zTable>
			</el-tab-pane>
		</el-tabs>

		<ZDialog v-model="auditList.dialogShow_audit" :title="$t('menu_base_AuditRecords')" width="95%">
			<audit :auditList="auditList"></audit>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_combineddetailNew" @close="closeclosecombineddetail" width="95%">
			<combineddetailNew :condobj="condobj"></combineddetailNew>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_combineddetailBMNew" @close="closeclosecombineddetail" width="95%">
			<combineddetailBMNew :condobj="condobj"></combineddetailBMNew>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_combineddetailBMReadOnly" @close="closecombineddetailReadOnly" width="95%">
			<combineddetailBMNew :condobj="condobj"></combineddetailBMNew>
		</ZDialog>

		<ZDialog v-model="condobj.dialogShow_combineddetailReadOnly" @close="closecombineddetailReadOnly" width="95%">
			<combineddetailNew :condobj="condobj"></combineddetailNew>
		</ZDialog>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { GlobalStore } from "/src/store/globalStore.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import combineddetailNew from "@/views/appointmentManage/commission/combined_detail.vue";
import combineddetailBMNew from "@/views/appointmentManage/commission/sales_bmcommission_detail.vue";
const i18n = useI18n();
const grid_combinedInfos_query = ref();
const grid_combinedInfos_query_audit = ref();
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;
const tableTabsValue = ref("cinfos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_COMBINED_COMMISSION",
	columnid: "combinedid"
});

const condobj = reactive({
	cond: {},
	objlist: {}
});
let costtype = [
	{
		value: "0",
		label: i18n.t("basecolumnmonthly_commission")
	},
	{
		value: "1",
		label: i18n.t("basecolumncombined_commission")
	}
];

//审核销售代理信息
const approveCombinedInfos = (code, selectList) => {
	if (selectList != null && selectList.length < 1) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return;
	}
	let str = i18n.t("audit_approve");
	if (code == "-1" || code == "-2") {
		str = i18n.t("audit_reject");
	}
	let approveValue = ref(str);
	ElMessageBox({
		title: i18n.t("Message_PleaeEnterAuditOpinion"),
		message: () =>
			h(ElInput, {
				modelValue: approveValue.value,
				type: "textarea",
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
			opinion: approveValue.value
		};
		let jsonString = {
			combinedCommissionInfos: selectList,
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if (code == "-1") {
			url = "/crm/commission/commission!reject.action";
		} else if (code == "-2") {
			url = "/crm/commission/commission!reject2SubmitorCombinedCommissionInfo.action";
		} else {
			url = "/crm/commission/commission!approveCombinedCommissionInfo.action";
		}
		const res = await http.post(url, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			grid_combinedInfos_query.value.getTableList();
		}
	});
};

//提佣页面关闭
const closeclosecombineddetail = () => {
	grid_combinedInfos_query.value.getTableList();
};
//提佣查询页面关闭
const closecombineddetailReadOnly = () => {
	grid_combinedInfos_query_audit.value.getTableList();
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_combinedInfos_query.value.getTableList();
});

//表格对象审核提佣
const atableList = reactive({
	id: "/appointmentManage/commission/sales_commission_audit_list.vue_grid_combinedInfos_query",
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectCombinedCommissionInfoByCond.action",
		root: "combinedCommissionInfos",
		baseParams: {
			"cond.auditflag": "1",
			"cond.workflow_usercode": userInfo.usercode
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
			prop: "combinedid",
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
			title: "提佣类型",
			label: "basecolumncommission_type",
			prop: "commissiontype",
			type: "Select",
			width: "140",
			typeData: costtype
		},
		{
			title: "提佣年月",
			label: "basecolumncommission_month",
			prop: "combinationdate",
			type: "Link",
			width: "160"
		},
		{
			title: "部门名称",
			label: "appointmentDepartment_name",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "职位",
			label: "companypositiontitle",
			prop: "isrole",
			type: "Input",
			width: "140"
		},
		{
			title: "实际佣金",
			label: "basecolumnactual_commission",
			prop: "ccbase",
			type: "Custom",
			width: "130"
		},
		{
			title: "任务额",
			label: "columnbasesalestaskwell",
			prop: "taskamount",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "佣金基数",
			label: "panelcolumnbrokeragebase",
			prop: "basemoney",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "基础佣金",
			label: "basecolumnBasic_Commission",
			prop: "brockagemoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "保底率",
			label: "basecolumnMinimum_Guarantee_Rate",
			prop: "compliancerate",
			type: "Input",
			width: "140"
		},
		{
			title: "保底额",
			label: "basecolumnGuaranteed_Amount",
			prop: "reachprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "本次呆账扣减",
			label: "basecolumnAR_deduction_amount",
			prop: "crprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "本次坏账扣减",
			label: "basecolumnbad_deduction_amount",
			prop: "cbadprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "达标奖金",
			label: "panelcolumnstandardbonus",
			prop: "attainedbonus",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "销售人员编码",
			label: "corpinfopanelsalesmancodetitle",
			prop: "ss_sm_code",
			type: "Input",
			width: "140"
		},
		{
			title: "销售人员",
			label: "corpinfopanelsalesmantitle",
			prop: "ss_sm_desc",
			type: "Input",
			width: "140"
		},
		{
			title: "完成率",
			label: "basecolumncombined_minimum_guarantee_rate",
			prop: "crrate",
			type: "Input",
			width: "140"
		},
		{
			title: "未结清呆账",
			label: "basecolumnuncleared_AR_deduction_amount",
			prop: "buckleprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "未结清坏账",
			label: "basecolumnuncleared_bad_deduction_amount",
			prop: "badprice",
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
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "主键",
			label: "combinedid",
			prop: "combinedid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否可提佣",
			label: "ismonthreach",
			prop: "ismonthreach",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "合并最大月数",
			label: "maximummonth",
			prop: "maximummonth",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提佣年月",
			label: "years",
			prop: "years",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已提佣",
			label: "brokerageflag",
			prop: "brokerageflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否组合提佣",
			label: "combinationflag",
			prop: "combinationflag",
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

//表格对象审核提佣查询
const htableList = reactive({
	id: "/appointmentManage/commission/sales_commission_audit_list.vue_grid_combinedInfos_query_audit",
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectCombinedCommissionInfoByCond.action",
		root: "combinedCommissionInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.audit_usercode": userInfo.usercode
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
			prop: "combinedid",
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
			title: "提佣类型",
			label: "basecolumncommission_type",
			prop: "commissiontype",
			type: "Select",
			width: "140",
			typeData: costtype
		},
		{
			title: "提佣年月",
			label: "basecolumncommission_month",
			prop: "combinationdate",
			type: "Link",
			width: "160"
		},
		{
			title: "部门名称",
			label: "appointmentDepartment_name",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "职位",
			label: "companypositiontitle",
			prop: "isrole",
			type: "Input",
			width: "140"
		},
		{
			title: "实际佣金",
			label: "basecolumnactual_commission",
			prop: "ccbase",
			type: "Custom",
			width: "130"
		},
		{
			title: "任务额",
			label: "columnbasesalestaskwell",
			prop: "taskamount",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "佣金基数",
			label: "panelcolumnbrokeragebase",
			prop: "basemoney",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "基础佣金",
			label: "basecolumnBasic_Commission",
			prop: "brockagemoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "保底率",
			label: "basecolumnMinimum_Guarantee_Rate",
			prop: "compliancerate",
			type: "Input",
			width: "140"
		},
		{
			title: "保底额",
			label: "basecolumnGuaranteed_Amount",
			prop: "reachprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "本次呆账扣减",
			label: "basecolumnAR_deduction_amount",
			prop: "crprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "本次坏账扣减",
			label: "basecolumnbad_deduction_amount",
			prop: "cbadprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "达标奖金",
			label: "panelcolumnstandardbonus",
			prop: "attainedbonus",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "销售人员编码",
			label: "corpinfopanelsalesmancodetitle",
			prop: "ss_sm_code",
			type: "Input",
			width: "140"
		},
		{
			title: "销售人员",
			label: "corpinfopanelsalesmantitle",
			prop: "ss_sm_desc",
			type: "Input",
			width: "140"
		},
		{
			title: "完成率",
			label: "basecolumncombined_minimum_guarantee_rate",
			prop: "crrate",
			type: "Input",
			width: "140"
		},
		{
			title: "未结清呆账",
			label: "basecolumnuncleared_AR_deduction_amount",
			prop: "buckleprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "未结清坏账",
			label: "basecolumnuncleared_bad_deduction_amount",
			prop: "badprice",
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
			prop: "recordtime",
			type: "DateTime",
			width: "160"
		},
		{
			title: "主键",
			label: "combinedid",
			prop: "combinedid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否可提佣",
			label: "ismonthreach",
			prop: "ismonthreach",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "合并最大月数",
			label: "maximummonth",
			prop: "maximummonth",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "提佣年月",
			label: "years",
			prop: "years",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否已提佣",
			label: "brokerageflag",
			prop: "brokerageflag",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否组合提佣",
			label: "combinationflag",
			prop: "combinationflag",
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

//链接详细信息
const linkDetail = (column, row) => {
	if (column == "combinationdate" && row.combinedid) {
		if (row.isrole == "BM") {
			if (row.combinedid) {
				condobj.cond = {
					combinedid: row.combinedid,
					auditflag: "1"
				};
				condobj.dialogShow_combineddetailBMNew = true;
			}
		} else {
			if (row.combinedid) {
				condobj.cond = {
					combinedid: row.combinedid,
					auditflag: "1"
				};
				condobj.dialogShow_combineddetailNew = true;
			}
		}
	}
};
//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "combinationdate" && row.combinedid) {
		if (row.isrole == "BM") {
			if (row.combinedid) {
				condobj.cond = {
					combinedid: row.combinedid,
					readOnly: "1"
				};
				condobj.dialogShow_combineddetailBMReadOnly = true;
			}
		} else {
			if (row.combinedid) {
				condobj.cond = {
					combinedid: row.combinedid,
					readOnly: "1"
				};
				condobj.dialogShow_combineddetailReadOnly = true;
			}
		}
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "cinfos") {
		//销售提佣审核页面
		grid_combinedInfos_query.value.getTableList();
	} else if (targetName == "cquery") {
		//销售提佣审核查询页面
		grid_combinedInfos_query_audit.value.getTableList();
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
