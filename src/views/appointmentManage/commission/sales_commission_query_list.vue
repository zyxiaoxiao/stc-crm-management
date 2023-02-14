<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="salesinfos"
				:label="$t('panelcolumnnotsubmit')"
				title1="未提交提佣"
			>
				<zTable ref="grid_combinedInfos" :tableList="atableList" @link-detailbg="linkDetail" @workflow-status="workflowStatus">
					<template #tableHeaderLleft="scope">
						<el-button size="small" type="primary" icon="Edit" plain @click="dialogShow('dialogShow_FormVisibleNew')">{{
							$t("SRM_add")
						}}</el-button>
						<el-button
							size="small"
							type="danger"
							icon="Delete"
							plain
							:disabled="!scope.isSelected"
							@click="CombinedInfosDelete(scope.selectList)"
							>{{ $t("SRM_delete") }}</el-button
						>
						<el-button
							size="small"
							type="success"
							icon="Check"
							:disabled="!scope.isSelected"
							plain
							@click="submitCombinedInfos(scope.selectList)"
							>{{ $t("SRM_submit") }}</el-button
						>
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
				:label="$t('panelcolumnsubmited')"
				title1="已提交提佣"
				name="salesquery"
			>
				<zTable
					ref="grid_combinedInfos_submit"
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
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('menubasemy_commission_query_automatic')"
				title1="自动提佣查询"
				name="automatic"
			>
				<zTable
					ref="grid_automaticOrderQuery"
					:tableList="automatictableList"
					@link-detailbg="linkDetailquey"
					@workflow-status="workflowStatus"
				>
				</zTable>
			</el-tab-pane>
		</el-tabs>
		<div v-dialogStretching>
			<ZDialog v-model="auditList.dialogShow_audit" title="审核记录" width="95%">
				<audit :auditList="auditList"></audit>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_combineddetailNew" @close="closeclosecombineddetail" width="95%">
				<combineddetailNew :condobj="condobj"></combineddetailNew>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_combineddetailBMNew" @close="closeclosecombineddetail" width="95%">
				<combineddetailBMNew :condobj="condobj"></combineddetailBMNew>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_combineddetailBMReadOnly" @close="closecombineddetailReadOnly" width="95%">
				<combineddetailBMNew :condobj="condobj"></combineddetailBMNew>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_combineddetailReadOnly" @close="closecombineddetailReadOnly" width="95%">
				<combineddetailNew :condobj="condobj"></combineddetailNew>
			</ZDialog>
		</div>
		<div>
			<el-dialog v-model="dialogFormVisible" :title="$t('DOWNLOAD_download')">
				<el-form ref="cEform" :model="dform" style="margin: 25px 15px">
					<el-form-item title1="提佣类型" :label="$t('basecolumncommission_type') + ':'" style="width: 90%" prop="commissiontype">
						<el-select
							v-model="dform.commissiontype"
							class="full-width-input"
							@change="select_commissiontype"
							readonly
							filterable
						>
							<el-option v-for="item in costtype" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						v-show="monthShow"
						:label="$t('Consign_chooseMouthTime') + ':'"
						style="width: 90%"
						title1="请选择提佣月份"
						prop="month"
					>
						<el-date-picker
							type="date"
							v-model="dform.month"
							format="YYYY-MM"
							value-format="YYYY-MM"
							style="width: 100%"
							:disabled-date="disabledDate"
						></el-date-picker>
					</el-form-item>
					<el-form-item
						v-show="monthsShow"
						:label="$t('basecolumncombined_commission_month') + ':'"
						style="width: 90%"
						title1="组合提佣月份"
						prop="months"
					>
						<el-input type="text" v-model="dform.months" readonly></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">{{ $t("SRM_cancel") }}</el-button>
						<el-button type="primary" @click="newcombineddetailInfo(cEform)"> {{ $t("SRM_ok") }}</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import zTable from "/src/components/ZTable/index.vue";
import { GlobalStore } from "/src/store/globalStore.js";
//弹出报错或者提示框
import { ElMessage, ElMessageBox } from "element-plus";
import qs from "qs";
import http from "@/api/index.js";
import moment from "moment";
import audit from "@/views/audit/index.vue";
import ZDialog from "/src/components/ZDialog.vue";
import combineddetailNew from "@/views/appointmentManage/commission/combined_detail.vue";
import combineddetailBMNew from "@/views/appointmentManage/commission/sales_bmcommission_detail.vue";
const i18n = useI18n();
const grid_combinedInfos = ref();
const grid_combinedInfos_submit = ref();
const grid_automaticOrderQuery = ref();
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;
const tableTabsValue = ref("salesinfos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_COMBINED_COMMISSION",
	columnid: "combinedid"
});

let monthShow = ref(true); //单月提佣显示
let monthsShow = ref(false); //组合提佣显示
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
const cEform = ref(); //弹出对话框id
//下载弹出对话框
let dialogFormVisible = ref(false);
let cd = new Date();
let year = cd.getFullYear();
let month = cd.getMonth();
let mstr = "";
if (month == 0) {
	mstr = "12";
	year = year - 1;
} else if (month <= 9) {
	mstr = "0" + month;
} else {
	mstr = month + "";
}
let date = moment(new Date(year + "-" + mstr)).format("YYYY-MM");
const disabledDate = time => {
	return time.getTime() >= new Date(year + "-" + mstr + "-01").getTime();
};
//销售代理提佣初始化
const dform = reactive({
	month: date,
	commissiontype: "0",
	months: ""
});

//选择单月提佣或者组合提佣后
const select_commissiontype = val => {
	if (val == "0") {
		monthShow.value = true;
		monthsShow.value = false;
	} else if (val == "1") {
		let monthStr = getCombinedMonth();
		dform.months = monthStr;
		monthShow.value = false;
		monthsShow.value = true;
	}
};

//给组合提佣使用的
const getCombinedMonth = () => {
	let date = new Date();
	let monthStr = "";
	let year = date.getFullYear();
	let month = date.getMonth();
	if (month == 0) {
		year = year - 1;
		month = 12;
	}
	var year1 = year;
	var month1 = month - 1;
	if (month1 == 0) {
		year1 = year1 - 1;
		month1 = 12;
	}
	var year2 = year1;
	var month2 = month1 - 1;
	if (month2 == 0) {
		year2 = year2 - 1;
		month2 = 12;
	}
	if (month2 < 10) {
		monthStr = year2 + "-0" + month2;
	} else {
		monthStr = year2 + "-" + month2;
	}
	if (month1 < 10) {
		monthStr = monthStr + "," + year1 + "-0" + month1;
	} else {
		monthStr = monthStr + "," + year1 + "-" + month1;
	}
	if (month < 10) {
		monthStr = monthStr + "," + year + "-0" + month;
	} else {
		monthStr = monthStr + "," + year + "-" + month;
	}
	return monthStr;
};

//保存销售提佣信息
const saveCombineddetailInfo = async () => {
	dialogFormVisible.value = false;
	let date_commission = dform.month; //单月提佣
	let date_combined = dform.months; //组合提佣
	if (dform.commissiontype == "0") {
		date_combined = "";
	} else if (dform.commissiontype == "1") {
		date_commission = "";
	}
	let cond = {
		commissiontype: dform.commissiontype,
		date_combined: date_combined,
		date_commission: date_commission
	};
	let jsonString = {
		cond: cond
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/crm/commission/commission!insertCommissionInfo.action", qs.stringify(params));
	if (res) {
		if (res.combinedCommissionInfo && res.combinedCommissionInfo.length > 0) {
			let combinedid = res.combinedCommissionInfo[0].combinedid;
			let isrole = res.combinedCommissionInfo[0].isrole;
			if (!combinedid) {
				ElMessage.warning(i18n.t("Message_saveFailure"));
				return false;
			}
			if (isrole == "BM") {
				condobj.cond = {
					combinedid: combinedid,
					auditflag: "0"
				};
				condobj.dialogShow_combineddetailBMNew = true;
			} else {
				condobj.cond = {
					combinedid: combinedid,
					auditflag: "0"
				};
				condobj.dialogShow_combineddetailNew = true;
			}
		}
	}
};

//删除提佣申请
const CombinedInfosDelete = async selectList => {
	if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	let jsonString = {
		combinedCommissionInfos: selectList
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};

	const res = await http.post("/crm/commission/commission!deleteCombinedCommissionInfo.action", qs.stringify(params));
	if (res) {
		grid_combinedInfos.value.getTableList();
	}
};

//提交销售提佣申请
const submitCombinedInfos = selectList => {
	if (selectList != null && selectList.length < 1) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return;
	}
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			combinedCommissionInfos: selectList
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
			grid_combinedInfos.value.getTableList();
		}
	});
};

//销售提佣申请
const newcombineddetailInfo = async () => {
	if (!(dform.commissiontype == "0" || dform.commissiontype == "1")) {
		ElMessage.warning(i18n.t("Message_PleseSelectRecord"));
		return false;
	}
	if (dform.commissiontype == 0) {
		let cond = {
			commissiontype: dform.commissiontype,
			brokeragemonthnum: dform.month
		};
		let jsonString = {
			cond: cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};

		const res = await http.post("/crm/commission/commission!selectCommissionInfoByCond.action", qs.stringify(params));
		if (res) {
			let commissionInfos = res.commissionInfos;
			if (commissionInfos && commissionInfos.length) {
				let isrun = true;
				for (let map of commissionInfos) {
					if (map.iscombined == "Y") {
						isrun = false;
					}
					if (map.isrole == "BM") {
						isrun = false;
					}
				}
				if (isrun) {
					ElMessageBox.confirm("当月可与之前两月组合提佣，是否放弃组合提佣！", i18n.t("reminder"), {
						confirmButtonText: i18n.t("menu_ok"),
						cancelButtonText: i18n.t("menu_cancel"),
						type: "warning",
						draggable: true
					}).then(() => {
						saveCombineddetailInfo();
					});
				} else {
					saveCombineddetailInfo();
				}
			} else {
				saveCombineddetailInfo();
			}
		}
	} else {
		saveCombineddetailInfo();
	}
};

//提佣页面关闭
const closeclosecombineddetail = () => {
	grid_combinedInfos.value.getTableList();
};
//提佣查询页面关闭
const closecombineddetailReadOnly = () => {
	grid_combinedInfos_submit.value.getTableList();
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_combinedInfos.value.getTableList();
});

const formData1 = reactive({});

//表格对象申请提佣
const atableList = reactive({
	id: "/appointmentManage/commission/sales_commission_query_list.vue_grid_combinedInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectCombinedCommissionInfoByCond.action",
		root: "combinedCommissionInfos",
		baseParams: {
			"cond.auditflag": "0",
			"cond.recordercode": userInfo.usercode
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
	id: "/appointmentManage/attained/sales_commission_query_list.vue_grid_combinedInfos_submit",
	//请求属性设置
	httpAttribute: {
		url: "/crm/commission/commission!selectCombinedCommissionInfoByCond.action",
		root: "combinedCommissionInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.recordercode": userInfo.usercode
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

//表格对象自动提佣查询
const automatictableList = reactive({
	id: "/appointmentManage/attained/my_commission_query_list.vue_grid_automaticOrderQuery",
	//请求属性设置
	httpAttribute: {
		url: "/crm/folders/folders!selectFoldersInfoByBrokerage.action",
		root: "foldersInfos",
		baseParams: {
			"cond.salesmancode": userInfo.usercode,
			"cond.automatic": "Y",
			"cond.rightFlag": "1",
			"cond.autobrokerageflag": "1"
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
			width: "180"
		},
		{
			title: "客户号",
			label: "fieldcolumncustomercode",
			prop: "rasclientid",
			type: "Input",
			width: "150"
		},
		{
			title: "客户名称",
			label: "panelcolumncustomername",
			prop: "compname",
			type: "Input",
			width: "200"
		},
		{
			title: "代理商编码",
			label: "corpinfopaneldlsbmtitle",
			prop: "agentno",
			type: "Input",
			width: "140"
		},
		{
			title: "代理商名称",
			label: "corpinfopaneldlsmctitle",
			prop: "agentname",
			type: "Input",
			width: "160"
		},
		{
			title: "到账日期",
			label: "billinfoaccountdatepanel",
			prop: "labduedate",
			type: "Input",
			width: "160"
		},
		{
			title: "invoice打印日期",
			label: "columnwriteoff_invoiceprintdate",
			prop: "realdate",
			type: "Input",
			width: "160"
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
			title: "未销账金额",
			label: "crmcolumnnotwriteoffmoney_hkd",
			prop: "writeoffmoney",
			type: "Input",
			width: "140"
		},
		{
			title: "销账确认日期",
			label: "crmcolumnapplyacceptdateconfirms",
			prop: "logdate",
			type: "Input",
			width: "160"
		},
		{
			title: "审核时间",
			label: "itemtitlestatusaudittime",
			prop: "audittime",
			type: "Input",
			width: "160"
		},
		{
			title: "部门编码",
			label: "personaluserpanel2bmbmtitle",
			prop: "dept",
			type: "Input",
			width: "160"
		},
		{
			title: "退款金额",
			label: "columncurrency1drawbackrefundmoney",
			prop: "refundnum",
			type: "Input",
			width: "160"
		},
		{
			title: "实际完成日期",
			label: "实际完成日期",
			prop: "actualfinishdate",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "佣金基点",
			label: "佣金基点",
			prop: "brokerage",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "成本费",
			label: "成本费",
			prop: "costnum",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "增值税",
			label: "增值税",
			prop: "taxmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "坏账金额",
			label: "坏账金额",
			prop: "badmoney",
			type: "Input",
			width: "10",
			isHide: true
		},
		{
			title: "检测进度",
			label: "检测进度",
			prop: "checkstatus",
			type: "Input",
			width: "10",
			isHide: true
		}
	],
	// 表格数据
	tableData: []
});

// 显示dialogdialogShow_FormVisibleNew
const dialogShow = data => {
	if (data == "dialogShow_combineddetailNew") {
		condobj.dialogShow_combineddetailNew = true;
	} else if (data == "dialogShow_FormVisibleNew") {
		dialogFormVisible.value = true;
	}
};

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
					auditflag: "0"
				};
				condobj.dialogShow_combineddetailBMNew = true;
			}
		} else {
			if (row.combinedid) {
				condobj.cond = {
					combinedid: row.combinedid,
					auditflag: "0"
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
	if (targetName == "salesinfos") {
		//销售提佣申请子页面
		grid_combinedInfos.value.getTableList();
	} else if (targetName == "salesquery") {
		//销售提佣查询页面
		grid_combinedInfos_submit.value.getTableList();
	} else if (targetName == "automatic") {
		//自动提佣查询页面
		grid_automaticOrderQuery.value.getTableList();
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
