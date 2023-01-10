<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane class="flex-column" style="overflow: auto" title1="BM提佣申请" :label="$t('panelcolumnbm_commission_application')" name="infos">
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						class="button_show"
						v-show="saveShow"
						type="primary"
						icon="Document"
						plain
						@click="saveBMCommissionInfo()"
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
				<div style="overflow: auto;flex: 1.6;"  >
					<el-form
						style="margin: 0px 15px;"
						label-position="right"
						label-width="120px"
						:model="sformData"
						ref="ruleFormRef"
					>
						<el-divider title1="个人部分" content-position="left">{{ $t("panelcolumnpersonal_part") }}</el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="6">
								<el-form-item :label="$t('panelcolumnpersonal_ar_money') + ':'" title1="个人呆账">
									<el-input type="text" v-model="sformData.personal_spending" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('panelcolumnpersonal_bad_money') + ':'" title1="个人坏账">
									<el-input type="text" v-model="sformData.personal_bad_debts" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnBasic_Commission') + ':'" title1="基础佣金">
									<el-input type="text" v-model="sformData.basic_commission" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('panelcolumnpersonal_brokerage_base') + ':'" title1="个人佣金基数">
									<el-input type="text" v-model="sformData.personal_commission_base" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('columnbasesalestaskwell') + ':'" title1="销售任务额">
									<el-input type="text" v-model="sformData.sales_task_amount" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnpersonal_actual_commission') + ':'" title1="个人实际佣金">
									<el-input type="text" v-model="sformData.personal_actual_commission" readonly> </el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="试用期团队" content-position="left">{{ $t("panelcolumntrial_team") }}</el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="8">
								<el-form-item :label="$t('basecolumntrial_commission_rate') + ':'" title1="试用期佣金率">
									<el-input type="text" v-model="sformData.basic_probation_team_commission_rate" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('basecolumntrial_commission_base') + ':'" title1="试用期佣金基数">
									<el-input type="text" v-model="sformData.basic_probation_team_commission" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item :label="$t('basecolumntrial_actual_commission') + ':'" title1="试用期实际佣金">
									<el-input type="text" v-model="sformData.probation_team_actual_commission" readonly></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider title1="正式团队" content-position="left">{{ $t("panelcolumnformal_team") }}</el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnteam_commission_rate') + ':'" title1="团队佣金率">
									<el-input type="text" v-model="sformData.team_commission_rate" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnteam_task_amount') + ':'" title1="团队任务额">
									<el-input type="text" v-model="sformData.team_task_amount" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnteam_guaranteed_amount') + ':'" title1="团队保底额">
									<el-input type="text" v-model="sformData.team_guaranteed_amount" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnteam_commission_base') + ':'" title1="团队佣金基数">
									<el-input type="text" v-model="sformData.team_commission_base" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnteam_actual_commission') + ':'" title1="团队实际佣金">
									<el-input type="text" v-model="sformData.official_team_actual_commission" readonly></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-divider content-position="left"></el-divider>
						<el-row class="main-align-items-center">
							<el-col :span="6">
								<el-form-item :label="$t('basecolumncommission_month') + ':'" title1="提佣月份">
									<el-input type="text" v-model="sformData.mercenary_month" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnnumber_of_task_well') + ':'" title1="任务额人数">
									<el-input type="text" v-model="sformData.task_amount_num" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnnumber_of_unpaid_commission') + ':'" title1="未提佣人数">
									<el-input type="text" v-model="sformData.quitnum" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('basecolumnnumber_of_commission') + ':'" title1="提佣人数">
									<el-input type="text" v-model="sformData.commissionnum" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :label="$t('columnbaseSalesCertificationCommission') + ':'" title1="认证佣金">
									<el-input type="text" v-model="sformData.noagenttotalprice" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6" class="ccbase-column">
								<el-form-item :label="$t('basecolumntotal_commission') + ':'" title1="总佣金">
									<el-input type="text" v-model="sformData.total_commission" readonly></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item :label="$t('columnappointment_desc42') + ':'" title1="备注">
									<el-input type="textarea" v-model="sformData.remark" :disabled="isdisabled"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<el-divider style="margin: 1px 0"></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto; ">
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
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_salesCommissionReadOnly" @close="closeSalesCommissionReadOnly" width="95%">
				<salesCommissionReadOnly :condobj="condobj"></salesCommissionReadOnly>
			</ZDialog>
		</div>
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
let teamtype = getdropSownSelection("team_type"); //团队类型
let approveShow = ref(false); //审核通过、拒绝至上一步、审核拒绝
let saveShow = ref(false); //保存
let submitShow = ref(false); //提交
let isdisabled = ref(true); //不可编辑
let stype = getdropSownSelection("certificate"); //认证类型下拉
//提佣申请初始化信息
const sformData = reactive({
	personal_spending: "",
	personal_bad_debts: "",
	basic_commission: "",
	personal_commission_base: "",
	sales_task_amount: "",
	personal_actual_commission: "",
	basic_probation_team_commission_rate: "",
	basic_probation_team_commission: "",
	probation_team_actual_commission: "",
	team_commission_rate: "",
	team_task_amount: "",
	team_guaranteed_amount: "",
	team_commission_base: "",
	official_team_actual_commission: "",
	mercenary_month: "",
	task_amount_num: "",
	quitnum: "",
	commissionnum: "",
	noagenttotalprice: "",
	total_commission: "",
	remark: "",

	recordercode: "",
	recorderdesc: "",
	recordtime: "",
	bmcid: "",
	combinedid: ""
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
//保存BM佣金
let saveBMCommissionInfo = async () => {
	if (!sformData.bmcid) {
		ElMessage.warning(i18n.t("Message_SaveCurrenInfo"));
		return;
	}
	let params = {
		jsonString: JSON.stringify({ bmcommissionInfo: sformData })
	};
	const res = await http.post("/crm/commission/commission!updateBmCommissionInfoById.action", qs.stringify(params));
	if (res) {
		ElMessage({
			type: "success",
			message: i18n.t("Message_saveSuccess")
		});
		for (let key in res.bmcommissionInfo[0]) {
			//判定 bmcommissionInfo 的key 是否存在 sformData 的key
			sformData[key] = res.bmcommissionInfo[0][key];
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
		const res = await http.post("/crm/commission/commission!submitCombinedCommissionInfo.action", qs.stringify(params));
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_combineddetailBMNew = false;
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
		jsonString: JSON.stringify({ bmcommissionInfo: obj })
	};
	const res = await http.post("/crm/commission/commission!selectBmCommissionInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.bmcommissionInfo[0]) {
			//判定 combinedCommissionInfo 的key 是否存在 sformData 的key
			sformData[key] = res.bmcommissionInfo[0][key];
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
			tableListSales.httpAttribute.baseParams["cond.combinedidcode"] = combinedid;
			grid_gradeInfos.value.reuseTableList();
		}
	}
});

//表格销售提佣申请单
const grid_gradeInfos = ref();
const tableListSales = reactive({
	id: "/appointmentManage/commission/sales_bmcommission_detail.vue_grid_gradeInfos",
	tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectBmSonCommissionInfoByCode.action",
		root: "bmsoncommissionInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "团队类别",
			label: "basecolumncommission_type",
			prop: "teamcategory",
			type: "Select",
			width: "140",
			typeData: teamtype
		},
		{
			title: "销售编码",
			label: "columnbasesalescode",
			prop: "recordercode",
			type: "Input",
			width: "160"
		},
		{
			title: "销售名称",
			label: "columnbasesalesdescus",
			prop: "recorderdesc",
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
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
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
			title: "呆账总金额",
			label: "basecolumnAR_Total_Amount",
			prop: "arprice",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "坏账总金额",
			label: "basecolumnTotal_Bad_Amount",
			prop: "badmoney",
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
			title: "是否试用期",
			label: "basecolumnis_probation_period",
			prop: "iscountfloors",
			type: "Number",
			precision: 2,
			width: "140"
		},
		{
			title: "主键",
			label: "bmsoncid",
			prop: "bmsoncid",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "外键",
			label: "bmcid",
			prop: "bmcid",
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
