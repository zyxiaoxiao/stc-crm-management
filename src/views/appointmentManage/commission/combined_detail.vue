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
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						class="button_show"
						v-show="saveShow"
						type="primary"
						icon="Document"
						plain
						@click="saveCommissionInfo()"
						>{{ $t("menu_save") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="submitShow"
						type="success"
						icon="Check"
						plain
						@click="submitCommissionInfo()"
						>{{ $t("menu_submit") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="approveShow"
						type="success"
						icon="Check"
						plain
						@click="approveCommissionInfo('0')"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="approveShow"
						type="danger"
						icon="Close"
						plain
						@click="approveCommissionInfo('-2')"
						>{{ $t("menu_reject2Submitor") }}</el-button
					>
				</div>
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="ruleFormRef">
					<el-divider title1="提佣申请" content-position="left">{{ $t("panelcolumnbrokerageapply") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="6">
							<el-form-item :label="$t('basecolumncommission_type') + ':'" title1="提佣类型">
								<el-select v-model="sformData.commissiontype" class="full-width-input" disabled="true" filterable>
									<el-option v-for="item in costtype" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumncommission_month') + ':'" title1="提佣年月">
								<el-input type="text" v-model="sformData.combinationdate" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('companypositiontitle') + ':'" title1="职务">
								<el-input type="text" v-model="sformData.isrole" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbasesalestaskwell') + ':'" title1="任务额">
								<el-input type="text" v-model="sformData.taskamount" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnMinimum_Guarantee_Rate') + ':'" title1="保底率">
								<el-input type="text" v-model="sformData.compliancerate" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnGuaranteed_Amount') + ':'" title1="保底额">
								<el-input type="text" v-model="sformData.reachprice" readonly> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnbrokeragebase') + ':'" title1="佣金基数">
								<el-input type="text" v-model="sformData.basemoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnstandardbonus') + ':'" title1="达标奖金">
								<el-input type="text" v-model="sformData.attainedbonus" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnBasic_Commission') + ':'" title1="基础佣金">
								<el-input type="text" v-model="sformData.brockagemoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnAR_deduction_amount') + ':'" title1="本次呆账扣减">
								<el-input type="text" v-model="sformData.crprice" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnbad_deduction_amount') + ':'" title1="本次坏账扣减">
								<el-input type="text" v-model="sformData.cbadprice" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnuncleared_AR_deduction_amount') + ':'" title1="未结清呆账">
								<el-input type="text" v-model="sformData.buckleprice" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('basecolumnuncleared_bad_deduction_amount') + ':'" title1="未结清坏账">
								<el-input type="text" v-model="sformData.badprice" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnbaseSalesCertificationCommission') + ':'" title1="销售认证佣金">
								<el-input type="text" v-model="sformData.c_totalcommission" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" class="ccbase-column">
							<el-form-item :label="$t('basecolumnactual_commission') + ':'" title1="实际佣金">
								<el-input type="text" v-model="sformData.ccbase" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('columnappointment_desc42') + ':'" title1="remark">
								<el-input type="textarea" v-model="sformData.remark" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto; height: 350px">
					<zTable ref="grid_gradeInfos" width="700px" :tableList="tableListSales" @link-detailbg="linkDetail"> </zTable>
				</div>
			</el-tab-pane>
			<el-tab-pane
				title1="销售认证佣金信息"
				:label="$t('panelSalesCertificationCommissionInformation')"
				class="all-height flex-column"
				name="query"
			>
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_authenticationQuery" :tableList="tableListCertification" @link-detailbg="linkDetailquey"> </zTable>
				</div>
			</el-tab-pane>
		</el-tabs>

		<ZDialog v-model="condobj.dialogShow_salesCommissionReadOnly" @close="closeSalesCommissionReadOnly" width="95%">
			<salesCommissionReadOnly :condobj="condobj"></salesCommissionReadOnly>
		</ZDialog>
	</div>
</template>

<script setup>
import { h, ref, reactive, onMounted } from "vue";
import { getdropSownSelection } from "/src/utils/util.js";
import qs from "qs";
import http from "@/api/index.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox, ElInput } from "element-plus";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import salesCommissionReadOnly from "@/views/appointmentManage/commission/sales_commission_detail.vue";

const i18n = useI18n();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
const condobj = reactive({
	cond: {},
	objlist: {}
});
let costtype = [
	{
		value: "1",
		label: i18n.t("basecolumncombined_commission")
	},
	{
		value: "0",
		label: i18n.t("basecolumnmonthly_commission")
	}
];
let approveShow = ref(false); //审核通过、拒绝至上一步、审核拒绝
let saveShow = ref(false); //保存
let submitShow = ref(false); //提交
let isdisabled = ref(true); //不可编辑
let stype = getdropSownSelection("certificate"); //认证类型下拉
//提佣申请初始化信息
const sformData = reactive({
	commissiontype: "",
	combinationdate: "",
	isrole: "",
	taskamount: "",
	compliancerate: "",
	reachprice: "",
	basemoney: "",
	attainedbonus: "",
	brockagemoney: "",
	crprice: "",
	cbadprice: "",
	buckleprice: "",
	badprice: "",
	c_totalcommission: "",
	ccbase: "",
	remark: "",

	combinedid: "",
	ismonthreach: "",
	combinationflag: "",
	maximummonth: "",
	years: "",
	auditorcode: "",
	auditordesc: "",
	audittime: "",
	submitcorp: "",
	auditlevel: "",
	retrieveflag: "",
	retrievercode: "",
	retrieverdesc: "",
	retrievetime: "",
	recordercorp: "",
	auditlevelname: "",
	errormsg: "",
	submittime: "",
	workflowid: "",
	auditflag: ""
});

const tableTabsValue = ref("infos");

//链接详细信息
const linkDetail = (column, row) => {
	if (column == "commissionid" && row.commissionid) {
		if (row.commissionid) {
			condobj.cond = {
				commissionid: row.commissionid
			};
			condobj.dialogShow_salesCommissionReadOnly = true;
		}
	}
};

//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "folderno" && row.folderno) {
	}
};
//保存销售提佣佣金
let saveCommissionInfo = async () => {
	if (!sformData.combinedid) {
		ElMessage.warning(i18n.t("Message_SaveCurrenInfo"));
		return;
	}
	let params = {
		jsonString: JSON.stringify({ combinedCommissionInfo: sformData })
	};
	const res = await http.post("/crm/commission/commission!updateCombinedCommissionInfoById.action", qs.stringify(params));
	if (res) {
		ElMessage({
			type: "success",
			message: i18n.t("Message_OperationSuccess")
		});
		for (let key in res.combinedCommissionInfo[0]) {
			//判定 combinedCommissionInfo 的key 是否存在 sformData 的key
			sformData[key] = res.combinedCommissionInfo[0][key];
		}
	}
};

//提交销售提佣佣金
let submitCommissionInfo = () => {
	if (!sformData.combinedid) {
		ElMessage.warning(i18n.t("Message_SaveCurrenInfo"));
		return;
	}
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let combinedCommissionInfos = [];
		combinedCommissionInfos.push(sformData);
		let jsonString = {
			combinedCommissionInfos: combinedCommissionInfos
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/commission/commission!submitCombinedCommissionInfo.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_combineddetailNew = false;
		}
	});
};

//审核销售提佣佣金信息
const approveCommissionInfo = code => {
	if (!sformData.combinedid) {
		ElMessage.warning(i18n.t("alert_saveclient"));
		return;
	}
	let str = i18n.t("audit_approve");
	if (code == "-2") {
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
		let cond = { opinion: approveValue.value };
		let combinedCommissionInfos = [];
		combinedCommissionInfos.push(sformData);
		let jsonString = {
			combinedCommissionInfos: combinedCommissionInfos,
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if (code == "-2") {
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
			props.condobj.dialogShow_combineddetailNew = false;
		}
	});
};
//查询销售代理佣金
let getbrokerageInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({ combinedCommissionInfo: obj })
	};
	const res = await http.post("/crm/commission/commission!selectCombinedCommissionInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.combinedCommissionInfo[0]) {
			//判定 combinedCommissionInfo 的key 是否存在 sformData 的key
			sformData[key] = res.combinedCommissionInfo[0][key];
		}
	}
};
//切换tab时触发
const tabChange = TabPaneName => {
	let combinedid = sformData.combinedid;
	if (TabPaneName == "infos") {
		//提佣申请子页面
		if (combinedid) {
			getbrokerageInfo({ combinedid: combinedid });
			//传参后会自动调用接口刷新
			tableListSales.httpAttribute.baseParams["cond.combinedid"] = combinedid;
			grid_gradeInfos.value.reuseTableList();
		}
	} else if (TabPaneName == "query") {
		//销售认证佣金
		if (combinedid) {
			//传参后会自动调用接口刷新
			tableListCertification.httpAttribute.baseParams["cond.combinedid"] = combinedid;
			grid_authenticationQuery.value.reuseTableList();
		}
	}
};

onMounted(() => {
	//getValue();
	if (props.condobj) {
		let combinedid = props.condobj.cond.combinedid; //销售提佣编号
		let auditflag = props.condobj.cond.auditflag; //审核状态
		let v_readOnly = props.condobj.cond.readOnly; //只读状态
		if (auditflag == "0") {
			saveShow.value = true;
			submitShow.value = true;
			isdisabled.value = false;
		} else {
			approveShow.value = true;
		}
		if (v_readOnly == "1") {
			saveShow.value = false;
			submitShow.value = false;
			approveShow.value = false;
		}
		if (combinedid) {
			getbrokerageInfo({ combinedid: combinedid });
			//传参后会自动调用接口刷新
			tableListSales.httpAttribute.baseParams["cond.condcombinedid"] = combinedid;
			grid_gradeInfos.value.reuseTableList();
		}
	}
});

//表格销售提佣申请单
const grid_gradeInfos = ref();
const tableListSales = reactive({
	id: "/appointmentManage/commission/combined_detail.vue_grid_gradeInfos",
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectCommissionInfoByCond.action",
		root: "commissionInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "提佣月份",
			label: "basecolumncommission_month",
			prop: "brokeragemonth",
			type: "Input",
			width: "160"
		},
		{
			title: "提佣申请单号",
			label: "panelcolumnbrokerageno",
			prop: "commissionid",
			type: "Link",
			width: "160"
		},
		{
			title: "实际营业额",
			label: "basecolumnActual_Turnover",
			prop: "totalmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "无代理佣金基数",
			label: "panelcolumnno_agency_commission_base",
			prop: "noagenttotalprice",
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
			width: "140"
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
			title: "增值税",
			label: "appointmentValueaddedtax_hkd",
			prop: "taxmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "销售开支",
			label: "columnbasesalesexpenses_hkd",
			prop: "salesexpenses",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "佣金基数",
			label: "panelcolumnbrokeragebase",
			prop: "basemoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "达标奖",
			label: "panelcolumnstandardbonus_hkd",
			prop: "attainedbonus",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "组合达标奖",
			label: "basecolumnCombined_Achievement_Award",
			prop: "combinationaward",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "任务额",
			label: "panelcolumntaskwell_hkd",
			prop: "taskmoney",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "基础佣金",
			label: "basecolumnBasic_Commission",
			prop: "brokerage",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "佣金(HKD)",
			label: "panelcolumnbrokerage_hkd",
			prop: "brokeragetotal",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "本次呆账扣减",
			label: "basecolumnAR_deduction_amount",
			prop: "total_bad_debts",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "本次坏账扣减",
			label: "basecolumnbad_deduction_amount",
			prop: "badprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "是否已提佣",
			label: "itemtitleWhetherToRaiseCommissionOrNot",
			prop: "iscommission",
			type: "Input",
			width: "140"
		},
		{
			title: "单月是否可提佣(Y/N)",
			label: "basecolumncan_i_withdraw_commission",
			prop: "ismonthreach",
			type: "Input",
			width: "140"
		},
		{
			title: "是否已结账",
			label: "ischeckout",
			prop: "ischeckout",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否组合提佣",
			label: "iscombined",
			prop: "iscombined",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "是否计算保底(Y/N)",
			label: "basecolumncount_minimum_guarantee",
			prop: "iscountfloors",
			type: "Input",
			width: "140"
		},
		{
			title: "是否保底(Y/N)",
			label: "basecolumnis_the_minimum_guaranteed",
			prop: "ismonthfloors",
			type: "Input",
			width: "160"
		},
		{
			title: "主键",
			label: "basecolumnBasic_Commission",
			prop: "cid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "组合表外键id",
			label: "basecolumnBasic_Commission",
			prop: "combinedid",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

//表格销售认证佣金信息
const grid_authenticationQuery = ref();
const tableListCertification = reactive({
	id: "/appointmentManage/attained/combined_detail.vue_grid_authenticationQuery",
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectFoldersInfoByBrokerageformouth.action",
		root: "certificationCommissionInfos",
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
			width: "180"
		},
		{
			title: "申请单关联HCC号",
			label: "columnbaseHCCRelatedDocNo",
			prop: "preprunfolder",
			type: "Input",
			width: "160"
		},
		{
			title: "销售编码",
			label: "columnbasesalescode",
			prop: "secode",
			type: "Input",
			width: "140"
		},
		{
			title: "销售名称",
			label: "columnbasesalesdescus",
			prop: "sename",
			type: "Input",
			width: "160"
		},
		{
			title: "分包HKCC认证类型",
			label: "menubaseThe_authentication_type",
			prop: "authentication",
			type: "Select",
			width: "140",
			typeData: stype
		},
		{
			title: "佣金",
			label: "columnappointmentothercostmoney_hkd",
			prop: "abrokerage",
			type: "Input",
			width: "140"
		},
		{
			title: "部门",
			label: "corpinfopaneldepartmentcodetitle",
			prop: "dept",
			type: "Input",
			width: "160"
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
			label: "columnCustomerName",
			prop: "compname",
			type: "Input",
			width: "180"
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
		}
	],
	// 表格数据
	tableData: []
});
</script>

<style scoped lang="scss">
.appointmentSplitdetail-card {
	border: 1px solid silver;
	overflow: hidden;
	transition: 0.3s;
}

.ccbase-column {
	:deep(.el-form-item__label) {
		color: red;
		font-weight: bold;
	}
	:deep(.el-input__inner) {
		color: red;
		font-weight: bold;
	}
}
</style>
