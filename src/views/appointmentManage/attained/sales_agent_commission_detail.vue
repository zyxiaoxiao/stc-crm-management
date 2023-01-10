<template>
	<div class="all-height flex-column">
		<el-tabs
			class="flex-column flex-1"
			style="overflow: auto"
			v-model="tableTabsValue"
			type="border-card"
			@tab-change="tabChange"
		>
			<el-tab-pane title1="销售代理提佣申请" :label="$t('panelcolumnbrokerageapply')" name="infos">
				<div style="margin: 10px; text-align: left">
					<el-button
						size="small"
						class="button_show"
						v-show="saveShow"
						type="primary"
						icon="Document"
						plain
						@click="saveSalesAgentBrokerage()"
						>{{ $t("menu_save") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="submitShow"
						type="success"
						icon="Check"
						plain
						@click="submitSalesAgentBrokerage()"
						>{{ $t("menu_submit") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="approveShow"
						type="success"
						icon="Check"
						plain
						@click="approveSalesAgentBrokerageInfo('0')"
						>{{ $t("menu_approve") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="approveShow"
						type="danger"
						icon="Close"
						plain
						@click="approveSalesAgentBrokerageInfo('-1')"
						>{{ $t("menu_reject") }}</el-button
					>
					<el-button
						size="small"
						class="button_show"
						v-show="approveShow"
						type="danger"
						icon="Close"
						plain
						@click="approveSalesAgentBrokerageInfo('-2')"
						>{{ $t("menu_reject2Submitor") }}</el-button
					>
				</div>
				<el-form style="margin: 0px 15px" label-position="right" label-width="120px" :model="sformData" ref="ruleFormRef">
					<el-divider title1="提佣申请" content-position="left">{{ $t("panelcolumnbrokerageapply") }}</el-divider>
					<el-row class="main-align-items-center">
						<el-col :span="6">
							<el-form-item :label="$t('columnbasemonth') + ':'" title1="月份">
								<el-input type="text" v-model="sformData.brokeragemonth" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('appointmentTotalprice_hkd') + ':'" title1="总价">
								<el-input type="text" v-model="sformData.totalmoney" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('columnwriteoff_application_listCost') + ':'" title1="成本费">
								<el-input type="text" v-model="sformData.costnum" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('panelcolumnbaddebt') + ':'" title1="坏账金额">
								<el-input type="text" v-model="sformData.badmoney" readonly> </el-input>
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
							<el-form-item :label="$t('panelcolumnbrokerage_hkd') + ':'" title1="佣金">
								<el-input type="text" v-model="sformData.brokerage" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item :label="$t('personaluserpanel2bmbmtitle') + ':'" title1="部门">
								<el-input type="text" v-model="sformData.dept" readonly></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item :label="$t('columnappointment_desc42') + ':'" title1="remark">
								<el-input type="textarea" v-model="sformData.remark" :disabled="isdisabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>					
				</el-form>
                <el-divider style="margin: 1px 0;"></el-divider>
				<div class="flex-column" style="flex: 1; overflow: auto;height: 350px;">
					<zTable ref="grid_gradeInfos" width="700px" :tableList="tableListSales" > </zTable>
				</div>                
			</el-tab-pane>
			<el-tab-pane title1="销售开支查询" :label="$t('titleExpenditureQuery')" class="all-height flex-column" name="query">
				<div class="flex-column" style="flex: 1; overflow: auto">
					<zTable ref="grid_expenditureInfos" :tableList="tableListExpenditure" @link-detailbg="linkDetailquey"> </zTable>
				</div>
			</el-tab-pane>
		</el-tabs>
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


const i18n = useI18n();
// 父组件传入的参数
const props = defineProps({
	condobj: Object
});
let approveShow = ref(false); //审核通过、拒绝至上一步、审核拒绝
let saveShow = ref(false); //保存
let submitShow = ref(false); //提交
let isdisabled = ref(true); //不可编辑
let stype = getdropSownSelection("sales_type"); //开支类型下拉
//提佣申请初始化信息
const sformData = reactive({
	salesbrokerageid: "",
	totalmoney: "",
	costnum: "",
	salesexpenses: "",
	taxmoney: "",
	badmoney: "",
    dept: "",
	remark: "",
	recordercode: "",
	recorderdesc: "",
	recordtime: "",
	brokeragemonth: "",

	agentno: "",
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
	auditflag: "",
});

const tableTabsValue = ref("infos");

//链接详细信息
const linkDetailquey = (column, row) => {
	if (column == "folderno" && row.folderno) {
				
	}
};
//保存销售代理佣金
let saveSalesAgentBrokerage = async ()=> {
	let params = {
		jsonString: JSON.stringify({salesagentbrokerageInfo:sformData})
	};
	const res = await http.post("/crm/salesbrokerage/salesagentbrokerage!updateSalesagentbrokerageInfo.action", qs.stringify(params));
	if (res) {
		for (let key in res.salesagentbrokerageInfo[0]) {
			//判定 salesagentbrokerageInfo 的key 是否存在 sformData 的key
			sformData[key] = res.salesagentbrokerageInfo[0][key];
		}
	}
};

//提交销售代理佣金
let submitSalesAgentBrokerage = async ()=> {
	if(!sformData.salesbrokerageid){
		ElMessage.warning(i18n.t("Message_SaveCurrenInfo"));
		return;
	}
	let salesagentbrokerageInfos = [];
	salesagentbrokerageInfos.push(sformData);
	let params = {
		jsonString: JSON.stringify({salesagentbrokerageInfos:salesagentbrokerageInfos})
	};
	const res = await http.post("/crm/salesbrokerage/salesagentbrokerage!submit.action", qs.stringify(params));
	if (res) {
		//关闭窗口
		props.condobj.dialogShow_salesagentbrokerageNew = false;
	}
};

//审核销售代理提佣信息
const approveSalesAgentBrokerageInfo = code => {
	if (!sformData.salesbrokerageid) {
		ElMessage.warning(i18n.t("alert_saveclient"));
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
		let cond = {'opinion':approveValue.value};
		let salesagentbrokerageInfos = [];
		salesagentbrokerageInfos.push(sformData);
		let jsonString = {
			"salesagentbrokerageInfos":salesagentbrokerageInfos,
			'cond':cond
		};
		let params = {
			jsonString: JSON.stringify(jsonString)
		};
		let url = "";
		if(code == "-1"){
			url = "/crm/salesbrokerage/salesagentbrokerage!reject.action";
		}else if(code == "-2"){
			url = "/crm/salesbrokerage/salesagentbrokerage!reject2Submitor.action";
		}else{
			url = "/crm/salesbrokerage/salesagentbrokerage!approve.action";
		}
		const res = await http.post(url, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
		if (res) {
			ElMessage({
				type: "success",
				message: i18n.t("Message_OperationSuccess")
			});
			props.condobj.dialogShow_salesagentbrokerageNew = false;
		}
	});
};
//查询销售代理佣金
let getbrokerageInfo = async obj => {
	let params = {
		jsonString: JSON.stringify({salesagentbrokerageInfo:obj})
	};
	const res = await http.post("/crm/salesbrokerage/salesagentbrokerage!selectSalesagentbrokerageInfoById.action", qs.stringify(params));
	if (res) {
		for (let key in res.salesagentbrokerageInfo[0]) {
			//判定 salesagentbrokerageInfo 的key 是否存在 sformData 的key
			sformData[key] = res.salesagentbrokerageInfo[0][key];
		}
	}
};
//切换tab时触发
const tabChange = TabPaneName => {
    let salesbrokerageid = sformData.salesbrokerageid;
	if (TabPaneName == "infos") {
		//提佣申请子页面
        if(salesbrokerageid){
            getbrokerageInfo({"salesbrokerageid":salesbrokerageid});
            //传参后会自动调用接口刷新
			tableListSales.httpAttribute.baseParams["cond.salesbrokerageid"] = salesbrokerageid;
			grid_gradeInfos.value.reuseTableList();
        }
	} else if (TabPaneName == "query") {
		//销售开支查询子页面
        if(salesbrokerageid){
            //传参后会自动调用接口刷新
			tableListExpenditure.httpAttribute.baseParams["cond.sbrid"] = salesbrokerageid;
            tableListExpenditure.httpAttribute.baseParams["cond.brokeragemonth"] = sformData.brokeragemonth;
			grid_expenditureInfos.value.reuseTableList();
        }
	} 
};

//页面跳转
const dialogShow = data => {
	if (data == "dialogShow_customerListQuery") {
		dialogShow_customerListQuery.value = true;
	}

};
onMounted(() => {
	//getValue();
	if (props.condobj) {
		let salesbrokerageid = props.condobj.cond.salesbrokerageid; //提佣编号
        let auditflag = props.condobj.cond.auditflag; //审核状态
		let v_readOnly = props.condobj.cond.readOnly; //只读状态
		if(auditflag=='0'){
            saveShow.value = true;
			submitShow.value = true;
			isdisabled.value = false;
		}else{
			approveShow.value = true;
		}
		if(v_readOnly == "1"){
			saveShow.value = false;
			submitShow.value = false;
            approveShow.value = false;
		}
        if(salesbrokerageid){
            getbrokerageInfo({"salesbrokerageid":salesbrokerageid});
            //传参后会自动调用接口刷新
			tableListSales.httpAttribute.baseParams["cond.sbrid"] = salesbrokerageid;
			grid_gradeInfos.value.reuseTableList();
        }
    }
});

//表格销售提佣申请单
const grid_gradeInfos = ref();
const tableListSales = reactive({
	id: "/appointmentManage/attained/sales_agent_commission_detail.vue_grid_gradeInfos",
    tableToolbar: {
		right: false
	},
	//请求属性设置
	httpAttribute: {
		url: "/crm/salesbrokerage/salesagentbrokerage!selectSalesagentbrokeragefoldersInfoByCond.action",
		root: "salesagentfoldersInfos",
		baseParams: {}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
		},
		{
			title: "部门",
			label: "personaluserpanel2bmbmtitle",
			prop: "dept",
			type: "Input",
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
			title: "佣金",
			label: "panelcolumnbrokerage_hkd",
			prop: "commission",
			type: "Input",
			width: "160"
		},
		{
			title: "佣金基点",
			label: "itemtitlefoldersbrokerage",
			prop: "salesbrokerage",
			type: "Input",
			width: "140"
		},
		{
			title: "代理商编码",
			label: "corpinfopanelqydlsbmtitle",
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
			title: "总价",
			label: "appointmentTotalprice_hkd",
			prop: "totalprice",
			type: "Input",
			width: "140"
		},
		{
			title: "销售开支",
			label: "columnbasesalesexpenses_hkd",
			prop: "salesexpenses",
			type: "Input",
			width: "140"
		},
		{
			title: "成本费",
			label: "columnwriteoff_application_listCost",
			prop: "costnum",
			type: "Input",
			width: "160"
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
			width: "160"
		}
	],
	// 表格数据
	tableData: []
});

//表格销售开支
const grid_expenditureInfos = ref();
const tableListExpenditure = reactive({
	id: "/appointmentManage/attained/sales_agent_commission_detail.vue_grid_expenditureInfos",
	//请求属性设置
	httpAttribute: {
		url: "/crm/expenditure/expenditure!selectExpenditureInfoForBrokerage.action",
		root: "expenditureInfos",
		baseParams: {'cond.auditflag':'2'}
	},
	//表格表头
	tableColumns: [
		{
			type: "selection",
			width: "40"
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


</script>

<style lang="scss">
.appointmentSplitdetail-card {
	border: 1px solid silver;
	overflow: hidden;
	transition: 0.3s;
}
</style>

