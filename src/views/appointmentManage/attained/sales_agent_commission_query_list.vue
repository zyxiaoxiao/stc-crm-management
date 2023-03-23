<template>
	<div class="all-height flex-column main-card">
		<el-tabs class="flex-column flex-1 main-card-tabs" v-model="tableTabsValue" type="border-card" @tab-change="tabChange">
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				name="salesinfos"
				:label="$t('panelcolumnsalesagentnotsubmit')"
				title1="未提交销售代理提佣"
			>
				<zTable
					ref="grid_salesagentbrokerageInfos"
					:tableList="atableList"
					@link-detailbg="linkDetail"
					@workflow-status="workflowStatus"
				>
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
							@click="salesAgentBrokerageDelete(scope.selectList)"
							>{{ $t("SRM_delete") }}</el-button
						>
						<el-button size="small" type="success" icon="Check" plain @click="submitSalesAgentBrokerages(scope.selectList)">{{
							$t("SRM_submit")
						}}</el-button>
					</template>
				</zTable>
			</el-tab-pane>
			<el-tab-pane
				class="main-tab-pane-content all-height flex-column"
				:label="$t('panelcolumnsalesagentsubmited')"
				title1="已提交销售代理提佣"
				name="salesquery"
			>
				<zTable
					ref="grid_salesagentbrokerageInfos_submit"
					:tableList="htableList"
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
			<ZDialog v-model="condobj.dialogShow_salesagentbrokerageNew" @close="closeSalesAgentBrokerage" width="95%">
				<salesagentbrokerageNew :condobj="condobj"></salesagentbrokerageNew>
			</ZDialog>
		</div>
		<div v-dialogStretching>
			<ZDialog v-model="condobj.dialogShow_salesagentbrokerageReadOnly" @close="closeSalesAgentBrokerageReadOnly" width="95%">
				<salesagentbrokerageNew :condobj="condobj"></salesagentbrokerageNew>
			</ZDialog>
		</div>
		<div>
			<el-dialog v-model="dialogFormVisible" :title="$t('DOWNLOAD_download')">
				<el-form ref="cEform" :model="dform" style="margin: 25px 15px" :rules="rules">
					<el-form-item :label="$t('Consign_chooseMouthTime') + ':'" style="width: 90%;" title1="请选择提佣月份" prop="commission">
						<el-date-picker
							type="date"
							v-model="dform.commission"
							format="YYYY-MM"
							value-format="YYYY-MM"
							style="width: 100%"
							:disabled-date="disabledDate"
						></el-date-picker>
					</el-form-item>
					<el-form-item title1="销售代理编码" :label="$t('column_SalesAgentCode')+ ':'" style="width: 90%;" prop="usercode">
						<el-select
							v-model="dform.usercode"
							class="full-width-input"
							:placeholder="$t('PleaseSelect_AUser')"
							clearable
							filterable
						>
							<el-option v-for="item in agentData" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item title1="部门" :label="$t('corpinfopaneldepartmentcodetitle')+ ':'" style="width: 90%;"  prop="corpdesc">
						<el-select
							v-model="dform.corpdesc"
							:placeholder="$t('Message_pleaseselectthedeptinformation')"
							class="full-width-input"
							clearable
							filterable
						>
							<el-option v-for="item in corpData" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">{{ $t("SRM_cancel") }}</el-button>
						<el-button type="primary" @click="newSalesagentbrokerageInfo(cEform)"> {{ $t("SRM_ok") }}</el-button>
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
import salesagentbrokerageNew from "@/views/appointmentManage/attained/sales_agent_commission_detail.vue";

const i18n = useI18n();
const grid_salesagentbrokerageInfos = ref();
const grid_salesagentbrokerageInfos_submit = ref();
const globalStore = GlobalStore();
let userInfo = globalStore.userInfo;
const tableTabsValue = ref("salesinfos");

//审核记录
const dialogShow_audit = ref(false);
const auditList = reactive({
	dialogShow_audit: false,
	codeid: "",
	tablename: "MLS_SALESAGENT_BROKERAGE",
	columnid: "salesbrokerageid"
});
const condobj = reactive({
	cond: {},
	objlist: {}
});
let corpData = ref([]); //部门信息
let agentData = ref([]); //销售代理信息
const cEform = ref(); //弹出对话框id
//下载弹出对话框
let dialogFormVisible = ref(false);
let cd = new Date();
let year = cd.getFullYear();
let month = cd.getMonth();
let mstr = "";
if(month == 0){
	mstr = "12";
    year = year-1;
}else if(month <= 9){
    mstr = "0"+month;
}else{
    mstr = month+"";
} 
let date = moment(new Date(year+"-"+mstr)).format("YYYY-MM");
const disabledDate = (time) => {
  return time.getTime() >= new Date(year+"-"+mstr+"-01").getTime();
}
//销售代理提佣初始化
const dform = reactive({
	commission: date,
	usercode: "",
	corpdesc: "",
	agentdesc:"",
	agentcode:""
});

const rules = reactive({
	commission: [{ required: true, message: i18n.t("rulesPropMessage") }],
	usercode: [{ required: true, message: i18n.t("rulesPropMessage") }],
	corpdesc: [{ required: true, message: i18n.t("rulesPropMessage") }]
});
//查询销售代理
const getCommissionValue = async () => {
	let cond = {
		usertypepass: "Y"
	};
	let jsonString = {
		cond: cond
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};
	const res = await http.post("/core/user/user!selectUserInfoBycorpcode.action", qs.stringify(params));
	if (res) {
		let userInfos = res.userInfos;
		let userInfoMaps = res.userInfoMaps;
		if (userInfos) {
			let m = {};
			let a = [];
			for (let u of userInfos) {
				m = { value: u.usercode + "▁▁"+ u.userdesc, label: u.usercode + "▁▁"+ u.userdesc};
				a.push(m);
			}
			agentData.value = a;
		}
		if (userInfoMaps) {
			let s = {};
			let b = [];
			for (let d of userInfoMaps) {
				s = { value: d.corpdesc, label: d.corpdesc };
				b.push(s);
			}
			corpData.value = b;
		}
	}
};
//保存代理提佣
const saveSalesagentbrokerageInfo = async (dform) => {
	let cond = {
		commissiondate: dform.commission,
		corpdesc: dform.corpdesc,
		agentdesc: dform.agentdesc,
		agentcode: dform.agentcode
	};
	let jsonString = {
		cond: cond
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};

	const res = await http.post("/crm/salesbrokerage/salesagentbrokerage!insertSalesagentbrokerageInfo.action", qs.stringify(params));
	if (res) {
		if(res.salesagentbrokerageInfo){
			let salesbrokerageid=res.salesagentbrokerageInfo[0].salesbrokerageid;
			condobj.cond = {
				salesbrokerageid: salesbrokerageid,
				auditflag:"0"
			};
			condobj.dialogShow_salesagentbrokerageNew = true;
		}
		
	}
};

//删除代理提佣
const salesAgentBrokerageDelete = async (selectList) => {
    if (selectList.length < 1) {
		ElMessage.warning(i18n.t("itemtitleloginSelecttherecordstodelete"));
		return false;
	}
	let jsonString = {
		salesagentbrokerageInfos: selectList
	};
	let params = {
		jsonString: JSON.stringify(jsonString)
	};

	const res = await http.post("/crm/salesbrokerage/salesagentbrokerage!deleteSalesagentbrokerageInfo.action", qs.stringify(params));
	if (res) {
		grid_salesagentbrokerageInfos.value.getTableList();
	}
};

//提交代理提佣
const submitSalesAgentBrokerages = selectList => {
    if (selectList != null && selectList.length < 1) {
		ElMessage.warning(i18n.t("alertselectYourFirstToOperateOnline"));
		return;
	}
	ElMessageBox.confirm(i18n.t("Message_ConfirmOrNotSubmit"), i18n.t("reminder"), {
		confirmButtonText: i18n.t("menu_ok"),
		cancelButtonText: i18n.t("menu_cancel"),
		type: "warning",
		draggable: true
	}).then(async () => {
		let jsonString = {
			salesagentbrokerageInfos: selectList
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		const res = await http.post("/crm/salesbrokerage/salesagentbrokerage!submit.action", qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			grid_salesagentbrokerageInfos.value.getTableList();
		}
	});
};

//新增销售代理提佣
const newSalesagentbrokerageInfo = cEform => {
	cEform.validate((valid, fields) => {
		if (valid) {
			//必填项不能为空
			if (!dform.commission && !dform.usercode && !dform.corpdesc) {
				ElMessage.warning(i18n.t("rulesPropMessage2"));
				return;
			}
			let str = dform.usercode;
			if(str){
				dform.agentcode = str.substring(0,str.indexOf("▁"));
				dform.agentdesc = str.substring(str.indexOf("▁")+2,str.length);
				saveSalesagentbrokerageInfo(dform);
				dialogFormVisible.value = false;
			}
		} else {
			//必填项不能为空
			ElMessage.warning(i18n.t("rulesPropMessage2"));
		}
	});
};

//提佣页面关闭
const closeSalesAgentBrokerage = () => {
	grid_salesagentbrokerageInfos.value.getTableList();
};
//提佣查询页面关闭
const closeSalesAgentBrokerageReadOnly = () => {
	grid_salesagentbrokerageInfos_submit.value.getTableList();
};

//页面初始化渲染完成执行
onMounted(() => {
	grid_salesagentbrokerageInfos.value.getTableList();
});

//表格对象代理申请提佣
const atableList = reactive({
	id: "/appointmentManage/attained/sales_agent_commission_query_list.vue_grid_salesagentbrokerageInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/salesbrokerage/salesagentbrokerage!selectSalesagentbrokerageInfoByCond.action",
		root: "salesagentbrokerageInfos",
		baseParams: {
			"cond.auditflag": "0",
			"cond.recordercode": userInfo.usercode
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
			title: "提佣申请单号",
			label: "panelcolumnbrokerageno",
			prop: "salesbrokerageid",
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
			title: "代理名称",
			label: "corpinfopanelqydlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "所属部门",
			label: "portalcompanyregistdeptment",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "佣金",
			label: "panelcolumnbrokerage_hkd",
			prop: "brokerage",
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

//表格对象代理提佣查询
const htableList = reactive({
	id: "/appointmentManage/attained/sales_agent_commission_query_list.vue_grid_salesagentbrokerageInfos_submit",
	//请求属性设置
	httpAttribute: {
		url: "/crm/salesbrokerage/salesagentbrokerage!selectSalesagentbrokerageInfoByCond.action",
		root: "salesagentbrokerageInfos",
		baseParams: {
			"cond.auditflag": "1,2",
			"cond.recordercode": userInfo.usercode
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
			title: "提佣申请单号",
			label: "panelcolumnbrokerageno",
			prop: "salesbrokerageid",
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
			title: "代理名称",
			label: "corpinfopanelqydlsmctitle",
			prop: "agentdesc",
			type: "Input",
			width: "140"
		},
		{
			title: "所属部门",
			label: "portalcompanyregistdeptment",
			prop: "dept",
			type: "Input",
			width: "140"
		},
		{
			title: "佣金",
			label: "panelcolumnbrokerage_hkd",
			prop: "brokerage",
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

// 显示dialogdialogShow_FormVisibleNew
const dialogShow = data => {
	if (data == "dialogShow_salesagentbrokerageNew") {
		condobj.dialogShow_salesagentbrokerageNew = true;
	} else if (data == "dialogShow_FormVisibleNew") {
		getCommissionValue();
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
	if (column == "salesbrokerageid" && row.salesbrokerageid) {
		if (row.salesbrokerageid) {
			condobj.cond = {
				salesbrokerageid: row.salesbrokerageid,
				auditflag:"0"
			};
			condobj.dialogShow_salesagentbrokerageNew = true;
		}
	}
};
//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "salesbrokerageid" && row.salesbrokerageid) {
		if (row.salesbrokerageid) {
			condobj.cond = {
				salesbrokerageid: row.salesbrokerageid,
				readOnly:"1"
			};
			condobj.dialogShow_salesagentbrokerageReadOnly = true;
		}
	}
};

//切换tab时触发
const tabChange = targetName => {
	if (targetName == "salesinfos") {
		//销售代理提佣申请子页面
		grid_salesagentbrokerageInfos.value.getTableList();
	} else if (targetName == "salesquery") {
		//销售代理提佣查询页面
		grid_salesagentbrokerageInfos_submit.value.getTableList();
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
