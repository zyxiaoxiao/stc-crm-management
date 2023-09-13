<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="提佣申请" :label="$t('panelcolumnbrokerageapply')" name="infos">
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="ruleFormRef">
					<el-divider title1="提佣申请" content-position="left">{{ $t("panelcolumnbrokerageapply") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnbrokerageno') + ':'" title1="提佣申请单号">
								<el-input type="text" v-model="sformData.commissionid" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbasemonth') + ':'" title1="月份">
								<el-input type="text" v-model="sformData.brokeragemonth" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnAR_Total_Amount') + ':'" title1="呆账总金额">
								<el-input type="text" v-model="sformData.arprice" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnTotal_Bad_Amount') + ':'" title1="坏账总金额">
								<el-input type="text" v-model="sformData.badmoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnActual_Turnover') + ':'" title1="实际营业额">
								<el-input type="text" v-model="sformData.totalmoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnwriteoff_application_listCost') + ':'" title1="成本费">
								<el-input type="text" v-model="sformData.costnum" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbasesalesexpenses_hkd') + ':'" title1="销售开支">
								<el-input type="text" v-model="sformData.salesexpenses" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('appointmentValueaddedtax_hkd') + ':'" title1="增值税">
								<el-input type="text" v-model="sformData.taxmoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnbrokeragebase') + ':'" title1="佣金基数">
								<el-input type="text" v-model="sformData.basemoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbasesalestaskwell') + ':'" title1="任务额">
								<el-input type="text" v-model="sformData.taskmoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnstandardbonus_hkd') + ':'" title1="达标奖">
								<el-input type="text" v-model="sformData.attainedbonus" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnCombined_Achievement_Award') + ':'" title1="组合达标奖">
								<el-input type="text" v-model="sformData.combinationaward" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnBasic_Commission') + ':'" title1="基础佣金">
								<el-input type="text" v-model="sformData.brokerage" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnAR_deduction_amount') + ':'" title1="本次呆账扣减">
								<el-input type="text" v-model="sformData.total_bad_debts" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnbad_deduction_amount') + ':'" title1="本次坏账扣减">
								<el-input type="text" v-model="sformData.badprice" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnbrokerage_hkd') + ':'" title1="佣金(HKD)">
								<el-input type="text" v-model="sformData.brokeragetotal" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnis_the_minimum_guaranteed') + ':'" title1="是否保底(Y/N)">
								<el-input type="text" v-model="sformData.ismonthfloors" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumncan_i_withdraw_commission') + ':'" title1="单月是否可提佣(Y/N)">
								<el-input type="text" v-model="sformData.ismonthreach" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnno_agency_commission_base') + ':'" title1="无代理佣金基数">
								<el-input type="text" v-model="sformData.noagenttotalprice" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto; height: 350px">
					<zTable ref="grid_gradefolderInfos" width="700px" :tableList="tableListSales"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane title1="呆账查询" :label="$t('basecolumnAR_Amount_Query')" class="all-height flex-column" name="query">
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_BaddebtsInfos" :tableList="tableListBaddebts"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane title1="销售开支查询" :label="$t('titleExpenditureQuery')" class="all-height flex-column" name="expenditure">
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_expenditureInfos" :tableList="tableListExpenditure" @link-detailbg="linkDetailquey"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="内分包单查询"
				:label="$t('menuselectInternalSubcontractingOrderQuery')"
				class="all-height flex-column"
				name="subcontracting"
			>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_outsourcingInfos" :tableList="tableListOutsourcing"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="呆账追回扣减佣金查询"
				:label="$t('menubaseBadDebtRecoveryDeductionCommissionInquiry')"
				class="all-height flex-column"
				name="baddebt"
			>
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" model="badformData" ref="badDebtFormRef">
					<el-divider title1="计算规则" content-position="left">{{
						$t("columnwriteoff_application_listCalculationrules")
					}}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="24">
							<el-form-item :label="$t('basecolumnactual_commission') + ':'" title1="实际佣金">
								<el-input type="textarea" v-model="badformData.baddebtremark" readonly></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_badDebtCalculationRules" :tableList="tableListBadDebt"> </zTable>
				</div>
			</el-tab-pane>
		</el-tabs>
		<ZDialog v-model="condobj.dialogShow_appointmentReadonly" :title="$t('titleExpenditureInformation')" width="95%">
			<expendituredetailReadonly :condobj="condobj"></expendituredetailReadonly>
		</ZDialog>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import expendituredetailReadonly from "@/views/appointmentManage/attained/expenditure_detail_readonly.vue";

const i18n = useI18n();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});

const condobj = reactive({
	cond: {},
	objlist: {}
});

let stype = getdropSownSelection("sales_type"); //开支类型下拉
//销售提佣申请初始化信息
const sformData = reactive({
	commissionid: "",
	brokeragemonth: "",
	arprice: "",
	badmoney: "",
	totalmoney: "",
	costnum: "",
	salesexpenses: "",
	taxmoney: "",
	basemoney: "",
	taskmoney: "",
	attainedbonus: "",
	combinationaward: "",
	brokerage: "",
	total_bad_debts: "",
	badprice: "",
	brokeragetotal: "",

	ismonthfloors: "",
	ismonthreach: "",
	noagenttotalprice: "",
	refundnum: "",
	cid: "",
	recordercode: "",
	recorderdesc: "",
	recordtime: "",
	audittime: "",
	auditflag: "",
	combinedid: ""
});

//呆账计算公式
const badformData = reactive({
	baddebtremark:
		"追回单笔佣金 = ((总价-成本费-坏账-销售开支-增值税)*((总价-呆账)/总价)*佣金点/100)+((总价-成本费-坏账-销售开支-增值税)*(50%呆账收回)*(呆账/总价)*佣金点/100)"
});

const tableTabsValue = ref("infos");

//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "folderno" && row.id) {
		condobj.cond = { id: row.id }; //销售开支ID
		condobj.dialogShow_appointmentReadonly = true;
	}
};

//查询销售佣金详细信息
let getbrokerageInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ commissionInfo: obj })
	};
	const res = await http.post("/crm/commission/commission!selectCommissionInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.commissionInfo[0]) {
			//判定 commissionInfo 的key 是否存在 sformData 的key
			sformData[key] = res.commissionInfo[0][key];
		}
	}
};
//切换tab时触发
const tabChange = TabPaneName => {
	let commissionid = sformData.commissionid;
	if (TabPaneName == "infos") {
		//提佣申请子页面
		if (commissionid) {
			getbrokerageInfo({ commissionid: commissionid });
			//传参后会自动调用接口刷新
			tableListSales.httpAttribute.baseParams["cond.commissionid"] = commissionid;
			grid_gradefolderInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "query") {
		//呆账查询页面
		if (commissionid) {
			//传参后会自动调用接口刷新
			tableListBaddebts.httpAttribute.baseParams["cond.commissionid"] = commissionid;
			grid_BaddebtsInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "expenditure") {
		//销售开支查询子页面
		if (commissionid) {
			//传参后会自动调用接口刷新
			tableListExpenditure.httpAttribute.baseParams["cond.commissionid"] = commissionid;
			tableListExpenditure.httpAttribute.baseParams["cond.brokeragemonth"] = sformData.brokeragemonth;
			grid_expenditureInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "subcontracting") {
		//内分包页面
		if (commissionid) {
			//传参后会自动调用接口刷新
			tableListOutsourcing.httpAttribute.baseParams["cond.commissionid"] = commissionid;
			grid_outsourcingInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "baddebt") {
		//呆账追回扣减佣金查询
		if (commissionid) {
			//传参后会自动调用接口刷新
			tableListBadDebt.httpAttribute.baseParams["cond.commissionid"] = commissionid;
			grid_badDebtCalculationRules.value.reuseTableList();
		}
	}
};

onMounted(() => {
	//getValue();
	if (props.condobj) {
		let commissionid = props.condobj.cond.commissionid; //销售提佣编号
		if (commissionid) {
			getbrokerageInfo({ commissionid: commissionid });
			//传参后会自动调用接口刷新
			tableListSales.httpAttribute.baseParams["cond.commissionid"] = commissionid;
			grid_gradefolderInfos.value.reuseTableList();
		}
	}
});

//表格销售提佣申请单
const grid_gradefolderInfos = ref();
const tableListSales = reactive({
	id: "/appointmentManage/commission/sales_commission_detail.vue_grid_gradefolderInfos",
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectShareFoldersInfoByCond.action",
		root: "shareFoldersInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "sfid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
			width: "160"
		},
		{
			title: "BM编号",
			label: "basecolumnbm_code",
			prop: "bmcode",
			type: "Input",
			width: "140"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "rasclientid",
			type: "Input",
			width: "140"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "compname",
			type: "Input",
			width: "180"
		},
		{
			title: "销售开支",
			label: "columnbasesalesexpenses_hkd",
			prop: "salesexpenses",
			type: "Input",
			width: "140"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "totalprice",
			type: "Input",
			width: "140"
		},
		{
			title: "提佣点(%)",
			label: "itemtitlefoldersbrokerage",
			prop: "brokerage",
			type: "Input",
			width: "140"
		},
		{
			title: "佣金",
			label: "panelcolumnbrokerage_hkd",
			prop: "commission",
			type: "Input",
			width: "160"
		},
		{
			title: "销账单号",
			label: "columnwriteoff_application_listwriteoffNo",
			prop: "writeoffcode",
			type: "Input",
			width: "160"
		},
		{
			title: "部门编码",
			label: "personaluserpanel2bmbmtitle",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Input",
			width: "140"
		},
		{
			title: "增值税额",
			label: "panelcolumnvalueaddedtaxmoney",
			prop: "taxmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "坏账金额",
			label: "panelcolumnbaddebt",
			prop: "badmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "销账日期",
			label: "itemtitleWriteOffDate",
			prop: "audittime",
			type: "Input",
			width: "160"
		},
		{
			title: "SS佣金率",
			label: "panelcolumnSS_Commission_Rate",
			prop: "folderage",
			type: "Input",
			width: "140"
		}
	],
	// 表格数据
	tableData: []
});

//表格呆账查询
const grid_BaddebtsInfos = ref();
const tableListBaddebts = reactive({
	id: "/appointmentManage/commission/sales_commission_detail.vue_grid_BaddebtsInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectBaddebtsInfoByCond.action",
		root: "baddebtsInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "baddebtsid",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "部门名称",
			label: "appointmentDepartment_name",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "月份",
			label: "columnbasemonth",
			prop: "years",
			type: "Input",
			width: "140"
		},
		{
			title: "客户号",
			label: "corpinfoCustomerNumbertitle",
			prop: "corpno",
			type: "Input",
			width: "140"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "180"
		},
		{
			title: "付款方式",
			label: "i18ncrmcontractpaymentmethod",
			prop: "paycondition",
			type: "Input",
			width: "140"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "发票编号",
			label: "itemtitleinvoiceinvoicecode",
			prop: "invoiceno",
			type: "Input",
			width: "160"
		},
		{
			title: "发票日期",
			label: "itemtitleinvoiceinvoicedate",
			prop: "invoicedate",
			type: "Input",
			width: "160"
		},
		{
			title: "呆账天数",
			label: "itemtitlecolumnARDays",
			prop: "arday",
			type: "Input",
			width: "140"
		},
		{
			title: "增值税额",
			label: "panelcolumnvalueaddedtaxmoney",
			prop: "totalfolderamount",
			type: "Input",
			width: "140"
		},
		{
			title: "申请单金额",
			label: "itemtitlefoldersvalue",
			prop: "folderprice",
			type: "Input",
			width: "140"
		},
		{
			title: "呆账金额",
			label: "basecolumnfolderAR_Amount",
			prop: "arprice",
			type: "Input",
			width: "140"
		},
		{
			title: "提佣点(%)",
			label: "itemtitlefoldersbrokerage",
			prop: "commissionrate",
			type: "Input",
			width: "140"
		},
		{
			title: "呆账扣款率",
			label: "basecolumnAR_Deduction_Ratio",
			prop: "deductionrate",
			type: "Input",
			width: "140"
		},
		{
			title: "呆账扣款金额",
			label: "basecolumnAR_deduction_amount",
			prop: "deductionprice",
			type: "Input",
			width: "140"
		},
		{
			title: "佣金（HKD）",
			label: "panelcolumnbrokerage_hkd",
			prop: "brokerage",
			type: "Input",
			width: "140"
		},
		{
			title: "呆账截止日期",
			label: "basecolumnAR_Closing_Date",
			prop: "closing_date",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});
//表格销售开支
const grid_expenditureInfos = ref();
const tableListExpenditure = reactive({
	id: "/appointmentManage/commission/sales_commission_detail.vue_grid_expenditureInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/expenditure/expenditure!selectExpenditureInfoForBrokerage.action",
		root: "expenditureInfos",
		baseParams: { "cond.auditflag": "2" }
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "id",
			label: "id",
			prop: "id",
			type: "id",
			width: "60",
			isHide: true
		},
		{
			title: "主键",
			label: "i18ncrmcontractprimarykey",
			prop: "id",
			type: "Input",
			width: "100",
			isHide: true
		},
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "folderno",
			type: "Link",
			width: "180"
		},
		{
			title: "业务员名称",
			label: "columnexpendituresalesmandesc",
			prop: "salesmandesc",
			type: "Input",
			width: "160"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "deptdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "客户号",
			label: "corpinfoCustomerNumbertitle",
			prop: "corpno",
			type: "Input",
			width: "160"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "180"
		},
		{
			title: "金额",
			label: "columnappointmentothercostmoney_hkd",
			prop: "amount",
			type: "Input",
			width: "140"
		},
		{
			title: "开支类型",
			label: "columnexpendituretype",
			prop: "expendituretype",
			type: "Select",
			width: "140",
			typeData: stype
		},
		{
			title: "备注",
			label: "columnappointmentothercostremarks",
			prop: "remark",
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
			label: "corpinfoCreatePeopleDESCtitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "创建时间",
			label: "itemtitlewlbmdesc10",
			prop: "recordtime",
			type: "Input",
			width: "140"
		},
		{
			title: "申请人编码",
			label: "columnApplicantcode",
			prop: "applicantcode",
			type: "Input",
			width: "140"
		},
		{
			title: "申请人名称",
			label: "columnApplicantdesc",
			prop: "applicantdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "申请日期",
			label: "i18ncrmcontractApplicationDate",
			prop: "applicanttime",
			type: "Input",
			width: "160"
		},
		{
			title: "部门编码",
			label: "部门编码",
			prop: "deptcode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "业务员编码",
			label: "业务员编码",
			prop: "salesmancode",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "客户ID",
			label: "客户ID",
			prop: "corpid",
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
			label: "auditordesc",
			prop: "auditordesc",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "审核时间",
			label: "审核时间",
			prop: "audittime",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "提报单位",
			label: "提报单位",
			prop: "submitcorp",
			type: "Input",
			width: "60",
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
			width: "60",
			isHide: true
		},
		{
			title: "退回人编码",
			label: "退回人编码",
			prop: "retrievercode",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "退回人名称",
			label: "退回人名称",
			prop: "retrieverdesc",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "退回时间",
			label: "退回时间",
			prop: "retrievetime",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "制单人单位",
			label: "制单人单位",
			prop: "recordercorp",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "审核节点名称",
			label: "审核节点名称",
			prop: "auditlevelname",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "错误信息",
			label: "错误信息",
			prop: "errormsg",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "提交时间",
			label: "提交时间",
			prop: "submittime",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "工作流ID",
			label: "工作流ID",
			prop: "workflowid",
			type: "Input",
			width: "60",
			isHide: true
		},
		{
			title: "状态",
			label: "状态",
			prop: "auditflag",
			type: "Input",
			width: "60",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});
//表格内分包
const grid_outsourcingInfos = ref();
const tableListOutsourcing = reactive({
	id: "/appointmentManage/commission/sales_commission_detail.vue_grid_outsourcingInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/expenditure/expenditure!selectoutsourcingInfoByBrokerage.action",
		root: "expenditureInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},		
		{
			title: "申请单号",
			label: "columnwriteoff_application_listApplicationNo",
			prop: "folderno",
			type: "Input",
			width: "160"
		},
		{
			title: "SE编码",
			label: "tablesecodetitle",
			prop: "recordercode",
			type: "Input",
			width: "140"
		},
		{
			title: "SE名称",
			label: "tablesenametitle",
			prop: "recorderdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "分包部门",
			label: "crmcolumnsubimtunit",
			prop: "submitcorp",
			type: "Input",
			width: "160"
		},
		{
			title: "客户号",
			label: "corpinfoCustomerNumbertitle",
			prop: "corpno",
			type: "Input",
			width: "180"
		},
		{
			title: "客户名称",
			label: "columnCustomerName",
			prop: "corpdesc",
			type: "Input",
			width: "180"
		},
		{
			title: "申请单总金额",
			label: "itemtitleinvoiceTotalAmountOfApplicationForm",
			prop: "amount",
			type: "Input",
			width: "140"
		},
		{
			title: "汇率",
			label: "itemtitleinvoiceexchangerate",
			prop: "modifyercode",
			type: "Input",
			width: "160"
		},
		{
			title: "币种",
			label: "itemtitleinvoicecurrencies",
			prop: "modifyerdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "接包部门",
			label: "columnbaseContractingDepartment",
			prop: "applicantcode",
			type: "Input",
			width: "140"
		},
		{
			title: "分包金额",
			label: "columnbasefcpots",
			prop: "applicantdesc",
			type: "Input",
			width: "160"
		},
		{
			title: "分包金额（HKD）",
			label: "appointmentsubcontractingprice_hkd",
			prop: "auditorcode",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "分包百分比（%）",
			label: "columnbasePercentageOfSubcontractingt",
			prop: "auditordesc",
			type: "Input",
			width: "140"
		},
		{
			title: "佣金（HKD）",
			label: "panelcolumnbrokerage_hkd",
			prop: "retrieverdesc",
			type: "Number",
			precision: 2,
			width: "160"
		},
		{
			title: "分摊佣金（HKD）",
			label: "columnbaseApportionmentOfCommission",
			prop: "auditlevel",
			type: "Number",
			precision: 2,
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});
//呆账追回扣减佣金查询
const grid_badDebtCalculationRules = ref();
const tableListBadDebt = reactive({
	id: "/appointmentManage/commission/sales_commission_detail.vue_grid_badDebtCalculationRules",
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectCalculateCommissionForBadDebtRecovery.action",
		root: "shareFoldersInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "申请单号",
			label: "columntolockapplynum",
			prop: "folderno",
			type: "Input",
			width: "130"
		},
		{
			title: "计算呆账追回佣金",
			label: "menubaseCalculateCommissionForBadDebtRecovery",
			prop: "isrole",
			type: "Input",
			width: "870"
		},
		{
			title: "呆账金额",
			label: "basecolumnfolderAR_Amount",
			prop: "folderage",
			type: "Number",
			precision: 2,
			width: "120"
		},
		{
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "totalprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Number",
			precision: 2,
			width: "120"
		},
		{
			title: "坏账金额",
			label: "panelcolumnbaddebt",
			prop: "badmoney",
			type: "Number",
			precision: 2,
			width: "180"
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
			title: "增值税额",
			label: "panelcolumnvalueaddedtaxmoney",
			prop: "taxmoney",
			type: "Number",
			precision: 2,
			width: "120"
		},
		{
			title: "提佣点(%)",
			label: "itemtitlefoldersbrokerage",
			prop: "brokerage",
			type: "Number",
			precision: 2,
			width: "120"
		},
		{
			title: "佣金",
			label: "panelcolumnbrokerage_hkd",
			prop: "commission",
			type: "Number",
			precision: 2,
			width: "120"
		},
		{
			title: "报价单编号",
			label: "crmcolumnreservnum",
			prop: "quotationno",
			type: "Input",
			width: "160"
		},
		{
			title: "BM编号",
			label: "basecolumnbm_code",
			prop: "bmcode",
			type: "Input",
			width: "120"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "rasclientid",
			type: "Input",
			width: "140"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "compname",
			type: "Input",
			width: "140"
		},
		{
			title: "销账单号",
			label: "columnwriteoff_application_listwriteoffNo",
			prop: "writeoffcode",
			type: "Input",
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});
</script>

<style lang="scss">
.appointmentSplitdetail-card {
	border: 1px solid silver;
	overflow: hidden;
	transition: 0.3s;
}
</style>
